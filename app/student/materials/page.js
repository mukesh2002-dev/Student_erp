"use client";
import { useState } from "react";
import { materials } from "@/data/materials";
import { Search, Eye, Download, FileText, Video, Link as LinkIcon, File } from "lucide-react";

const typeIcon = { PDF: FileText, Video: Video, Document: File, Link: LinkIcon, Notes: FileText };

export default function MaterialsPage() {
  const [q, setQ] = useState("");
  const [filterSub, setFilterSub] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const subjects = ["All", ...new Set(materials.map(m => m.subject))];
  const filtered = materials.filter(m => {
    const mQ = m.title.toLowerCase().includes(q.toLowerCase());
    const mS = filterSub === "All" || m.subject === filterSub;
    const mT = filterType === "All" || m.type === filterType;
    return mQ && mS && mT;
  });
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div><h1 className="text-2xl font-bold">Study Materials</h1><p className="text-sm text-slate-500">Notes, PDFs, videos and documents</p></div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200 dark:border-[#243044] flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search materials..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none" />
        </div>
        <select value={filterSub} onChange={e => setFilterSub(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none">{subjects.map(s => <option key={s}>{s}</option>)}</select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none"><option>All</option><option>PDF</option><option>Video</option><option>Document</option><option>Notes</option><option>Link</option></select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(m => {
          const Icon = typeIcon[m.type] || FileText;
          return (
            <div key={m.id} className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044] hover:shadow-lg transition">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 shrink-0"><Icon className="w-5 h-5" /></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm leading-tight truncate">{m.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{m.subject} • {m.chapter}</p>
                  <p className="text-xs text-slate-400">{m.teacher} • {m.date} • {m.size}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] px-2.5 py-1 rounded-full font-medium">{m.type}</span>
                <span className="text-xs text-slate-500">{m.downloads} downloads</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-[#243044] rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-[#1E293B]"><Eye className="w-4 h-4" />View</button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700"><Download className="w-4 h-4" />Download</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
