import { ok, fail } from "@/lib/apiRespond";
import { feesData } from "@/data/fees";

/** POST /api/fees/pay — simulated payment (demo, no gateway) */
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const amount = Number(body?.amount ?? feesData.due);
    if (!amount || amount <= 0) {
      return fail("Invalid payment amount", "VALIDATION_ERROR", 400);
    }
    return ok(
      {
        receipt: `RCPT-${Date.now().toString().slice(-6)}`,
        amount,
        method: body?.method || "Online",
        status: "Paid",
        paidAt: new Date().toISOString(),
      },
      `Payment of ₹${amount.toLocaleString("en-IN")} simulated successfully`
    );
  } catch {
    return fail("Payment failed", "PAYMENT_ERROR", 500);
  }
}
