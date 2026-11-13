"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getMyInProgressBookingsAPI } from "../api/get-my-in-progress-bookings";
import type { BookingResponse } from "../api/types";
import { ApiError } from "../../types";

type UseMyInProgressBookingsOptions = Omit<
  UseQueryOptions<BookingResponse[], ApiError>,
  "queryKey" | "queryFn"
>;

/* Query danh sách đơn đang đi của khách hàng; lỗi trả về là ApiError từ interceptor. */
export function useMyInProgressBookings(
  options?: UseMyInProgressBookingsOptions
) {
  return useQuery<BookingResponse[], ApiError>({
    queryKey: ["my-bookings", "in-progress"],
    queryFn: getMyInProgressBookingsAPI,
    ...options,
  });
}
