"use client";

import { useMemo } from "react";
import {
  matchTrip,
  selectTripsFiltering,
  tripsOfTab,
  useTripsStore,
  type TripTab,
} from "@/global-states/trips-store";
import type { Trip } from "../_data/trips";

export const TAB_IDS: TripTab[] = ["sap-toi", "dang-di", "hoan-thanh", "da-huy"];

/*
 * Gom state của trips-store thành dữ liệu hiển thị cho màn "Chuyến của tôi":
 * số lượng mỗi tab, danh sách đã lọc, danh sách đang hiện (phân trang hoàn
 * thành) và câu trạng thái. Trả kèm vài action để component không tự đọc store.
 */
export function useTripsView() {
  const trips = useTripsStore((state) => state.trips);
  const tab = useTripsStore((state) => state.tab);
  const search = useTripsStore((state) => state.search);
  const routeFilter = useTripsStore((state) => state.routeFilter);
  const status = useTripsStore((state) => state.status);
  const completedVisible = useTripsStore((state) => state.completedVisible);
  const filtering = useTripsStore(selectTripsFiltering);
  const setTab = useTripsStore((state) => state.setTab);
  const resetFilters = useTripsStore((state) => state.resetFilters);

  const counts = useMemo(
    () => ({
      "sap-toi": tripsOfTab(trips, "sap-toi").length,
      "dang-di": tripsOfTab(trips, "dang-di").length,
      "hoan-thanh": tripsOfTab(trips, "hoan-thanh").length,
      "da-huy": tripsOfTab(trips, "da-huy").length,
    }),
    [trips],
  );

  const matched = useMemo(() => {
    const map = {} as Record<TripTab, Trip[]>;
    for (const id of TAB_IDS) {
      map[id] = tripsOfTab(trips, id).filter((trip) =>
        matchTrip(trip, search, routeFilter),
      );
    }
    return map;
  }, [trips, search, routeFilter]);

  const visible = useMemo(() => {
    const map = { ...matched };
    if (!filtering) {
      map["hoan-thanh"] = matched["hoan-thanh"].slice(0, completedVisible);
    }
    return map;
  }, [matched, filtering, completedVisible]);

  const statusText = useMemo(() => {
    if (status === "loading") return "Đang tải chuyến của bạn...";
    if (status === "error") return "Không tải được chuyến của bạn.";

    if (filtering) {
      const shown = visible[tab].length;
      const total = tripsOfTab(trips, tab).length;
      return shown
        ? `Tìm thấy ${shown} trong ${total} chuyến.`
        : "Không có chuyến nào phù hợp bộ lọc.";
    }

    if (tab === "hoan-thanh") {
      const total = counts["hoan-thanh"];
      const shown = visible["hoan-thanh"].length;
      return shown < total
        ? `Đang xem ${shown} trong ${total} chuyến · cuộn xuống để xem thêm.`
        : `Đang xem tất cả ${total} chuyến đã hoàn thành.`;
    }
    if (tab === "sap-toi") {
      return counts["sap-toi"]
        ? `Đang xem ${counts["sap-toi"]} chuyến sắp tới.`
        : "Chưa có chuyến sắp tới.";
    }
    if (tab === "da-huy") {
      return counts["da-huy"]
        ? `Đang xem ${counts["da-huy"]} chuyến đã hủy.`
        : "Chưa có chuyến nào đã hủy.";
    }
    return "Không có chuyến nào đang di chuyển.";
  }, [status, filtering, visible, tab, trips, counts]);

  return {
    tab,
    status,
    filtering,
    counts,
    matched,
    visible,
    statusText,
    setTab,
    resetFilters,
  };
}
