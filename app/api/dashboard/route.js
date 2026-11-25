import { ok } from "@/lib/apiRespond";
import { student, dashboardStats } from "@/data/student";
import { todayTimetable } from "@/data/timetable";
import { attendanceSummary, attendanceChartData } from "@/data/attendance";
import { feesData } from "@/data/fees";
import { exams } from "@/data/exams";
import { homework } from "@/data/homework";
import { notices } from "@/data/notices";

/** GET /api/dashboard — aggregated home-screen payload */
export async function GET() {
  return ok(
    {
      student,
      stats: dashboardStats,
      todayTimetable,
      attendanceSummary,
      attendanceChartData,
      fees: feesData,
      exams,
      homework,
      notices,
    },
    "Dashboard fetched"
  );
}
