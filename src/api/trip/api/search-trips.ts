import { noAuthApi } from "../../method";

import type { TripResponse } from "./types";

/* Tham số tìm chuyến công khai. */
export type SearchTripsQuery = {
  originAreaId: string;
  destinationAreaId: string;
  departureDate: string;
};

/* Gọi API tìm chuyến đã công bố, đang mở bán theo khu vực đi/đến và ngày khởi hành (yyyy-MM-dd). */
export function searchTripsAPI(
  query: SearchTripsQuery
): Promise<TripResponse[]> {
  return noAuthApi.get<TripResponse[]>("/trips", {
    params: {
      origin_area_id: query.originAreaId,
      destination_area_id: query.destinationAreaId,
      departure_date: query.departureDate,
    },
  });
}
