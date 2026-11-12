import { noAuthApi } from "../../method";

import type { TripResponse } from "./types";

/* Gọi API lấy chi tiết chuyến đã công bố, đang mở bán kèm danh sách điểm dừng. */
export function getTripAPI(tripId: string): Promise<TripResponse> {
  return noAuthApi.get<TripResponse>(`/trips/${tripId}`);
}
