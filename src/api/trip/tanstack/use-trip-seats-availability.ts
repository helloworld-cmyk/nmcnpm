"use client";

import { useQueries } from "@tanstack/react-query";

import { getTripSeatsAPI } from "../api/get-trip-seats";

export type TripSeatsAvailability = Record<string, number | null>;

/*
 * Ghép tình trạng ghế của nhiều chuyến: dùng chung queryKey ["trip-seats", id]
 * với useTripSeats nên tái sử dụng cache, không gọi lặp. Chỉ truyền các chuyến
 * đang hiển thị để tránh N+1 cho toàn bộ danh sách.
 */
export function useTripSeatsAvailability(tripIds: string[]) {
  return useQueries({
    queries: tripIds.map((tripId) => ({
      queryKey: ["trip-seats", tripId],
      queryFn: () => getTripSeatsAPI(tripId),
      enabled: tripId.length > 0,
    })),
    combine: (results) => {
      const availability: TripSeatsAvailability = {};
      results.forEach((result, index) => {
        const tripId = tripIds[index];
        if (!tripId) return;
        availability[tripId] = result.data
          ? result.data.filter((seat) => seat.available).length
          : null;
      });
      return { availability };
    },
  });
}
