import { authApi } from "../../method";

import type { BookingResponse } from "./types";

/* Gọi API lấy danh sách đơn "đã hoàn thành" của khách hàng (chuyến COMPLETED, không phân trang). */
export function getMyCompletedBookingsAPI(): Promise<BookingResponse[]> {
  return authApi.get<BookingResponse[]>("/me/bookings/completed");
}
