import type {
  TripResponse,
  TripSalesStatus,
} from "@/api/trip/api/types";
import { formatTime } from "./format";

export type AvatarTone = "sky" | "orange" | "green" | "navy";

export type RideBadgeTone = "green" | "orange";

export type Ride = {
  id: string;
  departureMin: number;
  time: string;
  duration: string;
  badgeText: string;
  badgeTone: RideBadgeTone;
  salesStatus: TripSalesStatus;
  pickup: string;
  dropoff: string;
  companyName: string;
  companyInitials: string;
  avatarTone: AvatarTone;
  routeName: string;
  routeCode: string;
  tripCode: string;
  price: number;
};

const AVATAR_TONES: AvatarTone[] = ["sky", "orange", "green", "navy"];

const BADGE_BY_SALES_STATUS: Record<
  TripSalesStatus,
  { text: string; tone: RideBadgeTone }
> = {
  OPEN: { text: "Đang mở bán", tone: "green" },
  PAUSED: { text: "Tạm dừng bán", tone: "orange" },
  CLOSED: { text: "Đã đóng bán", tone: "orange" },
};

/* Phút trong ngày theo giờ local từ mốc thời gian ISO */
function departureMinutes(isoDate: string): number {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 0;
  return date.getHours() * 60 + date.getMinutes();
}

/* Khoảng cách hai mốc thời gian ISO, định dạng "2g45p" */
function durationLabel(fromISO: string, toISO: string): string {
  const from = new Date(fromISO).getTime();
  const to = new Date(toISO).getTime();
  if (Number.isNaN(from) || Number.isNaN(to)) return "";
  const minutes = Math.max(0, Math.round((to - from) / 60000));
  const hours = Math.floor(minutes / 60);
  return `${hours}g${String(minutes % 60).padStart(2, "0")}p`;
}

/* Viết tắt tên hãng xe từ 2 chữ cái đầu */
function companyInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "VV";
  const first = parts[0].charAt(0);
  const second = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return `${first}${second}`.toUpperCase();
}

/* Chọn tông màu avatar ổn định theo id chuyến */
function avatarTone(id: string): AvatarTone {
  let sum = 0;
  for (const char of id) sum += char.charCodeAt(0);
  return AVATAR_TONES[sum % AVATAR_TONES.length];
}

/* Ghép số ghế trống vào badge khi chuyến đang mở bán; lỗi/chưa có dữ liệu thì giữ badge cũ */
export function withSeatAvailability(
  ride: Ride,
  availableSeats: number | null,
): Ride {
  if (availableSeats === null || ride.salesStatus !== "OPEN") return ride;

  if (availableSeats <= 0) {
    return { ...ride, badgeText: "Hết ghế", badgeTone: "orange" };
  }

  return {
    ...ride,
    badgeText:
      availableSeats <= 2
        ? `Chỉ còn ${availableSeats} ghế`
        : `Còn ${availableSeats} ghế`,
    badgeTone: availableSeats <= 2 ? "orange" : "green",
  };
}

/* Chuyển một chuyến từ API thành dữ liệu thẻ hiển thị */
export function toRide(trip: TripResponse): Ride {
  const badge = BADGE_BY_SALES_STATUS[trip.salesStatus] ?? BADGE_BY_SALES_STATUS.OPEN;
  const departureMin = departureMinutes(trip.departureAt);
  const arrivalMin = departureMinutes(trip.expectedArrivalAt);

  return {
    id: trip.id,
    departureMin,
    time: `${formatTime(departureMin)} – ${formatTime(arrivalMin)}`,
    duration: durationLabel(trip.departureAt, trip.expectedArrivalAt),
    badgeText: badge.text,
    badgeTone: badge.tone,
    salesStatus: trip.salesStatus,
    pickup: trip.originAreaName,
    dropoff: trip.destinationAreaName,
    companyName: trip.companyName,
    companyInitials: companyInitials(trip.companyName),
    avatarTone: avatarTone(trip.id),
    routeName: trip.routeName,
    routeCode: trip.routeCode,
    tripCode: trip.tripCode,
    price: trip.baseFareAmount,
  };
}
