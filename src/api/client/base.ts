import type { AxiosRequestConfig } from "axios";

export const API_BASE_URL =
  process.env.API_BASE_URL ?? "http://localhost:8080/api/v1";

export const CLIENT_CONFIG: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
};