import type { TripSeatResponse } from "@/api/trip/api/types";

export type SeatRow = { key: string; seats: TripSeatResponse[] };

/* Gom ghế API thành từng hàng theo số hàng (xe một tầng), sắp theo cột */
export function toSeatRows(seats: TripSeatResponse[]): SeatRow[] {
  const groups = new Map<number, TripSeatResponse[]>();
  for (const seat of seats) {
    const list = groups.get(seat.rowNo);
    if (list) list.push(seat);
    else groups.set(seat.rowNo, [seat]);
  }

  return [...groups.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([rowNo, list]) => ({
      key: String(rowNo),
      seats: list.slice().sort((a, b) => a.columnNo - b.columnNo),
    }));
}
