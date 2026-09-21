"use client";
import { useState, useEffect } from "react";
import { fullTimetable, todayDateStr, todayDay } from "@/data/timetableFull";
import { Clock, MapPin, User, Bell, Calendar, List, LayoutGrid, BookOpen } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const subjectColors = {
  Mathematics: "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300",
  Science: "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300",
  English: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
  Hindi: "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300",
  "Social Science": "bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300",
  "Computer Science": "bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300",
  "Physical Education": "bg-lime-50 dark:bg-lime-950 border-lime-200 dark:border-lime-800",
  Library: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
  "Art & Craft": "bg-pink-50 dark:bg-pink-950 border-pink-200 dark:border-pink-800",
};

export default function TimetablePage() {
  const [view, setView] = useState("weekly"); // weekly | today | list
  const [selectedDay, setSelectedDay] = useState(todayDay);
  const [countdown, setCountdown] = useState(32);

  useEffect(() => {
    const t = setInterval(() => setCountdown(c => (c <= 1 ? 60 : c - 1)), 60000);
    return () => clearInterval(t);
  }, []);

  const todayClasses = fullTimetable[todayDay] || fullTimetable["Monday"];

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto w-full min-w-0 overflow-x-hidden">
      <div className="min-w-0">
        <div className="flex flex-col gap-3">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">Timetable</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Weekly class schedule — Class 10-A</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <button onClick={() => setView("weekly")} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium min-h-[44px] shrink-0 ${view === "weekly" ? "bg-indigo-600 text-white" : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044]"}`}><LayoutGrid className="w-4 h-4" />Weekly</button>
            <button onClick={() => setView("today")} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium min-h-[44px] shrink-0 ${view === "today" ? "bg-indigo-600 text-white" : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044]"}`}><Calendar className="w-4 h-4" />Today</button>
            <button onClick={() => setView("list")} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium min-h-[44px] shrink-0 ${view === "list" ? "bg-indigo-600 text-white" : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044]"}`}><List className="w-4 h-4" />List</button>
          </div>
        </div>
      </div>

      {/* Today's Schedule Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-4 sm:p-6 text-white overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-indigo-100 text-xs sm:text-sm">Today&apos;s Schedule • {todayDateStr} • {todayDay}</p>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              <div className="bg-white/15 rounded-xl p-3">
                <p className="text-xs text-indigo-100">Current Class</p>
                <p className="font-bold text-sm sm:text-base">Mathematics • 08:30 AM – 09:30 AM</p>
                <p className="text-xs text-indigo-100">Room 201 • In Progress</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-xs text-indigo-100">Next Class</p>
                <p className="font-bold text-sm sm:text-base">Science • 09:30 AM</p>
                <p className="text-xs text-indigo-100">Lab 2 • Upcoming</p>
              </div>
            </div>
          </div>
          <div className="bg-white text-slate-900 rounded-2xl p-4 text-center shrink-0">
            <p className="text-xs text-slate-500">Next class starts in</p>
            <p className="text-2xl font-bold text-indigo-600">{countdown} minutes</p>
            <p className="text-xs text-slate-500">Stay ready!</p>
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs bg-white/10 rounded-xl px-3 py-2"><Bell className="w-4 h-4 shrink-0" />Mathematics class starts in 10 minutes.</div>
          <div className="flex items-center gap-2 text-xs bg-white/10 rounded-xl px-3 py-2"><Bell className="w-4 h-4 shrink-0" />Your next class is Science at 09:30 AM.</div>
          <div className="flex items-center gap-2 text-xs bg-white/10 rounded-xl px-3 py-2"><Bell className="w-4 h-4 shrink-0" />Tomorrow&apos;s first class is Science at 08:30 AM.</div>
        </div>
      </div>

      {view === "today" && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044]">
          <h3 className="font-semibold mb-4">Today — {todayDay}</h3>
          <div className="space-y-3">
            {todayClasses.map((c, i) => {
              const isCurrent = i === 0;
              const isNext = i === 1;
              return (
                <div key={i} className={`p-4 rounded-xl border flex gap-3 sm:gap-4 ${isCurrent ? "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800" : isNext ? "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800" : "bg-slate-50 dark:bg-[#172033] border border-slate-200 dark:border-[#243044]"}`}>
                  <div className="text-xs font-bold text-indigo-600 shrink-0 w-20">{c.time}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{c.subject}</p>
                    <p className="text-xs text-slate-500 flex flex-wrap gap-x-2 gap-y-1 mt-1"><span className="flex items-center gap-1"><User className="w-3 h-3" />{c.teacher}</span><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.room}</span></p>
                  </div>
                  <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium h-fit shrink-0 ${isCurrent ? "bg-indigo-600 text-white" : isNext ? "bg-amber-500 text-white" : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044]"}`}>{isCurrent ? "CURRENT" : isNext ? "NEXT" : "UPCOMING"}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "list" && (
        <div className="space-y-4">
          {days.map(day => (
            <div key={day} className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
              <div className="p-4 bg-slate-50 dark:bg-[#172033] border-b border-slate-200 dark:border-[#243044] flex items-center justify-between">
                <h3 className="font-semibold">{day}</h3>
                <span className="text-xs bg-indigo-600 text-white px-2.5 py-1 rounded-full">{fullTimetable[day]?.length || 0} periods</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-[#243044]">
                {(fullTimetable[day] || []).map((c, i) => (
                  <div key={i} className="p-4 flex items-center gap-4">
                    <div className="text-xs font-bold text-indigo-600 w-20 shrink-0">{c.time}</div>
                    <div className={`flex-1 min-w-0 p-3 rounded-xl border ${subjectColors[c.subject] || "bg-slate-50 dark:bg-[#172033] border border-slate-200 dark:border-[#243044]"}`}>
                      <p className="font-medium text-sm">{c.subject}</p>
                      <p className="text-xs opacity-70">{c.teacher} • {c.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "weekly" && (
        <>
          {/* Mobile/Tablet: vertical cards per day */}
          <div className="lg:hidden space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {days.map(d => (
                <button key={d} onClick={() => setSelectedDay(d)} className={`px-4 py-2.5 rounded-xl text-sm font-medium min-h-[44px] shrink-0 ${selectedDay === d ? "bg-indigo-600 text-white" : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044]"}`}>{d.slice(0, 3)}</button>
              ))}
            </div>
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044]">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-600" />{selectedDay}</h3>
              <div className="space-y-3">
                {(fullTimetable[selectedDay] || []).map((c, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">{c.time.split(" ")[0]}</div>
                      {i !== fullTimetable[selectedDay].length - 1 && <div className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-700 mt-1 min-h-[20px]" />}
                    </div>
                    <div className={`flex-1 min-w-0 p-3 rounded-xl border mb-2 ${subjectColors[c.subject] || "bg-slate-50 dark:bg-[#172033] border border-slate-200 dark:border-[#243044]"}`}>
                      <p className="font-semibold text-sm">{c.subject}</p>
                      <p className="text-xs mt-1 flex flex-wrap gap-x-3 gap-y-1 opacity-80"><span className="flex items-center gap-1"><User className="w-3 h-3" />{c.teacher}</span><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.room}</span><span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.time}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: grid */}
          <div className="hidden lg:block bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-7 bg-slate-50 dark:bg-[#172033] border-b border-slate-200 dark:border-[#243044]">
                <div className="p-3 text-xs font-semibold text-slate-500">Time</div>
                {days.map(d => <div key={d} className="p-3 text-xs font-bold text-center border-l border-slate-200 dark:border-[#243044]">{d}</div>)}
              </div>
              {["08:30 AM", "09:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "01:30 PM", "02:30 PM"].map(time => (
                <div key={time} className="grid grid-cols-7 border-b border-slate-100 dark:border-[#243044]">
                  <div className="p-3 text-xs font-bold text-indigo-600 bg-slate-50/50 dark:bg-slate-800/50 flex items-center">{time}</div>
                  {days.map(day => {
                    const cls = (fullTimetable[day] || []).find(c => c.time === time);
                    return (
                      <div key={day} className="p-2 border-l border-slate-100 dark:border-[#243044] min-h-[70px]">
                        {cls ? (
                          <div className={`p-2 rounded-xl border text-xs ${subjectColors[cls.subject] || "bg-slate-50 dark:bg-[#172033] border border-slate-200 dark:border-[#243044]"}`}>
                            <p className="font-semibold leading-tight">{cls.subject}</p>
                            <p className="opacity-70 truncate">{cls.teacher}</p>
                            <p className="opacity-60">{cls.room}</p>
                          </div>
                        ) : <div className="h-full flex items-center justify-center text-slate-300 text-xs">—</div>}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
