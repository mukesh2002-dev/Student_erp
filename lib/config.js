/**
 * Single access point for all env vars.
 * Never hardcode URLs in components — import from here.
 *
 * Backend strategy: Next.js backend-like API routes under /api.
 * - Development default: `/api` (same origin, no CORS)
 * - Production / separate Node backend: set NEXT_PUBLIC_API_URL=https://api.yourdomain.com
 */
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Student ERP",
  appEnv: process.env.NEXT_PUBLIC_APP_ENV || "development",
  isDev: (process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV) !== "production",
};

export const API_URL = config.apiUrl;
