"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { getTripSeatsAPI } from "../api/get-trip-seats";
import type { TripSeatResponse } from "../api/types";
import { ApiError } from "../../types";

type UseTripSeatsOptions = Omit<
  UseQueryOptions<TripSeatResponse[], ApiError>,
  "queryKey" | "queryFn"
>;

/* Query sơ đồ ghế của chuyến theo id; chỉ gọi khi có tripId. */
export function useTripSeats(tripId: string, options?: UseTripSeatsOptions) {
  return useQuery<TripSeatResponse[], ApiError>({
    queryKey: ["trip-seats", tripId],
    queryFn: () => getTripSeatsAPI(tripId),
    enabled: tripId.length > 0,
    ...options,
  });
}
