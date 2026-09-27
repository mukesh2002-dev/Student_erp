import { ok } from "@/lib/apiRespond";
import { todayTimetable, weeklyTimetable } from "@/data/timetable";

/** GET /api/academic/timetable */
export async function GET() {
  return ok({ today: todayTimetable, weekly: weeklyTimetable }, "Timetable fetched");
}
