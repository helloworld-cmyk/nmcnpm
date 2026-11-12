import type { AreaResponse } from "@/api/area/api/get-areas";

/* Ngày mai theo giờ local, định dạng yyyy-MM-dd (dự phòng khi URL thiếu ngày) */
export function tomorrowISO(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/* So khớp đúng tên địa điểm đã nhập với danh mục areas (không phân biệt hoa thường) */
export function findArea(
  areas: AreaResponse[] | undefined,
  name: string,
): AreaResponse | undefined {
  if (!areas?.length || !name) return undefined;
  const target = name.toLowerCase();
  return areas.find((area) => area.name.trim().toLowerCase() === target);
}
