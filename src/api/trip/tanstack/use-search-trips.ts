"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { searchTripsAPI, type SearchTripsQuery } from "../api/search-trips";
import type { TripResponse } from "../api/types";
import { ApiError } from "../../types";

type UseSearchTripsOptions = Omit<
  UseQueryOptions<TripResponse[], ApiError>,
  "queryKey" | "queryFn"
>;

/* Query tìm chuyến theo khu vực đi/đến và ngày khởi hành; queryKey theo bộ tham số tìm kiếm. */
export function useSearchTrips(
  query: SearchTripsQuery,
  options?: UseSearchTripsOptions
) {
  return useQuery<TripResponse[], ApiError>({
    queryKey: [
      "trips",
      query.originAreaId,
      query.destinationAreaId,
      query.departureDate,
    ],
    queryFn: () => searchTripsAPI(query),
    ...options,
  });
}
