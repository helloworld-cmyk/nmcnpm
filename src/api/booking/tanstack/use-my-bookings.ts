"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import type { PageResponse } from "@/api/types";

import {
  getMyBookingsAPI,
  type GetMyBookingsQuery,
} from "../api/get-my-bookings";
import type { BookingResponse } from "../api/types";
import { ApiError } from "../../types";

type UseMyBookingsOptions = Omit<
  UseQueryOptions<PageResponse<BookingResponse>, ApiError>,
  "queryKey" | "queryFn"
>;

/* Query danh sách đặt vé của khách hàng; queryKey theo bộ lọc và phân trang. */
export function useMyBookings(
  query?: GetMyBookingsQuery,
  options?: UseMyBookingsOptions
) {
  return useQuery<PageResponse<BookingResponse>, ApiError>({
    queryKey: [
      "my-bookings",
      query?.status,
      query?.routeId,
      query?.q,
      query?.page,
      query?.size,
    ],
    queryFn: () => getMyBookingsAPI(query),
    ...options,
  });
}
