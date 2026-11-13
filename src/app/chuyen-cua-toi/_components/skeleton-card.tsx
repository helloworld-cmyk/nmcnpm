const SK = "rounded-full bg-[var(--border-soft)]";

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
