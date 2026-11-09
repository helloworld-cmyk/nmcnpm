import { create } from "zustand";
import { TRIPS, type Trip } from "@/app/chuyen-cua-toi/_data/trips";

export type TripTab = "sap-toi" | "dang-di" | "hoan-thanh" | "da-huy";

export type TripsStatus = "ready" | "loading" | "error";

export const COMPLETED_PAGE_SIZE = 5;
const LOAD_MORE_DELAY = 600;
const CANCEL_DELAY = 900;

const CANCELED_NOTE = "Đã hủy · chưa thanh toán";

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
  setTab: (tab: TripTab) => void;
  setSearch: (value: string) => void;
  setRouteFilter: (value: string) => void;
  resetFilters: () => void;
  beginLoading: () => void;
  finishLoading: () => void;
  showError: () => void;
  loadMoreCompleted: () => void;
  openCancel: (tripId: string) => void;
  closeCancel: () => void;
  confirmCancel: () => void;
};

let loadMoreTimer: number | null = null;
let cancelTimer: number | null = null;

export const useTripsStore = create<TripsState>()((set, get) => ({
  trips: TRIPS,
  tab: "sap-toi",
  search: "",
  routeFilter: "all",
  status: "ready",
  completedVisible: COMPLETED_PAGE_SIZE,
  loadingMore: false,
  cancelTargetId: null,
  cancelProcessing: false,

  setTab: (tab) => set({ tab }),

  setSearch: (value) => set({ search: value }),

  setRouteFilter: (value) => set({ routeFilter: value }),

  resetFilters: () => set({ search: "", routeFilter: "all" }),

  beginLoading: () => set({ status: "loading" }),

  finishLoading: () => set({ status: "ready" }),

  showError: () => set({ status: "error" }),

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
    }, LOAD_MORE_DELAY);
  },

  openCancel: (tripId) => set({ cancelTargetId: tripId }),

  closeCancel: () => {
    if (get().cancelProcessing) return;
    set({ cancelTargetId: null, cancelProcessing: false });
  },

  confirmCancel: () => {
    const { cancelTargetId, cancelProcessing } = get();
    if (!cancelTargetId || cancelProcessing) return;

    set({ cancelProcessing: true });
    if (cancelTimer) window.clearTimeout(cancelTimer);
    cancelTimer = window.setTimeout(() => {
      cancelTimer = null;
      set((state) => ({
        cancelProcessing: false,
        cancelTargetId: null,
        trips: state.trips.map((trip) =>
          trip.id === state.cancelTargetId
            ? {
                ...trip,
                status: "canceled" as const,
                payNote: CANCELED_NOTE,
                alert: {
                  tone: "sky" as const,
                  icon: "close" as const,
                  message:
                    "Bạn đã hủy vé — ghế được giải phóng cho hành khách khác.",
                },
              }
            : trip,
        ),
      }));
    }, CANCEL_DELAY);
  },
}));

export function tripsOfTab(trips: Trip[], tab: TripTab): Trip[] {
  if (tab === "sap-toi") {
    return trips.filter(
      (trip) => trip.status === "confirmed" || trip.status === "pending",
    );
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
    [trip.id, trip.route, trip.driver.name, trip.pickup, trip.dropoff]
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
