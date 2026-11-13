"use client";

import Link from "next/link";
import { IconCheck, IconRoute } from "@/components/icons";
import { STATE_ICON, STATE_PANEL, STATE_TIP } from "./state-panels-classes";

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <section className={STATE_PANEL} id="emptyState">
      <span className={`${STATE_ICON} bg-[var(--sky-50)] text-[var(--sky-700)] shadow-[inset_0_0_0_1px_var(--sky-100)]`}>
        <IconRoute className="size-[26px]" />
      </span>
      <h2 className="mt-4 font-heading text-[19px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--ink)] text-balance">
        Không có chuyến phù hợp
      </h2>
      <p className="mx-auto mt-2.5 max-w-[460px] text-[15px] leading-[1.65] text-[var(--slate-600)]">
        Chưa còn chuyến nào khớp tìm kiếm và bộ lọc hiện tại. Bạn thử các gợi ý
        dưới đây nhé:
      </p>
      <ul className="mt-[18px] flex flex-col items-center gap-2">
        <li className={STATE_TIP}>
          <IconCheck className="size-[15px] shrink-0 text-[var(--green-600)]" />
          Nới rộng khung giờ trên thanh kéo thời gian
        </li>
        <li className={STATE_TIP}>
          <IconCheck className="size-[15px] shrink-0 text-[var(--green-600)]" />
          Đổi ngày đi hoặc điểm đón khác
        </li>
      </ul>
      <div className="mt-[22px] flex flex-wrap justify-center gap-2.5 max-[400px]:[&>.btn]:w-full">
        <button className="btn btn-primary" type="button" onClick={onReset}>
          Xóa bộ lọc
        </button>
        <Link className="btn btn-ghost" href="/#dat-xe">
          Sửa tìm kiếm
        </Link>
      </div>
    </section>
  );
}
