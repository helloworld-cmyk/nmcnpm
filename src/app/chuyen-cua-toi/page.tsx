import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { TripsPage } from "./_components/trips-page";

export const metadata: Metadata = {
  title: "Chuyến của tôi — Vi Vu Việt",
  description:
    "Quản lý chuyến đã đặt: sắp tới, đang đi, hoàn thành, hủy — đánh giá nhanh.",
};

export default function ChuyenCuaToiPage() {
  return (
    <SiteShell>
      <TripsPage />
    </SiteShell>
  );
}
