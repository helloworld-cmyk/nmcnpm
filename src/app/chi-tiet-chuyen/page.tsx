import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { Reveal } from "@/components/ui/reveal";
import { DetailContent } from "./_components/detail-content";

export const metadata: Metadata = {
  title: "Chi tiết chuyến & chọn ghế — Vi Vu Việt",
  description:
    "Xem hành trình, chọn ghế trên sơ đồ xe 16 chỗ, nhập địa chỉ đón/trả và xác nhận đặt chỗ.",
};

export default function ChiTietChuyenPage() {
  return (
    <SiteShell>
      <section
        className="pt-[clamp(12px,1.4vw,16px)] pb-[clamp(32px,4vw,48px)]"
        id="chi-tiet-chuyen"
      >
        <div className="container">
          <Reveal>
            <span className="section-eyebrow">Xác nhận đặt chỗ</span>
            <h1 className="mt-2.5 mb-[clamp(26px,3.5vw,40px)] text-[clamp(1.85rem,2.2vw,2.05rem)] font-extrabold leading-[1.12] tracking-[-0.032em] text-[var(--ink)] text-balance">
              Chi tiết chuyến & chọn ghế
            </h1>
          </Reveal>

          <Suspense>
            <DetailContent />
          </Suspense>
        </div>
      </section>
    </SiteShell>
  );
}
