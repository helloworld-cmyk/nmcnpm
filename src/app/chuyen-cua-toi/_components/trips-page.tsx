"use client";

import { CancelModal } from "./cancel-modal";
import { FilterEmptyState } from "./filter-empty-state";
import { SkeletonCard } from "./skeleton-card";
import { TabEmptyState } from "./tab-empty-state";
import { TripCard } from "./trip-card";
import { TripFilters } from "./trip-filters";
import { TripTabs } from "./trip-tabs";
import { TripsErrorState } from "./trips-error-state";
import { TripsLoadingState } from "./trips-loading-state";
import { TAB_IDS, useTripsView } from "../_hooks/use-trips-view";
import { useTripsLoader } from "../_hooks/use-trips-loader";
import type { Trip } from "../_data/trips";
import type { TripTab } from "@/global-states/trips-store";

const TRIP_LIST = "grid grid-cols-2 items-stretch gap-3.5 max-[640px]:grid-cols-1";

export function TripsPage() {
  const {
    tab,
    status,
    filtering,
    counts,
    matched,
    visible,
    statusText,
    setTab,
    resetFilters,
  } = useTripsView();
  const { sentinelRef, loadingMore, reload } = useTripsLoader();

  const renderList = (list: Trip[]) => (
    <div className={TRIP_LIST}>
      {list.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );

  const renderPanel = (panelTab: TripTab) => {
    if (status === "loading") return <TripsLoadingState />;
    if (status === "error") return <TripsErrorState onRetry={reload} />;

    if (panelTab === "dang-di") {
      return filtering && !matched[panelTab].length ? (
        <FilterEmptyState onClear={resetFilters} />
      ) : (
        <TabEmptyState
          actionLabel="Xem chuyến sắp tới"
          desc="Khi xe chạy, bạn sẽ thấy chuyến đang di chuyển và giờ đến dự kiến tại đây."
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
