import { ok } from "@/lib/apiRespond";

export async function GET() {
  return ok({ status: "up", service: "student-erp", time: new Date().toISOString() }, "API healthy");
}
