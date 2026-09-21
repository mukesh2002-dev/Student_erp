"use client";
import { subjects } from "@/data/subjects";
import ProgressBar from "@/components/ProgressBar";
import { User, Clock, BookOpen } from "lucide-react";
import Link from "next/link";

export default function SubjectsPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div><h1 className="text-2xl font-bold">Subjects</h1><p className="text-sm text-slate-500">6 subjects • Academic Session 2026-27</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map(s => (
          <div key={s.id} className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044] hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">{s.icon}</div>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">{s.attendance}% Attendance</span>
            </div>
            <h3 className="font-bold text-lg">{s.name}</h3>
            <p className="text-xs text-slate-500">{s.code}</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><User className="w-4 h-4" />{s.teacher}</div>
              <div><p className="text-xs text-slate-500">Current Topic</p><p className="font-medium">{s.currentTopic}</p></div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span className="text-slate-500">Syllabus Progress</span><span className="font-medium">{s.syllabusProgress}%</span></div>
                <ProgressBar value={s.syllabusProgress} color="indigo" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3 text-center"><p className="text-xs text-slate-500">Average</p><p className="font-bold text-indigo-600">{s.averageMarks}%</p></div>
                <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3 text-center"><p className="text-xs text-slate-500">Next Class</p><p className="text-xs font-medium">{s.nextClass}</p></div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Link href="/student/topics" className="flex-1 text-center py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700">View Syllabus</Link>
              <Link href="/student/materials" className="flex-1 text-center py-2.5 border border-slate-200 dark:border-[#243044] rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-[#1E293B]">Materials</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
