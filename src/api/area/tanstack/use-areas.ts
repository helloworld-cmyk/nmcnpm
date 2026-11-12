"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import {
  getAreasAPI,
  type AreaResponse,
  type GetAreasQuery,
} from "../api/get-areas";
import { ApiError } from "../../types";

type UseAreasOptions = Omit<
  UseQueryOptions<AreaResponse[], ApiError>,
  "queryKey" | "queryFn"
>;

/* Query danh sách địa điểm; queryKey theo từ khóa/địa điểm cha/cấp địa điểm. */
export function useAreas(query?: GetAreasQuery, options?: UseAreasOptions) {
  return useQuery<AreaResponse[], ApiError>({
    queryKey: ["areas", query?.keyword, query?.parentId, query?.type],
    queryFn: () => getAreasAPI(query),
    ...options,
  });
}
