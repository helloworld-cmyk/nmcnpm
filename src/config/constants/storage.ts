export const STORAGE_KEYS = {
  accessToken: "vivuviet_access_token",
  refreshToken: "vivuviet_refresh_token",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];