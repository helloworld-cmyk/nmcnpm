"use client";

import { useMemo } from "react";
import { useTripSeats } from "@/api/trip/tanstack/use-trip-seats";
import type { TripSeatResponse } from "@/api/trip/api/types";
import {
  MAX_SEATS,
  useBookingDetailStore,
} from "@/global-states/booking-detail-store";
import { toSeatRows } from "../_utils/to-seat-rows";
import { PanelHead } from "./panel-head";
import { SeatArt } from "./seat-art";

/* Vòng lái — SVG nhỏ vẽ riêng cho cabin tài xế */
function SteeringWheel() {
  return (
    <svg aria-hidden="true" className="h-5 w-5 text-[var(--sky-600)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} focusable="false">
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 14.4v6M9.7 13.4l-5.3 2.5M14.3 13.4l5.3 2.5" strokeLinecap="round" />
    </svg>
  );
}

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

/* Biến màu cho ghế trong chú giải */
const LEGEND_TONES = {
  free: "[--seat-back:var(--surface)] [--seat-head:var(--slate-200)] [--seat-cushion:var(--slate-200)] [--seat-arm:var(--slate-300)] [--seat-line:var(--slate-300)]",
  picked: "[--seat-back:var(--sky-700)] [--seat-head:var(--sky-800)] [--seat-cushion:var(--sky-600)] [--seat-arm:var(--sky-800)] [--seat-line:var(--sky-800)]",
  taken: "[--seat-back:var(--slate-200)] [--seat-head:var(--slate-200)] [--seat-cushion:var(--slate-200)] [--seat-arm:var(--slate-200)] [--seat-line:var(--slate-200)]",
} as const;

const GRID_COLS =
  "grid-cols-[1fr_1fr_16px_1fr_1fr] max-[520px]:grid-cols-[1fr_1fr_12px_1fr_1fr]";

const AISLE =
  "relative min-h-11 before:content-[''] before:absolute before:top-1.5 before:bottom-1.5 before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:opacity-55 before:bg-[repeating-linear-gradient(to_bottom,var(--slate-300)_0_4px,transparent_4px_8px)]";

const WHEEL_BASE = "absolute w-[7px] h-5 rounded bg-[var(--slate-400)] opacity-80 max-[520px]:w-1.5 max-[520px]:h-4";

