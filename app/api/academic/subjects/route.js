import { ok } from "@/lib/apiRespond";
import { student } from "@/data/student";

/** GET /api/academic/subjects — demo subject list (relational to student class) */
export async function GET() {
  return ok(
    {
      class: student.class,
      subjects: ["Mathematics", "Science", "English", "Hindi", "Social Science", "Computer Science"],
    },
    "Subjects fetched"
  );
}
