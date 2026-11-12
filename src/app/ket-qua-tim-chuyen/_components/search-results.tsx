"use client";

import { useMemo, useRef, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { useAreas } from "@/api/area/tanstack/use-areas";
import { useSearchTrips } from "@/api/trip/tanstack/use-search-trips";
import {
  PER_PAGE,
  filterRides,
  sortRides,
  useSearchFiltersStore,
} from "@/global-states/search-filters-store";
import { toRide } from "../_utils/to-ride";
import { ResultsFilterBar } from "./results-filter-bar";
import { RideCard } from "./ride-card";
import { RideSkeletons } from "./ride-skeletons";
import { SearchSummary } from "./search-summary";
import { EmptyState, ErrorState, NoAreaState } from "./state-panels";

/* Ngày mai theo giờ local, định dạng yyyy-MM-dd (dự phòng khi URL thiếu ngày) */
function tomorrowISO(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/* So khớp đúng tên địa điểm đã nhập với danh mục areas (không phân biệt hoa thường) */
function findArea(
  areas: { id: string; name: string }[] | undefined,
  name: string,
) {
  if (!areas?.length || !name) return undefined;
  const target = name.toLowerCase();
  return areas.find((area) => area.name.trim().toLowerCase() === target);
}

export function SearchResults() {
  const searchParams = useSearchParams();
  const from = (searchParams.get("from") || "").trim();
  const to = (searchParams.get("to") || "").trim();
  const dateParam = searchParams.get("date") || "";
  const departureDate = /^\d{4}-\d{2}-\d{2}$/.test(dateParam)
    ? dateParam
    : tomorrowISO();

  const sort = useSearchFiltersStore((state) => state.sort);
  const timeFrom = useSearchFiltersStore((state) => state.timeFrom);
  const timeTo = useSearchFiltersStore((state) => state.timeTo);
  const page = useSearchFiltersStore((state) => state.page);
  const goToPage = useSearchFiltersStore((state) => state.goToPage);
  const resetFilters = useSearchFiltersStore((state) => state.resetFilters);

  const regionRef = useRef<HTMLElement>(null);

  /* Đổi tên điểm đi/đến trên URL thành area id qua danh mục địa điểm */
  const areasQuery = useAreas();
  const areas = areasQuery.data;
  const originArea = useMemo(() => findArea(areas, from), [areas, from]);
  const destinationArea = useMemo(() => findArea(areas, to), [areas, to]);
  const areaMissing =
    areas !== undefined && (!originArea || !destinationArea);
  const areaError = areasQuery.isError;

  const tripsQuery = useSearchTrips(
    {
      originAreaId: originArea?.id ?? "",
      destinationAreaId: destinationArea?.id ?? "",
      departureDate,
    },
    { enabled: Boolean(originArea && destinationArea) },
  );

  const rides = useMemo(
    () => (tripsQuery.data ?? []).map(toRide),
    [tripsQuery.data],
  );

  const filtered = useMemo(
    () => sortRides(filterRides(rides, { timeFrom, timeTo }), sort),
    [rides, sort, timeFrom, timeTo],
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const pageItems = filtered.slice(
    (safePage - 1) * PER_PAGE,
    safePage * PER_PAGE,
  );

  const statusText = useMemo(() => {
    if (areaError) return "Không tải được danh mục địa điểm.";
    if (areaMissing) return "Chưa nhận diện được địa điểm bạn nhập.";
    if (areasQuery.isPending || tripsQuery.isPending)
      return "Đang tải chuyến phù hợp…";
    if (tripsQuery.isError) return "Không tải được danh sách chuyến.";
    if (!filtered.length)
      return rides.length
        ? "Không còn chuyến nào khớp bộ lọc hiện tại."
        : "Không có chuyến nào khớp tìm kiếm.";

    const base =
      filtered.length === rides.length
        ? `Tìm thấy ${rides.length} chuyến khớp tìm kiếm`
        : `Khớp ${filtered.length}/${rides.length} chuyến theo bộ lọc`;
    return pages > 1 ? `${base} · Trang ${safePage}/${pages}` : base;
  }, [
    areaError,
    areaMissing,
    areasQuery.isPending,
    tripsQuery.isPending,
    tripsQuery.isError,
    filtered.length,
    rides.length,
    pages,
    safePage,
  ]);

  const scrollToRegion = () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    regionRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const handlePageClick = (target: number) => {
    goToPage(target);
    scrollToRegion();
  };

  const handleEmptyReset = () => {
    resetFilters();
    scrollToRegion();
  };

  const showList =
    !areaMissing &&
    !areaError &&
    tripsQuery.isSuccess &&
    filtered.length > 0;

  return (
    <>
      <SearchSummary />

      <section className="pt-[clamp(28px,3.5vw,44px)] pb-[clamp(56px,7vw,88px)]" id="ket-qua">
        <div className="container">
          <div className="mb-[clamp(20px,3vw,36px)] max-w-[660px]">
            <span className="section-eyebrow">Kết quả tìm kiếm</span>
            <h1 className="mt-2.5 text-[clamp(1.85rem,3.2vw,2.65rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-[var(--ink)] text-balance">
              Chuyến đi phù hợp với bạn
            </h1>
          </div>
        </div>

        <div className="container">
          <ResultsFilterBar />
        </div>

        <div className="container">
          <section
            className="scroll-mt-[calc(var(--header-h)+70px)]"
            aria-busy={tripsQuery.isPending}
            aria-labelledby="rideListTitle"
            id="danh-sach-chuyen"
            ref={regionRef}
          >
            <h2 className="sr-only" id="rideListTitle">
              Danh sách chuyến phù hợp
            </h2>

            <p
              className="mt-[18px] mb-3.5 text-[13px] font-semibold text-[var(--slate-500)] max-[640px]:mt-4"
              role="status"
              aria-live="polite"
            >
              {statusText}
            </p>

            {areaError ? (
              <ErrorState onRetry={() => areasQuery.refetch()} />
            ) : null}

            {areaMissing ? <NoAreaState /> : null}

            {!areaError && !areaMissing && (areasQuery.isPending || tripsQuery.isPending) ? (
              <>
                <div className="flex items-center justify-center gap-2.5 pt-3.5 pb-1 text-[13.5px] font-semibold text-[var(--slate-500)]">
                  <span
                    aria-hidden="true"
                    className="size-[18px] animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-[var(--sky-100)] border-t-[var(--sky-700)]"
                  />
                  <span>Đang tìm chuyến phù hợp…</span>
                </div>
                <RideSkeletons />
              </>
            ) : null}

            {!areaError && !areaMissing && tripsQuery.isError ? (
              <ErrorState onRetry={() => tripsQuery.refetch()} />
            ) : null}

            {!areaError &&
            !areaMissing &&
            tripsQuery.isSuccess &&
            !filtered.length ? (
              <EmptyState onReset={handleEmptyReset} />
            ) : null}

            {showList ? (
              <div className="grid grid-cols-2 gap-3.5 max-[640px]:grid-cols-1" id="rideList">
                {pageItems.map((ride) => (
                  <RideCard key={ride.id} ride={ride} />
                ))}
              </div>
            ) : null}

            {showList && pages > 1 ? (
              <nav
                className="mt-[22px] flex flex-wrap items-center justify-center gap-2"
                aria-label="Phân trang danh sách chuyến"
              >
                <PageButton
                  disabled={safePage === 1}
                  onClick={() => handlePageClick(safePage - 1)}
                >
                  Trước
                </PageButton>
                {Array.from({ length: pages }, (_, index) => {
                  const target = index + 1;
                  return (
                    <PageButton
                      current={target === safePage}
                      key={target}
                      aria-current={target === safePage ? "page" : undefined}
                      onClick={() => handlePageClick(target)}
                    >
                      {target}
                    </PageButton>
                  );
                })}
                <PageButton
                  disabled={safePage === pages}
                  onClick={() => handlePageClick(safePage + 1)}
                >
                  Sau
                </PageButton>
              </nav>
            ) : null}
          </section>
        </div>
      </section>
    </>
  );
}

type PageButtonProps = {
  children: ReactNode;
  current?: boolean;
  disabled?: boolean;
  onClick: () => void;
  "aria-current"?: "page" | undefined;
};

function PageButton({
  children,
  current = false,
  disabled = false,
  onClick,
  ...rest
}: PageButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 font-body text-sm font-semibold transition-[background,border-color,color] duration-[var(--dur)] ease-[var(--ease)] ${
        current
          ? "border-[var(--sky-700)] bg-[var(--sky-700)] text-white"
          : `border-line bg-white text-[var(--slate-600)] ${
              disabled
                ? "cursor-default opacity-45"
                : "hover:border-[var(--sky-300)] hover:bg-[var(--sky-50)] hover:text-[var(--sky-800)]"
            }`
      }`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
