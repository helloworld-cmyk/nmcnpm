"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { IconCalendar, IconChevronDown, IconChevronRight } from "@/components/icons";

export type DatePickerPrecision = "day" | "month" | "year";

type DatePickerProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  min?: string;
  max?: string;
  clearable?: boolean;
  precision?: DatePickerPrecision;
};

type PanelView = "days" | "months" | "years";

type CalendarDay = {
  iso: string;
  day: number;
  inMonth: boolean;
};

type ParsedValue = {
  year: number;
  month: number | null;
  day: number | null;
};

type PopoverPosition = {
  left: number;
  width: number;
  top?: number;
  bottom?: number;
  maxHeight: number;
};

const WEEKDAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const MONTH_NAMES = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];
const MONTH_SHORT = MONTH_NAMES.map((_, index) => `Th${index + 1}`);
const YEAR_RANGE = 12;

const DEFAULT_PLACEHOLDER: Record<DatePickerPrecision, string> = {
  day: "Chọn ngày",
  month: "Chọn tháng",
  year: "Chọn năm",
};

const DEFAULT_VIEW: Record<DatePickerPrecision, PanelView> = {
  day: "days",
  month: "months",
  year: "years",
};

const CONTROL_BASE =
  "h-12 w-full rounded-[12px] border bg-[#fafcfe] pl-10 pr-[13px] text-[14.5px] font-medium text-[var(--ink)] scheme-light transition-[border-color,box-shadow,background] duration-[var(--dur)] ease-[var(--ease)] hover:border-[var(--slate-300)] focus:border-[var(--sky-500)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.13)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 max-[900px]:text-base";

const CONTROL_INVALID =
  "border-[#fca5a5] bg-[#fff8f8] focus:shadow-[0_0_0_4px_rgba(220,38,38,0.12)]";

const PANEL_SHELL =
  "scroll-area fixed z-[120] overflow-y-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-md)] animate-[panelIn_0.18s_var(--ease)]";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function parseValue(value?: string | null): ParsedValue | null {
  if (!value) return null;

  let match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (match) {
    const year = Number(match[1]);
    const month = Number(match[2]) - 1;
    const day = Number(match[3]);
    const date = new Date(year, month, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return null;
    }
    return { year, month, day };
  }

  match = /^(\d{4})-(\d{2})$/.exec(value);
  if (match) {
    const month = Number(match[2]) - 1;
    if (month < 0 || month > 11) return null;
    return { year: Number(match[1]), month, day: null };
  }

  match = /^(\d{4})$/.exec(value);
  if (match) {
    return { year: Number(match[1]), month: null, day: null };
  }

  return null;
}

function toISO(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatDisplay(parsed: ParsedValue | null) {
  if (!parsed) return "";
  if (parsed.month !== null) {
    const base = `${pad(parsed.month + 1)}/${parsed.year}`;
    return parsed.day !== null ? `${pad(parsed.day)}/${base}` : base;
  }
  return String(parsed.year);
}

function truncateISO(iso: string | undefined, precision: DatePickerPrecision) {
  if (!iso) return undefined;
  const parsed = parseValue(iso);
  if (!parsed) return iso;
  if (precision === "year") return String(parsed.year);
  if (precision === "month") {
    return `${parsed.year}-${pad((parsed.month ?? 0) + 1)}`;
  }
  return iso;
}

function buildCalendar(year: number, month: number): CalendarDay[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + index,
    );
    return {
      iso: toISO(date),
      day: date.getDate(),
      inMonth: date.getMonth() === month,
    };
  });
}

