import api from "./api";

/** Auth service — all auth HTTP calls live here. */
export const authService = {
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me"),
};
