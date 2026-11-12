"use client";

import { useSearchFiltersStore, MAX_TIME } from "@/global-states/search-filters-store";
import { formatTimeRange } from "../_utils/format";

const RANGE_INPUT =
  "pointer-events-none absolute inset-0 m-0 h-full w-full appearance-none bg-transparent outline-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-[var(--sky-700)] [&::-moz-range-thumb]:bg-[var(--surface)] [&::-moz-range-thumb]:shadow-xs [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:size-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-[var(--sky-700)] [&::-webkit-slider-thumb]:bg-[var(--surface)] [&::-webkit-slider-thumb]:shadow-xs [&::-webkit-slider-thumb]:cursor-grab focus-visible:[&::-moz-range-thumb]:border-[var(--sky-500)] focus-visible:[&::-moz-range-thumb]:shadow-[0_0_0_4px_rgba(14,165,233,0.13)] focus-visible:[&::-webkit-slider-thumb]:border-[var(--sky-500)] focus-visible:[&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(14,165,233,0.13)]";

export function DualRange() {
  const timeFrom = useSearchFiltersStore((state) => state.timeFrom);
  const timeTo = useSearchFiltersStore((state) => state.timeTo);
  const setTimeFrom = useSearchFiltersStore((state) => state.setTimeFrom);
  const setTimeTo = useSearchFiltersStore((state) => state.setTimeTo);

  return (
    <div className="flex flex-1 basis-[300px] flex-col gap-1.5 min-w-[260px] max-[900px]:basis-full">
      <div className="flex min-h-[14px] items-center justify-between gap-2.5">
        <span className="text-[11px] font-bold tracking-[0.09em] text-[var(--slate-500)] uppercase">
          Giờ đi
        </span>
        <output className="font-heading text-[12.5px] font-bold tracking-[-0.01em] text-[var(--sky-800)] tabular-nums">
          {formatTimeRange(timeFrom, timeTo)}
        </output>
      </div>

      <div className="relative h-11">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[var(--slate-200)]"
        >
          <span
            className="absolute inset-y-0 rounded-[inherit] bg-[var(--sky-500)]"
            style={{
              left: `${(timeFrom / MAX_TIME) * 100}%`,
              width: `${((timeTo - timeFrom) / MAX_TIME) * 100}%`,
            }}
          />
        </span>
        <input
          className={RANGE_INPUT}
          type="range"
          min={0}
          max={MAX_TIME}
          step={30}
          value={timeFrom}
          aria-label="Giờ đi từ"
          onChange={(event) => setTimeFrom(Number(event.target.value))}
        />
        <input
          className={RANGE_INPUT}
          type="range"
          min={0}
          max={MAX_TIME}
          step={30}
          value={timeTo}
          aria-label="Giờ đi đến"
          onChange={(event) => setTimeTo(Number(event.target.value))}
        />
      </div>
    </div>
  );
}
