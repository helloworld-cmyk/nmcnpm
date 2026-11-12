import { authApi } from "../../method";

import type { BookingResponse } from "./types";

/* Gọi API xác nhận một đặt vé đang giữ ghế. */
export function confirmBookingAPI(bookingId: string): Promise<BookingResponse> {
  return authApi.post<BookingResponse>(`/me/bookings/${bookingId}/confirm`);
}
