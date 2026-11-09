"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  matchTrip,
  selectTripsFiltering,
  tripsOfTab,
  useTripsStore,
  type TripTab,
} from "@/global-states/trips-store";
import type { Trip } from "../_data/trips";
import { CancelModal } from "./cancel-modal";
import { TripCard } from "./trip-card";
import { TripFilters } from "./trip-filters";
import { TripTabs } from "./trip-tabs";
import {
  FilterEmptyState,
  SkeletonCard,
  TabEmptyState,
  TripsErrorState,
  TripsLoadingState,
} from "./trip-states";

const TAB_IDS: TripTab[] = ["sap-toi", "dang-di", "hoan-thanh", "da-huy"];

const TRIP_LIST = "grid grid-cols-2 items-stretch gap-3.5 max-[640px]:grid-cols-1";

export function TripsPage() {
  const trips = useTripsStore((state) => state.trips);
  const tab = useTripsStore((state) => state.tab);
  const search = useTripsStore((state) => state.search);
  const routeFilter = useTripsStore((state) => state.routeFilter);
  const status = useTripsStore((state) => state.status);
  const completedVisible = useTripsStore((state) => state.completedVisible);
  const loadingMore = useTripsStore((state) => state.loadingMore);
  const setTab = useTripsStore((state) => state.setTab);
  const resetFilters = useTripsStore((state) => state.resetFilters);
  const beginLoading = useTripsStore((state) => state.beginLoading);
  const finishLoading = useTripsStore((state) => state.finishLoading);
  const showError = useTripsStore((state) => state.showError);
  const loadMoreCompleted = useTripsStore((state) => state.loadMoreCompleted);

  const filtering = useTripsStore(selectTripsFiltering);
  const sentinelRef = useRef<HTMLDivElement>(null);

  /* Trạng thái demo qua URL: #loading hoặc #error */
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "loading") beginLoading();
      if (hash === "error") showError();
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [beginLoading, showError]);

  useEffect(() => {
    if (status !== "loading") return;
    const timer = window.setTimeout(finishLoading, 750);
    return () => window.clearTimeout(timer);
  }, [status, finishLoading]);

  /* Tải thêm chuyến đã hoàn thành khi cuộn tới cuối danh sách */
  useEffect(() => {
    if (status !== "ready" || tab !== "hoan-thanh" || filtering) return;
    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMoreCompleted();
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [status, tab, filtering, loadMoreCompleted]);

  const counts = useMemo(
    () => ({
      "sap-toi": tripsOfTab(trips, "sap-toi").length,
      "dang-di": 0,
      "hoan-thanh": tripsOfTab(trips, "hoan-thanh").length,
      "da-huy": tripsOfTab(trips, "da-huy").length,
    }),
    [trips],
  );

  const matched = useMemo(() => {
    const map = {} as Record<TripTab, Trip[]>;
    for (const id of TAB_IDS) {
      map[id] = tripsOfTab(trips, id).filter((trip) =>
        matchTrip(trip, search, routeFilter),
      );
    }
    return map;
  }, [trips, search, routeFilter]);

  const visible = useMemo(() => {
    const map = { ...matched };
    if (!filtering) {
      map["hoan-thanh"] = matched["hoan-thanh"].slice(0, completedVisible);
    }
    return map;
  }, [matched, filtering, completedVisible]);

  const statusText = useMemo(() => {
    if (status === "loading") return "Đang tải chuyến của bạn…";
    if (status === "error") return "Không tải được chuyến của bạn.";

    if (filtering) {
      const shown = visible[tab].length;
      const total = tripsOfTab(trips, tab).length;
      return shown
        ? `Tìm thấy ${shown} trong ${total} chuyến.`
        : "Không có chuyến nào phù hợp bộ lọc.";
    }

    if (tab === "hoan-thanh") {
      const total = counts["hoan-thanh"];
      const shown = visible["hoan-thanh"].length;
      return shown < total
        ? `Đang xem ${shown} trong ${total} chuyến · cuộn xuống để xem thêm.`
        : `Đang xem tất cả ${total} chuyến đã hoàn thành.`;
    }
    if (tab === "sap-toi") {
      return counts["sap-toi"]
        ? `Đang xem ${counts["sap-toi"]} chuyến sắp tới.`
        : "Chưa có chuyến sắp tới.";
    }
    if (tab === "da-huy") {
      return counts["da-huy"]
        ? `Đang xem ${counts["da-huy"]} chuyến đã hủy.`
        : "Chưa có chuyến nào đã hủy.";
    }
    return "Không có chuyến nào đang di chuyển.";
  }, [status, filtering, visible, tab, trips, counts]);

  const handleRetry = () => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    beginLoading();
  };

  const renderList = (list: Trip[]) => (
    <div className={TRIP_LIST}>
      {list.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );

  const renderPanel = (panelTab: TripTab) => {
    if (status === "loading") return <TripsLoadingState />;
    if (status === "error") return <TripsErrorState onRetry={handleRetry} />;

    if (panelTab === "dang-di") {
      return filtering && !matched[panelTab].length ? (
        <FilterEmptyState onClear={resetFilters} />
      ) : (
        <TabEmptyState
          actionLabel="Xem chuyến sắp tới"
          desc="Khi xe chạy, bạn sẽ thấy vị trí trên bản đồ và giờ đến dự kiến tại đây. Chuyến tiếp theo của bạn là đi Ninh Bình vào ngày mai."
          title="Không có chuyến đang di chuyển"
          onAction={() => setTab("sap-toi")}
        />
      );
    }

    const list = visible[panelTab];

    if (filtering && !list.length) {
      return <FilterEmptyState onClear={resetFilters} />;
    }

    if (!list.length) {
      return panelTab === "sap-toi" ? (
        <TabEmptyState
          desc="Bạn chưa có chuyến nào sắp tới. Tìm tuyến và đặt xe ghép để bắt đầu hành trình nhé."
          title="Chưa có chuyến sắp tới"
        />
      ) : (
        <TabEmptyState
          desc="Các chuyến bạn hủy sẽ hiển thị tại đây cùng trạng thái hoàn tiền."
          title="Chưa có chuyến nào đã hủy"
        />
      );
    }

    if (panelTab !== "hoan-thanh") return renderList(list);

    const total = counts["hoan-thanh"];
    const allShown = list.length >= total;

    return (
      <>
        {renderList(list)}
        {loadingMore ? (
          <div className="mt-[18px]">
            <SkeletonCard />
          </div>
        ) : null}
        {allShown ? (
          <p className="mt-[18px] border-t border-dashed border-[var(--border)] px-4 py-3 text-center text-[13px] font-medium leading-[1.5] text-[var(--slate-500)]">
            Bạn đã xem tất cả {total} chuyến đã hoàn thành.
          </p>
        ) : null}
        <div aria-hidden="true" className="h-px" ref={sentinelRef} />
      </>
    );
  };

  return (
    <>
      <section
        className="pt-[clamp(40px,5vw,64px)] pb-[clamp(48px,6vw,80px)]"
        id="chuyen-cua-toi"
      >
        <div className="container">
          <div className="max-w-[660px]">
            <span className="section-eyebrow">Đặt chỗ của bạn</span>
            <h1 className="mt-3 text-[clamp(1.85rem,3.2vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-[var(--ink)] text-balance">
              Chuyến của tôi
            </h1>
          </div>

          <div className="mt-[clamp(26px,3.5vw,40px)] max-[640px]:mt-[22px]">
            <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-[18px] pt-1.5 pb-4 shadow-[var(--shadow-xs)] max-[640px]:px-3 max-[640px]:pt-0.5 max-[640px]:pb-3">
              <TripTabs counts={counts} />
              <TripFilters />
            </div>

            <p
              aria-atomic="true"
              className="mx-0.5 mt-3.5 mb-4 text-[13px] font-medium leading-[1.5] text-[var(--slate-500)] max-[640px]:mt-3 max-[640px]:mb-3.5"
              id="filterStatus"
              role="status"
            >
              {statusText}
            </p>

            <div id="tripsPanels">
              {TAB_IDS.map((panelTab) => (
                <div
                  aria-labelledby={`tab-${panelTab}`}
                  className="focus-visible:outline-none"
                  hidden={tab !== panelTab}
                  id={`panel-${panelTab}`}
                  key={panelTab}
                  role="tabpanel"
                  tabIndex={0}
                >
                  {tab === panelTab ? renderPanel(panelTab) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CancelModal />
    </>
  );
}
