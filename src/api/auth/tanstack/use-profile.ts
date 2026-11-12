"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getProfileAPI, type ProfileResponse } from "../api/get-profile";
import { ApiError } from "../../types";

type UseProfileOptions = Omit<
  UseQueryOptions<ProfileResponse, ApiError>,
  "queryKey" | "queryFn"
>;

/* Query hồ sơ khách hàng đang đăng nhập; lỗi trả về là ApiError từ interceptor. */
export function useProfile(options?: UseProfileOptions) {
  return useQuery<ProfileResponse, ApiError>({
    queryKey: ["profile"],
    queryFn: getProfileAPI,
    ...options,
  });
}
