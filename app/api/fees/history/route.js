import { ok } from "@/lib/apiRespond";
import { feesData } from "@/data/fees";

/** GET /api/fees/history — payment history table */
export async function GET() {
  return ok(feesData.history, "Payment history fetched");
}