function SeatButton({ seat, picked }: { seat: TripSeatResponse; picked: boolean }) {
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

function rowGridClass(count: number): string {
  if (count === 4) return GRID_COLS;
  if (count === 3) return "grid-cols-3";
  if (count === 2) return "grid-cols-2";
  return "grid-cols-1";
}

export function SeatMapPanel({ tripId }: { tripId: string }) {
  const selectedSeats = useBookingDetailStore((state) => state.selectedSeats);
  const { data, isPending, isError, refetch } = useTripSeats(tripId);

  const rows = useMemo(() => toSeatRows(data ?? []), [data]);

  const seatLabel = selectedSeats.length
    ? selectedSeats.map((seat) => seat.seatCode).join(", ")
    : "chưa có ghế nào";

  return (
    <section aria-label="Chọn ghế" id="chon-ghe">
      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-[clamp(20px,2.6vw,28px)] shadow-xs max-[400px]:p-4">
        <PanelHead
          step="1"
          title="Chọn ghế"
          desc="Sơ đồ xe nhìn từ trên xuống — chạm ghế trống để chọn."
        />

        <div
          className="grid gap-3.5"
          role="group"
          aria-label="Sơ đồ ghế: cabin tài xế và các hàng ghế"
        >
          <div className="relative mx-auto w-full max-w-[360px] rounded-[var(--radius-xl)_var(--radius-xl)_var(--radius-lg)_var(--radius-lg)] border-[1.5px] border-[var(--sky-100)] bg-[var(--bg)] p-[12px_12px_10px] max-[520px]:p-[10px_8px_8px]">
            <span aria-hidden="true" className={`${WHEEL_BASE} top-6 -left-[5px] max-[520px]:top-5 max-[520px]:-left-1`} />
            <span aria-hidden="true" className={`${WHEEL_BASE} top-6 -right-[5px] max-[520px]:top-5 max-[520px]:-right-1`} />
            <span aria-hidden="true" className={`${WHEEL_BASE} bottom-[60px] -left-[5px] max-[520px]:bottom-14 max-[520px]:-left-1`} />
            <span aria-hidden="true" className={`${WHEEL_BASE} bottom-[60px] -right-[5px] max-[520px]:bottom-14 max-[520px]:-right-1`} />
            <span aria-hidden="true" className="mb-3 block h-5 rounded-[var(--radius-sm)] bg-[var(--sky-100)]" />

            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2">
                <SteeringWheel />
                <span className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[var(--slate-500)]">
                  Tài xế
                </span>
              </span>
              <span
                aria-hidden="true"
                className="rounded-[var(--radius-xs)] border-[1.5px] border-dashed border-[var(--orange-500)] bg-[var(--orange-50)] px-[6px] py-[3px] text-[9.5px] font-bold tracking-[0.09em] text-[var(--orange-700)] opacity-85"
              >
                Cửa lên xe
              </span>
            </div>

            {isPending ? (
              <p className="flex items-center justify-center gap-2.5 py-8 text-[12.5px] font-semibold text-[var(--slate-500)]" role="status">
                <span
                  aria-hidden="true"
                  className="size-[16px] animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-[var(--sky-100)] border-t-[var(--sky-700)]"
                />
                Đang tải sơ đồ ghế...
              </p>
            ) : isError ? (
              <div className="grid justify-items-center gap-2 py-8 text-center">
                <p className="text-[12.5px] font-semibold text-[var(--slate-600)]">
                  Không tải được sơ đồ ghế.
                </p>
                <button className="btn btn-ghost btn-sm" type="button" onClick={() => refetch()}>
                  Thử lại
                </button>
              </div>
            ) : !rows.length ? (
              <p className="py-8 text-center text-[12.5px] font-semibold text-[var(--slate-500)]">
                Chuyến này chưa có sơ đồ ghế.
              </p>
            ) : (
              <div className="grid gap-2.5 max-[520px]:gap-[5px]">
                {rows.map((row) => (
                  <div
                    key={row.key}
                    className={`grid items-stretch gap-2 max-[520px]:gap-[5px] ${rowGridClass(row.seats.length)}`}
                  >
                    {row.seats.length === 4 ? (
                      <>
                        <SeatButton seat={row.seats[0]} picked={selectedSeats.some((s) => s.id === row.seats[0].id)} />
                        <SeatButton seat={row.seats[1]} picked={selectedSeats.some((s) => s.id === row.seats[1].id)} />
                        <span aria-hidden="true" className={AISLE} />
                        <SeatButton seat={row.seats[2]} picked={selectedSeats.some((s) => s.id === row.seats[2].id)} />
                        <SeatButton seat={row.seats[3]} picked={selectedSeats.some((s) => s.id === row.seats[3].id)} />
                      </>
                    ) : (
                      row.seats.map((seat) => (
                        <SeatButton
                          key={seat.id}
                          seat={seat}
                          picked={selectedSeats.some((s) => s.id === seat.id)}
                        />
                      ))
                    )}
                  </div>
                ))}
              </div>
            )}

            <p aria-hidden="true" className="mt-2.5 text-center text-[10.5px] font-bold uppercase tracking-[0.08em] text-[var(--slate-400)]">
              Xe ghép liên tỉnh
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--slate-600)]">
              <SeatArt className={`h-5 w-[15px] ${LEGEND_TONES.free}`} />
              Còn trống
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--slate-600)]">
              <SeatArt className={`h-5 w-[15px] ${LEGEND_TONES.picked}`} />
              Đang chọn
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--slate-600)]">
              <SeatArt className={`h-5 w-[15px] ${LEGEND_TONES.taken}`} />
              Đã đặt
            </span>
          </div>

          <p className="text-[13px] leading-[1.55] text-[var(--slate-600)]" role="status">
            Đang chọn <strong className="font-heading text-[13.5px] font-bold text-[var(--sky-800)]">{seatLabel}</strong>
            <span className="text-[var(--slate-400)]"> · tối đa {MAX_SEATS} ghế mỗi đặt chỗ</span>
          </p>
        </div>
      </div>
    </section>
  );
}
