import { create } from "zustand";
import { cancelBookingAPI } from "@/api/booking/api/cancel-booking";
import { confirmBookingAPI } from "@/api/booking/api/confirm-booking";
import { getMyCancelledBookingsAPI } from "@/api/booking/api/get-my-cancelled-bookings";
import { getMyCompletedBookingsAPI } from "@/api/booking/api/get-my-completed-bookings";
import { getMyInProgressBookingsAPI } from "@/api/booking/api/get-my-in-progress-bookings";
import { getMyUpcomingBookingsAPI } from "@/api/booking/api/get-my-upcoming-bookings";
import { ApiError } from "@/api/types";
import type { Trip } from "@/app/chuyen-cua-toi/_data/trips";
import { toTrip } from "@/app/chuyen-cua-toi/_utils/to-trip";

export type TripTab = "sap-toi" | "dang-di" | "hoan-thanh" | "da-huy";

export type TripsStatus = "ready" | "loading" | "error";

export const COMPLETED_PAGE_SIZE = 5;

type TripsState = {
  trips: Trip[];
  tab: TripTab;
  search: string;
  routeFilter: string;
  status: TripsStatus;
  completedVisible: number;
  loadingMore: boolean;
  cancelTargetId: string | null;
  cancelProcessing: boolean;
  confirmingId: string | null;
  /* Thông báo lỗi của thao tác hủy/xác nhận */
  actionError: string | null;
  loadBookings: () => Promise<void>;
  setTab: (tab: TripTab) => void;
  setSearch: (value: string) => void;
  setRouteFilter: (value: string) => void;
  resetFilters: () => void;
  loadMoreCompleted: () => void;
  openCancel: (tripId: string) => void;
  closeCancel: () => void;
  confirmCancel: () => Promise<void>;
  confirmBooking: (tripId: string) => Promise<void>;
};

let loadMoreTimer: number | null = null;

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  return "Không thực hiện được thao tác, vui lòng thử lại.";
}

/* Thay một đặt vé trong danh sách bằng dữ liệu mới nhất từ API */
function replaceTrip(trips: Trip[], updated: Trip): Trip[] {
  return trips.map((trip) => (trip.id === updated.id ? updated : trip));
}

export const useTripsStore = create<TripsState>()((set, get) => ({
  trips: [],
  tab: "sap-toi",
  search: "",
  routeFilter: "all",
  status: "loading",
  completedVisible: COMPLETED_PAGE_SIZE,
  loadingMore: false,
  cancelTargetId: null,
  cancelProcessing: false,
  confirmingId: null,
  actionError: null,

  /*
   * Tải danh sách đặt vé của khách hàng theo 4 nhóm trạng thái chuyến
   * (sắp tới, đang đi, hoàn thành, đã hủy) rồi gộp lại cho màn "Chuyến của tôi".
   */
  loadBookings: async () => {
    set({ status: "loading", actionError: null });
    try {
      const [upcoming, inProgress, completed, cancelled] = await Promise.all([
        getMyUpcomingBookingsAPI(),
        getMyInProgressBookingsAPI(),
        getMyCompletedBookingsAPI(),
        getMyCancelledBookingsAPI(),
      ]);
      set({
        trips: [
          ...upcoming,
          ...inProgress,
          ...completed,
          ...cancelled,
        ].map(toTrip),
        status: "ready",
        completedVisible: COMPLETED_PAGE_SIZE,
      });
    } catch {
      set({ status: "error" });
    }
  },

  setTab: (tab) => set({ tab }),

  setSearch: (value) => set({ search: value }),

  setRouteFilter: (value) => set({ routeFilter: value }),

  resetFilters: () => set({ search: "", routeFilter: "all" }),

  loadMoreCompleted: () => {
    const { loadingMore, status, completedVisible, trips } = get();
    const total = trips.filter((trip) => trip.status === "done").length;
    if (loadingMore || status !== "ready") return;
    if (completedVisible >= total) return;

    set({ loadingMore: true });
    if (loadMoreTimer) window.clearTimeout(loadMoreTimer);
    loadMoreTimer = window.setTimeout(() => {
      loadMoreTimer = null;
      set((state) => ({
        loadingMore: false,
        completedVisible: Math.min(
          state.completedVisible + COMPLETED_PAGE_SIZE,
          total,
        ),
      }));
    }, 600);
  },

  openCancel: (tripId) =>
    set({ cancelTargetId: tripId, actionError: null }),

  closeCancel: () => {
    if (get().cancelProcessing) return;
    set({ cancelTargetId: null, actionError: null });
  },

  confirmCancel: async () => {
    const { cancelTargetId, cancelProcessing } = get();
    if (!cancelTargetId || cancelProcessing) return;

    set({ cancelProcessing: true, actionError: null });
    try {
      const booking = await cancelBookingAPI(cancelTargetId);
      set((state) => ({
        cancelProcessing: false,
        cancelTargetId: null,
        trips: replaceTrip(state.trips, toTrip(booking)),
      }));
    } catch (error) {
      set({
        cancelProcessing: false,
        actionError: errorMessage(error),
      });
    }
  },

  confirmBooking: async (tripId) => {
    if (get().confirmingId) return;
    set({ confirmingId: tripId, actionError: null });
    try {
      const booking = await confirmBookingAPI(tripId);
      set((state) => ({
        confirmingId: null,
        trips: replaceTrip(state.trips, toTrip(booking)),
      }));
    } catch (error) {
      set({ confirmingId: null, actionError: errorMessage(error) });
    }
  },
}));

export function tripsOfTab(trips: Trip[], tab: TripTab): Trip[] {
  if (tab === "sap-toi") {
    return trips.filter(
      (trip) => trip.status === "confirmed" || trip.status === "pending",
    );
  }
  if (tab === "dang-di") {
    return trips.filter((trip) => trip.status === "ongoing");
  }
  if (tab === "hoan-thanh") {
    return trips.filter((trip) => trip.status === "done");
  }
  if (tab === "da-huy") {
    return trips.filter((trip) => trip.status === "canceled");
  }
  return [];
}

export function matchTrip(
  trip: Trip,
  search: string,
  routeFilter: string,
): boolean {
  const query = search.trim().toLowerCase();
  const okQuery =
    !query ||
    [trip.code, trip.route, trip.company, trip.pickup, trip.dropoff]
      .join(" ")
      .toLowerCase()
      .includes(query);
  const okRoute = routeFilter === "all" || trip.route === routeFilter;
  return okQuery && okRoute;
}

export function selectTripsFiltering(state: {
  search: string;
  routeFilter: string;
}): boolean {
  return Boolean(state.search.trim()) || state.routeFilter !== "all";
}
