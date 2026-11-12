import type {
  BookingResponse,
  BookingStatus,
} from "@/api/booking/api/types";
import type { Trip, TripStatus } from "../_data/trips";

/* Giờ:phút từ mốc thời gian ISO */
function clock(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "--:--";
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
}

/* Thời lượng giữa hai mốc ISO, định dạng "3g 00p" */
function durationLabel(fromISO: string, toISO: string): string {
  const from = new Date(fromISO).getTime();
  const to = new Date(toISO).getTime();
  if (Number.isNaN(from) || Number.isNaN(to)) return "";
  const minutes = Math.max(0, Math.round((to - from) / 60000));
  return `${Math.floor(minutes / 60)}g ${String(minutes % 60).padStart(2, "0")}p`;
}

/* Nhãn ngày theo kiểu "Thứ Bảy, 07/11/2026" */
function dayLabel(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";
  const weekdays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${weekdays[date.getDay()]}, ${day}/${month}/${date.getFullYear()}`;
}

/* Suy ra trạng thái hiển thị từ trạng thái đơn + trạng thái chuyến */
function tripStatus(booking: BookingResponse): TripStatus {
  const bookingStatus: BookingStatus = booking.status;
  if (bookingStatus === "CANCELLED" || bookingStatus === "EXPIRED") {
    return "canceled";
  }
  if (bookingStatus === "HOLDING") return "pending";

  switch (booking.trip.status) {
    case "IN_PROGRESS":
      return "ongoing";
    case "COMPLETED":
    case "TERMINATED":
      return "done";
    case "CANCELLED":
      return "canceled";
    default:
      return "confirmed";
  }
}

function payNote(status: TripStatus): string {
  if (status === "canceled") return "đã hủy · chưa thanh toán";
  if (status === "done") return "đã thanh toán tiền mặt";
  return "trả tiền mặt";
}

/* Chuyển một đặt vé từ API thành dữ liệu thẻ hiển thị */
export function toTrip(booking: BookingResponse): Trip {
  const { trip } = booking;
  const status = tripStatus(booking);
  const seatCodes = booking.tickets.map((ticket) => ticket.seatCode);
  const firstTicket = booking.tickets[0];

  return {
    id: booking.id,
    code: booking.bookingCode,
    status,
    time: `${clock(trip.departureAt)} – ${clock(trip.expectedArrivalAt)}`,
    duration: durationLabel(trip.departureAt, trip.expectedArrivalAt),
    dateLabel: dayLabel(trip.departureAt),
    pickup: firstTicket?.pickupAddress || trip.originAreaName,
    dropoff: firstTicket?.dropoffAddress || trip.destinationAreaName,
    route: trip.destinationAreaName,
    company: trip.companyName,
    hotline: trip.companyHotline,
    price: booking.quotedTotalAmount,
    seats: seatCodes.length ? `Ghế ${seatCodes.join(", ")}` : "Chưa có ghế",
    payNote: payNote(status),
    alert:
      status === "canceled"
        ? {
            tone: "green",
            icon: "wallet",
            message:
              "Ghế đã được giải phóng cho hành khách khác. Nếu đã thanh toán, tiền sẽ hoàn về tài khoản trong 1–3 ngày làm việc.",
          }
        : undefined,
  };
}
