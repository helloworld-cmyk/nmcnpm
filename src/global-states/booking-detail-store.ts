import { create } from "zustand";
import { createBookingAPI } from "@/api/booking/api/create-booking";
import { ApiError } from "@/api/types";
import { useSessionStore } from "./session-store";

/* Giới hạn số ghế mỗi lần đặt của màn chi tiết chuyến */
export const MAX_SEATS = 4;

export type DetailField = "name" | "phone" | "pickup" | "dropoff";

export type DetailStatus = {
  type: "info" | "error" | "success";
  /* Nội dung chính của thông báo */
  message: string;
  /* Danh sách việc cần làm kèm anchor để cuộn tới đúng vị trí */
  issues?: { anchor: string; label: string }[];
};

/* Ghế đang chọn: id dùng để gọi API giữ ghế, seatCode để hiển thị */
export type SelectedSeat = { id: string; seatCode: string };

export type DetailSubmitResult =
  | { ok: false; needsAuth: false }
  | { ok: false; needsAuth: true }
  | { ok: true };

type DetailValues = Record<DetailField, string>;

type BookingDetailState = {
  tripId: string | null;
  selectedSeats: SelectedSeat[];
  values: DetailValues;
  agree: boolean;
  invalid: Partial<Record<DetailField, boolean>> & { agree?: boolean };
  status: DetailStatus | null;
  submitting: boolean;
  /* Nháy mờ khối tổng tiền khi danh sách ghế thay đổi */
  totalLoading: boolean;
  setTripId: (tripId: string | null) => void;
  toggleSeat: (seat: SelectedSeat) => void;
  setField: (field: DetailField, value: string) => void;
  setAgree: (value: boolean) => void;
  submit: (onDone: (bookingId: string) => void) => DetailSubmitResult;
  cancelFlow: () => void;
};

const INITIAL_VALUES: DetailValues = {
  name: "",
  phone: "",
  pickup: "",
  dropoff: "",
};

/* Timer nháy mờ khối tổng tiền, lưu ngoài store để huỷ được khi unmount */
let totalTimer: number | null = null;

/* Chuẩn hoá SĐT: bỏ khoảng trắng, dấu chấm, gạch nối và ngoặc */
function normalizePhone(value: string) {
  return value.replace(/[\s.\-()]/g, "");
}

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  return "Không thể đặt chỗ, vui lòng thử lại.";
}

