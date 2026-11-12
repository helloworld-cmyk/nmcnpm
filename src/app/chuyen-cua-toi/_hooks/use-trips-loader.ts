"use client";

import { useCallback, useEffect, useRef } from "react";
import { selectTripsFiltering, useTripsStore } from "@/global-states/trips-store";

/*
 * Điều khiển việc nạp dữ liệu của màn "Chuyến của tôi":
 * - tải danh sách đặt vé khi mở màn (và hàm `reload` để thử lại),
 * - tự tải thêm chuyến đã hoàn thành khi cuộn tới cuối (IntersectionObserver).
 */
export function useTripsLoader() {
  const status = useTripsStore((state) => state.status);
  const tab = useTripsStore((state) => state.tab);
  const filtering = useTripsStore(selectTripsFiltering);
  const loadingMore = useTripsStore((state) => state.loadingMore);
  const loadBookings = useTripsStore((state) => state.loadBookings);
  const loadMoreCompleted = useTripsStore((state) => state.loadMoreCompleted);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void loadBookings();
  }, [loadBookings]);

  useEffect(() => {
    if (status !== "ready" || tab !== "hoan-thanh" || filtering) return;
    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadMoreCompleted();
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [status, tab, filtering, loadMoreCompleted]);

  const reload = useCallback(() => {
    void loadBookings();
  }, [loadBookings]);

  return { sentinelRef, loadingMore, reload };
}
