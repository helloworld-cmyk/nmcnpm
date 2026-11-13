"use client";

import { useMemo } from "react";
import { useTripSeats } from "@/api/trip/tanstack/use-trip-seats";
import {
  MAX_SEATS,
  useBookingDetailStore,
} from "@/global-states/booking-detail-store";
import { toSeatRows } from "../_utils/to-seat-rows";
import { PanelHead } from "./panel-head";
import { SeatArt } from "./seat-art";
import { SeatButton } from "./seat-button";
import { SteeringWheel } from "./steering-wheel";

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
