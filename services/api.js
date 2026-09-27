import axios from "axios";
import { config } from "@/lib/config";
import { TOKEN_KEY } from "@/lib/constants";

/**
 * Centralised HTTP client — the ONLY place that talks to the backend.
 * Never call fetch/axios directly from components — use services/*.service.js.
 *
 * Standard contract (see app/api/_lib/respond.js):
 *   Success: { success: true, data, message }
 *   Error:   { success: false, error: { code, message } }
 */

function getToken() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Attach auth token on every request
api.interceptors.request.use(
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

// Unwrap { success, data } and normalise errors
api.interceptors.response.use(
  (res) => {
    if (config.isDev) {
      console.log(`[API] ✓ ${res.config.method?.toUpperCase()} ${res.config.url}`, res.data);
    }
    const payload = res.data;
    // Backend standard shape — return inner data directly
    if (payload && typeof payload === "object" && "success" in payload) {
      if (payload.success) return payload.data;
      const err = new Error(payload.error?.message || payload.message || "Request failed");
      err.code = payload.error?.code || "API_ERROR";
      err.status = res.status;
      err.data = payload;
      throw err;
    }
    return payload?.data ?? payload;
  },
  (error) => {
    const status = error?.response?.status;
    const payload = error?.response?.data;
    const normalised = new Error(
      payload?.error?.message || payload?.message || error.message || "Something went wrong"
    );
    normalised.code = payload?.error?.code || error.code || "API_ERROR";
    normalised.status = status || 0;
    normalised.original = error;

    // Global 401 handling — send demo user back to login
    if (status === 401 && typeof window !== "undefined") {
      try {
        localStorage.removeItem(TOKEN_KEY);
      } catch {}
      if (!window.location.pathname.startsWith("/login")) {
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.assign("/login");
      }
    }
    return Promise.reject(normalised);
  }
);

export default api;
