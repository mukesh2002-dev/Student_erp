"use client";
import { useState } from "react";
import { exams } from "@/data/exams";
import Badge from "@/components/Badge";
import { Calendar, Clock, FileText, Award } from "lucide-react";

export default function ExamsPage() {
  const [tab, setTab] = useState("Upcoming");
  const filtered = exams.filter(e => e.status === tab);
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div><h1 className="text-2xl font-bold">Examinations</h1><p className="text-sm text-slate-500">Upcoming and completed exams</p></div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044] text-center"><p className="text-2xl font-bold text-indigo-600">3</p><p className="text-xs text-slate-500">Upcoming</p></div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044] text-center"><p className="text-2xl font-bold text-emerald-600">8</p><p className="text-xs text-slate-500">Completed</p></div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044] text-center"><p className="text-2xl font-bold">11</p><p className="text-xs text-slate-500">Total</p></div>
      </div>

      <div className="flex gap-2">
        <button onClick={() => setTab("Upcoming")} className={`px-5 py-2.5 rounded-xl text-sm font-medium ${tab === "Upcoming" ? "bg-indigo-600 text-white" : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044]"}`}>Upcoming (3)</button>
        <button onClick={() => setTab("Completed")} className={`px-5 py-2.5 rounded-xl text-sm font-medium ${tab === "Completed" ? "bg-indigo-600 text-white" : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044]"}`}>Completed (8)</button>
      </div>

      <div className="grid gap-4">
        {filtered.map(e => (
          <div key={e.id} className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044] flex flex-col sm:flex-row gap-4">
            <div className="w-14 h-14 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 shrink-0"><FileText className="w-7 h-7" /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap"><p className="font-semibold">{e.name}</p><Badge variant={e.status === "Upcoming" ? "warning" : "success"}>{e.status}</Badge></div>
              <p className="text-sm text-slate-500">{e.subject} • {e.syllabus}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{e.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{e.time} • {e.duration}</span>
                <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" />Max {e.maxMarks} • Pass {e.passingMarks}</span>
              </div>
            </div>
            <div className="flex gap-2 sm:flex-col">
              <button onClick={() => setSelected(e)} className="flex-1 sm:flex-none px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium">View Details</button>
              {e.status === "Upcoming" && <button className="flex-1 sm:flex-none px-5 py-2.5 border border-slate-200 dark:border-[#243044] rounded-xl text-sm font-medium">View Syllabus</button>}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/70" onClick={() => setSelected(null)} />
          <div className="relative bg-white dark:bg-[#111827] rounded-2xl w-full max-w-lg p-6">
            <h3 className="font-bold text-lg">{selected.name} — {selected.subject}</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3"><p className="text-xs text-slate-500">Date</p><p className="font-medium">{selected.date}</p></div>
                <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3"><p className="text-xs text-slate-500">Time</p><p className="font-medium">{selected.time}</p></div>
                <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3"><p className="text-xs text-slate-500">Duration</p><p className="font-medium">{selected.duration}</p></div>
                <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3"><p className="text-xs text-slate-500">Max Marks</p><p className="font-medium">{selected.maxMarks}</p></div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950 rounded-xl p-3"><p className="text-xs font-semibold">Instructions</p><p className="text-xs mt-1">{selected.instructions}</p></div>
              <div className="bg-indigo-50 dark:bg-indigo-950 rounded-xl p-3"><p className="text-xs font-semibold">Syllabus</p><p className="text-xs mt-1">{selected.syllabus}</p></div>
            </div>
            <button onClick={() => setSelected(null)} className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-xl font-medium">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
