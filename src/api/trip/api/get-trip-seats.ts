import { noAuthApi } from "../../method";

import type { TripSeatResponse } from "./types";

/* Gọi API lấy sơ đồ ghế và tình trạng còn trống của chuyến đang mở bán. */
export function getTripSeatsAPI(tripId: string): Promise<TripSeatResponse[]> {
  return noAuthApi.get<TripSeatResponse[]>(`/trips/${tripId}/seats`);
}
