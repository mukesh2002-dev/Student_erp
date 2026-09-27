"use client";
import { useState } from "react";
import { homework, hwStats } from "@/data/homework";
import Badge from "@/components/Badge";
import { Search, Upload, Eye, Calendar, Award, X } from "lucide-react";

export default function HomeworkPage() {
  const [q, setQ] = useState("");
  const [filterSub, setFilterSub] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState(null);
  const [answer, setAnswer] = useState("");
  const [submittedIds, setSubmittedIds] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("homeworkSubmissions") || "[]");
    } catch {
      return [];
    }
  });

  const subjects = ["All", ...new Set(homework.map(h => h.subject))];
  const filtered = homework.filter(h => {
    const mQ = h.title.toLowerCase().includes(q.toLowerCase()) || h.subject.toLowerCase().includes(q.toLowerCase());
    const mS = filterSub === "All" || h.subject === filterSub;
    const mSt = filterStatus === "All" || h.status === filterStatus;
    return mQ && mS && mSt;
  });

  const handleSubmit = () => {
    if (!selected) return;
    const updated = [...submittedIds, selected.id];
    setSubmittedIds(updated);
    localStorage.setItem("homeworkSubmissions", JSON.stringify(updated));
    setSelected(null);
    setAnswer("");
  };

  const isSubmitted = (id, originalStatus) => submittedIds.includes(id) || originalStatus === "Submitted";

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div><h1 className="text-2xl font-bold">Home Work</h1><p className="text-sm text-slate-500">Track and submit your homework</p></div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044]"><p className="text-xs text-slate-500">Total</p><p className="text-2xl font-bold">{hwStats.total}</p></div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044]"><p className="text-xs text-slate-500">Submitted</p><p className="text-2xl font-bold text-emerald-600">{hwStats.submitted}</p></div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044]"><p className="text-xs text-slate-500">Pending</p><p className="text-2xl font-bold text-amber-600">{hwStats.pending}</p></div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044]"><p className="text-xs text-slate-500">Late</p><p className="text-2xl font-bold text-red-600">{hwStats.late}</p></div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044]"><p className="text-xs text-slate-500">Submission Rate</p><p className="text-2xl font-bold text-indigo-600">{hwStats.submissionRate}%</p></div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200 dark:border-[#243044] flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search homework..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none" />
        </div>
        <select value={filterSub} onChange={e => setFilterSub(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none">{subjects.map(s => <option key={s}>{s}</option>)}</select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none"><option>All</option><option>Pending</option><option>Submitted</option><option>Late</option></select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(h => {
          const submitted = isSubmitted(h.id, h.status);
          return (
            <div key={h.id} className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044] hover:shadow-lg transition">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{h.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{h.subject} • {h.topic} • {h.teacher}</p>
                </div>
                <Badge variant={submitted ? "success" : h.status === "Late" ? "danger" : "warning"}>{submitted ? "Submitted" : h.status}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3"><p className="text-slate-500">Given</p><p className="font-medium">{h.givenDate}</p></div>
                <div className="bg-amber-50 dark:bg-amber-950 rounded-xl p-3"><p className="text-slate-500">Due</p><p className="font-medium">{h.dueDate}</p></div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-medium flex items-center gap-1"><Award className="w-4 h-4 text-indigo-600" />{h.marks} Marks</span>
                <span className="text-xs text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3" />{h.dueDate}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setSelected(h)} className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-[#243044] rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-[#1E293B]"><Eye className="w-4 h-4" />View</button>
                {!submitted ? <button onClick={() => setSelected(h)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700"><Upload className="w-4 h-4" />Submit</button> : <span className="flex-1 text-center py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium">✓ Submitted 24 Sep 2026</span>}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/70" onClick={() => setSelected(null)} />
          <div className="relative bg-white dark:bg-[#111827] rounded-t-3xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white dark:bg-[#111827] p-5 border-b border-slate-200 dark:border-[#243044] flex items-center justify-between">
              <h3 className="font-bold">{selected.title}</h3>
              <button onClick={() => setSelected(null)} className="p-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155]"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-indigo-50 dark:bg-indigo-950 rounded-xl p-4">
                <p className="text-sm font-medium">Instructions</p><p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{selected.instructions}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Questions</p>
                <ul className="list-disc list-inside text-sm space-y-1 text-slate-700 dark:text-slate-300">{selected.questions.map((qq, i) => <li key={i}>{qq}</li>)}</ul>
              </div>
              <div>
                <label className="text-sm font-medium">Your Answer</label>
                <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={4} placeholder="Type your answer here..." className="w-full mt-2 p-3 border border-slate-200 dark:border-[#243044] rounded-xl bg-slate-50 dark:bg-[#172033] text-sm outline-none focus:border-indigo-300" />
              </div>
              <div className="border-2 border-dashed border-slate-300 dark:border-[#243044] rounded-xl p-8 text-center">
                <Upload className="w-8 h-8 mx-auto text-slate-400" />
                <p className="text-sm font-medium mt-2">Upload File (UI only)</p><p className="text-xs text-slate-500">PDF, JPG, PNG up to 5MB</p>
              </div>
              {isSubmitted(selected.id, selected.status) ? <div className="text-center py-3 bg-emerald-50 text-emerald-700 rounded-xl font-medium">Submitted on 24 September 2026</div> : <button onClick={handleSubmit} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700">Submit Homework</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
