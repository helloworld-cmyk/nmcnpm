import { authApi } from "../../method";

/* Trạng thái tài khoản. */
export type AccountStatus = "ACTIVE" | "PENDING" | "SUSPENDED" | "CLOSED";

/* Phản hồi /me: thông tin tài khoản hiện tại lấy từ access token. */
export type MeResponse = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  accountStatus: AccountStatus;
  createdAt: string;
  authorities: string[];
};

/* Gọi API lấy thông tin tài khoản đang đăng nhập. */
export function getMeAPI(): Promise<MeResponse> {
  return authApi.get<MeResponse>("/me");
}
