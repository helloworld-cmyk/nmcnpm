import type { TripSeatResponse } from "@/api/trip/api/types";

/* Ô trong lưới ghế: một ghế hoặc ô trống (lối đi / khoảng trống). */
export type SeatCell = TripSeatResponse | null;

export type SeatRow = {
  key: string;
  /* Ghế theo đúng cột (chỉ số 0..columnCount-1); phần tử null là ô trống. */
  cells: SeatCell[];
};

export type SeatMapLayout = {
  columnCount: number;
  /* Cột không có ghế ở mọi hàng → cột lối đi, hiển thị hẹp. */
  aisleColumns: boolean[];
  rows: SeatRow[];
};

type SeatPosition = { row: number; column: number };

/*
 * Toạ độ ô của ghế. Ưu tiên rowNo/columnNo (đúng như sơ đồ cấu hình ở admin:
 * lưới rows × cols, ô trống là lối đi); nếu ghế cũ thiếu toạ độ thì suy ra từ mã
 * ghế dạng hàng + số cột (VD A01 → hàng 1, cột 1).
 */
function seatPosition(seat: TripSeatResponse): SeatPosition | null {
  if (
    typeof seat.rowNo === "number" &&
    Number.isInteger(seat.rowNo) &&
    seat.rowNo > 0 &&
    typeof seat.columnNo === "number" &&
    Number.isInteger(seat.columnNo) &&
    seat.columnNo > 0
  ) {
    return { row: seat.rowNo, column: seat.columnNo };
  }

  const match = /^([A-Za-z])(\d+)$/.exec(seat.seatCode.trim());
  if (match) {
    return {
      row: match[1].toUpperCase().charCodeAt(0) - "A".charCodeAt(0) + 1,
      column: Number(match[2]),
    };
  }

  return null;
}

/*
 * Dựng lưới ghế theo đúng toạ độ hàng/cột trả về từ API: mọi cột đều giữ vị trí,
 * cột trống (không có ghế ở bất kỳ hàng nào) là lối đi. Nhờ vậy sơ đồ hiển thị
 * khớp với cấu hình ở admin thay vì tự đoán vị trí lối đi theo số ghế mỗi hàng.
 */
export function toSeatLayout(seats: TripSeatResponse[]): SeatMapLayout {
  const positioned: { seat: TripSeatResponse; position: SeatPosition }[] = [];
  for (const seat of seats) {
    const position = seatPosition(seat);
    if (position) positioned.push({ seat, position });
  }

  if (!positioned.length) {
    return { columnCount: 0, aisleColumns: [], rows: [] };
  }

  const rowNumbers = [
    ...new Set(positioned.map((entry) => entry.position.row)),
  ].sort((a, b) => a - b);

  const columnCount = positioned.reduce(
    (max, entry) => Math.max(max, entry.position.column),
    1
  );

  const byPosition = new Map<string, TripSeatResponse>();
  const usedColumns = new Set<number>();
  for (const { seat, position } of positioned) {
    byPosition.set(`${position.row}:${position.column}`, seat);
    usedColumns.add(position.column);
  }

  const aisleColumns = Array.from(
    { length: columnCount },
    (_, index) => !usedColumns.has(index + 1)
  );

  const rows: SeatRow[] = rowNumbers.map((rowNumber) => ({
    key: String(rowNumber),
    cells: Array.from(
      { length: columnCount },
      (_, index) => byPosition.get(`${rowNumber}:${index + 1}`) ?? null
    ),
  }));

  return { columnCount, aisleColumns, rows };
}
