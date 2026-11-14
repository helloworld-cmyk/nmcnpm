import { create } from "zustand";

export type SessionUser = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
};

type SessionState = {
  user: SessionUser | null;
  /* Phiên đã được đồng bộ xong (đã kiểm tra token + gọi /me) chưa */
  ready: boolean;
  /* Lúc đồng bộ xong có tài khoản không (dùng để chặn màn khách, không đổi khi
   * người dùng vừa đăng nhập xong trên chính màn đăng nhập) */
  readyWithUser: boolean;
  setUser: (user: SessionUser | null) => void;
  markReady: () => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>()((set) => ({
  user: null,
  ready: false,
  readyWithUser: false,

  setUser: (user) => set({ user }),

  markReady: () =>
    set((state) => ({ ready: true, readyWithUser: Boolean(state.user) })),

  clearSession: () => set({ user: null, readyWithUser: false }),
}));
