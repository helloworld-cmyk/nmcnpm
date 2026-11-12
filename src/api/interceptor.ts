import {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { useSessionStore } from "@/global-states/session-store";
import { STORAGE_KEYS } from "@/config/constants/storage";
import { getItem, removeItem } from "@/config/storage";

import { refreshAccessTokenAPI } from "./auth/api/refresh";
import { AuthClient } from "./client/auth-client";
import { NoAuthClient } from "./client/no-auth-client";
import { APP_CODE, ApiError, type ApiEnvelope } from "./types";

function normalizeResponse<T>(
  response: AxiosResponse<T>
): AxiosResponse<T> | Promise<AxiosResponse<T>> {
  const body = response.data as ApiEnvelope<unknown> | undefined;

  if (body && typeof body === "object" && "code" in body) {
    if (body.code === APP_CODE.SUCCESS) {
      response.data = body.wsResponse as T;
      return response;
    }
    return Promise.reject(new ApiError(body.code, body.message));
  }

  return response;
}

/* Gắn access token hiện có vào mọi yêu cầu của client cần xác thực. */
function attachAuthRequestInterceptor(client: AxiosInstance): void {
  client.interceptors.request.use((config) => {
    const accessToken = getItem(STORAGE_KEYS.accessToken);
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });
}

/* Gắn xử lý envelope chung; client cần xác thực truyền thêm hàm làm mới token. */
function attachResponseInterceptor(
  client: AxiosInstance,
  refreshToken?: () => Promise<string>
): void {
  client.interceptors.response.use(
    normalizeResponse,
    async (error: AxiosError) => {
      const original = error.config as
        | (InternalAxiosRequestConfig & { _retry?: boolean })
        | undefined;
      const status = error.response?.status;

      const shouldRefresh =
        refreshToken &&
        status === 401 &&
        original &&
        !original._retry &&
        Boolean(getItem(STORAGE_KEYS.refreshToken));

      if (shouldRefresh) {
        original._retry = true;
        try {
          const accessToken = await refreshToken();
          original.headers.Authorization = `Bearer ${accessToken}`;
          return client(original);
        } catch {
          removeItem(STORAGE_KEYS.accessToken);
          removeItem(STORAGE_KEYS.refreshToken);
          useSessionStore.getState().clearSession();
          return Promise.reject(
            new ApiError(
              APP_CODE.INVALID_TOKEN,
              "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
              401
            )
          );
        }
      }

      const body = error.response?.data as ApiEnvelope<unknown> | undefined;
      if (body && typeof body === "object" && "code" in body) {
        return Promise.reject(
          new ApiError(body.code, body.message, status ?? undefined)
        );
      }

      return Promise.reject(error);
    }
  );
}

/* AuthClient: gắn token + tự làm mới phiên khi gặp 401. */
attachAuthRequestInterceptor(AuthClient);
attachResponseInterceptor(AuthClient, refreshAccessTokenAPI);

/* NoAuthClient: chỉ chuẩn hóa envelope, không đụng tới token. */
attachResponseInterceptor(NoAuthClient);