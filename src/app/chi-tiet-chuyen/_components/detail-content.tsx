"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useTrip } from "@/api/trip/tanstack/use-trip";
import { useTripSeatsAvailability } from "@/api/trip/tanstack/use-trip-seats-availability";
import { useBookingDetailStore } from "@/global-states/booking-detail-store";
import { BookingPanel } from "./booking-panel";
import { DetailTrip } from "./detail-trip";
import { SeatMapPanel } from "./seat-map";

const STATE_PANEL =
  "rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-[clamp(28px,4vw,44px)_22px] text-center shadow-xs";

/* Nội dung màn chi tiết: đọc ?trip=, tải chuyến từ API rồi dựng các khối */
export function DetailContent() {
  const searchParams = useSearchParams();
  const tripId = (searchParams.get("trip") || "").trim();
  const { data: trip, isPending, isError, refetch } = useTrip(tripId);
  const seatsQuery = useTripSeatsAvailability(tripId ? [tripId] : []);
  const setTripId = useBookingDetailStore((state) => state.setTripId);

  /* Ghi nhận chuyến đang chọn để luồng đặt chỗ biết giữ ghế cho chuyến nào */
  useEffect(() => {
    setTripId(tripId || null);
  }, [tripId, setTripId]);

  if (!tripId) {
    return (
      <div className={STATE_PANEL}>
        <h2 className="font-heading text-[19px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
          Bạn chưa chọn chuyến
        </h2>
        <p className="mx-auto mt-2.5 max-w-[460px] text-[15px] leading-[1.65] text-[var(--slate-600)]">
          Hãy tìm và chọn một chuyến xe để xem chi tiết và đặt chỗ.
        </p>
        <div className="mt-[22px] flex flex-wrap justify-center gap-2.5 max-[400px]:[&>.btn]:w-full">
          <Link className="btn btn-primary" href="/#dat-xe">
            Tìm chuyến
          </Link>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className={STATE_PANEL} aria-busy="true">
        <div className="flex items-center justify-center gap-2.5 text-[13.5px] font-semibold text-[var(--slate-500)]">
          <span
            aria-hidden="true"
            className="size-[18px] animate-[spin_0.8s_linear_infinite] rounded-full border-2 border-[var(--sky-100)] border-t-[var(--sky-700)]"
          />
          <span>Đang tải thông tin chuyến…</span>
        </div>
      </div>
    );
  }

  if (isError || !trip) {
    return (
      <div className={STATE_PANEL}>
        <h2 className="font-heading text-[19px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
          Không tải được thông tin chuyến
        </h2>
        <p className="mx-auto mt-2.5 max-w-[460px] text-[15px] leading-[1.65] text-[var(--slate-600)]">
          Kết nối bị gián đoạn khi tải chuyến. Vui lòng thử lại.
        </p>
        <div className="mt-[22px] flex flex-wrap justify-center gap-2.5 max-[400px]:[&>.btn]:w-full">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => refetch()}
          >
            Thử lại
          </button>
          <Link className="btn btn-ghost" href="/#dat-xe">
            Tìm chuyến khác
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <DetailTrip
        trip={trip}
        availableSeats={seatsQuery.availability[trip.id] ?? null}
      />

      <div className="mt-[clamp(26px,3.5vw,40px)] grid grid-cols-[minmax(0,1fr)_400px] items-start gap-[clamp(24px,3vw,40px)] max-[1024px]:grid-cols-1">
        <SeatMapPanel tripId={tripId} />
        <BookingPanel pricePerSeat={trip.baseFareAmount} />
      </div>
    </>
  );
}
