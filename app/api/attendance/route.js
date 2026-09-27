import { ok } from "@/lib/apiRespond";
import { attendanceSummary, monthlyAttendance, attendanceChartData, attendanceBySubject } from "@/data/attendance";

/** GET /api/attendance — summary + monthly + chart + by-subject */
export async function GET() {
  return ok(
    { summary: attendanceSummary, monthly: monthlyAttendance, chart: attendanceChartData, bySubject: attendanceBySubject },
    "Attendance fetched"
  );
}
