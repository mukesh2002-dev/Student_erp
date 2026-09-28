"use client";
import { useState, useMemo } from "react";
import { useStudentHomework } from "@/hooks/student/useStudentPortal";
import { PageHeader, CardSkeleton, ErrorState, EmptyState, Badge } from "@/components/ui";
import { Search, CalendarDays } from "lucide-react";

/**
 * Assignments — SHOW ONLY (task.md). Simple list: title, due date,
 * description. No file upload, no submission tracking, no statuses
 * managed by the student.
 */
export default function AssignmentsPage() {
  const { data: items, isLoading, isError, refetch } = useStudentHomework();
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const list = Array.isArray(items) ? items : [];
    const needle = q.trim().toLowerCase();
    if (!needle) return list;
    return list.filter(
      (a) =>
        (a.title || "").toLowerCase().includes(needle) ||
        (a.description || "").toLowerCase().includes(needle)
    );
  }, [items, q]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="Assignments" description="View-only list from your teachers" />

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200 dark:border-[#243044]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search assignments…"
            aria-label="Search assignments"
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none text-slate-900 dark:text-slate-100 focus:border-indigo-500"
          />
        </div>
      </div>

      {isLoading ? (
        <CardSkeleton />
      ) : isError ? (
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044]">
          <ErrorState onRetry={() => refetch()} />
        </div>
      ) : rows.length === 0 ? (
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044]">
          <EmptyState title="No assignments" message="Nothing assigned right now." />
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((a) => (
            <article key={a.uuid} className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044]">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-slate-900 dark:text-white">{a.title}</h3>
                <Badge variant={a.priority === "HIGH" ? "danger" : "indigo"}>{a.priority || "—"}</Badge>
              </div>
              {a.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 whitespace-pre-line">{a.description}</p>
              )}
              <p className="flex items-center gap-1.5 text-xs text-slate-500 mt-3">
                <CalendarDays className="w-3.5 h-3.5" />
                Due {a.dueDate ? new Date(a.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
