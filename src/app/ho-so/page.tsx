import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ProfilePage } from "./_components/profile-page";

export const metadata: Metadata = {
  title: "Hồ sơ cá nhân — Vi Vu Việt",
  description:
    "Quản lý thông tin cá nhân, địa chỉ đón xe và tùy chọn đi chung trên Vi Vu Việt.",
};

export default function HoSoPage() {
  return (
    <SiteShell>
      <ProfilePage />
    </SiteShell>
  );
}
