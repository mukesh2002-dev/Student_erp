import { NextResponse } from "next/server";

/**
 * Standard API envelope — every /api route must use this.
 * Success: { success: true, data, message }
 * Error:   { success: false, error: { code, message } }
 */
export function ok(data, message = "OK", status = 200) {
  return NextResponse.json({ success: true, data, message }, { status });
}

export function fail(message = "Something went wrong", code = "INTERNAL_ERROR", status = 500) {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}

// Tiny artificial latency so skeletons/spinners are visible in demo (dev only)
export async function demoDelay(ms = 0) {
  if (process.env.NODE_ENV === "development" && ms > 0) {
    await new Promise((r) => setTimeout(r, ms));
  }
}
