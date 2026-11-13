"use client";

import { IconRefresh } from "@/components/icons";
import { STATE_ICON, STATE_PANEL } from "./state-panels-classes";

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <section className={STATE_PANEL} id="errorState">
      <span className={`${STATE_ICON} bg-[var(--red-50)] text-[var(--red-600)] shadow-[inset_0_0_0_1px_rgba(220,38,38,0.12)]`}>
        <IconRefresh className="size-[26px]" />
      </span>
      <h2 className="mt-4 font-heading text-[19px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--ink)] text-balance">
        Không tải được danh sách chuyến
      </h2>
      <p className="mx-auto mt-2.5 max-w-[460px] text-[15px] leading-[1.65] text-[var(--slate-600)]">
        Kết nối bị gián đoạn khi tải chuyến. Vui lòng thử lại sau ít phút.
      </p>
      <div className="mt-[22px] flex flex-wrap justify-center gap-2.5 max-[400px]:[&>.btn]:w-full">
        <button className="btn btn-primary" type="button" onClick={onRetry}>
          Thử lại
        </button>
      </div>
    </section>
  );
}
