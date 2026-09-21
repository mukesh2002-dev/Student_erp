"use client";
import { useState } from "react";
import { calendarEvents } from "@/data/calendar";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

export default function CalendarPage() {
  const [current] = useState(new Date(2026, 8, 1)); // Sep 2026
  const [selected, setSelected] = useState(null);
  const year = current.getFullYear(), month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = current.toLocaleString("default", { month: "long", year: "numeric" });
  const eventMap = {};
  calendarEvents.forEach(e => {
    const d = parseInt(e.date.split("-")[2]);
    if (e.date.startsWith("2026-09")) eventMap[d] = e;
  });

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div><h1 className="text-2xl font-bold">Calendar</h1><p className="text-sm text-slate-500">Monthly calendar with events</p></div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">{monthName}</h3>
            <div className="flex gap-2"><button className="p-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155]"><ChevronLeft className="w-5 h-5" /></button><button className="p-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155]"><ChevronRight className="w-5 h-5" /></button></div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500 mb-2">
            {days.map(d => <div key={d} className="py-2">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={"e" + i} className="h-20 sm:h-24" />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const ev = eventMap[d];
              const isToday = d === 21;
              return (
                <button key={d} onClick={() => ev && setSelected(ev)} className={`h-20 sm:h-24 rounded-xl border p-2 text-left flex flex-col ${isToday ? "bg-indigo-600 text-white border-indigo-600" : ev ? "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 hover:shadow-md" : "bg-slate-50 dark:bg-[#172033] border border-slate-200 dark:border-[#243044]"}`}>
                  <span className={`text-sm font-bold ${isToday ? "text-white" : ""}`}>{d}</span>
                  {ev && <span className={`text-[10px] leading-tight mt-1 line-clamp-2 ${isToday ? "text-indigo-100" : "text-amber-800 dark:text-amber-300"}`}>{ev.title}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
            <h3 className="font-semibold flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-indigo-600" />Upcoming Events</h3>
            <div className="mt-4 space-y-3">
              {calendarEvents.map((e, i) => (
                <button key={i} onClick={() => setSelected(e)} className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-[#243044] hover:bg-slate-50 dark:hover:bg-[#1E293B]">
                  <p className="text-sm font-medium">{e.title}</p>
                  <p className="text-xs text-slate-500">{e.date} • {e.time} • {e.type}</p>
                </button>
              ))}
            </div>
          </div>
          {selected && (
            <div className="bg-indigo-600 text-white rounded-2xl p-6">
              <p className="text-sm text-indigo-100">{selected.date}</p>
              <p className="font-bold">{selected.title}</p>
              <p className="text-sm text-indigo-100 mt-1">{selected.description} • {selected.time}</p>
              <button onClick={() => setSelected(null)} className="mt-3 text-xs bg-white/20 px-3 py-1.5 rounded-full">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
