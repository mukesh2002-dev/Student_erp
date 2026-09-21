"use client";
import { useState } from "react";
import { classwork, cwStats } from "@/data/classwork";
import Badge from "@/components/Badge";
import { Search } from "lucide-react";

export default function ClassworkPage() {
  const [q, setQ] = useState("");
  const [filterSub, setFilterSub] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const subjects = ["All", ...new Set(classwork.map(c => c.subject))];
  const filtered = classwork.filter(c => {
    const mQ = c.title.toLowerCase().includes(q.toLowerCase()) || c.subject.toLowerCase().includes(q.toLowerCase());
    const mS = filterSub === "All" || c.subject === filterSub;
    const mSt = filterStatus === "All" || c.status === filterStatus;
    return mQ && mS && mSt;
  });
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div><h1 className="text-2xl font-bold">Class Work</h1><p className="text-sm text-slate-500">View classwork assigned by teachers</p></div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044]"><p className="text-xs text-slate-500">Total CW</p><p className="text-2xl font-bold">{cwStats.total}</p></div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044]"><p className="text-xs text-slate-500">Completed</p><p className="text-2xl font-bold text-emerald-600">{cwStats.completed}</p></div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044]"><p className="text-xs text-slate-500">Pending</p><p className="text-2xl font-bold text-amber-600">{cwStats.pending}</p></div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044]"><p className="text-xs text-slate-500">Completion</p><p className="text-2xl font-bold text-indigo-600">{cwStats.completion}%</p></div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200 dark:border-[#243044] flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search classwork..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none" />
        </div>
        <select value={filterSub} onChange={e => setFilterSub(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none">{subjects.map(s => <option key={s}>{s}</option>)}</select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none"><option>All</option><option>Completed</option><option>Pending</option></select>
      </div>

      <div className="grid gap-3">
        {filtered.map(c => (
          <div key={c.id} className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#243044] flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-semibold">{c.title}</p>
              <p className="text-xs text-slate-500 mt-1">{c.subject} • {c.chapter} • {c.teacher} • {c.date}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-sm font-medium">{c.marks}</span>
              <Badge variant={c.status === "Completed" ? "success" : "warning"}>{c.status}</Badge>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700">View</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center py-8 text-slate-500">No classwork found</p>}
      </div>
    </div>
  );
}
