"use client";
import { classInfo } from "@/data/classes";
import { todayTimetable } from "@/data/timetable";
import { Users, MapPin, GraduationCap, CalendarDays, Clock } from "lucide-react";

export default function ClassesPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div><h1 className="text-2xl font-bold">My Classes</h1><p className="text-sm text-slate-500">Your class information and timetable</p></div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Class</p>
          <p className="text-2xl font-bold mt-1">{classInfo.class}</p>
          <p className="text-sm text-slate-500">Section {classInfo.section} • Room {classInfo.room}</p>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Class Teacher</p>
          <p className="text-lg font-bold mt-1">{classInfo.classTeacher}</p>
          <p className="text-sm text-slate-500">Total Students: {classInfo.totalStudents}</p>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Academic Session</p>
          <p className="text-lg font-bold mt-1">{classInfo.academicSession}</p>
          <p className="text-sm text-slate-500">House: Red House • Roll 01</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-[#243044] flex items-center justify-between">
          <h3 className="font-semibold">Today&apos;s Timetable — 21 Sep 2026</h3>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">5 Periods</span>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-[#243044]">
          {todayTimetable.map((t, i) => (
            <div key={i} className="p-4 sm:p-5 flex items-center gap-4">
              <div className="w-20 text-sm font-bold text-indigo-600">{t.time}</div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 font-bold text-sm">{t.subject.slice(0, 2)}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{t.subject}</p>
                <p className="text-xs text-slate-500">{t.teacher} • {t.room} • {t.class}</p>
              </div>
              <span className={`hidden sm:inline-flex text-xs px-3 py-1 rounded-full font-medium ${t.status === "Completed" ? "bg-emerald-50 text-emerald-700" : t.status === "Ongoing" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>{t.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
        <h3 className="font-semibold mb-4">Class Information</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Class</span><span className="font-medium">10-A</span></div>
          <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Section</span><span className="font-medium">A</span></div>
          <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Room</span><span className="font-medium">201</span></div>
          <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Total Students</span><span className="font-medium">42</span></div>
        </div>
      </div>
    </div>
  );
}
