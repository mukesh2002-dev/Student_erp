"use client";
import { useState, useEffect } from "react";
import { practiceTests } from "@/data/practiceTests";
import { Clock, FileText, Trophy, Play, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

export default function PracticeTestsPage() {
  const [test, setTest] = useState(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!test || submitted) return;
    const t = setInterval(() => setTimeLeft(v => (v <= 1 ? 0 : v - 1)), 1000);
    return () => clearInterval(t);
  }, [test, submitted]);

  const start = (pt) => {
    setTest(pt);
    setIdx(0);
    setAnswers({});
    setSubmitted(null);
    setTimeLeft(pt.duration * 60);
  };

  const submit = () => {
    const qs = test.qs || [];
    let correct = 0;
    qs.forEach((qq, i) => { if (answers[i] === qq.ans) correct++; });
    const total = qs.length || test.questions;
    const percent = Math.round((correct / total) * 100);
    const grade = percent >= 90 ? "A+" : percent >= 80 ? "A" : percent >= 70 ? "B+" : percent >= 60 ? "B" : percent >= 33 ? "C" : "F";
    // persist
    const attempts = JSON.parse(localStorage.getItem("practiceTestAttempts") || "[]");
    attempts.push({ id: test.id, score: correct, total, percent, date: new Date().toLocaleDateString() });
    localStorage.setItem("practiceTestAttempts", JSON.stringify(attempts));
    setSubmitted({ correct, total, percent, grade });
  };

  if (submitted && test) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-8 border border-slate-200 dark:border-[#243044] text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 rounded-full flex items-center justify-center mx-auto"><Trophy className="w-8 h-8 text-emerald-600" /></div>
          <h2 className="text-2xl font-bold mt-4">Test Submitted!</h2>
          <p className="text-slate-500 mt-1">{test.title}</p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-4"><p className="text-2xl font-bold">{submitted.correct}/{submitted.total}</p><p className="text-xs text-slate-500">Score</p></div>
            <div className="bg-indigo-50 dark:bg-indigo-950 rounded-xl p-4"><p className="text-2xl font-bold text-indigo-600">{submitted.percent}%</p><p className="text-xs text-slate-500">Percentage</p></div>
            <div className="bg-amber-50 dark:bg-amber-950 rounded-xl p-4"><p className="text-2xl font-bold">{submitted.grade}</p><p className="text-xs text-slate-500">Grade</p></div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            <div>Correct: {submitted.correct}</div><div>Incorrect: {submitted.total - submitted.correct}</div><div>Grade: {submitted.grade}</div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-left mb-3">Review</h3>
            <div className="space-y-3 text-left">
              {(test.qs || []).map((qq, i) => {
                const ok = answers[i] === qq.ans;
                return <div key={i} className={`p-4 rounded-xl border ${ok ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800" : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"}`}><p className="text-sm font-medium">{i + 1}. {qq.q}</p><p className="text-xs mt-1">Your answer: {qq.options[answers[i]] ?? "Not attempted"} • Correct: {qq.options[qq.ans]}</p></div>;
              })}
            </div>
          </div>
          <button onClick={() => { setTest(null); setSubmitted(null); }} className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-xl font-medium">Back to Tests</button>
        </div>
      </div>
    );
  }

  if (test) {
    const qs = test.qs || [];
    const current = qs[idx];
    const minutes = Math.floor(timeLeft / 60);
    const seconds = String(timeLeft % 60).padStart(2, "0");
    if (!current) {
      return (
        <div className="max-w-3xl mx-auto text-center py-16">
          <p>This test preview is not yet fully configured. Showing summary.</p>
          <button onClick={() => setTest(null)} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl">Back</button>
        </div>
      );
    }
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200 dark:border-[#243044] flex items-center justify-between">
          <div><p className="font-semibold">{test.title}</p><p className="text-xs text-slate-500">{idx + 1} / {qs.length} questions</p></div>
          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl font-bold"><Clock className="w-4 h-4" />{minutes}:{seconds}</div>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <p className="font-medium">Q{idx + 1}. {current.q}</p>
          <div className="grid gap-2 mt-4">
            {current.options.map((o, i) => (
              <button key={i} onClick={() => setAnswers(a => ({ ...a, [idx]: i }))} className={`text-left px-4 py-3 rounded-xl border text-sm transition ${answers[idx] === i ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 dark:bg-[#172033] border border-slate-200 dark:border-[#243044] hover:border-indigo-300"}`}>{String.fromCharCode(65 + i)}. {o}</button>
            ))}
          </div>
          <div className="flex items-center justify-between mt-6 gap-2">
            <button disabled={idx === 0} onClick={() => setIdx(idx - 1)} className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 dark:border-[#243044] rounded-xl text-sm font-medium disabled:opacity-40"><ChevronLeft className="w-4 h-4" />Previous</button>
            <div className="flex gap-1 flex-wrap justify-center">{qs.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`w-8 h-8 rounded-lg text-xs font-medium ${i === idx ? "bg-indigo-600 text-white" : answers[i] !== undefined ? "bg-emerald-100 text-emerald-700" : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155]"}`}>{i + 1}</button>)}</div>
            {idx < qs.length - 1 ? <button onClick={() => setIdx(idx + 1)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium">Next <ChevronRight className="w-4 h-4" /></button> : <button onClick={submit} className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium flex items-center gap-2"><CheckCircle className="w-4 h-4" />Submit Test</button>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div><h1 className="text-2xl font-bold">Practice Tests</h1><p className="text-sm text-slate-500">Take timed practice tests and get instant results</p></div>
      <div className="grid sm:grid-cols-2 gap-4">
        {practiceTests.map(t => (
          <div key={t.id} className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044] hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600"><FileText className="w-6 h-6" /></div>
            <h3 className="font-semibold mt-3">{t.title}</h3>
            <p className="text-xs text-slate-500">{t.subject}</p>
            <div className="flex gap-2 mt-3 text-xs">
              <span className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] px-2.5 py-1 rounded-full">{t.questions} Questions</span>
              <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" />{t.duration} min</span>
              <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full">{t.marks} Marks</span>
            </div>
            <div className="mt-3 text-xs text-slate-500">{t.attempts} attempts • Avg {t.avgScore} score</div>
            <button onClick={() => start(t)} className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700"><Play className="w-4 h-4" />Start Test</button>
          </div>
        ))}
      </div>
    </div>
  );
}
