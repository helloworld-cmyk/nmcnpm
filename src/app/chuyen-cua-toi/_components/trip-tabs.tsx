"use client";

import { useRef } from "react";
import { useTripsStore, type TripTab } from "@/global-states/trips-store";

type TabConfig = {
  id: TripTab;
  label: string;
  panelId: string;
};

const TABS: TabConfig[] = [
  { id: "sap-toi", label: "Sắp tới", panelId: "panel-sap-toi" },
  { id: "dang-di", label: "Đang đi", panelId: "panel-dang-di" },
  { id: "hoan-thanh", label: "Đã hoàn thành", panelId: "panel-hoan-thanh" },
  { id: "da-huy", label: "Đã hủy", panelId: "panel-da-huy" },
];

const TAB =
  "inline-flex min-h-12 items-center gap-2 whitespace-nowrap border-b-2 px-3.5 text-sm font-semibold transition-[color,border-color] duration-[var(--dur)] ease-[var(--ease)] max-[400px]:px-2.5 max-[400px]:text-[13.5px]";

const TAB_ACTIVE =
  "border-[var(--sky-500)] font-bold text-[var(--sky-700)]";

const TAB_INACTIVE = "border-transparent text-[var(--slate-500)] hover:text-[var(--sky-700)]";

const TAB_COUNT =
  "grid h-[22px] min-w-[22px] place-items-center rounded-full px-1.5 font-heading text-[11.5px] font-bold transition-[background,color] duration-[var(--dur)] ease-[var(--ease)]";

const TAB_COUNT_ACTIVE = "bg-[var(--sky-100)] text-[var(--sky-800)]";

const TAB_COUNT_INACTIVE = "bg-[var(--border-soft)] text-[var(--slate-600)]";

export function TripTabs({ counts }: { counts: Record<TripTab, number> }) {
  const tab = useTripsStore((state) => state.tab);
  const setTab = useTripsStore((state) => state.setTab);
  const tabRefs = useRef<Partial<Record<TripTab, HTMLButtonElement | null>>>(
    {},
  );

  const activate = (next: TripTab, focus: boolean) => {
    setTab(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const last = TABS.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    activate(TABS[next].id, true);
  };

  return (
    <div
      aria-label="Trạng thái chuyến"
      className="flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
    >
      {TABS.map((item, index) => {
        const active = tab === item.id;
        return (
          <button
            aria-controls={item.panelId}
            aria-selected={active}
            className={`${TAB} ${active ? TAB_ACTIVE : TAB_INACTIVE}`}
            id={`tab-${item.id}`}
            key={item.id}
            ref={(el) => {
              tabRefs.current[item.id] = el;
            }}
            role="tab"
            tabIndex={active ? 0 : -1}
            type="button"
            onClick={() => activate(item.id, false)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {item.label}
            <span
              className={`${TAB_COUNT} ${active ? TAB_COUNT_ACTIVE : TAB_COUNT_INACTIVE}`}
            >
              {counts[item.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
