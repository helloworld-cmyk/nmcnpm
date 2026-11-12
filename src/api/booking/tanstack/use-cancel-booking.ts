"use client";

import {
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

import { cancelBookingAPI } from "../api/cancel-booking";
import type { BookingResponse } from "../api/types";
import { ApiError } from "../../types";

type UseCancelBookingOptions = Omit<
  UseMutationOptions<BookingResponse, ApiError, string>,
  "mutationFn"
>;

/* Mutation hủy đặt vé theo id; lỗi trả về là ApiError từ interceptor. */
export function useCancelBooking(options?: UseCancelBookingOptions) {
  return useMutation<BookingResponse, ApiError, string>({
    mutationFn: cancelBookingAPI,
    ...options,
  });
}
