import { authApi } from "../../method";
import { wrapRequest } from "../../types";

import type { BookingResponse } from "./types";

/* Thông tin một hành khách: ghế đã chọn và địa chỉ đón/trả. */
export type CreateBookingPassenger = {
  passengerName: string;
  passengerPhone?: string;
  pickupAddress: string;
  dropoffAddress: string;
  seatId: string;
};

/* Tham số tạo đặt vé và giữ ghế cho một chuyến (tối đa 8 hành khách). */
export type CreateBookingPayload = {
  tripId: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  passengers: CreateBookingPassenger[];
};

/* Gọi API tạo đặt vé và giữ ghế trong 5 phút; giá do server tính. */
export function createBookingAPI(
  payload: CreateBookingPayload
): Promise<BookingResponse> {
  return authApi.post<BookingResponse>("/me/bookings", wrapRequest(payload));
}
