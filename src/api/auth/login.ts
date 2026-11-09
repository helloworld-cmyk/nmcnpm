import { noAuthApi } from "../method";
import { wrapRequest } from "../types";

export type LoginPayload = {
  identifier: string;
  password: string;
};

/* Phản hồi /auth/login: cặp token xác thực khi đăng nhập thành công. */
export type LoginResponse = {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

/* Gọi API đăng nhập, trả về cặp token khi thành công. */
export function login(payload: LoginPayload): Promise<LoginResponse> {
  return noAuthApi.post<LoginResponse>("/auth/login", wrapRequest(payload));
}
