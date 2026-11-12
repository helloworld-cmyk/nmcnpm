"use client";

import {
  useSearchFiltersStore,
  type SortMode,
} from "@/global-states/search-filters-store";
import { DualRange } from "./dual-range";

const FILTER_LABEL =
  "text-[11px] font-bold tracking-[0.09em] text-[var(--slate-500)] uppercase";

const FILTER_ITEM = "flex min-w-0 flex-col gap-1.5";

const SELECT_CONTROL =
  "h-11 w-full cursor-pointer appearance-none rounded-[12px] border border-[var(--border)] bg-[#fafcfe] py-0 pr-[34px] pl-[13px] text-base font-medium text-[var(--ink)] transition-[border-color,box-shadow,background] duration-[var(--dur)] ease-[var(--ease)] hover:border-[var(--slate-300)] focus:border-[var(--sky-500)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.13)] focus:outline-none";

export function ResultsFilterBar() {
  const sort = useSearchFiltersStore((state) => state.sort);
  const setSort = useSearchFiltersStore((state) => state.setSort);
  const resetFilters = useSearchFiltersStore((state) => state.resetFilters);

  return (
    <div
      className="flex flex-wrap items-start gap-x-5 gap-y-3 rounded-[var(--radius-lg)] border border-line bg-white p-[14px_16px_16px] shadow-xs max-[640px]:rounded-[var(--radius-md)] max-[640px]:p-3"
      role="group"
      aria-label="Sắp xếp và lọc chuyến đi"
    >
      <div className={`${FILTER_ITEM} w-[205px] flex-none max-[640px]:w-auto max-[640px]:flex-[1_1_130px]`}>
        <label className={FILTER_LABEL} htmlFor="sortSelect">
          Sắp xếp
        </label>
        <div className="relative">
          <select
            className={SELECT_CONTROL}
            id="sortSelect"
            name="sortSelect"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortMode)}
          >
            <option value="gio">Giờ đi sớm nhất</option>
            <option value="gia">Giá thấp nhất</option>
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-4 size-2 -translate-y-[70%] rotate-45 border-r-2 border-b-2 border-[var(--slate-500)]"
          />
        </div>
      </div>

      <DualRange />

      <button
        type="button"
        className="btn btn-ghost btn-sm ml-auto self-end max-[640px]:w-full max-[640px]:flex-[1_1_100%] max-[640px]:justify-center"
        onClick={resetFilters}
      >
        Xóa lọc
      </button>
    </div>
  );
}
