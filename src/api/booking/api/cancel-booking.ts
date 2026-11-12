import { authApi } from "../../method";

import type { BookingResponse } from "./types";

/* Gọi API hủy một đặt vé của khách hàng. */
export function cancelBookingAPI(bookingId: string): Promise<BookingResponse> {
  return authApi.post<BookingResponse>(`/me/bookings/${bookingId}/cancel`);
}
