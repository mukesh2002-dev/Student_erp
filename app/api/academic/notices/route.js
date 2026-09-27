import { ok } from "@/lib/apiRespond";
import { notices } from "@/data/notices";

/** GET /api/academic/notices */
export async function GET() {
  return ok(notices, "Notices fetched");
}
