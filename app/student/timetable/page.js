"use client";
import { useMemo, useState } from "react";
import { useStudentTimetable } from "@/hooks/student/useStudentPortal";
import { PageHeader, CardSkeleton, ErrorState, EmptyState, Badge } from "@/components/ui";
import { Clock, MapPin, User } from "lucide-react";

/**
 * Timetable — fetched from the timetable API (task.md),
 * displayed in a clean day-tabbed grid.
 */
const ALL_DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

function prettyDay(day) {
  return day.charAt(0) + day.slice(1).toLowerCase();
}

export default function TimetablePage() {
  const { data, isLoading, isError, refetch } = useStudentTimetable();
  const week = useMemo(() => data?.week || [], [data]);
  const availableDays = useMemo(() => week.map((d) => d.day), [week]);
  const [selectedDay, setSelectedDay] = useState(null);
  const activeDay = selectedDay && availableDays.includes(selectedDay) ? selectedDay : availableDays[0];
  const activeSlots = week.find((d) => d.day === activeDay)?.slots || [];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader title="Timetable" description="Your weekly class schedule" />

      {isLoading ? (
        <CardSkeleton />
      ) : isError ? (
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044]">
          <ErrorState onRetry={() => refetch()} />
        </div>
      ) : week.length === 0 ? (
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044]">
          <EmptyState title="No timetable yet" message="Your weekly schedule will appear here once published." />
        </div>
      ) : (
        <>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {availableDays.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium min-h-[44px] shrink-0 transition ${
                  day === activeDay
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044] text-slate-700 dark:text-slate-300"
                }`}
              >
                {prettyDay(day)}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-[#243044] flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 dark:text-white">{prettyDay(activeDay || "")}</h3>
              <Badge variant="indigo">{activeSlots.length} periods</Badge>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-[#243044]">
              {activeSlots.map((s) => (
                <div key={s.uuid} className="p-4 sm:p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold text-sm shrink-0">
                    P{s.periodNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white">{s.subject?.name || "—"}</p>
                    <p className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                      <span className="inline-flex items-center gap-1"><User className="w-3 h-3" />{s.teacher?.name || "—"}</span>
                      {s.roomNumber && <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" />Room {s.roomNumber}</span>}
                      {s.section && <span>Sec {s.section}</span>}
                    </p>
                  </div>
                  <Clock className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {ALL_DAYS.filter((d) => !availableDays.includes(d)).length > 0 && (
            <p className="text-xs text-slate-400 text-center">No classes scheduled on the remaining days.</p>
          )}
        </>
      )}
    </div>
  );
}
