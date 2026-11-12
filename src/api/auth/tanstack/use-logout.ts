"use client";

import {
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

import { logoutAPI } from "../api/logout";
import { ApiError } from "../../types";

type UseLogoutOptions = Omit<
  UseMutationOptions<void, ApiError, void>,
  "mutationFn"
>;

/* Mutation đăng xuất; lỗi trả về là ApiError từ interceptor. */
export function useLogout(options?: UseLogoutOptions) {
  return useMutation<void, ApiError, void>({
    mutationFn: logoutAPI,
    ...options,
  });
}
