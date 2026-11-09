import { create } from "zustand";

export type SortMode = "gio" | "gia" | "hang";

export type ResultsStatus = "loading" | "ready" | "error";

export const MAX_TIME = 1440;
export const MIN_GAP = 30;
export const PER_PAGE = 6;

type SearchFiltersState = {
  sort: SortMode;
  timeFrom: number;
  timeTo: number;
  carTypes: string[];
  page: number;
  status: ResultsStatus;
  setSort: (mode: SortMode) => void;
  setTimeFrom: (value: number) => void;
  setTimeTo: (value: number) => void;
  toggleCarType: (value: string) => void;
  resetFilters: () => void;
  goToPage: (page: number) => void;
  beginLoading: () => void;
  finishLoading: () => void;
  showError: () => void;
};

export const useSearchFiltersStore = create<SearchFiltersState>()((set) => ({
  sort: "gio",
  timeFrom: 0,
  timeTo: MAX_TIME,
  carTypes: [],
  page: 1,
  status: "loading",

  setSort: (mode) => set({ sort: mode, page: 1 }),

  setTimeFrom: (value) =>
    set((state) => {
      const hi = state.timeTo;
      let lo = Math.max(0, Math.min(value, MAX_TIME));
      if (hi - lo < MIN_GAP) lo = Math.max(0, hi - MIN_GAP);
      return { timeFrom: lo, page: 1 };
    }),

  setTimeTo: (value) =>
    set((state) => {
      const lo = state.timeFrom;
      let hi = Math.max(0, Math.min(value, MAX_TIME));
      if (hi - lo < MIN_GAP) hi = Math.min(MAX_TIME, lo + MIN_GAP);
      return { timeTo: hi, page: 1 };
    }),

  toggleCarType: (value) =>
    set((state) => ({
      carTypes: state.carTypes.includes(value)
        ? state.carTypes.filter((item) => item !== value)
        : [...state.carTypes, value],
      page: 1,
    })),

  resetFilters: () =>
    set({
      sort: "gio",
      timeFrom: 0,
      timeTo: MAX_TIME,
      carTypes: [],
      page: 1,
      status: "ready",
    }),

  goToPage: (page) => set({ page }),

  beginLoading: () => set({ status: "loading", page: 1 }),

  finishLoading: () => set({ status: "ready", page: 1 }),

  showError: () => set({ status: "error" }),
}));

type FilterableRide = {
  departureMin: number;
  price: number;
  rating: number;
  carType: string;
};

export function filterRides<T extends FilterableRide>(
  rides: T[],
  filters: Pick<SearchFiltersState, "timeFrom" | "timeTo" | "carTypes">,
): T[] {
  return rides.filter((ride) => {
    const okTime =
      ride.departureMin >= filters.timeFrom &&
      ride.departureMin <= filters.timeTo;
    const okCar =
      !filters.carTypes.length || filters.carTypes.includes(ride.carType);
    return okTime && okCar;
  });
}

export function sortRides<T extends FilterableRide>(
  rides: T[],
  mode: SortMode,
): T[] {
  return rides.slice().sort((a, b) => {
    if (mode === "gia") return a.price - b.price;
    if (mode === "hang") return b.rating - a.rating;
    return a.departureMin - b.departureMin;
  });
}
