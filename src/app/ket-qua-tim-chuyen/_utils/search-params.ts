import type { AreaResponse } from "@/api/area/api/get-areas";

/* Ngày mai theo giờ local, định dạng yyyy-MM-dd (dự phòng khi URL thiếu ngày) */
export function tomorrowISO(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/* Ưu tiên bản ghi CITY khi danh mục có trùng tên ở nhiều cấp (dữ liệu backend hiện tại) */
const AREA_TYPE_PRIORITY: Record<string, number> = {
  city: 0,
  province: 1,
  district: 2,
  ward: 3,
};

function areaTypeRank(type: string): number {
  return AREA_TYPE_PRIORITY[type.trim().toLowerCase()] ?? 99;
}

/* So khớp đúng tên địa điểm đã nhập với danh mục areas (không phân biệt hoa thường) */
export function findArea(
  areas: AreaResponse[] | undefined,
  name: string,
): AreaResponse | undefined {
  if (!areas?.length || !name) return undefined;
  const target = name.trim().toLowerCase();
  return areas
    .filter((area) => area.name.trim().toLowerCase() === target)
    .sort((a, b) => areaTypeRank(a.type) - areaTypeRank(b.type))[0];
}
