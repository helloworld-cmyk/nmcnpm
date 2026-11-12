import { create } from "zustand";

export type SortMode = "gio" | "gia";

export const MAX_TIME = 1440;
export const MIN_GAP = 30;
export const PER_PAGE = 6;

type SearchFiltersState = {
  sort: SortMode;
  timeFrom: number;
  timeTo: number;
  page: number;
  setSort: (mode: SortMode) => void;
  setTimeFrom: (value: number) => void;
  setTimeTo: (value: number) => void;
  resetFilters: () => void;
  goToPage: (page: number) => void;
};

export const useSearchFiltersStore = create<SearchFiltersState>()((set) => ({
  sort: "gio",
  timeFrom: 0,
  timeTo: MAX_TIME,
  page: 1,

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

  resetFilters: () =>
    set({
      sort: "gio",
      timeFrom: 0,
      timeTo: MAX_TIME,
      page: 1,
    }),

  goToPage: (page) => set({ page }),
}));

type FilterableRide = {
  departureMin: number;
  price: number;
};

export function filterRides<T extends FilterableRide>(
  rides: T[],
  filters: Pick<SearchFiltersState, "timeFrom" | "timeTo">,
): T[] {
  return rides.filter(
    (ride) =>
      ride.departureMin >= filters.timeFrom &&
      ride.departureMin <= filters.timeTo,
  );
}

export function sortRides<T extends FilterableRide>(
  rides: T[],
  mode: SortMode,
): T[] {
  return rides.slice().sort((a, b) => {
    if (mode === "gia") return a.price - b.price;
    return a.departureMin - b.departureMin;
  });
}
