import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { SearchResults } from "./_components/search-results";

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm chuyến — Vi Vu Việt",
  description:
    "Danh sách chuyến ghép khớp tìm kiếm — sắp xếp, lọc theo khung giờ và loại xe rồi chọn chuyến.",
};

export default function KetQuaTimChuyenPage() {
  return (
    <SiteShell>
      <Suspense>
        <SearchResults />
      </Suspense>
    </SiteShell>
  );
}
