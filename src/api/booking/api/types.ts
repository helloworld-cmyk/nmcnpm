/* Kiểu dữ liệu đặt vé của khách hàng cho các endpoint /me/bookings (đối chiếu DTO backend). */

import type { TripStatus } from "@/api/trip/api/types";

/* Trạng thái một đơn đặt vé. */
export type BookingStatus = "HOLDING" | "CONFIRMED" | "CANCELLED" | "EXPIRED";

/* Trạng thái một vé trong đơn. */
export type TicketStatus = "HOLDING" | "CONFIRMED" | "CANCELLED" | "EXPIRED";

/* Trạng thái đón/trả hành khách theo chuyến. */
export type PassengerTripStatus =
  | "WAITING_PICKUP"
  | "PICKED_UP"
  | "DROPPED_OFF"
  | "NO_SHOW";

/* Thông tin chuyến và hãng để hiển thị vé điện tử. */
export type BookingTripResponse = {
  id: string;
  tripCode: string;
  status: TripStatus;
  departureAt: string;
  expectedArrivalAt: string;
  companyId: string;
  companyName: string;
  companyHotline: string;
  timezone: string;
  routeId: string;
  routeCode: string;
  routeName: string;
  originAreaId: string;
  originAreaName: string;
  destinationAreaId: string;
  destinationAreaName: string;
};

/* Một vé trong đơn đặt vé. */
export type TicketResponse = {
  id: string;
  ticketCode: string;
  passengerName: string;
  passengerPhone: string;
  pickupAddress: string;
  dropoffAddress: string;
  seatId: string;
  seatCode: string;
  fareAmount: number;
  /* true khi tài xế đã xác nhận thu tiền; null khi chưa có dữ liệu thu tiền. */
  paymentCollected: boolean | null;
  collectedAmount: number | null;
  collectedAt: string | null;
  collectedBy: string | null;
  status: TicketStatus;
  passengerTripStatus: PassengerTripStatus;
  createdAt: string;
};

/* Một đơn đặt vé của khách hàng. */
export type BookingResponse = {
  id: string;
  tripId: string;
  trip: BookingTripResponse;
  bookingCode: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  status: BookingStatus;
  holdExpiresAt: string | null;
  quotedTotalAmount: number;
  currency: string;
  confirmedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
  tickets: TicketResponse[];
};
