"use client";

import type { ReactNode } from "react";
import { useSearchResults } from "../_hooks/use-search-results";
import { useScrollToRegion } from "../_hooks/use-scroll-to-region";
import { ResultsFilterBar } from "./results-filter-bar";
import { RideCard } from "./ride-card";
import { RideSkeletons } from "./ride-skeletons";
import { SearchSummary } from "./search-summary";
import { EmptyState, ErrorState, NoAreaState } from "./state-panels";

export function SearchResults() {
  const {
    statusText,
    pageItems,
    pages,
    safePage,
    showList,
    areaError,
    areaMissing,
    isPending,
    isTripsPending,
    isTripsError,
    isTripsSuccess,
    goToPage,
    resetFilters,
    retryAreas,
    retryTrips,
  } = useSearchResults();
  const { regionRef, scrollToRegion } = useScrollToRegion();

  const handlePageClick = (target: number) => {
    goToPage(target);
    scrollToRegion();
  };

  const handleEmptyReset = () => {
    resetFilters();
    scrollToRegion();
  };

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
            aria-busy={isTripsPending}
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

            {areaError ? <ErrorState onRetry={retryAreas} /> : null}

            {areaMissing ? <NoAreaState /> : null}

            {!areaError && !areaMissing && isPending ? (
              <>
                <div className="flex items-center justify-center gap-2.5 pt-3.5 pb-1 text-[13.5px] font-semibold text-[var(--slate-500)]">
                  <span
                    aria-hidden="true"
                    className="size-[18px] animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-[var(--sky-100)] border-t-[var(--sky-700)]"
                  />
                  <span>Đang tìm chuyến phù hợp...</span>
                </div>
                <RideSkeletons />
              </>
            ) : null}

            {!areaError && !areaMissing && isTripsError ? (
              <ErrorState onRetry={retryTrips} />
            ) : null}

            {!areaError &&
            !areaMissing &&
            isTripsSuccess &&
            !pageItems.length ? (
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
