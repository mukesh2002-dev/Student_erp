"use client";
import { useStudentClasswork } from "@/hooks/student/useStudentPortal";
import { PageHeader, CardSkeleton, ErrorState, EmptyState } from "@/components/ui";
import ProgressBar from "@/components/ProgressBar";
import { CheckCircle2, Circle } from "lucide-react";

/**
 * Classwork — percentage/progress ONLY (task.md).
 * No marks columns, no extra data. Simple structured list.
 */
export default function ClassworkPage() {
  const { data, isLoading, isError, refetch } = useStudentClasswork();

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <PageHeader title="Classwork" description="Loading your progress…" />
        <CardSkeleton />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <PageHeader title="Classwork" />
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044]">
          <ErrorState onRetry={() => refetch()} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="Classwork" description="Your completion progress" />

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold text-slate-900 dark:text-white">Overall progress</p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">{data.percentage}%</p>
        </div>
        <ProgressBar value={data.percentage} color="indigo" />
        <p className="text-xs text-slate-500 mt-2">{data.completed} of {data.total} completed</p>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
        {data.items.length === 0 ? (
          <EmptyState title="No classwork yet" message="Your classwork will appear here." />
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-[#243044]">
            {data.items.map((item) => (
              <div key={item.uuid} className="flex items-center gap-3 p-4">
                {item.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="text-xs text-slate-500">
                    Due {item.dueDate ? new Date(item.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                  </p>
                </div>
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${item.completed ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" : "bg-slate-100 text-slate-600 dark:bg-[#1E293B] dark:text-slate-300"}`}>
                  {item.completed ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
