import { create } from "zustand";
import {
  validateLoginValue,
  type LoginField,
  type LoginValues,
} from "@/app/dang-nhap/_utils/login-validators";
import { getMeAPI } from "@/api/auth/api/get-me";
import { loginAPI } from "@/api/auth/api/login";
import { ApiError } from "@/api/types";
import { STORAGE_KEYS } from "@/config/constants/storage";
import { getItem, setItem } from "@/config/storage";
import { useSessionStore, type SessionUser } from "./session-store";

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
  setField: (field: LoginField, value: string) => void;
  touchField: (field: LoginField) => void;
  submit: (onRedirect: () => void) => LoginSubmitResult;
  cancelFlow: () => void;
};

const LOGIN_REQUIRED: LoginField[] = ["identifier", "password"];

/* Khoảng chờ hiển thị thành công trước khi chuyển hướng (ms) */
const REDIRECT_DELAY = 600;

const INITIAL_VALUES: LoginValues = { identifier: "", password: "" };

/* Timer của khoảng chờ chuyển hướng, lưu ngoài store để có thể huỷ khi unmount */
let pendingTimers: number[] = [];

function clearTimers() {
  for (const timerId of pendingTimers) window.clearTimeout(timerId);
  pendingTimers = [];
}

function clearErrorStatus(status: LoginStatus | null): LoginStatus | null {
  return status?.type === "error" ? null : status;
}

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  return "Không thể đăng nhập, vui lòng thử lại.";
}

/* State + logic của riêng màn đăng nhập. Component chỉ gọi action;
 * focus ô lỗi và điều hướng do hooks của màn đảm nhiệm. */
export const useLoginStore = create<LoginState>()((set, get) => ({
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

    set({
      invalid: {},
      status: { type: "info", message: "Đang xử lý, vui lòng chờ..." },
      loading: true,
    });

    const identifier = values.identifier.trim();

    void (async () => {
      try {
        const tokens = await loginAPI({
          identifier,
          password: values.password,
        });
        setItem(STORAGE_KEYS.accessToken, tokens.accessToken);
        setItem(STORAGE_KEYS.refreshToken, tokens.refreshToken);

        /* Lấy thông tin tài khoản ngay sau khi có token */
        let user: SessionUser = { name: identifier };
        try {
          const me = await getMeAPI();
          user = {
            id: me.id,
            name: me.fullName,
            email: me.email,
            phone: me.phone,
          };
        } catch (meError) {
          /* Token đã bị interceptor dọn (401) → coi như đăng nhập thất bại */
          if (!getItem(STORAGE_KEYS.accessToken)) throw meError;
        }
        useSessionStore.getState().setUser(user);

        set({
          loading: false,
          status: {
            type: "success",
            message: "Thành công! Đang chuyển hướng...",
          },
        });

        clearTimers();
        pendingTimers = [
          window.setTimeout(() => {
            pendingTimers = [];
            set({
              values: INITIAL_VALUES,
              invalid: {},
              status: null,
              loading: false,
            });
            onRedirect();
          }, REDIRECT_DELAY),
        ];
      } catch (error) {
        set({
          loading: false,
          status: { type: "error", message: errorMessage(error) },
        });
      }
    })();

    return { ok: true, field: null };
  },

  /* Huỷ luồng đang chạy (gọi khi component unmount) */
  cancelFlow: () => {
    clearTimers();
    set({ loading: false, status: null });
  },
}));
