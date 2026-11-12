"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getMyBookingAPI } from "../api/get-my-booking";
import type { BookingResponse } from "../api/types";
import { ApiError } from "../../types";

type UseMyBookingOptions = Omit<
  UseQueryOptions<BookingResponse, ApiError>,
  "queryKey" | "queryFn"
>;

/* Query chi tiết một đặt vé theo id; chỉ gọi khi có bookingId. */
export function useMyBooking(
  bookingId: string,
  options?: UseMyBookingOptions
) {
  return useQuery<BookingResponse, ApiError>({
    queryKey: ["my-booking", bookingId],
    queryFn: () => getMyBookingAPI(bookingId),
    enabled: bookingId.length > 0,
    ...options,
  });
}
