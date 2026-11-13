"use client";

import type { TripSeatResponse } from "@/api/trip/api/types";
import { useBookingDetailStore } from "@/global-states/booking-detail-store";
import { SeatArt } from "./seat-art";

/* Nền ghế đổi màu qua biến CSS --seat-*: mặc định trống */
const SEAT_BASE =
  "grid justify-items-center gap-[3px] min-h-11 px-1 py-1.5 rounded-[var(--radius-xs)] transition-[transform,background,box-shadow] duration-[var(--dur)] ease-[var(--ease)] [--seat-arm:var(--slate-300)] [--seat-head:var(--slate-200)] [--seat-back:var(--surface)] [--seat-cushion:var(--slate-200)] [--seat-line:var(--slate-300)]";

const SEAT_FREE =
  "cursor-pointer hover:[--seat-back:var(--sky-50)] hover:[--seat-head:var(--sky-100)] hover:[--seat-cushion:var(--sky-100)] hover:[--seat-line:var(--sky-300)] hover:[--seat-arm:var(--sky-300)] hover:bg-[var(--sky-50)] hover:-translate-y-px";

const SEAT_PICKED =
  "cursor-pointer bg-[var(--sky-50)] shadow-[0_10px_20px_-12px_rgba(3,105,161,0.95)] [--seat-back:var(--sky-700)] [--seat-head:var(--sky-800)] [--seat-cushion:var(--sky-600)] [--seat-arm:var(--sky-800)] [--seat-line:var(--sky-800)] hover:[--seat-back:var(--sky-800)]";

const SEAT_TAKEN =
  "cursor-not-allowed [--seat-back:var(--slate-200)] [--seat-head:var(--slate-200)] [--seat-cushion:var(--slate-200)] [--seat-arm:var(--slate-200)] [--seat-line:var(--slate-200)]";

const SEAT_NUM = "font-heading text-xs font-bold leading-[1.1] text-[var(--ink)] max-[520px]:text-[11px]";

export function SeatButton({ seat, picked }: { seat: TripSeatResponse; picked: boolean }) {
  const toggleSeat = useBookingDetailStore((state) => state.toggleSeat);

  if (!seat.available) {
    return (
      <button type="button" className={`${SEAT_BASE} ${SEAT_TAKEN}`} disabled aria-label={`Ghế ${seat.seatCode} — đã bị đặt`}>
        <SeatArt className="h-[54px] w-10 rotate-180 max-[520px]:h-[38px] max-[520px]:w-[28px]" />
        <span className={`${SEAT_NUM} text-[var(--slate-400)] line-through`}>{seat.seatCode}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`${SEAT_BASE} ${picked ? SEAT_PICKED : SEAT_FREE}`}
      aria-pressed={picked}
      onClick={() => toggleSeat({ id: seat.id, seatCode: seat.seatCode })}
    >
      <SeatArt className="h-[54px] w-10 rotate-180 max-[520px]:h-[38px] max-[520px]:w-[28px]" />
      <span className={`${SEAT_NUM} ${picked ? "text-[var(--sky-800)]" : ""}`}>{seat.seatCode}</span>
    </button>
  );
}
