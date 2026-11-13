import { authApi } from "../../method";

import type { BookingResponse } from "./types";

/* Gọi API lấy danh sách đơn "đã hủy" của khách hàng (CANCELLED/EXPIRED, không phân trang). */
export function getMyCancelledBookingsAPI(): Promise<BookingResponse[]> {
  return authApi.get<BookingResponse[]>("/me/bookings/cancelled");
}
