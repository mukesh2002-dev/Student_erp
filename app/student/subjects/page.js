"use client";
import Link from "next/link";
import { useStudentSubjects } from "@/hooks/student/useStudentPortal";
import { PageHeader, CardSkeleton, ErrorState, EmptyState } from "@/components/ui";
import { User, Clock } from "lucide-react";

/**
 * Subjects — only the student's own class subjects (task.md).
 * No cross-class data is ever requested.
 */
export default function SubjectsPage() {
  const { data: subjects, isLoading, isError, refetch } = useStudentSubjects();

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        <PageHeader title="Subjects" description="Loading…" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"><CardSkeleton /><CardSkeleton /><CardSkeleton /></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        <PageHeader title="Subjects" />
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044]">
          <ErrorState onRetry={() => refetch()} />
        </div>
      </div>
    );
  }

  if (!subjects || subjects.length === 0) {
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        <PageHeader title="Subjects" />
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044]">
          <EmptyState title="No subjects yet" message="Subjects for your class will appear here." />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div><h1 className="text-2xl font-bold text-slate-900 dark:text-white">Subjects</h1><p className="text-sm text-slate-500">{subjects.length} subjects • Your class only</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((s) => (
          <div key={s.uuid} className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044] hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                {(s.name || "?").slice(0, 2).toUpperCase()}
              </div>
              {s.code && <span className="text-xs bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full font-medium">{s.code}</span>}
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{s.name}</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><User className="w-4 h-4" />{s.teacher?.name || "To be assigned"}</div>
              {s.weeklyPeriods != null && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Clock className="w-4 h-4" />{s.weeklyPeriods} periods / week</div>
              )}
            </div>
            <div className="mt-4">
              <Link href="/student/topics" className="block text-center py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700">View Syllabus</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
