"use client";
import { useAuthStore } from "@/store/authStore";

/** Exposes { user, token, isAuthenticated, loading, login(), logout() }. */
export function useAuth() {
  const { user, token, isAuthenticated, loading, login, logout, setUser } = useAuthStore();
  return { user, token, isAuthenticated, loading, login, logout, setUser };
}
