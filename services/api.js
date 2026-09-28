import axios from "axios";
import { config } from "@/lib/config";
import { TOKEN_KEY } from "@/lib/constants";

/**
 * Centralised HTTP clients — the ONLY place that talks to any backend.
 * Never call fetch/axios directly from components — use services/*.service.js.
 *
 * - `api`: legacy Next.js demo routes (same origin `/api`).
 * - `backendApi`: real Node.js backend (`/api/v1`) — all task.md
 *   student-portal calls go through this client.
 *
 * Backend contract (rules.md §6):
 *   Success: { success, statusCode, data, meta? }
 *   Error:   { success, statusCode, error, code, message, details? }
 */

function getToken() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function normaliseSuccess(payload) {
  if (payload && typeof payload === "object" && "success" in payload) {
    if (payload.success) return payload.data;
    const err = new Error(payload.error?.message || payload.message || "Request failed");
    err.code = payload.error?.code || "API_ERROR";
    err.status = payload.statusCode || 0;
    err.data = payload;
    throw err;
  }
  return payload?.data ?? payload;
}

function toNormalisedError(error) {
  const status = error?.response?.status;
  const payload = error?.response?.data;
  const backendMessage =
    payload?.message || payload?.error?.message || payload?.error || error.message || "Something went wrong";
  const normalised = new Error(typeof backendMessage === "string" ? backendMessage : "Something went wrong");
  normalised.code = payload?.code || payload?.error?.code || error.code || "API_ERROR";
  normalised.status = status || 0;
  normalised.details = payload?.details;
  normalised.original = error;

  // Global 401 handling — drop the token and send the user back to login.
  // The token lives in storage only; it is never placed in URLs (task.md).
  if (status === 401 && typeof window !== "undefined") {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
    if (!window.location.pathname.startsWith("/login")) {
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/login");
    }
  }
  return normalised;
}

export function createApiClient(baseURL) {
  const client = axios.create({
    baseURL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use(
    (req) => {
      const token = getToken();
      if (token) req.headers.Authorization = `Bearer ${token}`;
      if (config.isDev) {
        console.log(`[API] ${req.method?.toUpperCase()} ${req.baseURL}${req.url}`);
      }
      return req;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (res) => {
      if (config.isDev) {
        console.log(`[API] OK ${res.config.method?.toUpperCase()} ${res.config.url}`);
      }
      return normaliseSuccess(res.data);
    },
    (error) => Promise.reject(toNormalisedError(error))
  );

  return client;
}

export const api = createApiClient(config.apiUrl);
export const backendApi = createApiClient(config.backendUrl);

export default api;
