import { authApi } from "../../method";

/* Gọi API đăng xuất: backend thu hồi phiên và đưa access token vào blacklist. */
export function logoutAPI(): Promise<void> {
  return authApi.post<void>("/auth/logout");
}
