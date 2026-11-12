"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMyBooking } from "@/api/booking/tanstack/use-my-booking";
import type { BookingResponse } from "@/api/booking/api/types";
import { IconCheck, IconCopy, IconMap, IconPhone, IconPin } from "@/components/icons";
import { formatClock, formatDayLabel, formatVnd } from "../_utils/format";

const COPY_BTN =
  "grid size-[30px] shrink-0 place-items-center rounded-lg border border-[var(--border)] bg-white text-[var(--sky-700)] transition-colors duration-200 hover:bg-[var(--sky-50)]";

const STATE_PANEL =
  "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-[clamp(28px,4vw,44px)_22px] text-center shadow-sm";

/* Chữ cái đầu tên hãng xe cho avatar */
function companyInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "VV";
  const first = parts[0].charAt(0);
  const second = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return `${first}${second}`.toUpperCase();
}

/* Mã QR trang trí theo thiết kế (không dùng để quét thật) */
function TicketQr() {
  return (
    <svg aria-hidden="true" className="block size-[88px]" viewBox="0 0 96 96">
      <g fill="currentColor">
        <rect x="2" y="2" width="24" height="24" rx="3" />
        <rect x="7" y="7" width="14" height="14" rx="2" fill="var(--surface)" />
        <rect x="11" y="11" width="6" height="6" rx="1" />
        <rect x="70" y="2" width="24" height="24" rx="3" />
        <rect x="75" y="7" width="14" height="14" rx="2" fill="var(--surface)" />
        <rect x="79" y="11" width="6" height="6" rx="1" />
        <rect x="2" y="70" width="24" height="24" rx="3" />
        <rect x="7" y="75" width="14" height="14" rx="2" fill="var(--surface)" />
        <rect x="11" y="79" width="6" height="6" rx="1" />
        <rect x="34" y="4" width="6" height="6" rx="1" />
        <rect x="46" y="4" width="6" height="6" rx="1" />
        <rect x="58" y="4" width="6" height="6" rx="1" />
        <rect x="40" y="10" width="6" height="6" rx="1" />
        <rect x="52" y="10" width="6" height="6" rx="1" />
        <rect x="34" y="16" width="6" height="6" rx="1" />
        <rect x="58" y="16" width="6" height="6" rx="1" />
        <rect x="46" y="22" width="6" height="6" rx="1" />
        <rect x="34" y="30" width="6" height="6" rx="1" />
        <rect x="58" y="30" width="6" height="6" rx="1" />
        <rect x="70" y="30" width="6" height="6" rx="1" />
        <rect x="82" y="30" width="6" height="6" rx="1" />
        <rect x="4" y="34" width="6" height="6" rx="1" />
        <rect x="16" y="34" width="6" height="6" rx="1" />
        <rect x="30" y="40" width="6" height="6" rx="1" />
        <rect x="4" y="46" width="6" height="6" rx="1" />
        <rect x="16" y="52" width="6" height="6" rx="1" />
        <rect x="4" y="58" width="6" height="6" rx="1" />
        <rect x="16" y="58" width="6" height="6" rx="1" />
        <rect x="88" y="40" width="6" height="6" rx="1" />
        <rect x="82" y="44" width="6" height="6" rx="1" />
        <rect x="88" y="52" width="6" height="6" rx="1" />
        <rect x="70" y="44" width="6" height="6" rx="1" />
        <rect x="34" y="46" width="6" height="6" rx="1" />
        <rect x="58" y="50" width="6" height="6" rx="1" />
        <rect x="46" y="56" width="6" height="6" rx="1" />
        <rect x="34" y="60" width="6" height="6" rx="1" />
        <rect x="58" y="62" width="6" height="6" rx="1" />
        <rect x="70" y="58" width="6" height="6" rx="1" />
        <rect x="82" y="60" width="6" height="6" rx="1" />
        <rect x="70" y="70" width="6" height="6" rx="1" />
        <rect x="82" y="72" width="6" height="6" rx="1" />
        <rect x="88" y="66" width="6" height="6" rx="1" />
        <rect x="34" y="72" width="6" height="6" rx="1" />
        <rect x="46" y="78" width="6" height="6" rx="1" />
        <rect x="58" y="72" width="6" height="6" rx="1" />
        <rect x="34" y="84" width="6" height="6" rx="1" />
        <rect x="52" y="84" width="6" height="6" rx="1" />
        <rect x="70" y="84" width="6" height="6" rx="1" />
        <rect x="84" y="84" width="6" height="6" rx="1" />
      </g>
    </svg>
  );
}

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

