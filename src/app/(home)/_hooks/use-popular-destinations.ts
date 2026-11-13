"use client";

import { useMemo } from "react";
import type { AreaResponse } from "@/api/area/api/get-areas";
import { useAreas } from "@/api/area/tanstack/use-areas";

const AREA_QUERY_OPTIONS = { staleTime: 5 * 60_000 };

/* Các thành phố lớn ưu tiên hiển thị trước; còn lại sắp theo tên tiếng Việt. */
const PRIORITY_CITIES = [
  "hà nội",
  "hồ chí minh",
  "đà nẵng",
  "hải phòng",
  "cần thơ",
  "huế",
];

const PRIORITY_RANK = new Map(PRIORITY_CITIES.map((name, index) => [name, index]));

/* Bỏ tiền tố cấp hành chính ("Thành phố", "Tỉnh", "TP.") để so khớp tên. */
function normalizeAreaName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/^(thành phố|tỉnh|tp\.?)\s+/u, "");
}

function priorityIndex(name: string) {
  const key = normalizeAreaName(name);
  for (const [city, index] of PRIORITY_RANK) {
    if (key === city || key.includes(city)) return index;
  }
  return Number.POSITIVE_INFINITY;
}

/*
 * Danh sách điểm đến lấy hoàn toàn từ API /areas (tỉnh + thành phố), gộp và bỏ
 * trùng tên (Hà Nội/Đà Nẵng có ở cả 2 cấp) rồi sắp xếp: ưu tiên các thành phố
 * lớn trước, sau đó theo tên tiếng Việt.
 */
export function usePopularDestinations() {
  const {
    data: cities,
    isPending: loadingCities,
    isError: errorCities,
  } = useAreas({ type: "city" }, AREA_QUERY_OPTIONS);
  const {
    data: provinces,
    isPending: loadingProvinces,
    isError: errorProvinces,
  } = useAreas({ type: "province" }, AREA_QUERY_OPTIONS);

  const areas = useMemo(() => {
    const byName = new Map<string, AreaResponse>();
    for (const area of [...(cities ?? []), ...(provinces ?? [])]) {
      const key = area.name.trim().toLowerCase();
      if (!byName.has(key)) byName.set(key, area);
    }
    return [...byName.values()].sort((a, b) => {
      const rankA = priorityIndex(a.name);
      const rankB = priorityIndex(b.name);
      if (rankA !== rankB) return rankA - rankB;
      return a.name.localeCompare(b.name, "vi");
    });
  }, [cities, provinces]);

  return {
    areas,
    loading: loadingCities || loadingProvinces,
    failed: errorCities || errorProvinces,
  };
}
