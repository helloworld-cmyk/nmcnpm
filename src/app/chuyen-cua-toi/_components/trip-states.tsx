"use client";

import { IconClose, IconRefresh, IconRoute } from "@/components/icons";

const EMPTY_PANEL =
  "rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface)] p-[clamp(36px,5vw,56px)_24px] text-center max-[640px]:p-[30px_18px]";

const EMPTY_ICON =
  "mx-auto grid size-14 place-items-center rounded-[var(--radius-md)]";

const EMPTY_ICON_SKY =
  "bg-[var(--sky-50)] text-[var(--sky-700)] shadow-[inset_0_0_0_1px_var(--sky-100)]";

const EMPTY_ICON_RED =
  "bg-[var(--red-50)] text-[var(--red-600)] shadow-[inset_0_0_0_1px_#fecaca]";

const EMPTY_TITLE =
  "mx-auto mt-4 max-w-[420px] font-heading text-lg font-bold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]";

const EMPTY_DESC =
  "mx-auto mt-2.5 max-w-[460px] text-[14.5px] leading-[1.65] text-[var(--slate-500)]";

const EMPTY_ACTIONS = "mt-5 flex flex-wrap justify-center gap-3 max-[640px]:[&>.btn]:flex-[1_1_100%]";

const SK = "rounded-full bg-[var(--border-soft)]";

export function FilterEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className={`${EMPTY_PANEL} mt-[18px]`} id="empty-filter">
      <span className={`${EMPTY_ICON} ${EMPTY_ICON_SKY}`}>
        <IconRoute className="size-[26px]" />
      </span>
      <h3 className={EMPTY_TITLE}>Không tìm thấy chuyến phù hợp</h3>
      <p className={EMPTY_DESC}>
        Thử từ khóa khác hoặc xóa bộ lọc để xem lại tất cả chuyến trong mục
        này.
      </p>
      <div className={EMPTY_ACTIONS}>
        <button className="btn btn-ghost" type="button" onClick={onClear}>
          Xóa lọc
        </button>
      </div>
    </div>
  );
}

export function TabEmptyState({
  title,
  desc,
  actionLabel,
  onAction,
}: {
  title: string;
  desc: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className={EMPTY_PANEL}>
      <span className={`${EMPTY_ICON} ${EMPTY_ICON_SKY}`}>
        <IconRoute className="size-[26px]" />
      </span>
      <h3 className={EMPTY_TITLE}>{title}</h3>
      <p className={EMPTY_DESC}>{desc}</p>
      {actionLabel && onAction ? (
        <div className={EMPTY_ACTIONS}>
          <button className="btn btn-ghost" type="button" onClick={onAction}>
            {actionLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function TripsErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={EMPTY_PANEL} id="tripsError">
      <span className={`${EMPTY_ICON} ${EMPTY_ICON_RED}`}>
        <IconClose className="size-[26px]" />
      </span>
      <h3 className={EMPTY_TITLE}>Không tải được chuyến của bạn</h3>
      <p className={EMPTY_DESC}>
        Kiểm tra kết nối mạng rồi thử lại nhé. Vẫn không được thì quay lại sau
        ít phút.
      </p>
      <div className={EMPTY_ACTIONS}>
        <button className="btn btn-primary" type="button" onClick={onRetry}>
          <IconRefresh />
          Thử lại
        </button>
      </div>
    </div>
  );
}

export function TripsLoadingState() {
  return (
    <div id="tripsLoading">
      <p className="mb-4 flex items-center justify-center gap-2.5 text-[13px] font-medium text-[var(--slate-500)]">
        <IconRefresh className="size-4 shrink-0 animate-[spin_0.9s_linear_infinite] text-[var(--sky-600)]" />
        Đang tải chuyến của bạn…
      </p>
      <SkeletonCard />
      <div className="mt-[18px]">
        <SkeletonCard />
      </div>
    </div>
  );
}

/* Skeleton hiện khi tải thêm chuyến đã hoàn thành theo cuộn */
export function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="grid gap-3.5 rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--surface)] p-[22px] max-[640px]:p-[18px_16px]"
    >
      <div className={`${SK} h-2.5 w-[42%]`} />
      <div className={`${SK} h-4 w-[68%] bg-[var(--navy-50)]`} />
      <div className={`${SK} h-4 w-[46%] bg-[var(--navy-50)]`} />
      <div className="flex items-center gap-3.5 border-t border-dashed border-[var(--border-soft)] pt-3.5">
        <span className="size-11 shrink-0 rounded-full bg-[var(--navy-50)]" />
        <div className="grid flex-1 gap-2">
          <div className={`${SK} h-[11px] w-[52%]`} />
          <div className={`${SK} h-[11px] w-[46%]`} />
        </div>
      </div>
    </div>
  );
}
