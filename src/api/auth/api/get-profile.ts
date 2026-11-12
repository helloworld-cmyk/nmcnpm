import { authApi } from "../../method";

import type { AccountStatus } from "./get-me";

/* Phản hồi /me/profile: hồ sơ chi tiết của khách hàng đang đăng nhập. */
export type ProfileResponse = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  accountStatus: AccountStatus;
  phoneVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/* Gọi API lấy hồ sơ của khách hàng đang đăng nhập. */
export function getProfileAPI(): Promise<ProfileResponse> {
  return authApi.get<ProfileResponse>("/me/profile");
}
