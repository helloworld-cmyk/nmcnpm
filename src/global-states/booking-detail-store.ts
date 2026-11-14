import { create } from "zustand";
import { cancelBookingAPI } from "@/api/booking/api/cancel-booking";
import { confirmBookingAPI } from "@/api/booking/api/confirm-booking";
import { createBookingAPI } from "@/api/booking/api/create-booking";
import { getQueryClient } from "@/api/query-client";
import { ApiError } from "@/api/types";
import { useSessionStore } from "./session-store";

/* Giới hạn số ghế mỗi lần đặt của màn chi tiết chuyến */
export const MAX_SEATS = 8;

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
  /* Đơn vừa giữ ghế, chờ người dùng xác nhận trong modal */
  pendingBookingId: string | null;
  /* Đang gọi API xác nhận đặt vé */
  confirming: boolean;
  /* Lỗi khi xác nhận đặt vé, hiển thị trong modal */
  confirmError: string | null;
  setTripId: (tripId: string | null) => void;
  toggleSeat: (seat: SelectedSeat) => void;
  /* Bỏ khỏi lựa chọn những ghế không còn trống trên sơ đồ mới tải về */
  pruneSeats: (availableSeatIds: string[]) => void;
  setField: (field: DetailField, value: string) => void;
  setAgree: (value: boolean) => void;
  submit: () => DetailSubmitResult;
  confirmPending: (onDone: (bookingId: string) => void) => void;
  cancelConfirm: () => void;
  cancelFlow: () => void;
  /* Xoá toàn bộ dữ liệu phiên đặt chỗ (dùng khi đã đặt thành công) */
  reset: () => void;
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

function clearTotalTimer() {
  if (totalTimer === null) return;
  window.clearTimeout(totalTimer);
  totalTimer = null;
}

/* Đánh dấu sơ đồ ghế của chuyến là cũ để lần hiển thị sau tải lại từ API */
function invalidateSeats(tripId: string | null) {
  if (!tripId) return;
  void getQueryClient().invalidateQueries({
    queryKey: ["trip-seats", tripId],
  });
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
    pendingBookingId: null,
    confirming: false,
    confirmError: null,

    /* Khi đổi sang chuyến khác thì bỏ ghế đã chọn từ chuyến trước */
    setTripId: (tripId) => {
      const state = get();
      if (state.tripId === tripId) return;

      /* Đang giữ ghế của chuyến cũ → nhả đơn giữ chỗ để không treo ghế */
      if (state.pendingBookingId && !state.confirming) {
        void cancelBookingAPI(state.pendingBookingId).catch(() => {});
      }
      clearTotalTimer();

      const { name, phone } = state.values;
      set({
        tripId,
        selectedSeats: [],
        /* Giữ tên/SĐT liên hệ, bỏ địa chỉ đón/trả vì thuộc chuyến cũ */
        values: { ...INITIAL_VALUES, name, phone },
        agree: false,
        invalid: {},
        status: null,
        submitting: false,
        totalLoading: false,
        pendingBookingId: null,
        confirming: false,
        confirmError: null,
      });
    },

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

    /*
     * Đồng bộ lựa chọn với sơ đồ ghế mới: ghế đã bị người khác giữ/đặt thì bỏ
     * khỏi lựa chọn để không gửi lên server ghế không còn trống. Bỏ qua khi
     * đang có đơn giữ chỗ của chính mình (ghế của mình cũng báo không trống).
     */
    pruneSeats: (availableSeatIds) => {
      const { selectedSeats, pendingBookingId } = get();
      if (pendingBookingId || !selectedSeats.length) return;

      const available = new Set(availableSeatIds);
      const dropped = selectedSeats.filter((seat) => !available.has(seat.id));
      if (!dropped.length) return;

      set((state) => ({
        selectedSeats: state.selectedSeats.filter((seat) =>
          available.has(seat.id),
        ),
        /* Giữ nguyên thông báo lỗi đang hiển thị nếu có */
        status:
          state.status?.type === "error"
            ? state.status
            : {
                type: "info",
                message: `Ghế ${dropped
                  .map((seat) => seat.seatCode)
                  .join(", ")} vừa được người khác đặt nên đã bỏ khỏi lựa chọn. Vui lòng chọn ghế khác.`,
              },
      }));
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

    submit: () => {
      const { tripId, selectedSeats, values, agree, submitting } = get();

      /* Chặn bấm đúp khi đang giữ ghế */
      if (submitting) return { ok: true };

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

      const requestTripId = tripId as string;
      const contactName = values.name.trim();
      const contactPhone = values.phone.trim();

      void (async () => {
        try {
          const booking = await createBookingAPI({
            tripId: requestTripId,
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

          /* Người dùng đã chuyển chuyến trong lúc chờ → nhả đơn giữ chỗ vừa tạo */
          if (get().tripId !== requestTripId) {
            void cancelBookingAPI(booking.id).catch(() => {});
            return;
          }

          /* Giữ ghế xong mới mở modal xác nhận; chưa chuyển màn thành công */
          set({
            submitting: false,
            pendingBookingId: booking.id,
            confirmError: null,
            status: {
              type: "success",
              message: "Đã giữ ghế — vui lòng xác nhận để hoàn tất đặt chỗ.",
            },
          });
        } catch (error) {
          if (get().tripId !== requestTripId) return;

          /* Ghế có thể vừa bị người khác giữ/đặt → tải lại sơ đồ để đồng bộ */
          invalidateSeats(requestTripId);
          set({
            submitting: false,
            status: { type: "error", message: errorMessage(error) },
          });
        }
      })();

      return { ok: true };
    },

    confirmPending: (onDone) => {
      const { pendingBookingId, confirming, tripId } = get();
      if (!pendingBookingId || confirming) return;

      set({ confirming: true, confirmError: null });

      void (async () => {
        try {
          const booking = await confirmBookingAPI(pendingBookingId);
          /* Đã đặt xong → xoá sạch state để lần đặt sau bắt đầu từ đầu */
          invalidateSeats(tripId);
          get().reset();
          onDone(booking.id);
        } catch (error) {
          set({ confirming: false, confirmError: errorMessage(error) });
        }
      })();
    },

    cancelConfirm: () => {
      const { pendingBookingId, confirming, tripId } = get();
      if (confirming) return;

      /* Người dùng không xác nhận → huỷ đơn giữ chỗ để nhả ghế */
      set({ pendingBookingId: null, confirmError: null, status: null });
      if (pendingBookingId) {
        void cancelBookingAPI(pendingBookingId)
          .catch(() => {})
          .then(() => invalidateSeats(tripId));
      }
    },

    cancelFlow: () => {
      clearTotalTimer();
      const { pendingBookingId, confirming, tripId } = get();
      if (pendingBookingId && !confirming) {
        void cancelBookingAPI(pendingBookingId)
          .catch(() => {})
          .then(() => invalidateSeats(tripId));
      }
      set({
        submitting: false,
        totalLoading: false,
        invalid: {},
        status: null,
        confirming: false,
        pendingBookingId: null,
        confirmError: null,
      });
    },

    reset: () => {
      clearTotalTimer();
      set({
        selectedSeats: [],
        values: { ...INITIAL_VALUES },
        agree: false,
        invalid: {},
        status: null,
        submitting: false,
        totalLoading: false,
        pendingBookingId: null,
        confirming: false,
        confirmError: null,
      });
    },
  }),
);
