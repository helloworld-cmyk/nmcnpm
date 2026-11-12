import { authApi } from "../../method";
import { wrapRequest } from "../../types";

import type { ProfileResponse } from "./get-profile";

/* Tham số cập nhật hồ sơ; trường không gửi hoặc null được giữ nguyên. */
export type UpdateProfilePayload = {
  fullName?: string;
  email?: string;
  phone?: string;
};

/* Gọi API cập nhật hồ sơ của khách hàng đang đăng nhập. */
export function updateProfileAPI(
  payload: UpdateProfilePayload
): Promise<ProfileResponse> {
  return authApi.patch<ProfileResponse>(
    "/me/profile",
    wrapRequest(payload)
  );
}
