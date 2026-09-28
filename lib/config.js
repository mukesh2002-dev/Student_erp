/**
 * Single access point for all env vars.
 * Never hardcode URLs in components — import from here.
 *
 * Two API surfaces:
 * - `apiUrl` (default `/api`): legacy Next.js demo routes (non-task pages).
 * - `backendUrl`: real Node.js backend (`d:\projects\mukesh-school-node.js`,
 *   served under /api/v1). All task.md student-portal calls use this.
 */
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api/v1",
  appName: process.env.NEXT_PUBLIC_APP_NAME || "Student ERP",
  appEnv: process.env.NEXT_PUBLIC_APP_ENV || "development",
  isDev: (process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV) !== "production",
};

export const API_URL = config.apiUrl;
