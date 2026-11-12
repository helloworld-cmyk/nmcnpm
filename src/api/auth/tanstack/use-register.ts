"use client";

import {
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { ApiError } from "../../types";

import {
  registerAPI,
  type RegisterPayload,
  type RegisterResponse,
} from "../api/register";

type UseRegisterOptions = Omit<
  UseMutationOptions<RegisterResponse, ApiError, RegisterPayload>,
  "mutationFn"
>;

/* Mutation đăng ký; lỗi trả về là ApiError từ interceptor. */
export function useRegister(options?: UseRegisterOptions) {
  return useMutation<RegisterResponse, ApiError, RegisterPayload>({
    mutationFn: registerAPI,
    ...options,
  });
}
