"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getMyCompletedBookingsAPI } from "../api/get-my-completed-bookings";
import type { BookingResponse } from "../api/types";
import { ApiError } from "../../types";

type UseMyCompletedBookingsOptions = Omit<
  UseQueryOptions<BookingResponse[], ApiError>,
  "queryKey" | "queryFn"
>;

/* Query danh sách đơn đã hoàn thành của khách hàng; lỗi trả về là ApiError từ interceptor. */
export function useMyCompletedBookings(
  options?: UseMyCompletedBookingsOptions
) {
  return useQuery<BookingResponse[], ApiError>({
    queryKey: ["my-bookings", "completed"],
    queryFn: getMyCompletedBookingsAPI,
    ...options,
  });
}
