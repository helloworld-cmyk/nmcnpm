import type { ReactNode } from "react";

const SCREEN_BASE =
  "container flex flex-col items-center gap-[clamp(20px,3vw,30px)] pt-[clamp(32px,5vw,64px)] pb-[clamp(48px,6vw,88px)] max-[640px]:gap-[18px]";

/* Khung bố cục chung cho màn đăng nhập và màn đăng ký */
export function AuthScreen({ children }: { children: ReactNode }) {
  return <div className={SCREEN_BASE}>{children}</div>;
}
