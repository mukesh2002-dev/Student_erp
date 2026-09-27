import { ok, fail } from "@/lib/apiRespond";

/** POST /api/attendance/leave — simulated leave request */
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    if (!body?.from || !body?.reason) {
      return fail("From date and reason are required", "VALIDATION_ERROR", 400);
    }
    return ok({ id: `LEAVE-${Date.now().toString().slice(-6)}`, ...body, status: "Pending" }, "Leave request submitted");
  } catch {
    return fail("Could not submit leave request", "LEAVE_ERROR", 500);
  }
}