function TicketView({
  booking,
  liveRegion,
  copyText,
}: {
  booking: BookingResponse;
  liveRegion: React.ReactNode;
  copyText: (text: string) => void;
}) {
  const trip = booking.trip;
  const firstTicket = booking.tickets[0];

  const route = `${trip.originAreaName} → ${trip.destinationAreaName}`;
  const pickup = `${formatClock(trip.departureAt)} · ${
    firstTicket?.pickupAddress || trip.originAreaName
  }`;
  const dropoff = `${formatClock(trip.expectedArrivalAt)} · ${
    firstTicket?.dropoffAddress || trip.destinationAreaName
  }`;
  const seats =
    booking.tickets.map((ticket) => ticket.seatCode).join(" · ") || "—";
  const hotlineHref = `tel:${trip.companyHotline.replace(/\s/g, "")}`;

  return (
    <article
      aria-labelledby="ticketHeading"
      className="relative rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-[clamp(16px,2vw,20px)] shadow-sm"
      id="ve-dien-tu"
    >
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--slate-500)]">
            Vé điện tử
          </p>
          <h2
            className="mt-1 text-[17px] font-semibold leading-[1.3] text-[var(--ink)]"
            id="ticketHeading"
          >
            {route}
          </h2>
        </div>

        <div className="inline-flex shrink-0 items-center gap-[7px] whitespace-nowrap">
          <strong className="font-heading text-base font-bold tracking-[0.03em] text-[var(--sky-800)]">
            {booking.bookingCode}
          </strong>
          <button
            aria-label="Sao chép mã đặt chỗ"
            className={COPY_BTN}
            title="Sao chép mã đặt chỗ"
            type="button"
            onClick={() => copyText(booking.bookingCode)}
          >
            <IconCopy className="size-4" />
            <span className="sr-only">Sao chép mã</span>
          </button>
        </div>
      </header>

      <ul className="mt-2.5 grid gap-[9px]">
        <li className="flex items-start gap-3">
          <IconPin className="mt-0.5 size-[19px] shrink-0 text-[var(--sky-600)]" />
          <div>
            <strong className="block text-sm font-semibold leading-[1.45] text-[var(--ink)]">
              {pickup}
            </strong>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <IconMap className="mt-0.5 size-[19px] shrink-0 text-[var(--orange-500)]" />
          <div>
            <strong className="block text-sm font-semibold leading-[1.45] text-[var(--ink)]">
              {dropoff}
            </strong>
          </div>
        </li>
      </ul>

      <div
        aria-hidden="true"
        className="relative -mx-[clamp(16px,2vw,20px)] my-3 border-t-2 border-dashed border-[var(--border)] before:absolute before:-left-px before:-top-3 before:h-6 before:w-3.5 before:rounded-r-full before:border before:border-[var(--border)] before:border-l-0 before:bg-[var(--bg)] after:absolute after:-right-px after:-top-3 after:h-6 after:w-3.5 after:rounded-l-full after:border after:border-[var(--border)] after:border-r-0 after:bg-[var(--bg)]"
      />

      <div className="flex items-start gap-[18px] max-[520px]:flex-col">
        <figure className="m-0 shrink-0 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--ink)]">
          <TicketQr />
        </figure>

        <div className="grid min-w-0 flex-1 grid-cols-2 content-start gap-x-[22px] gap-y-4 max-[520px]:grid-cols-1 max-[520px]:gap-3.5">
          <div className="grid min-w-0 gap-2">
            <span className="block text-xs font-medium leading-[1.4] text-[var(--slate-500)]">
              Số ghế
            </span>
            <strong className="block text-[15px] font-semibold leading-[1.65] text-[var(--slate-600)] [overflow-wrap:anywhere]">
              {seats}
            </strong>
          </div>
          <div className="grid min-w-0 gap-2">
            <span className="block text-xs font-medium leading-[1.4] text-[var(--slate-500)]">
              Hãng xe
            </span>
            <strong className="block text-[15px] font-semibold leading-[1.65] text-[var(--slate-600)] [overflow-wrap:anywhere]">
              {trip.companyName}
            </strong>
          </div>
          <div className="grid min-w-0 gap-2">
            <span className="block text-xs font-medium leading-[1.4] text-[var(--slate-500)]">
              Ngày khởi hành
            </span>
            <strong className="block text-[15px] font-semibold leading-[1.65] text-[var(--slate-600)] [overflow-wrap:anywhere]">
              {formatDayLabel(trip.departureAt)}
            </strong>
          </div>
          <div className="grid min-w-0 gap-2">
            <span className="block text-xs font-medium leading-[1.4] text-[var(--slate-500)]">
              Thanh toán tiền mặt
            </span>
            <strong className="block font-heading text-xl font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
              {formatVnd(booking.quotedTotalAmount)}
            </strong>
          </div>
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-dashed border-[var(--border)] pt-3.5 max-[520px]:flex-wrap">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="relative shrink-0">
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center rounded-full border-2 border-white bg-[linear-gradient(135deg,var(--navy-800),var(--sky-700))] font-heading text-[12.5px] font-bold text-white shadow-[0_4px_10px_-4px_rgba(8,20,38,0.4)]"
            >
              {companyInitials(trip.companyName)}
            </span>
            <span
              aria-hidden="true"
              className="absolute -right-1 -bottom-1 grid size-[17px] place-items-center rounded-full border-2 border-white bg-[var(--green-600)] text-white"
            >
              <IconCheck className="size-[9px]" />
            </span>
          </span>
          <div className="min-w-0">
            <strong className="block font-heading text-[13.5px] font-semibold leading-[1.35] text-[var(--ink)]">
              {trip.companyName}
            </strong>
            <span className="flex items-center gap-[3px] text-[11px] text-[var(--slate-500)]">
              <IconPhone className="size-3 shrink-0 text-[var(--sky-600)]" />
              Hotline hãng xe
            </span>
          </div>
        </div>

        <div className="ml-auto inline-flex shrink-0 items-center gap-2">
          <a
            className="whitespace-nowrap text-sm font-semibold text-[var(--sky-800)] hover:underline"
            href={hotlineHref}
          >
            {trip.companyHotline}
          </a>
          <button
            aria-label="Sao chép số điện thoại hãng xe"
            className={COPY_BTN}
            title="Sao chép số điện thoại"
            type="button"
            onClick={() => copyText(trip.companyHotline)}
          >
            <IconCopy className="size-4" />
            <span className="sr-only">Sao chép số điện thoại</span>
          </button>
        </div>
      </div>

      {liveRegion}
    </article>
  );
}