function shiftDate(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function usePopoverPosition(
  open: boolean,
  anchorRef: { current: HTMLElement | null },
  minWidth = 0,
  maxPanelHeight = 300,
): PopoverPosition | null {
  const [position, setPosition] = useState<PopoverPosition | null>(null);

  useEffect(() => {
    if (!open) return;

    const update = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const margin = 12;
      const gap = 6;
      const availableWidth = Math.max(window.innerWidth - margin * 2, 0);
      const width = Math.min(Math.max(rect.width, minWidth), availableWidth);
      const below = window.innerHeight - rect.bottom - gap - margin;
      const above = rect.top - gap - margin;
      const preferBelow = below >= 240 || below >= above;
      const maxHeight = Math.max(
        120,
        Math.min(maxPanelHeight, preferBelow ? below : above),
      );
      const left = Math.min(
        Math.max(rect.left, margin),
        Math.max(window.innerWidth - width - margin, margin),
      );

      setPosition(
        preferBelow
          ? { left, width, top: rect.bottom + gap, maxHeight }
          : {
              left,
              width,
              bottom: window.innerHeight - rect.top + gap,
              maxHeight,
            },
      );
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, anchorRef, minWidth, maxPanelHeight]);

  return open ? position : null;
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker(
    {
      id,
      value,
      onChange,
      placeholder,
      disabled,
      invalid,
      className,
      min,
      max,
      clearable = true,
      precision = "day",
    },
    ref,
  ) {
    const generatedId = useId();
    const baseId = id ?? `date-${generatedId}`;
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const parsed = parseValue(value);
    const [panelView, setPanelView] = useState<PanelView>(
      DEFAULT_VIEW[precision],
    );
    const [view, setView] = useState(() => {
      const date = parsed
        ? new Date(parsed.year, parsed.month ?? 0, parsed.day ?? 1)
        : null;
      return date
        ? { year: date.getFullYear(), month: date.getMonth() }
        : { year: 2000, month: 0 };
    });
    const position = usePopoverPosition(open, triggerRef, 300, 380);

    useImperativeHandle(ref, () => triggerRef.current as HTMLButtonElement, []);

    useEffect(() => {
      if (!open) return;
      const onPointerDown = (event: PointerEvent) => {
        const target = event.target as Node;
        if (triggerRef.current?.contains(target)) return;
        if (panelRef.current?.contains(target)) return;
        setOpen(false);
      };
      document.addEventListener("pointerdown", onPointerDown);
      return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    const now = open ? new Date() : null;
    const todayISO = now ? toISO(now) : "";
    const days = buildCalendar(view.year, view.month);
    const minISO = truncateISO(min, precision);
    const maxISO = truncateISO(max, precision);

    const isDisabled = (iso: string) =>
      Boolean((minISO && iso < minISO) || (maxISO && iso > maxISO));

    const todayValue = !now
      ? ""
      : precision === "year"
        ? String(now.getFullYear())
        : precision === "month"
          ? `${now.getFullYear()}-${pad(now.getMonth() + 1)}`
          : todayISO;

    const close = () => {
      setOpen(false);
      triggerRef.current?.focus();
    };

    const openPicker = () => {
      const current = parseValue(value);
      const date = current
        ? new Date(current.year, current.month ?? 0, current.day ?? 1)
        : new Date();
      setView({ year: date.getFullYear(), month: date.getMonth() });
      setPanelView(DEFAULT_VIEW[precision]);
      setOpen(true);
    };

    const choose = (iso: string) => {
      if (isDisabled(iso)) return;
      onChange(iso);
      close();
    };

    const yearStart = Math.floor(view.year / YEAR_RANGE) * YEAR_RANGE;
    const years = Array.from(
      { length: YEAR_RANGE },
      (_, index) => yearStart + index,
    );

    const goPrev = () => {
      if (panelView === "days") {
        const date = new Date(view.year, view.month - 1, 1);
        setView({ year: date.getFullYear(), month: date.getMonth() });
      } else if (panelView === "months") {
        setView((current) => ({ ...current, year: current.year - 1 }));
      } else {
        setView((current) => ({ ...current, year: current.year - YEAR_RANGE }));
      }
    };

    const goNext = () => {
      if (panelView === "days") {
        const date = new Date(view.year, view.month + 1, 1);
        setView({ year: date.getFullYear(), month: date.getMonth() });
      } else if (panelView === "months") {
        setView((current) => ({ ...current, year: current.year + 1 }));
      } else {
        setView((current) => ({ ...current, year: current.year + YEAR_RANGE }));
      }
    };

    const selectMonth = (month: number) => {
      const iso = `${view.year}-${pad(month + 1)}`;
      if (isDisabled(iso)) return;
      if (precision === "month") {
        choose(iso);
        return;
      }
      setView((current) => ({ ...current, month }));
      setPanelView("days");
    };

    const selectYear = (year: number) => {
      const iso = String(year);
      if (isDisabled(iso)) return;
      if (precision === "year") {
        choose(iso);
        return;
      }
      setView((current) => ({ ...current, year }));
      setPanelView("months");
    };

    const focusDay = (date: Date) => {
      const iso = toISO(date);
      const inCurrentMonth =
        date.getFullYear() === view.year && date.getMonth() === view.month;

      if (!inCurrentMonth) {
        setView({ year: date.getFullYear(), month: date.getMonth() });
      }

      window.requestAnimationFrame(() => {
        document.getElementById(`${baseId}-day-${iso}`)?.focus();
      });
    };

    const handleGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (panelView !== "days") return;

      const active = document.activeElement as HTMLElement | null;
      const iso = active?.getAttribute("data-date");
      if (!iso) return;
      const date = parseValue(iso);
      if (!date || date.month === null || date.day === null) return;
      const current = new Date(date.year, date.month, date.day);

      let next: Date | null = null;

      if (event.key === "ArrowLeft") next = shiftDate(current, -1);
      if (event.key === "ArrowRight") next = shiftDate(current, 1);
      if (event.key === "ArrowUp") next = shiftDate(current, -7);
      if (event.key === "ArrowDown") next = shiftDate(current, 7);
      if (event.key === "Home") {
        next = shiftDate(current, -((current.getDay() + 6) % 7));
      }
      if (event.key === "End") {
        next = shiftDate(current, 6 - ((current.getDay() + 6) % 7));
      }
      if (event.key === "PageUp") {
        next = new Date(
          current.getFullYear(),
          current.getMonth() - 1,
          current.getDate(),
        );
      }
      if (event.key === "PageDown") {
        next = new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          current.getDate(),
        );
      }

      if (next) {
        event.preventDefault();
        focusDay(next);
      }
    };

    const title =
      panelView === "days"
        ? `${MONTH_NAMES[view.month]}, ${view.year}`
        : panelView === "months"
          ? String(view.year)
          : `${yearStart} – ${yearStart + YEAR_RANGE - 1}`;

    const navButtonClass =
      "grid h-9 w-9 place-items-center rounded-lg text-[var(--slate-500)] transition-colors hover:bg-[var(--sky-50)] hover:text-[var(--sky-700)]";

    return (
      <div className={cx("relative min-w-0", className)}>
        <button
          ref={triggerRef}
          type="button"
          id={id}
          disabled={disabled}
          role="combobox"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? `${baseId}-panel` : undefined}
          aria-invalid={invalid || undefined}
          onClick={() => (open ? setOpen(false) : openPicker())}
          onKeyDown={(event) => {
            if (event.key === "Escape" && open) {
              event.preventDefault();
              setOpen(false);
            }
            if (event.key === "ArrowDown") {
              event.preventDefault();
              openPicker();
            }
          }}
          className={cx(
            CONTROL_BASE,
            "flex items-center justify-between gap-2 border-[var(--border)] text-left",
            invalid && CONTROL_INVALID,
          )}
        >
          <IconCalendar className="pointer-events-none absolute left-[13px] top-1/2 size-[18px] -translate-y-1/2 text-[var(--sky-600)]" />

          <span
            className={cx(
              "truncate",
              parsed ? "text-[var(--ink)]" : "font-normal text-[var(--slate-400)]",
            )}
          >
            {parsed
              ? formatDisplay(parsed)
              : (placeholder ?? DEFAULT_PLACEHOLDER[precision])}
          </span>

          <IconChevronDown
            className={cx(
              "size-4 flex-none text-[var(--slate-400)] transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>

        {open && position
          ? createPortal(
              <div
                ref={panelRef}
                id={`${baseId}-panel`}
                role="dialog"
                aria-label={DEFAULT_PLACEHOLDER[precision]}
                onKeyDown={handleGridKeyDown}
                className={cx(PANEL_SHELL, "w-full p-3")}
                style={{
                  left: position.left,
                  width: position.width,
                  top: position.top,
                  bottom: position.bottom,
                  maxHeight: position.maxHeight,
                }}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    aria-label={
                      panelView === "days"
                        ? "Tháng trước"
                        : panelView === "months"
                          ? "Năm trước"
                          : "Khoảng năm trước"
                    }
                    onClick={goPrev}
                    className={navButtonClass}
                  >
                    <IconChevronRight className="size-4 rotate-180" />
                  </button>

                  {panelView === "years" ? (
                    <span className="text-[14px] font-bold text-[var(--ink)]">
                      {title}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setPanelView(panelView === "days" ? "months" : "years")
                      }
                      className="rounded-lg px-2 py-1 text-[14px] font-bold text-[var(--ink)] transition-colors hover:bg-[var(--sky-50)] hover:text-[var(--sky-700)]"
                    >
                      {title}
                    </button>
                  )}

                  <button
                    type="button"
                    aria-label={
                      panelView === "days"
                        ? "Tháng sau"
                        : panelView === "months"
                          ? "Năm sau"
                          : "Khoảng năm sau"
                    }
                    onClick={goNext}
                    className={navButtonClass}
                  >
                    <IconChevronRight className="size-4" />
                  </button>
                </div>

                {panelView === "days" ? (
                  <div className="grid grid-cols-7 gap-0.5">
                    {WEEKDAYS.map((weekday) => (
                      <span
                        key={weekday}
                        className="py-1 text-center text-[10.5px] font-bold uppercase tracking-wide text-[var(--slate-400)]"
                      >
                        {weekday}
                      </span>
                    ))}

                    {days.map((day) => {
                      const dayDisabled = isDisabled(day.iso);
                      const isSelected = day.iso === value;
                      const isToday = day.iso === todayISO;

                      return (
                        <button
                          key={day.iso}
                          type="button"
                          id={`${baseId}-day-${day.iso}`}
                          data-date={day.iso}
                          disabled={dayDisabled}
                          aria-pressed={isSelected}
                          aria-current={isToday ? "date" : undefined}
                          autoFocus={isSelected || (!value && isToday)}
                          onClick={() => choose(day.iso)}
                          className={cx(
                            "grid h-9 w-full place-items-center rounded-lg text-[13px] font-semibold transition-colors",
                            day.inMonth
                              ? "text-[var(--ink)]"
                              : "text-[var(--slate-300)]",
                            !dayDisabled &&
                              !isSelected &&
                              "hover:bg-[var(--sky-50)] hover:text-[var(--sky-700)]",
                            isToday &&
                              !isSelected &&
                              "ring-1 ring-[var(--sky-300)]",
                            isSelected &&
                              "bg-[var(--sky-700)] text-white hover:bg-[var(--sky-800)] hover:text-white",
                            dayDisabled &&
                              "cursor-not-allowed text-[var(--slate-300)] opacity-50",
                          )}
                        >
                          {day.day}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {panelView === "months" ? (
                  <div className="grid grid-cols-3 gap-1">
                    {MONTH_SHORT.map((label, index) => {
                      const iso = `${view.year}-${pad(index + 1)}`;
                      const monthDisabled = isDisabled(iso);
                      const isSelected =
                        parsed?.year === view.year && parsed?.month === index;
                      const isCurrent = now
                        ? view.year === now.getFullYear() &&
                          index === now.getMonth()
                        : false;

                      return (
                        <button
                          key={label}
                          type="button"
                          disabled={monthDisabled}
                          aria-pressed={isSelected}
                          aria-label={`${MONTH_NAMES[index]} năm ${view.year}`}
                          onClick={() => selectMonth(index)}
                          className={cx(
                            "grid h-9 w-full place-items-center rounded-lg text-[13px] font-semibold text-[var(--ink)] transition-colors",
                            !monthDisabled &&
                              !isSelected &&
                              "hover:bg-[var(--sky-50)] hover:text-[var(--sky-700)]",
                            isCurrent &&
                              !isSelected &&
                              "ring-1 ring-[var(--sky-300)]",
                            isSelected &&
                              "bg-[var(--sky-700)] text-white hover:bg-[var(--sky-800)] hover:text-white",
                            monthDisabled &&
                              "cursor-not-allowed text-[var(--slate-300)] opacity-50",
                          )}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {panelView === "years" ? (
                  <div className="grid grid-cols-3 gap-1">
                    {years.map((year) => {
                      const iso = String(year);
                      const yearDisabled = isDisabled(iso);
                      const isSelected = parsed?.year === year;
                      const isCurrent = now ? year === now.getFullYear() : false;

                      return (
                        <button
                          key={year}
                          type="button"
                          disabled={yearDisabled}
                          aria-pressed={isSelected}
                          aria-label={`Năm ${year}`}
                          onClick={() => selectYear(year)}
                          className={cx(
                            "grid h-9 w-full place-items-center rounded-lg text-[13px] font-semibold text-[var(--ink)] transition-colors",
                            !yearDisabled &&
                              !isSelected &&
                              "hover:bg-[var(--sky-50)] hover:text-[var(--sky-700)]",
                            isCurrent &&
                              !isSelected &&
                              "ring-1 ring-[var(--sky-300)]",
                            isSelected &&
                              "bg-[var(--sky-700)] text-white hover:bg-[var(--sky-800)] hover:text-white",
                            yearDisabled &&
                              "cursor-not-allowed text-[var(--slate-300)] opacity-50",
                          )}
                        >
                          {year}
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                <div className="mt-2 flex items-center justify-between gap-2 border-t border-[var(--border-soft)] pt-2">
                  <button
                    type="button"
                    onClick={() => choose(todayValue)}
                    className="rounded-lg px-2.5 py-1.5 text-[12.5px] font-bold text-[var(--sky-700)] transition-colors hover:bg-[var(--sky-50)]"
                  >
                    Hôm nay
                  </button>

                  {clearable ? (
                    <button
                      type="button"
                      onClick={() => {
                        onChange("");
                        close();
                      }}
                      className="rounded-lg px-2.5 py-1.5 text-[12.5px] font-semibold text-[var(--slate-500)] transition-colors hover:bg-[var(--bg)] hover:text-[var(--ink)]"
                    >
                      Xóa
                    </button>
                  ) : null}
                </div>
              </div>,
              document.body,
            )
          : null}
      </div>
    );
  },
);
