import { authApi } from "../../method";

import type { BookingResponse } from "./types";

/* Gọi API lấy danh sách đơn "đang đi" của khách hàng (chuyến IN_PROGRESS, không phân trang). */
export function getMyInProgressBookingsAPI(): Promise<BookingResponse[]> {
  return authApi.get<BookingResponse[]>("/me/bookings/in-progress");
}
