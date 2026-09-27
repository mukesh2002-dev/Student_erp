import { ok } from "@/lib/apiRespond";
import { student, dashboardStats } from "@/data/student";
import { todayTimetable } from "@/data/timetable";
import { attendanceSummary, attendanceChartData } from "@/data/attendance";

/** GET /api/dashboard — aggregated home-screen payload */
export async function GET() {
  return ok(
    { student, stats: dashboardStats, todayTimetable, attendanceSummary, attendanceChartData },
    "Dashboard fetched"
  );
}
