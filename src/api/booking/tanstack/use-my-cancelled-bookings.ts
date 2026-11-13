"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getMyCancelledBookingsAPI } from "../api/get-my-cancelled-bookings";
import type { BookingResponse } from "../api/types";
import { ApiError } from "../../types";

type UseMyCancelledBookingsOptions = Omit<
  UseQueryOptions<BookingResponse[], ApiError>,
  "queryKey" | "queryFn"
>;

/* Query danh sách đơn đã hủy của khách hàng; lỗi trả về là ApiError từ interceptor. */
export function useMyCancelledBookings(
  options?: UseMyCancelledBookingsOptions
) {
  return useQuery<BookingResponse[], ApiError>({
    queryKey: ["my-bookings", "cancelled"],
    queryFn: getMyCancelledBookingsAPI,
    ...options,
  });
}
