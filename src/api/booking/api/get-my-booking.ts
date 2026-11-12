import { authApi } from "../../method";

import type { BookingResponse } from "./types";

/* Gọi API lấy chi tiết một đặt vé (vé điện tử) của khách hàng. */
export function getMyBookingAPI(bookingId: string): Promise<BookingResponse> {
  return authApi.get<BookingResponse>(`/me/bookings/${bookingId}`);
}
