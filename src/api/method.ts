import type { AxiosInstance, AxiosRequestConfig } from "axios";

import { AuthClient, NoAuthClient } from "./client";

function createMethods(client: AxiosInstance) {
  return {
    async get<T>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<T> {
      const response = await client.get<T>(url, config);
      return response.data;
    },

    async post<T>(
      url: string,
      payload?: unknown,
      config?: AxiosRequestConfig
    ): Promise<T> {
      const response = await client.post<T>(url, payload, config);
      return response.data;
    },

    async put<T>(
      url: string,
      payload?: unknown,
      config?: AxiosRequestConfig
    ): Promise<T> {
      const response = await client.put<T>(url, payload, config);
      return response.data;
    },

    async patch<T>(
      url: string,
      payload?: unknown,
      config?: AxiosRequestConfig
    ): Promise<T> {
      const response = await client.patch<T>(url, payload, config);
      return response.data;
    },

    async delete<T>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<T> {
      const response = await client.delete<T>(url, config);
      return response.data;
    },
  };
}

/* Các API cần đăng nhập (tự gắn token, tự refresh khi hết hạn). */
export const authApi = createMethods(AuthClient);

/* Các API công khai như đăng nhập, đăng ký, làm mới token. */
export const noAuthApi = createMethods(NoAuthClient);