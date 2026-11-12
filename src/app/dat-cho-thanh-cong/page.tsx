import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { Reveal } from "@/components/ui/reveal";
import { SuccessActions } from "./_components/success-actions";
import { SuccessHero } from "./_components/success-hero";
import { TicketCard } from "./_components/ticket-card";

export const metadata: Metadata = {
  title: "Đặt chỗ thành công — Vi Vu Việt",
  description:
    "Vé điện tử, mã đặt chỗ, QR điểm danh và hướng dẫn đón xe cho chuyến đã đặt.",
};

export default function DatChoThanhCongPage() {
  return (
    <SiteShell>
      <section
        className="pt-[clamp(24px,3.5vw,40px)] pb-[clamp(36px,5vw,56px)]"
        id="dat-cho-thanh-cong"
      >
        <div className="container">
          <SuccessHero />

          <div className="mx-auto mt-[clamp(16px,2.5vw,24px)] grid max-w-[820px] items-start gap-3.5">
            <div className="grid min-w-0 gap-3.5">
              <Reveal>
                <Suspense>
                  <TicketCard />
                </Suspense>
              </Reveal>
              <SuccessActions />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
