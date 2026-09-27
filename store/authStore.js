"use client";
import { create } from "zustand";
import { TOKEN_KEY } from "@/lib/constants";
import { authService } from "@/services/auth.service";

function readToken() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

/**
 * Global auth state (client state — server state stays in TanStack Query).
 * Token is demo-only; production should use httpOnly cookies set by /api/auth/*.
 */
export const useAuthStore = create((set) => ({
  user: null,
  token: typeof window !== "undefined" ? readToken() : null,
  isAuthenticated: typeof window !== "undefined" ? !!readToken() : false,
  loading: false,

  login: async (credentials) => {
    set({ loading: true });
    try {
      const data = await authService.login(credentials);
      try {
        localStorage.setItem(TOKEN_KEY, data.token);
      } catch {}
      set({ user: data.user, token: data.token, isAuthenticated: true, loading: false });
      return data;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch {}
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));
