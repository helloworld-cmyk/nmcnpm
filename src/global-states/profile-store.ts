import { create } from "zustand";
import type { SessionUser } from "./session-store";

export type ProfileField =
  | "fullName"
  | "email"
  | "birthDate"
  | "gender"
  | "address"
  | "homeCity"
  | "prefVehicle"
  | "noteDriver";

export type ProfileValues = Record<ProfileField, string> & { phone: string };

export type ProfileStatus = {
  type: "info" | "error" | "success";
  message: string;
};

/* Giá trị demo khi chưa đăng nhập — khớp thiết kế màn Hồ sơ cá nhân */
export const PROFILE_DEFAULTS: ProfileValues = {
  fullName: "Nguyễn Thu Hà",
  phone: "0912 345 678",
  email: "thuha.nguyen@gmail.com",
  birthDate: "1998-06-14",
  gender: "nu",
  address: "Số 12, ngõ 45 Nguyễn Chánh, Cầu Giấy, Hà Nội",
  homeCity: "hanoi",
  prefVehicle: "van9",
  noteDriver: "",
};

export const PROFILE_AVATAR_DEFAULT =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=240";

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
  avatarUrl: string;
  savedAvatarUrl: string;
  saving: boolean;
  savedAt: number;
  invalidFields: ProfileInvalid;
  status: ProfileStatus | null;
  setField: (field: ProfileField, value: string) => void;
  markInvalid: (field: ProfileField, message: string | null) => void;
  setAvatar: (url: string) => void;
  setStatus: (status: ProfileStatus | null) => void;
  saveProfile: () => ProfileField | null;
  resetToSaved: () => void;
  hydrateFromSession: (user: SessionUser | null) => void;
};

let saveTimer: number | null = null;

export const useProfileStore = create<ProfileState>()((set, get) => ({
  values: PROFILE_DEFAULTS,
  saved: PROFILE_DEFAULTS,
  avatarUrl: PROFILE_AVATAR_DEFAULT,
  savedAvatarUrl: PROFILE_AVATAR_DEFAULT,
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

  setAvatar: (url) =>
    set({
      avatarUrl: url,
      status: {
        type: "info",
        message: "Ảnh đại diện đã cập nhật. Nhấn “Lưu thay đổi” để hoàn tất.",
      },
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

    if (saveTimer) window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      saveTimer = null;
      const { values: latest, avatarUrl } = get();
      set({
        saved: latest,
        savedAvatarUrl: avatarUrl,
        saving: false,
        savedAt: get().savedAt + 1,
        status: {
          type: "success",
          message:
            "Đã lưu hồ sơ của bạn. Thông tin mới sẽ áp dụng cho các chuyến đi sau.",
        },
      });
    }, 900);
    return null;
  },

  resetToSaved: () =>
    set((state) => ({
      values: state.saved,
      avatarUrl: state.savedAvatarUrl,
      invalidFields: {},
      status: { type: "info", message: "Đã hoàn tác về thông tin đã lưu gần nhất." },
    })),

  /* Đồng bộ tên/email/SĐT từ phiên đăng nhập (mock) một lần sau khi mount */
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
}));

export function selectProfileDirty(state: ProfileState): boolean {
  return (
    JSON.stringify(state.values) !== JSON.stringify(state.saved) ||
    state.avatarUrl !== state.savedAvatarUrl
  );
}
