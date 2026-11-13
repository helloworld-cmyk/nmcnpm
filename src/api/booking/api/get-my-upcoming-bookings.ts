import { authApi } from "../../method";

import type { BookingResponse } from "./types";

/* Gọi API lấy danh sách đơn "sắp tới" của khách hàng (chuyến SCHEDULED, không phân trang). */
export function getMyUpcomingBookingsAPI(): Promise<BookingResponse[]> {
  return authApi.get<BookingResponse[]>("/me/bookings/upcoming");
}
