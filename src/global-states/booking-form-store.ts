import { create } from "zustand";
import type { AreaResponse } from "@/api/area/api/get-areas";
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
  /* Id địa điểm lấy từ API /areas khi tuyến gợi ý khớp được địa điểm */
  fromId?: string | null;
  toId?: string | null;
};

export type SearchResult =
  | { ok: true; query: string }
  | { ok: false; field: BookingField };

type BookingFormState = {
  origin: string;
  destination: string;
  /* Id địa điểm đã chọn từ gợi ý API; null khi người dùng gõ tự do */
  originAreaId: string | null;
  destinationAreaId: string | null;
  date: string | null;
  invalidField: BookingField | null;
  status: FormStatus | null;
  swapping: boolean;
  prefillId: number;
  setOrigin: (value: string) => void;
  setDestination: (value: string) => void;
  pickOrigin: (area: AreaResponse) => void;
  pickDestination: (area: AreaResponse) => void;
  setDate: (value: string) => void;
  swapRoute: () => void;
  requestPrefill: (detail: BookingPrefill) => void;
  requestDestinationPrefill: (area: AreaResponse) => void;
  startSearch: () => SearchResult;
};

let swapTimer: number | null = null;

export const useBookingFormStore = create<BookingFormState>()((set, get) => ({
  origin: "",
  destination: "",
  originAreaId: null,
  destinationAreaId: null,
  date: null,
  invalidField: null,
  status: null,
  swapping: false,
  prefillId: 0,

  /* Gõ tự do: bỏ id đã chọn trước đó để không gửi nhầm địa điểm cũ */
  setOrigin: (value) =>
    set((state) => ({
      origin: value,
      originAreaId: null,
      invalidField: state.invalidField === "origin" ? null : state.invalidField,
      status: state.status?.type === "error" ? null : state.status,
    })),

  setDestination: (value) =>
    set((state) => ({
      destination: value,
      destinationAreaId: null,
      invalidField:
        state.invalidField === "destination" ? null : state.invalidField,
      status: state.status?.type === "error" ? null : state.status,
    })),

  /* Chọn từ gợi ý API: lưu cả tên hiển thị lẫn id để gọi /trips chính xác */
  pickOrigin: (area) =>
    set((state) => ({
      origin: area.name,
      originAreaId: area.id,
      invalidField: state.invalidField === "origin" ? null : state.invalidField,
      status: state.status?.type === "error" ? null : state.status,
    })),

  pickDestination: (area) =>
    set((state) => ({
      destination: area.name,
      destinationAreaId: area.id,
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

  swapRoute: () => {
    const { origin, destination, originAreaId, destinationAreaId } = get();

    set({
      origin: destination,
      destination: origin,
      originAreaId: destinationAreaId,
      destinationAreaId: originAreaId,
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
      /* Id địa điểm lấy từ API /areas; null khi không khớp được địa điểm nào */
      originAreaId: detail.fromId ?? null,
      destinationAreaId: detail.toId ?? null,
      invalidField: null,
      status: {
        type: "info",
        message: `Đã chọn tuyến ${detail.from} → ${detail.to}. Chọn ngày đi và bấm Tìm chuyến xe.`,
      },
      prefillId: state.prefillId + 1,
    })),

  /* Chọn nhanh một điểm đến từ danh sách địa điểm: điền điểm đến và cuộn tới form */
  requestDestinationPrefill: (area) =>
    set((state) => ({
      destination: area.name,
      destinationAreaId: area.id,
      invalidField:
        state.invalidField === "destination" ? null : state.invalidField,
      status: {
        type: "info",
        message: `Đã chọn điểm đến ${area.name}. Chọn điểm đi và bấm Tìm chuyến xe.`,
      },
      prefillId: state.prefillId + 1,
    })),

  startSearch: () => {
    const { origin, destination, originAreaId, destinationAreaId, date } = get();
    const dateValue = date ?? tomorrowISO();

    const error = validateBooking({ origin, destination, date: dateValue });
    if (error) {
      set({
        invalidField: error.field,
        status: { type: "error", message: error.message },
      });
      return { ok: false, field: error.field };
    }

    set({ invalidField: null, status: null });

    const params = new URLSearchParams({
      from: origin.trim(),
      to: destination.trim(),
      date: dateValue,
    });
    /* Gửi kèm id địa điểm đã chọn để màn kết quả gọi /trips không cần đoán theo tên */
    if (originAreaId) params.set("fromId", originAreaId);
    if (destinationAreaId) params.set("toId", destinationAreaId);

    return { ok: true, query: params.toString() };
  },
}));
