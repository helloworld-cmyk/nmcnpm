"use client";

import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/config/constants/storage";
import { getItem, removeItem } from "@/config/storage";
import { useMe } from "@/api/auth/tanstack/use-me";
import { APP_CODE, ApiError } from "@/api/types";
import { useSessionStore } from "@/global-states/session-store";

/*
 * Đồng bộ phiên đăng nhập thật: nếu có access token trong storage thì gọi /me
 * và nạp thông tin tài khoản vào session store; token hỏng thì dọn token + phiên.
 */
export function SessionSync() {
  const setUser = useSessionStore((state) => state.setUser);
  const markReady = useSessionStore((state) => state.markReady);

  /* Đọc token lúc khởi tạo (SSR-safe nhờ helper trả null khi không có window) */
  const [hasToken] = useState(() =>
    Boolean(getItem(STORAGE_KEYS.accessToken)),
  );

  const { data, error, isFetched } = useMe({
    enabled: hasToken,
    retry: false,
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    if (!data) return;
    setUser({
      id: data.id,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
    });
  }, [data, setUser]);

  useEffect(() => {
    if (!error) return;
    const invalidSession =
      error instanceof ApiError &&
      (error.status === 401 || error.code === APP_CODE.INVALID_TOKEN);
    if (!invalidSession) return;

    removeItem(STORAGE_KEYS.accessToken);
    removeItem(STORAGE_KEYS.refreshToken);
    setUser(null);
  }, [error, setUser]);

  /* Chạy sau 2 effect trên: không có token → chắc chắn là khách;
   * có token → chờ /me xong rồi mới chốt trạng thái phiên */
  useEffect(() => {
    if (!hasToken || isFetched) markReady();
  }, [hasToken, isFetched, markReady]);

  return null;
}
