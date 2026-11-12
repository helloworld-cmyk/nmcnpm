import { noAuthApi } from "../../method";
import { wrapRequest } from "../../types";

export type RegisterPayload = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
};

/* Trạng thái tài khoản trả về từ /auth/register. */
export type RegisterAccountStatus =
  | "ACTIVE"
  | "PENDING"
  | "SUSPENDED"
  | "CLOSED";

/* Phản hồi /auth/register: thông tin tài khoản vừa tạo (không kèm token). */
export type RegisterResponse = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  accountStatus: RegisterAccountStatus;
  createdAt: string;
  authorities: string[];
};

/* Gọi API đăng ký, trả về thông tin tài khoản khi thành công. */
export function registerAPI(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  return noAuthApi.post<RegisterResponse>(
    "/auth/register",
    wrapRequest(payload)
  );
}
