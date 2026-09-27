"use client";
import { useState, useMemo } from "react";
import { assignments, assignmentStats } from "@/data/assignments";
import Badge from "@/components/Badge";
import Link from "next/link";
import { Search, Filter, Calendar, User, Award, Clock, X, Eye } from "lucide-react";

function getBadgeVariant(status) {
  if (status === "Pending") return "warning";
  if (status === "Submitted") return "indigo";
  if (status === "Under Review") return "default";
  if (status === "Completed") return "success";
  if (status === "Overdue") return "danger";
  return "default";
}
function dueLabel(due) {
  // Simple static labels for demo
  if (due === "28 Sep 2026") return "Due in 7 days";
  if (due === "30 Sep 2026") return "Due in 9 days";
  if (due === "05 Oct 2026") return "Due in 14 days";
  if (due === "18 Sep 2026") return "Overdue by 3 days";
  if (due === "22 Sep 2026") return "Due in 1 day";
  return "";
}

export default function AssignmentsPage() {
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("All");
  const [status, setStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [teacher, setTeacher] = useState("All");
  const [priority, setPriority] = useState("All");
  const [submittedIds, setSubmittedIds] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("assignmentSubmissions") || "[]");
    } catch {
      return [];
    }
  });

  const subjects = useMemo(() => ["All", ...new Set(assignments.map(a => a.subject))], []);
  const teachers = useMemo(() => ["All", ...new Set(assignments.map(a => a.teacher))], []);

  const filtered = assignments.filter(a => {
    const mQ = a.title.toLowerCase().includes(q.toLowerCase()) || a.subject.toLowerCase().includes(q.toLowerCase());
    const mS = subject === "All" || a.subject === subject;
    const mSt = status === "All" || a.status === status;
    const mT = teacher === "All" || a.teacher === teacher;
    const mP = priority === "All" || a.priority === priority;
    return mQ && mS && mSt && mT && mP;
  });

  const statCards = [
    { label: "Total", value: assignmentStats.total, color: "bg-indigo-600" },
    { label: "Pending", value: assignmentStats.pending, color: "bg-amber-500" },
    { label: "Submitted", value: assignmentStats.submitted, color: "bg-blue-500" },
    { label: "Under Review", value: assignmentStats.underReview, color: "bg-slate-500" },
    { label: "Completed", value: assignmentStats.completed, color: "bg-emerald-500" },
    { label: "Overdue", value: assignmentStats.overdue, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-6xl mx-auto w-full min-w-0 overflow-x-hidden">
      <div className="min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">Assignments</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Manage your academic assignments — separate from daily homework. Larger projects with longer deadlines.</p>
          </div>
          <Link href="#pending" className="hidden sm:inline-flex px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium min-h-[44px] items-center">View Pending</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {statCards.map(s => (
          <div key={s.label} className="bg-white dark:bg-[#111827] rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-[#243044] text-center min-w-0">
            <div className={`w-8 h-8 rounded-xl ${s.color} mx-auto flex items-center justify-center text-white text-xs font-bold`}>{s.value}</div>
            <p className="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-400 mt-2 truncate">{s.label}</p>
          </div>
        ))}
        <div className="col-span-3 lg:col-span-6 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-4 text-white flex items-center justify-between">
          <div><p className="text-sm font-semibold">Completion Rate</p><p className="text-xs text-indigo-100">7/12 submitted • 83% completion</p></div>
          <p className="text-2xl font-bold">83%</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-[#243044] flex gap-2 sm:gap-3 min-w-0">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search assignments..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none min-h-[44px]" />
        </div>
        <button onClick={() => setShowFilters(true)} className="sm:hidden flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium min-h-[44px] shrink-0"><Filter className="w-4 h-4" />Filters</button>
        <div className="hidden sm:flex gap-2 sm:gap-3">
          <select value={subject} onChange={e => setSubject(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none min-h-[44px]">{subjects.map(s => <option key={s}>{s}</option>)}</select>
          <select value={status} onChange={e => setStatus(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none min-h-[44px]"><option>All</option><option>Pending</option><option>Submitted</option><option>Under Review</option><option>Completed</option><option>Overdue</option></select>
          <select value={teacher} onChange={e => setTeacher(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none min-h-[44px] hidden lg:block">{teachers.map(t => <option key={t}>{t}</option>)}</select>
        </div>
      </div>

      {/* Desktop Table hidden on mobile, cards on mobile */}
      <div className="hidden lg:block bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead className="bg-slate-50 dark:bg-[#172033]"><tr><th className="text-left p-3">Title</th><th className="text-left p-3">Subject</th><th className="text-left p-3">Teacher</th><th className="text-center p-3">Due Date</th><th className="text-center p-3">Marks</th><th className="text-center p-3">Status</th><th className="text-center p-3">Action</th></tr></thead>
          <tbody>
            {filtered.map(a => {
              const isSubmitted = submittedIds.includes(a.id) || a.status === "Submitted" || a.status === "Completed";
              const effStatus = isSubmitted && a.status === "Pending" ? "Submitted" : a.status;
              return (
                <tr key={a.id} className="border-t border-slate-100 dark:border-[#243044]">
                  <td className="p-3 font-medium min-w-[180px]">{a.title}<p className="text-xs text-slate-500">{a.topic}</p></td>
                  <td className="p-3">{a.subject}</td>
                  <td className="p-3 text-xs">{a.teacher}</td>
                  <td className="text-center p-3 text-xs">{a.dueDate}<p className={`text-[11px] ${a.status === "Overdue" ? "text-red-600" : "text-amber-600"}`}>{dueLabel(a.dueDate)}</p></td>
                  <td className="text-center p-3">{a.marks}</td>
                  <td className="text-center p-3"><Badge variant={getBadgeVariant(effStatus)}>{effStatus}</Badge></td>
                  <td className="text-center p-3"><Link href={`/student/assignments/${a.id}`} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-medium inline-flex items-center gap-1.5 min-h-[36px]"><Eye className="w-3.5 h-3.5" />View</Link></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {filtered.map(a => {
          const isSubmitted = submittedIds.includes(a.id);
          const effStatus = isSubmitted && a.status === "Pending" ? "Submitted" : a.status;
          return (
            <div key={a.id} className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#243044] min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-sm leading-tight">{a.title}</p>
                  <p className="text-xs text-slate-500 mt-1 truncate">{a.topic} • {a.subject}</p>
                </div>
                <Badge variant={getBadgeVariant(effStatus)}>{effStatus}</Badge>
              </div>
              <p className={`text-xs mt-2 font-medium ${a.status === "Overdue" ? "text-red-600" : a.status === "Pending" ? "text-amber-600" : "text-slate-500"}`}>{dueLabel(a.dueDate)}</p>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><User className="w-3.5 h-3.5 shrink-0" />{a.teacher} • {a.subject}</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-2.5"><p className="text-slate-500">Due</p><p className="font-medium">{a.dueDate}</p></div>
                  <div className="bg-indigo-50 dark:bg-indigo-950 rounded-xl p-2.5"><p className="text-slate-500">Marks</p><p className="font-bold text-indigo-600">{a.marks}</p></div>
                </div>
              </div>
              <Link href={`/student/assignments/${a.id}`} className="mt-4 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium min-h-[44px]"><Eye className="w-4 h-4" />View Assignment</Link>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="col-span-full text-center py-8 text-slate-500 text-sm">No assignments found</p>}
      </div>

      {/* Bottom Sheet Filters for mobile */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/70" onClick={() => setShowFilters(false)} />
          <div className="relative bg-white dark:bg-[#111827] rounded-t-3xl w-full max-w-lg max-h-[80vh] overflow-auto">
            <div className="sticky top-0 bg-white dark:bg-[#111827] p-4 border-b border-slate-200 dark:border-[#243044] flex items-center justify-between">
              <p className="font-semibold">Filters</p>
              <button onClick={() => setShowFilters(false)} className="p-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155]"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div><label className="text-sm font-medium">Subject</label><select value={subject} onChange={e => setSubject(e.target.value)} className="w-full mt-1 px-4 py-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none min-h-[44px]">{subjects.map(s => <option key={s}>{s}</option>)}</select></div>
              <div><label className="text-sm font-medium">Teacher</label><select value={teacher} onChange={e => setTeacher(e.target.value)} className="w-full mt-1 px-4 py-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none min-h-[44px]">{teachers.map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label className="text-sm font-medium">Status</label><select value={status} onChange={e => setStatus(e.target.value)} className="w-full mt-1 px-4 py-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none min-h-[44px]"><option>All</option><option>Pending</option><option>Submitted</option><option>Under Review</option><option>Completed</option><option>Overdue</option></select></div>
              <div><label className="text-sm font-medium">Priority</label><select value={priority} onChange={e => setPriority(e.target.value)} className="w-full mt-1 px-4 py-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none min-h-[44px]"><option>All</option><option>High</option><option>Medium</option><option>Low</option></select></div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { setSubject("All"); setTeacher("All"); setStatus("All"); setPriority("All"); setQ(""); }} className="flex-1 py-3 border border-slate-200 dark:border-[#243044] rounded-xl text-sm font-medium min-h-[44px]">Reset</button>
                <button onClick={() => setShowFilters(false)} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium min-h-[44px]">Apply Filters</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
