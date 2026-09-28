"use client";
import Link from "next/link";
import { useStudentHeader, useStudentDashboard } from "@/hooks/student/useStudentPortal";
import { CardSkeleton, ErrorState, EmptyState, Skeleton } from "@/components/ui";
import { Eye, ArrowRight, Wallet, ClipboardCheck, BookOpen, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

/** Greeting banner — live student name/class from the dedicated header API. */
export function GreetingHeader() {
  const { data: header, isLoading, isError, refetch } = useStudentHeader();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-20" aria-hidden />
      <div className="relative">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-7 w-56 bg-white/20" />
            <Skeleton className="h-4 w-40 bg-white/20" />
          </div>
        ) : isError ? (
          <div className="flex items-center gap-3">
            <p className="text-sm">{greeting} — profile unavailable.</p>
            <button onClick={() => refetch()} className="text-xs underline underline-offset-2">Retry</button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold">{greeting}, {header?.name?.split(" ")[0] || "Student"} 👋</h1>
            <p className="text-indigo-100 mt-1">Here&apos;s your academic overview.</p>
            <p className="text-sm text-indigo-200 mt-2">
              {[header?.class ? `Class ${header.class.name}${header.class.section ? `-${header.class.section}` : ""}` : null,
                header?.campus?.name].filter(Boolean).join(" • ")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function SectionCard({ title, actionHref, actionLabel, children, className }) {
  return (
    <div className={`bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044] ${className || ""}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-[#F8FAFC]">{title}</h3>
        {actionHref && (
          <Link href={actionHref} className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {actionLabel || "View all"} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

/** Attendance summary — independent query state. */
export function AttendanceSection() {
  const { data, isLoading, isError, refetch } = useStudentDashboard();
  const a = data?.attendance;
  if (isLoading) return <SectionCard title="Attendance"><CardSkeleton /></SectionCard>;
  if (isError) return <SectionCard title="Attendance"><ErrorState onRetry={() => refetch()} /></SectionCard>;
  if (!a || a.total === 0)
    return <SectionCard title="Attendance" actionHref="/student/attendance"><EmptyState title="No attendance yet" message="Your attendance will appear here once marked." /></SectionCard>;
  return (
    <SectionCard title="Attendance" actionHref="/student/attendance">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 px-2.5 py-1 rounded-full font-medium">
          {a.percentage}%{a.percentage >= 90 ? " • Excellent" : ""}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-3"><p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{a.present}</p><p className="text-xs text-slate-500">Present</p></div>
        <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3"><p className="text-lg font-bold">{a.total}</p><p className="text-xs text-slate-500">Total days</p></div>
      </div>
      <Link href="/student/attendance" className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition"><Eye className="w-4 h-4" />View Attendance</Link>
    </SectionCard>
  );
}

/** Fee summary — independent query state. */
export function FeeSection() {
  const { data, isLoading, isError, refetch } = useStudentDashboard();
  const f = data?.fees;
  if (isLoading) return <SectionCard title="Fees"><CardSkeleton /></SectionCard>;
  if (isError) return <SectionCard title="Fees"><ErrorState onRetry={() => refetch()} /></SectionCard>;
  if (!f || f.billed === 0)
    return <SectionCard title="Fees" actionHref="/student/fees"><EmptyState title="No fee records" message="No invoices have been generated for you yet." /></SectionCard>;
  return (
    <SectionCard title="Fees" actionHref="/student/fees">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center"><Wallet className="w-5 h-5 text-indigo-600 dark:text-indigo-300" /></div>
        <div>
          <p className="text-lg font-bold">{formatCurrency(f.balance)}</p>
          <p className="text-xs text-slate-500">Outstanding balance</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3"><p className="text-sm font-bold">{formatCurrency(f.billed)}</p><p className="text-xs text-slate-500">Billed</p></div>
        <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-3"><p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{formatCurrency(f.paid)}</p><p className="text-xs text-slate-500">Paid</p></div>
      </div>
    </SectionCard>
  );
}

/** Recent homework — independent query state. */
export function HomeworkSection() {
  const { data, isLoading, isError, refetch } = useStudentDashboard();
  const list = data?.homework?.recent || [];
  if (isLoading) return <SectionCard title="Recent Homework"><CardSkeleton /></SectionCard>;
  if (isError) return <SectionCard title="Recent Homework"><ErrorState onRetry={() => refetch()} /></SectionCard>;
  if (list.length === 0)
    return <SectionCard title="Recent Homework" actionHref="/student/homework"><EmptyState title="No homework" message="Nothing assigned right now. Enjoy!" /></SectionCard>;
  return (
    <SectionCard title="Recent Homework" actionHref="/student/homework">
      <div className="space-y-2.5">
        {list.slice(0, 4).map((h) => (
          <div key={h.uuid} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#172033] border border-slate-100 dark:border-[#243044]">
            <BookOpen className="w-4 h-4 text-indigo-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{h.title}</p>
              <p className="text-xs text-slate-500">Due {h.dueDate ? new Date(h.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—"}</p>
            </div>
            <span className="text-[11px] px-2 py-1 rounded-full font-medium bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-300">{h.submissionStatus}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/** Upcoming exams — independent query state. */
export function ExamsSection() {
  const { data, isLoading, isError, refetch } = useStudentDashboard();
  const list = data?.exams?.upcoming || [];
  if (isLoading) return <SectionCard title="Upcoming Exams"><CardSkeleton /></SectionCard>;
  if (isError) return <SectionCard title="Upcoming Exams"><ErrorState onRetry={() => refetch()} /></SectionCard>;
  if (list.length === 0)
    return <SectionCard title="Upcoming Exams" actionHref="/student/exams"><EmptyState title="No upcoming exams" message="Your exam schedule will appear here." /></SectionCard>;
  return (
    <SectionCard title="Upcoming Exams" actionHref="/student/exams">
      <div className="space-y-2.5">
        {list.slice(0, 4).map((e) => (
          <div key={e.uuid} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#172033] border border-slate-100 dark:border-[#243044]">
            <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{e.subject?.name || e.examName}</p>
              <p className="text-xs text-slate-500">{e.examDate ? new Date(e.examDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/** Pending-homework nudge with icon (used in quick stats row). */
export function PendingHomeworkPill() {
  const { data } = useStudentDashboard();
  const n = data?.homework?.pendingCount ?? 0;
  if (!n) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 px-2.5 py-1 rounded-full font-medium">
      <ClipboardCheck className="w-3.5 h-3.5" />{n} homework pending
    </span>
  );
}
