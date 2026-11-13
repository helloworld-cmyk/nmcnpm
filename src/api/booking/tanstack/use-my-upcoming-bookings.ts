"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getMyUpcomingBookingsAPI } from "../api/get-my-upcoming-bookings";
import type { BookingResponse } from "../api/types";
import { ApiError } from "../../types";

type UseMyUpcomingBookingsOptions = Omit<
  UseQueryOptions<BookingResponse[], ApiError>,
  "queryKey" | "queryFn"
>;

/* Query danh sách đơn sắp tới của khách hàng; lỗi trả về là ApiError từ interceptor. */
export function useMyUpcomingBookings(
  options?: UseMyUpcomingBookingsOptions
) {
  return useQuery<BookingResponse[], ApiError>({
    queryKey: ["my-bookings", "upcoming"],
    queryFn: getMyUpcomingBookingsAPI,
    ...options,
  });
}
