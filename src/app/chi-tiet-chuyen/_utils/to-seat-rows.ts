import type { TripSeatResponse } from "@/api/trip/api/types";

export type SeatRow = { key: string; seats: TripSeatResponse[] };

/* Gom ghế API thành từng hàng theo tầng + số hàng, sắp theo cột */
export function toSeatRows(seats: TripSeatResponse[]): SeatRow[] {
  const groups = new Map<string, TripSeatResponse[]>();
  for (const seat of seats) {
    const key = `${seat.deck}-${seat.rowNo}`;
    const list = groups.get(key);
    if (list) list.push(seat);
    else groups.set(key, [seat]);
  }

  return [...groups.entries()]
    .sort((a, b) => {
      const [deckA, rowA] = a[0].split("-").map(Number);
      const [deckB, rowB] = b[0].split("-").map(Number);
      return deckA - deckB || rowA - rowB;
    })
    .map(([key, list]) => ({
      key,
      seats: list.slice().sort((a, b) => a.columnNo - b.columnNo),
    }));
}
