import { create } from "zustand";

export type SessionUser = {
  name?: string;
  email?: string;
  phone?: string;
};

const USER_KEY = "vvv.auth.user";

function readStoredUser(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

type SessionState = {
  user: SessionUser | null;
  hydrate: () => void;
  setUser: (user: SessionUser | null) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>()((set) => ({
  user: null,

  hydrate: () => {
    set({ user: readStoredUser() });
    bindStorageListener();
  },

  setUser: (user) => {
    try {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch {
      /* chế độ riêng tư: bỏ qua */
    }
    set({ user });
  },

  clearSession: () => {
    try {
      window.localStorage.removeItem(USER_KEY);
    } catch {
      /* chế độ riêng tư: bỏ qua */
    }
    set({ user: null });
  },
}));

let storageBound = false;

function bindStorageListener() {
  if (storageBound || typeof window === "undefined") return;
  storageBound = true;

  window.addEventListener("storage", (event) => {
    if (event.key === USER_KEY || event.key === null) {
      useSessionStore.setState({ user: readStoredUser() });
    }
  });
}
