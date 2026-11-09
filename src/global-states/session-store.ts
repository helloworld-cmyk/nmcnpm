import { create } from "zustand";

export type SessionUser = {
  name?: string;
  email?: string;
  phone?: string;
};

type SessionState = {
  user: SessionUser | null;
  setUser: (user: SessionUser | null) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>()((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearSession: () => set({ user: null }),
}));
