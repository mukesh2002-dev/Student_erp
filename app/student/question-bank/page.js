"use client";
import { useState } from "react";
import { questions } from "@/data/questions";
import Badge from "@/components/Badge";
import { Search, Star, Eye } from "lucide-react";

export default function QuestionBankPage() {
  const [q, setQ] = useState("");
  const [filterSub, setFilterSub] = useState("All");
  const [filterDiff, setFilterDiff] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [revealed, setRevealed] = useState({});
  const [fav, setFav] = useState({});

  const subjects = ["All", ...new Set(questions.map(x => x.subject))];
  const filtered = questions.filter(item => {
    const mQ = item.question.toLowerCase().includes(q.toLowerCase());
    const mS = filterSub === "All" || item.subject === filterSub;
    const mD = filterDiff === "All" || item.difficulty === filterDiff;
    const mT = filterType === "All" || item.type === filterType;
    return mQ && mS && mD && mT;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div><h1 className="text-2xl font-bold">Question Bank</h1><p className="text-sm text-slate-500">Practice questions — view explanations after attempting</p></div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200 dark:border-[#243044] flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search questions..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none" />
        </div>
        <select value={filterSub} onChange={e => setFilterSub(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none">{subjects.map(s => <option key={s}>{s}</option>)}</select>
        <select value={filterDiff} onChange={e => setFilterDiff(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none"><option>All</option><option>Easy</option><option>Medium</option><option>Hard</option></select>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none"><option>All</option><option>MCQ</option><option>True/False</option><option>Numerical</option><option>Short Answer</option></select>
      </div>

      <div className="space-y-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044]">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="indigo">{item.subject}</Badge>
                <Badge>{item.chapter}</Badge>
                <Badge variant={item.difficulty === "Hard" ? "danger" : item.difficulty === "Medium" ? "warning" : "success"}>{item.difficulty}</Badge>
                <span className="text-xs bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] px-2.5 py-1 rounded-full font-medium">{item.type}</span>
              </div>
              <button onClick={() => setFav(f => ({ ...f, [item.id]: !f[item.id] }))} className={`p-2 rounded-xl ${fav[item.id] ? "bg-amber-50 text-amber-600" : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] text-slate-400"}`}><Star className={`w-4 h-4 ${fav[item.id] ? "fill-amber-500" : ""}`} /></button>
            </div>
            <p className="font-medium mt-3">{item.question}</p>
            {item.options.length > 0 && <div className="grid sm:grid-cols-2 gap-2 mt-3">{item.options.map((o, i) => <div key={i} className="px-4 py-2.5 bg-slate-50 dark:bg-[#172033] rounded-xl text-sm border border-slate-200 dark:border-[#243044]">{String.fromCharCode(65 + i)}. {o}</div>)}</div>}
            <div className="mt-4 flex gap-2">
              <button onClick={() => setRevealed(r => ({ ...r, [item.id]: !r[item.id] }))} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium flex items-center gap-2"><Eye className="w-4 h-4" />{revealed[item.id] ? "Hide Explanation" : "View Explanation"}</button>
            </div>
            {revealed[item.id] && (
              <div className="mt-4 space-y-2">
                <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">Answer: {item.answer}</p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">Explanation: {item.explanation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center py-8 text-slate-500">No questions found</p>}
      </div>
    </div>
  );
}
