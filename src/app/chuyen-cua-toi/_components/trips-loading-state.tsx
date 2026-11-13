import { IconRefresh } from "@/components/icons";
import { SkeletonCard } from "./skeleton-card";

export function TripsLoadingState() {
  return (
    <div id="tripsLoading">
      <p className="mb-4 flex items-center justify-center gap-2.5 text-[13px] font-medium text-[var(--slate-500)]">
        <IconRefresh className="size-4 shrink-0 animate-[spin_0.9s_linear_infinite] text-[var(--sky-600)]" />
        Đang tải chuyến của bạn...
      </p>
      <SkeletonCard />
      <div className="mt-[18px]">
        <SkeletonCard />
      </div>
    </div>
  );
}
