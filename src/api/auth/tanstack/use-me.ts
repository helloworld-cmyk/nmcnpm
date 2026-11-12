"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getMeAPI, type MeResponse } from "../api/get-me";
import { ApiError } from "../../types";

type UseMeOptions = Omit<
  UseQueryOptions<MeResponse, ApiError>,
  "queryKey" | "queryFn"
>;

/* Query thông tin tài khoản đang đăng nhập; lỗi trả về là ApiError từ interceptor. */
export function useMe(options?: UseMeOptions) {
  return useQuery<MeResponse, ApiError>({
    queryKey: ["me"],
    queryFn: getMeAPI,
    ...options,
  });
}
