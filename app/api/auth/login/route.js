import { ok, fail } from "@/lib/apiRespond";
import { student } from "@/data/student";

/**
 * Demo auth endpoints — NOT real auth.
 * Login accepts any credentials and returns a demo token.
 * Swap with real DB/JWT (Prisma + bcrypt + jose) in production.
 */

const DEMO_USER = {
  id: student.studentId,
  name: student.name,
  email: student.email,
  class: student.class,
  role: "student",
};

/** POST /api/auth/login */
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    if (!body?.email && !body?.username) {
      return fail("Email is required", "VALIDATION_ERROR", 400);
    }
    return ok({ user: DEMO_USER, token: "demo-token-student-erp" }, "Logged in (demo)");
  } catch {
    return fail("Login failed", "AUTH_ERROR", 500);
  }
}