export const useBookingDetailStore = create<BookingDetailState>()(
  (set, get) => ({
    tripId: null,
    selectedSeats: [],
    values: INITIAL_VALUES,
    agree: false,
    invalid: {},
    status: null,
    submitting: false,
    totalLoading: false,

    /* Khi đổi sang chuyến khác thì bỏ ghế đã chọn từ chuyến trước */
    setTripId: (tripId) =>
      set((state) =>
        state.tripId === tripId
          ? {}
          : { tripId, selectedSeats: [], status: null, totalLoading: false },
      ),

    toggleSeat: (seat) => {
      const { selectedSeats, status } = get();
      const isSelected = selectedSeats.some((item) => item.id === seat.id);

      if (isSelected) {
        set({
          selectedSeats: selectedSeats.filter((item) => item.id !== seat.id),
          status: status?.type === "error" ? null : status,
        });
      } else {
        if (selectedSeats.length >= MAX_SEATS) {
          set({
            status: {
              type: "info",
              message: `Bạn chỉ có thể chọn tối đa ${MAX_SEATS} ghế cho mỗi đặt chỗ. Bỏ một ghế đang chọn để chọn ghế khác.`,
            },
          });
          return;
        }
        set({
          selectedSeats: [...selectedSeats, seat],
          status: null,
        });
      }

      /* Nháy mờ khối tổng tiền như thiết kế */
      if (totalTimer) window.clearTimeout(totalTimer);
      set({ totalLoading: true });
      totalTimer = window.setTimeout(() => {
        totalTimer = null;
        set({ totalLoading: false });
      }, 480);
    },

    setField: (field, value) =>
      set((state) => ({
        values: { ...state.values, [field]: value },
        invalid: state.invalid[field]
          ? { ...state.invalid, [field]: false }
          : state.invalid,
        status: state.status?.type === "error" ? null : state.status,
      })),

    setAgree: (value) =>
      set((state) => ({
        agree: value,
        invalid: state.invalid.agree
          ? { ...state.invalid, agree: false }
          : state.invalid,
        status: state.status?.type === "error" ? null : state.status,
      })),

    submit: (onDone) => {
      const { tripId, selectedSeats, values, agree } = get();

      const issues: NonNullable<DetailStatus["issues"]> = [];
      const invalid: BookingDetailState["invalid"] = {};

      if (!selectedSeats.length) {
        issues.push({
          anchor: "#chon-ghe",
          label: "Chọn ít nhất một ghế trống",
        });
      }
      if (values.name.trim().length < 2) {
        invalid.name = true;
        issues.push({ anchor: "#passengerName", label: "Nhập họ và tên" });
      }
      if (!/^(\+84|0)\d{9}$/.test(normalizePhone(values.phone))) {
        invalid.phone = true;
        issues.push({
          anchor: "#passengerPhone",
          label: "Nhập số điện thoại nhận vé hợp lệ (VD: 0912 345 678)",
        });
      }
      if (values.pickup.trim().length < 5) {
        invalid.pickup = true;
        issues.push({
          anchor: "#pickupAddress",
          label: "Nhập địa chỉ đón cụ thể (số nhà, đường, quận/huyện)",
        });
      }
      if (values.dropoff.trim().length < 5) {
        invalid.dropoff = true;
        issues.push({
          anchor: "#dropoffAddress",
          label: "Nhập địa chỉ điểm trả cụ thể để tài xế thả bạn đúng nơi",
        });
      }
      if (!agree) {
        invalid.agree = true;
        issues.push({
          anchor: "#agreeTerms",
          label: "Đồng ý điều khoản đặt chỗ",
        });
      }
      if (!tripId) {
        issues.push({ anchor: "#chon-ghe", label: "Chọn lại chuyến xe" });
      }

      if (issues.length) {
        set({
          invalid,
          status: {
            type: "error",
            message: "Đặt chỗ chưa hoàn tất — bạn cần:",
            issues,
          },
          submitting: false,
        });
        return { ok: false, needsAuth: false };
      }

      /* Chưa đăng nhập → sang màn đăng nhập, quay lại đây khi xong */
      const sessionUser = useSessionStore.getState().user;
      if (!sessionUser) {
        set({ invalid: {}, status: null });
        return { ok: false, needsAuth: true };
      }

      set({ invalid: {}, status: null, submitting: true });

      const contactName = values.name.trim();
      const contactPhone = values.phone.trim();

      void (async () => {
        try {
          const booking = await createBookingAPI({
            tripId: tripId as string,
            contactName,
            contactPhone,
            contactEmail: sessionUser.email,
            passengers: selectedSeats.map((seat) => ({
              passengerName: contactName,
              passengerPhone: contactPhone,
              pickupAddress: values.pickup.trim(),
              dropoffAddress: values.dropoff.trim(),
              seatId: seat.id,
            })),
          });

          set({
            submitting: false,
            status: {
              type: "success",
              message: "Đặt vé thành công! Đang chuyển tới vé điện tử...",
            },
          });
          onDone(booking.id);
        } catch (error) {
          set({
            submitting: false,
            status: { type: "error", message: errorMessage(error) },
          });
        }
      })();

      return { ok: true };
    },

    cancelFlow: () => {
      if (totalTimer) {
        window.clearTimeout(totalTimer);
        totalTimer = null;
      }
      set({ submitting: false, totalLoading: false });
    },
  }),
);
