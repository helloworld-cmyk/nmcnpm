"use client";

import {
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

import {
  createBookingAPI,
  type CreateBookingPayload,
} from "../api/create-booking";
import type { BookingResponse } from "../api/types";
import { ApiError } from "../../types";

type UseCreateBookingOptions = Omit<
  UseMutationOptions<BookingResponse, ApiError, CreateBookingPayload>,
  "mutationFn"
>;

/* Mutation tạo đặt vé và giữ ghế; lỗi trả về là ApiError từ interceptor. */
export function useCreateBooking(options?: UseCreateBookingOptions) {
  return useMutation<BookingResponse, ApiError, CreateBookingPayload>({
    mutationFn: createBookingAPI,
    ...options,
  });
}
