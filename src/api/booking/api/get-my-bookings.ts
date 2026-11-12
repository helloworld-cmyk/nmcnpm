import type { PageResponse } from "@/api/types";

import { authApi } from "../../method";

import type { BookingResponse, BookingStatus } from "./types";

/* Bộ lọc và phân trang danh sách đặt vé của khách hàng. */
export type GetMyBookingsQuery = {
  status?: BookingStatus;
  routeId?: string;
  q?: string;
  page?: number;
  size?: number;
};

/* Gọi API lấy danh sách đặt vé của khách hàng, sắp xếp theo thời gian tạo mới nhất. */
export function getMyBookingsAPI(
  query?: GetMyBookingsQuery
): Promise<PageResponse<BookingResponse>> {
  return authApi.get<PageResponse<BookingResponse>>("/me/bookings", {
    params: {
      status: query?.status,
      routeId: query?.routeId,
      q: query?.q,
      page: query?.page,
      size: query?.size,
    },
  });
}
