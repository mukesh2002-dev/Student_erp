"use client";
import { useState } from "react";
import { syllabusOverview, mathematicsChapters } from "@/data/topics";
import ProgressBar from "@/components/ProgressBar";
import { CheckCircle, Clock, Circle } from "lucide-react";

const subjects = [
  { name: "Mathematics", progress: 72 },
  { name: "Science", progress: 68 },
  { name: "English", progress: 81 },
  { name: "Hindi", progress: 76 },
  { name: "Social Science", progress: 70 },
  { name: "Computer Science", progress: 65 },
];

export default function TopicsPage() {
  const [selected, setSelected] = useState("Mathematics");

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div><h1 className="text-2xl font-bold">Topics / Syllabus</h1><p className="text-sm text-slate-500">Track your syllabus progress — read-only (teacher controlled)</p></div>

      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
        <p className="text-indigo-100 text-sm">Overall Syllabus Progress</p>
        <p className="text-3xl font-bold mt-1">{syllabusOverview.overall}%</p>
        <div className="mt-3 bg-white/20 rounded-full h-2"><div className="bg-white h-2 rounded-full" style={{ width: `${syllabusOverview.overall}%` }} /></div>
      </div>

      <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {subjects.map(s => (
          <button key={s.name} onClick={() => setSelected(s.name)} className={`p-4 rounded-2xl border text-left transition ${selected === s.name ? "bg-indigo-600 text-white border-indigo-600" : "bg-white dark:bg-[#111827] border-slate-200 dark:border-[#243044] hover:shadow-md"}`}>
            <p className={`text-sm font-semibold ${selected === s.name ? "text-white" : ""}`}>{s.name}</p>
            <p className={`text-xs mt-1 ${selected === s.name ? "text-indigo-100" : "text-slate-500"}`}>{s.progress}% completed</p>
            <div className="mt-2"><ProgressBar value={s.progress} color={selected === s.name ? "indigo" : "indigo"} /></div>
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-[#243044]">
          <h3 className="font-bold text-lg">{selected} — Chapters</h3>
          <p className="text-xs text-slate-500">Completion status is controlled by teachers</p>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-[#243044]">
          {(selected === "Mathematics" ? mathematicsChapters : mathematicsChapters.slice(0, 2)).map((ch, i) => (
            <div key={i} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{ch.chapter}</h4>
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${ch.progress === 100 ? "bg-emerald-50 text-emerald-700" : ch.progress >= 60 ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{ch.progress}%</span>
              </div>
              <ProgressBar value={ch.progress} color={ch.progress === 100 ? "emerald" : "indigo"} />
              <div className="mt-3 space-y-2">
                {ch.topics.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    {t.status === "Completed" ? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> : t.status === "In Progress" ? <Clock className="w-4 h-4 text-amber-500 shrink-0" /> : <Circle className="w-4 h-4 text-slate-300 shrink-0" />}
                    <span className={t.status === "Completed" ? "text-slate-700 dark:text-slate-300" : t.status === "In Progress" ? "font-medium text-amber-700 dark:text-amber-400" : "text-slate-500"}>{t.name}</span>
                    <span className={`ml-auto text-[11px] px-2 py-0.5 rounded-full font-medium ${t.status === "Completed" ? "bg-emerald-50 text-emerald-700" : t.status === "In Progress" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"}`}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
