import { backendApi } from "./api";

/**
 * Auth service — real Node.js backend (`/api/v1/auth/*`).
 * The token lives in storage only and is attached as an
 * `Authorization` header — never placed in URLs (task.md).
 */
export const authService = {
  login: (credentials) => backendApi.post("/auth/login", credentials),
  logout: () => backendApi.post("/auth/logout"),
  me: () => backendApi.get("/auth/me"),
};
