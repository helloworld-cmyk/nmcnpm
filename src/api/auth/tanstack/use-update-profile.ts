"use client";

import {
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

import {
  updateProfileAPI,
  type UpdateProfilePayload,
} from "../api/update-profile";
import type { ProfileResponse } from "../api/get-profile";
import { ApiError } from "../../types";

type UseUpdateProfileOptions = Omit<
  UseMutationOptions<ProfileResponse, ApiError, UpdateProfilePayload>,
  "mutationFn"
>;

/* Mutation cập nhật hồ sơ khách hàng; lỗi trả về là ApiError từ interceptor. */
export function useUpdateProfile(options?: UseUpdateProfileOptions) {
  return useMutation<ProfileResponse, ApiError, UpdateProfilePayload>({
    mutationFn: updateProfileAPI,
    ...options,
  });
}
