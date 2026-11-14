"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useSessionStore } from "@/global-states/session-store";

/*
 * Chặn màn chỉ dành cho khách (đăng nhập/đăng ký): chờ phiên đồng bộ xong,
 * nếu đã có tài khoản thì chuyển về trang chủ, ngược lại mới render nội dung.
 * Không phản ứng với tài khoản vừa đăng nhập trên chính màn này để không
 * tranh chấp với điều hướng theo ?next= của login-store.
 */
export function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const ready = useSessionStore((state) => state.ready);
  const readyWithUser = useSessionStore((state) => state.readyWithUser);
  /* Chụp tài khoản lúc mount: điều hướng nội bộ tới màn này khi đã đăng nhập */
  const [mountedWithUser] = useState(
    () => useSessionStore.getState().user !== null,
  );

  const isMember = mountedWithUser || (ready && readyWithUser);

  useEffect(() => {
    if (isMember) router.replace("/");
  }, [isMember, router]);

  if (!ready || isMember) return null;

  return <>{children}</>;
}
