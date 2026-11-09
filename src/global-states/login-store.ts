import { create } from "zustand";
import {
  buildLoginUser,
  validateLoginValue,
  type LoginField,
  type LoginValues,
} from "@/app/dang-nhap/_utils/login-validators";
import { useSessionStore } from "./session-store";

export type LoginStatus = {
  type: "info" | "error" | "success";
  message: string;
};

export type LoginSubmitResult = {
  ok: boolean;
  field: LoginField | null;
};

type LoginState = {
  values: LoginValues;
  invalid: Partial<Record<LoginField, boolean>>;
  status: LoginStatus | null;
  loading: boolean;
  remember: boolean;
  setField: (field: LoginField, value: string) => void;
  setRemember: (value: boolean) => void;
  touchField: (field: LoginField) => void;
  submit: (onRedirect: () => void) => LoginSubmitResult;
  cancelFlow: () => void;
};

const LOGIN_REQUIRED: LoginField[] = ["identifier", "password"];

/* Thời gian mock xử lý và khoảng chờ hiển thị thành công trước khi chuyển hướng (ms) */
const MOCK_DELAY = 900;
const REDIRECT_DELAY = 600;

const INITIAL_VALUES: LoginValues = { identifier: "", password: "" };

/* Timer của luồng mock, lưu ngoài store để có thể huỷ khi unmount */
let pendingTimers: number[] = [];

function clearTimers() {
  for (const timerId of pendingTimers) window.clearTimeout(timerId);
  pendingTimers = [];
}

function clearErrorStatus(status: LoginStatus | null): LoginStatus | null {
  return status?.type === "error" ? null : status;
}

/* State + logic của riêng màn đăng nhập. Component chỉ gọi action;
 * focus ô lỗi và điều hướng do hooks của màn đảm nhiệm. */
export const useLoginStore = create<LoginState>()((set, get) => ({
  values: INITIAL_VALUES,
  invalid: {},
  status: null,
  loading: false,
  remember: false,

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

  setRemember: (value) => set({ remember: value }),

  /* Validate khi rời khỏi ô (không chờ tới lúc submit) */
  touchField: (field) => {
    const { values, invalid } = get();
    const hasValue = values[field].trim().length > 0;
    if (!hasValue && !invalid[field]) return;

    const isValid = validateLoginValue(values[field]);
    if (isValid === Boolean(invalid[field])) return;

    set((state) => ({ invalid: { ...state.invalid, [field]: !isValid } }));
  },

  submit: (onRedirect) => {
    const { values } = get();
    const invalid: Partial<Record<LoginField, boolean>> = {};
    let firstInvalid: LoginField | null = null;

    for (const field of LOGIN_REQUIRED) {
      const isValid = validateLoginValue(values[field]);
      invalid[field] = !isValid;
      if (!isValid && !firstInvalid) firstInvalid = field;
    }

    if (firstInvalid) {
      set({
        invalid,
        status: {
          type: "error",
          message: "Vui lòng kiểm tra lại thông tin đã nhập.",
        },
      });
      return { ok: false, field: firstInvalid };
    }

    /* Mock đăng nhập: luôn thành công sau một khoảng chờ ngắn */
    set({
      invalid: {},
      status: { type: "info", message: "Đang xử lý, vui lòng chờ..." },
      loading: true,
    });

    const user = buildLoginUser(values.identifier);

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
          remember: false,
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
