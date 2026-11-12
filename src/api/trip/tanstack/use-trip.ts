"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getTripAPI } from "../api/get-trip";
import type { TripResponse } from "../api/types";
import { ApiError } from "../../types";

type UseTripOptions = Omit<
  UseQueryOptions<TripResponse, ApiError>,
  "queryKey" | "queryFn"
>;

/* Query chi tiết chuyến theo id; chỉ gọi khi có tripId. */
export function useTrip(tripId: string, options?: UseTripOptions) {
  return useQuery<TripResponse, ApiError>({
    queryKey: ["trip", tripId],
    queryFn: () => getTripAPI(tripId),
    enabled: tripId.length > 0,
    ...options,
  });
}
