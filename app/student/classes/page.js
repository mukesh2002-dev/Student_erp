"use client";
import { useStudentClass } from "@/hooks/student/useStudentPortal";
import { PageHeader, CardSkeleton, ErrorState, EmptyState, Badge } from "@/components/ui";
import { GraduationCap, BookOpen, Clock, MapPin } from "lucide-react";

/**
 * My class — own class detail + weekly timetable, all from the
 * dedicated student API (task.md). No other class is ever visible.
 */
export default function ClassesPage() {
  const { data, isLoading, isError, refetch } = useStudentClass();

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <PageHeader title="My Class" description="Loading your class…" />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <PageHeader title="My Class" />
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044]">
          <ErrorState onRetry={() => refetch()} />
        </div>
      </div>
    );
  }

  const cls = data.class;
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title={`Class ${cls?.name || ""}${cls?.section ? `-${cls.section}` : ""}`}
        description="Your class information and weekly timetable"
      />

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-semibold"><GraduationCap className="w-4 h-4" />Class</div>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{cls?.name || "—"}{cls?.section ? `-${cls.section}` : ""}</p>
          <p className="text-sm text-slate-500">{cls?.category || "—"}</p>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-semibold"><BookOpen className="w-4 h-4" />Subjects</div>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{data.subjectCount}</p>
          <p className="text-sm text-slate-500">In your class only</p>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-semibold"><MapPin className="w-4 h-4" />Grade</div>
          <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{cls?.gradeLevel ?? "—"}</p>
          <p className="text-sm text-slate-500">Grade level</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-[#243044] flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2"><Clock className="w-4 h-4" />Weekly Timetable</h3>
          <Badge variant="indigo">{data.timetable?.length || 0} days</Badge>
        </div>
        {!data.timetable || data.timetable.length === 0 ? (
          <EmptyState title="No timetable yet" message="Your class timetable will appear here once published." />
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-[#243044]">
            {data.timetable.map((day) => (
              <div key={day.day} className="p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{day.day}</p>
                <div className="space-y-2">
                  {day.slots.map((s) => (
                    <div key={s.uuid} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#172033] border border-slate-100 dark:border-[#243044]">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-300 w-14 shrink-0">P{s.periodNumber}</span>
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold text-xs shrink-0">
                        {(s.subject?.name || "?").slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{s.subject?.name || "—"}</p>
                        <p className="text-xs text-slate-500">{s.teacher?.name || "—"}{s.roomNumber ? ` • Room ${s.roomNumber}` : ""}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
