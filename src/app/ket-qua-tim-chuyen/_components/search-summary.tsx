"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IconCalendar, IconRoute } from "@/components/icons";
import { formatDateLabel } from "../_utils/format";

const META_ITEM =
  "inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--slate-500)] max-[400px]:text-xs";

const META_ICON = "size-3.5 shrink-0 text-[var(--sky-600)]";

export function SearchSummary() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "Hà Nội";
  const to = searchParams.get("to") || "Ninh Bình";
  const date = formatDateLabel(searchParams.get("date"));

  return (
    <section
      className="sticky top-[var(--header-h)] z-40 border-b border-line-soft bg-white/92 backdrop-blur-[10px]"
      aria-label="Tìm kiếm của bạn"
      id="tim-kiem"
    >
      <div className="container flex flex-wrap items-center justify-between gap-x-[18px] gap-y-2 py-2.5 max-[640px]:py-2">
        <div className="flex min-w-0 flex-wrap items-center gap-x-[18px] gap-y-1 max-[400px]:gap-x-3 max-[400px]:gap-y-0.5">
          <span className="inline-flex items-center gap-2 font-heading text-base font-bold text-[var(--ink)] max-[640px]:text-[15px]">
            <IconRoute className="size-[18px] shrink-0 text-[var(--sky-600)]" />
            {from} → {to}
          </span>
          <span className="inline-flex flex-wrap items-center gap-x-3.5 gap-y-1">
            {date ? (
              <span className={META_ITEM}>
                <IconCalendar className={META_ICON} />
                {date}
              </span>
            ) : null}
          </span>
        </div>

        <Link className="btn btn-ghost btn-sm" href="/#dat-xe">
          Sửa tìm kiếm
        </Link>
      </div>
    </section>
  );
}
