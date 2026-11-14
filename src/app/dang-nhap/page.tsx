import type { Metadata } from "next";
import { GuestGuard } from "@/components/auth";
import { SiteShell } from "@/components/layout/site-shell";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Đăng nhập — Vi Vu Việt | Đặt xe ghép liên tỉnh",
  description:
    "Đăng nhập Vi Vu Việt để đặt xe ghép liên tỉnh, theo dõi chuyến đi và quản lý ví của bạn.",
};

export default function DangNhapPage() {
  return (
    <SiteShell>
      <GuestGuard>
        <LoginForm />
      </GuestGuard>
    </SiteShell>
  );
}
