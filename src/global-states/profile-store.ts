import { create } from "zustand";
import { updateProfileAPI } from "@/api/auth/api/update-profile";
import type { ProfileResponse } from "@/api/auth/api/get-profile";
import { ApiError } from "@/api/types";
import type { SessionUser } from "./session-store";

export type ProfileField = "fullName" | "email";

export type ProfileValues = Record<ProfileField, string> & { phone: string };

export type ProfileStatus = {
  type: "info" | "error" | "success";
  message: string;
};

/* Giá trị khởi tạo rỗng — hồ sơ được nạp từ API /me/profile hoặc phiên đăng nhập */
export const PROFILE_DEFAULTS: ProfileValues = {
  fullName: "",
  email: "",
  phone: "",
};

export type ProfileInvalid = Partial<Record<ProfileField, string>>;

export function validateProfileField(
  field: ProfileField,
  value: string,
): string | null {
  const trimmed = value.trim();
  if (field === "fullName") {
    if (!trimmed) return "Vui lòng nhập họ và tên.";
    if (trimmed.length < 2) return "Họ và tên tối thiểu 2 ký tự.";
  }
  if (field === "email") {
    if (!trimmed) return "Vui lòng nhập email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      return "Email chưa đúng định dạng, ví dụ ten@gmail.com.";
    }
  }
  return null;
}

type ProfileState = {
  values: ProfileValues;
  saved: ProfileValues;
  saving: boolean;
  savedAt: number;
  invalidFields: ProfileInvalid;
  status: ProfileStatus | null;
  setField: (field: ProfileField, value: string) => void;
  markInvalid: (field: ProfileField, message: string | null) => void;
  setStatus: (status: ProfileStatus | null) => void;
  saveProfile: () => ProfileField | null;
  resetToSaved: () => void;
  hydrateFromSession: (user: SessionUser | null) => void;
  hydrateFromProfile: (profile: ProfileResponse | null) => void;
};

function errorMessage(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  return "Không lưu được hồ sơ, vui lòng thử lại.";
}

export const useProfileStore = create<ProfileState>()((set, get) => ({
  values: PROFILE_DEFAULTS,
  saved: PROFILE_DEFAULTS,
  saving: false,
  savedAt: 0,
  invalidFields: {},
  status: null,

  setField: (field, value) =>
    set((state) => {
      const rest = { ...state.invalidFields };
      delete rest[field];
      return {
        values: { ...state.values, [field]: value },
        invalidFields: rest,
        status: state.status?.type === "error" ? null : state.status,
      };
    }),

  markInvalid: (field, message) =>
    set((state) => {
      const next = { ...state.invalidFields };
      if (message) next[field] = message;
      else delete next[field];
      return { invalidFields: next };
    }),

  setStatus: (status) => set({ status }),

  saveProfile: () => {
    const { values, invalidFields } = get();

    const nextInvalid: ProfileInvalid = {};
    let firstInvalid: ProfileField | null = null;
    for (const field of ["fullName", "email"] as const) {
      const message = validateProfileField(field, values[field]);
      if (message) {
        nextInvalid[field] = message;
        if (!firstInvalid) firstInvalid = field;
      }
    }

    if (firstInvalid) {
      set({
        invalidFields: { ...invalidFields, ...nextInvalid },
        status: { type: "error", message: nextInvalid[firstInvalid]! },
      });
      return firstInvalid;
    }

    set({ invalidFields: {}, status: null, saving: true });

    void (async () => {
      try {
        const profile = await updateProfileAPI({
          fullName: values.fullName.trim(),
          email: values.email.trim(),
        });

        set((state) => {
          const latest: ProfileValues = {
            ...state.values,
            fullName: profile.fullName,
            email: profile.email,
            phone: profile.phone,
          };
          return {
            values: latest,
            saved: latest,
            saving: false,
            savedAt: state.savedAt + 1,
            status: {
              type: "success",
              message:
                "Đã lưu hồ sơ của bạn. Thông tin mới sẽ áp dụng cho các chuyến đi sau.",
            },
          };
        });
      } catch (error) {
        set({
          saving: false,
          status: { type: "error", message: errorMessage(error) },
        });
      }
    })();

    return null;
  },

  resetToSaved: () =>
    set((state) => ({
      values: state.saved,
      invalidFields: {},
      status: { type: "info", message: "Đã hoàn tác về thông tin đã lưu gần nhất." },
    })),

  /* Dự phòng: đồng bộ tên/email/SĐT từ phiên khi chưa có hồ sơ từ API */
  hydrateFromSession: (user) => {
    if (!user) return;
    const { values, saved, saving, savedAt } = get();
    if (saving || savedAt > 0) return;

    const next: ProfileValues = {
      ...values,
      fullName: user.name || values.fullName,
      email: user.email || values.email,
      phone: user.phone || values.phone,
    };
    set({ values: next, saved: { ...saved, ...next } });
  },

  /* Đồng bộ hồ sơ từ API /me/profile một lần sau khi mount */
  hydrateFromProfile: (profile) => {
    if (!profile) return;
    const { saving, savedAt } = get();
    if (saving || savedAt > 0) return;

    set((state) => {
      const latest: ProfileValues = {
        ...state.values,
        fullName: profile.fullName || state.values.fullName,
        email: profile.email || state.values.email,
        phone: profile.phone || state.values.phone,
      };
      return { values: latest, saved: latest };
    });
  },
}));

export function selectProfileDirty(state: ProfileState): boolean {
  return JSON.stringify(state.values) !== JSON.stringify(state.saved);
}
