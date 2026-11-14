import type { Metadata } from "next";
import { GuestGuard } from "@/components/auth";
import { SiteShell } from "@/components/layout/site-shell";
import { RegisterForm } from "./_components/register-form";

export const metadata: Metadata = {
  title: "Đăng ký — Vi Vu Việt | Tạo tài khoản đặt xe ghép",
  description:
    "Tạo tài khoản Vi Vu Việt miễn phí trong 60 giây để đặt xe ghép liên tỉnh, giá minh bạch, đón trả tận nơi.",
};

export default function DangKyPage() {
  return (
    <SiteShell>
      <GuestGuard>
        <RegisterForm />
      </GuestGuard>
    </SiteShell>
  );
}
