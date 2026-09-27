import { ok } from "@/lib/apiRespond";
import { latestResult, resultHistory, analytics } from "@/data/results";

/** GET /api/academic/results */
export async function GET() {
  return ok({ latest: latestResult, history: resultHistory, analytics }, "Results fetched");
}
