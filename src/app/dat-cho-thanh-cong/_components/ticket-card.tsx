"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMyBooking } from "@/api/booking/tanstack/use-my-booking";
import { TicketView } from "./ticket-view";

const STATE_PANEL =
  "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-[clamp(28px,4vw,44px)_22px] text-center shadow-sm";

export function TicketCard() {
  const searchParams = useSearchParams();
  const bookingId = (searchParams.get("booking") || "").trim();
  const [liveText, setLiveText] = useState("");
  const bookingQuery = useMyBooking(bookingId);

  /* Sao chép qua clipboard, có dự phòng execCommand cho trình duyệt cũ */
  const copyText = (text: string) => {
    const done = () => setLiveText(`Đã sao chép: ${text}`);
    const failed = () =>
      setLiveText("Không thể sao chép tự động — hãy chép thủ công.");

    const fallback = () => {
      try {
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.className = "sr-only";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        document.body.removeChild(area);
        done();
      } catch {
        failed();
      }
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
      return;
    }
    fallback();
  };

  const liveRegion = (
    <p aria-live="polite" className="sr-only" role="status">
      {liveText}
    </p>
  );

  if (!bookingId) {
    return (
      <article className={STATE_PANEL} id="ve-dien-tu">
        <h2 className="font-heading text-[19px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
          Chưa có thông tin vé
        </h2>
        <p className="mx-auto mt-2.5 max-w-[460px] text-[15px] leading-[1.65] text-[var(--slate-600)]">
          Bạn chưa chọn vé nào. Hãy xem danh sách chuyến đã đặt của bạn để mở lại
          vé điện tử.
        </p>
        <div className="mt-[22px] flex flex-wrap justify-center gap-2.5">
          <Link className="btn btn-primary" href="/chuyen-cua-toi">
            Xem Chuyến của tôi
          </Link>
        </div>
      </article>
    );
  }

  if (bookingQuery.isPending) {
    return (
      <article className={STATE_PANEL} id="ve-dien-tu" aria-busy="true">
        <div className="flex items-center justify-center gap-2.5 text-[13.5px] font-semibold text-[var(--slate-500)]">
          <span
            aria-hidden="true"
            className="size-[18px] animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-[var(--sky-100)] border-t-[var(--sky-700)]"
          />
          <span>Đang tải vé điện tử...</span>
        </div>
      </article>
    );
  }

  const booking = bookingQuery.data;
  if (bookingQuery.isError || !booking) {
    return (
      <article className={STATE_PANEL} id="ve-dien-tu">
        <h2 className="font-heading text-[19px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
          Không tải được vé
        </h2>
        <p className="mx-auto mt-2.5 max-w-[460px] text-[15px] leading-[1.65] text-[var(--slate-600)]">
          Kết nối bị gián đoạn khi tải vé. Vui lòng thử lại.
        </p>
        <div className="mt-[22px] flex flex-wrap justify-center gap-2.5">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => bookingQuery.refetch()}
          >
            Thử lại
          </button>
          <Link className="btn btn-ghost" href="/chuyen-cua-toi">
            Xem Chuyến của tôi
          </Link>
        </div>
      </article>
    );
  }

  return <TicketView booking={booking} liveRegion={liveRegion} copyText={copyText} />;
}
