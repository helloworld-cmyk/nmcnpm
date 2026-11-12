"use client";

import {
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

import { confirmBookingAPI } from "../api/confirm-booking";
import type { BookingResponse } from "../api/types";
import { ApiError } from "../../types";

type UseConfirmBookingOptions = Omit<
  UseMutationOptions<BookingResponse, ApiError, string>,
  "mutationFn"
>;

/* Mutation xác nhận đặt vé theo id; lỗi trả về là ApiError từ interceptor. */
export function useConfirmBooking(options?: UseConfirmBookingOptions) {
  return useMutation<BookingResponse, ApiError, string>({
    mutationFn: confirmBookingAPI,
    ...options,
  });
}
