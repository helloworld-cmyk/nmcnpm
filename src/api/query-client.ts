import { QueryClient } from "@tanstack/react-query";

/*
 * Một QueryClient dùng chung cho cả app ở phía browser: QueryProvider cấp cho
 * cây React, các store gọi API trực tiếp (đặt chỗ) cũng dùng lại instance này
 * để invalidate cache sau khi giữ/xác nhận ghế. Mỗi lần render server tạo
 * instance riêng để tránh rò rỉ cache giữa các request.
 */
function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | null = null;

export function getQueryClient(): QueryClient {
  if (typeof window === "undefined") return createQueryClient();
  if (!browserQueryClient) browserQueryClient = createQueryClient();
  return browserQueryClient;
}
