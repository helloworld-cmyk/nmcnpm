"use client";

import { useMemo } from "react";
import { IconMap } from "@/components/icons";
import {
  selectTripsFiltering,
  useTripsStore,
} from "@/global-states/trips-store";

const FILTER_LABEL =
  "mb-1.5 ml-0.5 block text-[11px] font-bold tracking-[0.09em] text-[var(--slate-500)] uppercase";

const FILTER_INPUT =
  "h-12 w-full rounded-[12px] border border-[var(--border)] bg-[#fafcfe] py-0 pr-[13px] pl-10 text-base font-medium text-[var(--ink)] scheme-light transition-[border-color,box-shadow,background] duration-[var(--dur)] ease-[var(--ease)] placeholder:font-normal placeholder:text-[var(--slate-400)] hover:border-[var(--slate-300)] focus:border-[var(--sky-500)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.13)] focus:outline-none";

const FILTER_SELECT = `${FILTER_INPUT} cursor-pointer appearance-none pr-9`;

const SELECT_CHEVRON =
  "after:pointer-events-none after:absolute after:top-1/2 after:right-4 after:size-2 after:-translate-y-[70%] after:rotate-45 after:border-r-2 after:border-b-2 after:border-[var(--slate-500)] after:content-['']";

const FIELD_ICON =
  "pointer-events-none absolute top-1/2 left-[13px] size-[18px] -translate-y-1/2 text-[var(--sky-600)]";

export function TripFilters() {
  const trips = useTripsStore((state) => state.trips);
  const search = useTripsStore((state) => state.search);
  const routeFilter = useTripsStore((state) => state.routeFilter);
  const filtering = useTripsStore(selectTripsFiltering);
  const setSearch = useTripsStore((state) => state.setSearch);
  const setRouteFilter = useTripsStore((state) => state.setRouteFilter);
  const resetFilters = useTripsStore((state) => state.resetFilters);

  /* Tuyến gợi ý lấy từ chính các chuyến đã đặt */
  const routeOptions = useMemo(() => {
    const names = new Set<string>();
    for (const trip of trips) if (trip.route) names.add(trip.route);
    return [...names].sort((a, b) => a.localeCompare(b, "vi"));
  }, [trips]);

  return (
    <div className="mt-2.5 flex items-end gap-3 border-t border-[var(--border-soft)] pt-3.5 max-[640px]:flex-wrap">
      <div className="min-w-0 flex-[1_1_240px] max-[640px]:flex-[1_1_100%]">
        <label className={FILTER_LABEL} htmlFor="tripSearch">
          Tìm chuyến
        </label>
        <div className="relative">
          <IconMap className={FIELD_ICON} />
          <input
            autoComplete="off"
            className={FILTER_INPUT}
            id="tripSearch"
            name="tripSearch"
            placeholder="Mã đặt chỗ, tuyến hoặc tài xế"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="min-w-0 flex-[0_1_210px] max-[640px]:min-w-[130px] max-[640px]:flex-[1_1_150px]">
        <label className={FILTER_LABEL} htmlFor="tripRoute">
          Tuyến
        </label>
        <div className={`relative block ${SELECT_CHEVRON}`}>
          <select
            className={FILTER_SELECT}
            id="tripRoute"
            name="tripRoute"
            value={routeFilter}
            onChange={(event) => setRouteFilter(event.target.value)}
          >
            <option value="all">Tất cả tuyến</option>
            {routeOptions.map((route) => (
              <option key={route} value={route}>
                {route}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtering ? (
        <button
          className="btn btn-ghost btn-sm mb-[3px] shrink-0"
          id="filterClear"
          type="button"
          onClick={resetFilters}
        >
          Xóa lọc
        </button>
      ) : null}
    </div>
  );
}
