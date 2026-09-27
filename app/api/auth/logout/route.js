import { ok } from "@/lib/apiRespond";

/** POST /api/auth/logout */
export async function POST() {
  return ok(null, "Logged out");
}
