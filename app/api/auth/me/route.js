import { ok } from "@/lib/apiRespond";
import { student } from "@/data/student";

/** GET /api/auth/me */
export async function GET() {
  return ok(
    { id: student.studentId, name: student.name, email: student.email, class: student.class, role: "student" },
    "Session user"
  );
}
