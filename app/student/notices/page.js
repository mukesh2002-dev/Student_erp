"use client";
import { useState } from "react";
import { notices } from "@/data/notices";
import Badge from "@/components/Badge";
import { Search, Paperclip, Calendar } from "lucide-react";

export default function NoticesPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...new Set(notices.map(n => n.category))];
  const filtered = notices.filter(n => {
    const mQ = n.title.toLowerCase().includes(q.toLowerCase()) || n.description.toLowerCase().includes(q.toLowerCase());
    const mC = filter === "All" || n.category === filter;
    return mQ && mC;
  });
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div><h1 className="text-2xl font-bold">Notices</h1><p className="text-sm text-slate-500">School announcements and circulars</p></div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200 dark:border-[#243044] flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search notices..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none">{cats.map(c => <option key={c}>{c}</option>)}</select>
      </div>

      <div className="space-y-4">
        {filtered.map(n => (
          <div key={n.id} className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044] hover:shadow-lg transition">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{n.title}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Calendar className="w-3 h-3" />{n.date} • {n.category}</p>
              </div>
              <Badge variant={n.priority === "High" ? "danger" : n.priority === "Medium" ? "warning" : "default"}>{n.priority}</Badge>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">{n.description}</p>
            {n.attachment && <div className="mt-3 flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-3 py-2 rounded-xl w-fit"><Paperclip className="w-4 h-4" />{n.attachment}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
