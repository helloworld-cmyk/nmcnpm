import { create } from "zustand";
import {
  validateBooking,
  tomorrowISO,
  type BookingField,
} from "@/app/(home)/_utils/validators";

export type FormStatus = {
  type: "info" | "error" | "success";
  message: string;
};

export type BookingPrefill = {
  from: string;
  to: string;
};

export type SearchResult =
  | { ok: true; query: string }
  | { ok: false; field: BookingField };

type BookingFormState = {
  origin: string;
  destination: string;
  date: string | null;
  seats: string;
  invalidField: BookingField | null;
  status: FormStatus | null;
  loading: boolean;
  swapping: boolean;
  prefillId: number;
  setOrigin: (value: string) => void;
  setDestination: (value: string) => void;
  setDate: (value: string) => void;
  setSeats: (value: string) => void;
  swapRoute: () => void;
  requestPrefill: (detail: BookingPrefill) => void;
  startSearch: () => SearchResult;
};

let swapTimer: number | null = null;

export const useBookingFormStore = create<BookingFormState>()((set, get) => ({
  origin: "",
  destination: "",
  date: null,
  seats: "1",
  invalidField: null,
  status: null,
  loading: false,
  swapping: false,
  prefillId: 0,

  setOrigin: (value) =>
    set((state) => ({
      origin: value,
      invalidField: state.invalidField === "origin" ? null : state.invalidField,
      status: state.status?.type === "error" ? null : state.status,
    })),

  setDestination: (value) =>
    set((state) => ({
      destination: value,
      invalidField:
        state.invalidField === "destination" ? null : state.invalidField,
      status: state.status?.type === "error" ? null : state.status,
    })),

  setDate: (value) =>
    set((state) => ({
      date: value,
      invalidField: state.invalidField === "date" ? null : state.invalidField,
      status: state.status?.type === "error" ? null : state.status,
    })),

  setSeats: (value) => set({ seats: value }),

  swapRoute: () => {
    const { origin, destination } = get();

    set({
      origin: destination,
      destination: origin,
      invalidField: null,
      status: {
        type: "info",
        message: `Đã đổi chiều: ${destination.trim() || "điểm đi"} → ${
          origin.trim() || "điểm đến"
        }.`,
      },
      swapping: true,
    });

    if (swapTimer) window.clearTimeout(swapTimer);
    swapTimer = window.setTimeout(() => {
      swapTimer = null;
      set({ swapping: false });
    }, 320);
  },

  requestPrefill: (detail) =>
    set((state) => ({
      origin: detail.from,
      destination: detail.to,
      invalidField: null,
      status: {
        type: "info",
        message: `Đã chọn tuyến ${detail.from} → ${detail.to}. Chọn ngày đi và bấm Tìm chuyến xe.`,
      },
      prefillId: state.prefillId + 1,
    })),

  startSearch: () => {
    const { origin, destination, date, seats } = get();
    const dateValue = date ?? tomorrowISO();

    const error = validateBooking({ origin, destination, date: dateValue, seats });
    if (error) {
      set({
        invalidField: error.field,
        status: { type: "error", message: error.message },
      });
      return { ok: false, field: error.field };
    }

    set({ invalidField: null, status: null, loading: true });

    const params = new URLSearchParams({
      from: origin.trim(),
      to: destination.trim(),
      date: dateValue,
      seats,
    });
    return { ok: true, query: params.toString() };
  },
}));
