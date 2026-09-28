"use client";
import { useState, useMemo } from "react";
import { useStudentHomework } from "@/hooks/student/useStudentPortal";
import { PageHeader, Table, TableSkeleton, ErrorState, Badge } from "@/components/ui";
import { Search } from "lucide-react";

function statusVariant(status) {
  const s = String(status).toUpperCase();
  if (s === "SUBMITTED" || s === "GRADED") return "success";
  if (s === "LATE") return "danger";
  return "warning";
}

/**
 * Homework — simple table: title, due date, status (task.md).
 * No marks column, no extra data. Search-only filtering.
 */
export default function HomeworkPage() {
  const { data: items, isLoading, isError, refetch } = useStudentHomework();
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const list = Array.isArray(items) ? items : [];
    const needle = q.trim().toLowerCase();
    if (!needle) return list;
    return list.filter((h) => (h.title || "").toLowerCase().includes(needle));
  }, [items, q]);

  const columns = [
    { key: "title", header: "Title", render: (r) => <span className="font-medium">{r.title}</span> },
    {
      key: "dueDate",
      header: "Due Date",
      render: (r) => (r.dueDate ? new Date(r.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"),
    },
    {
      key: "priority",
      header: "Priority",
      render: (r) => <Badge variant={r.priority === "HIGH" ? "danger" : r.priority === "LOW" ? "default" : "indigo"}>{r.priority || "—"}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <Badge variant={statusVariant(r.status)}>{r.status}</Badge>,
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <PageHeader title="Homework" description="Your assignments and due dates" />

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200 dark:border-[#243044]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search homework…"
            aria-label="Search homework"
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none text-slate-900 dark:text-slate-100 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
        {isLoading ? (
          <TableSkeleton rows={6} />
        ) : isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : (
          <Table columns={columns} rows={rows} emptyMessage="No homework assigned right now." />
        )}
      </div>
    </div>
  );
}
