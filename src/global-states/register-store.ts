import { create } from "zustand";
import {
  buildRegisterUser,
  isConfirmMismatch,
  validateRegisterField,
  type RegisterField,
  type RegisterValues,
} from "@/app/dang-ky/_utils/register-validators";
import { useSessionStore } from "./session-store";

export type RegisterStatus = {
  type: "info" | "error" | "success";
  message: string;
};

export type RegisterSubmitResult = {
  ok: boolean;
  field: RegisterField | null;
};

type RegisterState = {
  values: RegisterValues;
  invalid: Partial<Record<RegisterField, boolean>>;
  status: RegisterStatus | null;
  loading: boolean;
  setField: (field: RegisterField, value: string) => void;
  touchField: (field: RegisterField) => void;
  submit: (onRedirect: () => void) => RegisterSubmitResult;
  cancelFlow: () => void;
};

const REGISTER_REQUIRED: RegisterField[] = [
  "fullname",
  "phone",
  "email",
  "password",
  "confirm",
];

/* Thời gian mock xử lý và khoảng chờ hiển thị thành công trước khi chuyển hướng (ms) */
const MOCK_DELAY = 900;
const REDIRECT_DELAY = 600;

const INITIAL_VALUES: RegisterValues = {
  fullname: "",
  phone: "",
  email: "",
  password: "",
  confirm: "",
};

/* Timer của luồng mock, lưu ngoài store để có thể huỷ khi unmount */
let pendingTimers: number[] = [];

function clearTimers() {
  for (const timerId of pendingTimers) window.clearTimeout(timerId);
  pendingTimers = [];
}

function clearErrorStatus(status: RegisterStatus | null): RegisterStatus | null {
  return status?.type === "error" ? null : status;
}

/* State + logic của riêng màn đăng ký. Component chỉ gọi action;
 * focus ô lỗi và điều hướng do hooks của màn đảm nhiệm. */
export const useRegisterStore = create<RegisterState>()((set, get) => ({
  values: INITIAL_VALUES,
  invalid: {},
  status: null,
  loading: false,

  setField: (field, value) =>
    set((state) => {
      const invalid = state.invalid[field]
        ? { ...state.invalid }
        : state.invalid;
      if (state.invalid[field]) delete invalid[field];

      return {
        values: { ...state.values, [field]: value },
        invalid,
        status: clearErrorStatus(state.status),
      };
    }),

  /* Validate khi rời khỏi ô (không chờ tới lúc submit) */
  touchField: (field) => {
    const { values, invalid } = get();
    const hasValue = values[field].trim().length > 0;
    if (!hasValue && !invalid[field]) return;

    const isValid = validateRegisterField(field, values[field]);
    if (isValid === Boolean(invalid[field])) return;

    set((state) => ({ invalid: { ...state.invalid, [field]: !isValid } }));
  },

  submit: (onRedirect) => {
    const { values } = get();
    const invalid: Partial<Record<RegisterField, boolean>> = {};
    let firstInvalid: RegisterField | null = null;

    for (const field of REGISTER_REQUIRED) {
      const isValid = validateRegisterField(field, values[field]);
      invalid[field] = !isValid;
      if (!isValid && !firstInvalid) firstInvalid = field;
    }

    const mismatch = isConfirmMismatch(values.password, values.confirm);
    if (mismatch) invalid.confirm = true;

    if (mismatch || firstInvalid) {
      set({
        invalid,
        status: {
          type: "error",
          message: mismatch
            ? "Mật khẩu xác nhận không khớp."
            : "Vui lòng kiểm tra lại thông tin đã nhập.",
        },
      });
      return { ok: false, field: mismatch ? "confirm" : firstInvalid };
    }

    /* Mock đăng ký: luôn thành công sau một khoảng chờ ngắn */
    set({
      invalid: {},
      status: { type: "info", message: "Đang xử lý, vui lòng chờ..." },
      loading: true,
    });

    const user = buildRegisterUser(values);

    clearTimers();
    pendingTimers = [
      window.setTimeout(() => {
        useSessionStore.getState().setUser(user);
        set({
          loading: false,
          status: {
            type: "success",
            message: "Thành công! Đang chuyển hướng...",
          },
        });
      }, MOCK_DELAY),
      window.setTimeout(() => {
        pendingTimers = [];
        set({
          values: INITIAL_VALUES,
          invalid: {},
          status: null,
          loading: false,
        });
        onRedirect();
      }, MOCK_DELAY + REDIRECT_DELAY),
    ];

    return { ok: true, field: null };
  },

  /* Huỷ luồng mock đang chạy (gọi khi component unmount) */
  cancelFlow: () => {
    clearTimers();
    set({ loading: false, status: null });
  },
}));
