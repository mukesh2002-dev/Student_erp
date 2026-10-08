"use client";
import { useEffect, useMemo, useState } from "react";
import { studentService } from "@/services/student.service";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

const KIND_STYLE = {
  exam: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
  event: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
  holiday: "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800",
};
const KIND_DOT = { exam: "bg-red-500", event: "bg-amber-500", holiday: "bg-emerald-500" };
const KIND_LABEL = { exam: "Exam", event: "Event", holiday: "Holiday" };

function dayKey(y, m, d) {
  return `${y}-${m}-${d}`;
}

export default function CalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // 1-12
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      setSelected(null);
      try {
        const data = await studentService.getCalendar(month, year);
        if (!cancelled) setItems(Array.isArray(data?.items) ? data.items : []);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Could not load calendar");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [month, year]);

  const eventMap = useMemo(() => {
    const m = {};
    for (const it of items) {
      const d = new Date(it.date);
      const k = dayKey(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
      (m[k] = m[k] || []).push(it);
    }
    return m;
  }, [items]);

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthName = new Date(year, month - 1, 1).toLocaleString("default", { month: "long", year: "numeric" });
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;
  const todayNum = now.getDate();

  const shiftMonth = (dir) => {
    let m = month + dir, y = year;
    if (m < 1) { m = 12; y -= 1; }
    if (m > 12) { m = 1; y += 1; }
    setMonth(m);
    setYear(y);
  };

  const upcoming = useMemo(() => {
    const start = isCurrentMonth
      ? new Date(Date.UTC(year, month - 1, todayNum))
      : new Date(Date.UTC(year, month - 1, 1));
    return items
      .filter((it) => new Date(it.date) >= start)
      .slice(0, 8);
  }, [items, isCurrentMonth, year, month, todayNum]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div><h1 className="text-2xl font-bold">Calendar</h1><p className="text-sm text-slate-500">Your exams, holidays & school events</p></div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">{monthName}</h3>
            <div className="flex gap-2">
              <button onClick={() => shiftMonth(-1)} aria-label="Previous month" className="p-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] hover:bg-slate-50 dark:hover:bg-[#172033]"><ChevronLeft className="w-5 h-5" /></button>
              <button onClick={() => shiftMonth(1)} aria-label="Next month" className="p-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] hover:bg-slate-50 dark:hover:bg-[#172033]"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500 mb-2">
            {days.map((d) => <div key={d} className="py-2">{d}</div>)}
          </div>
          {loading ? (
            <p className="text-sm text-slate-500 text-center py-10">Loading calendar…</p>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-sm font-semibold">Couldn&apos;t load calendar</p>
              <p className="text-xs text-slate-500 mt-1">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => <div key={"e" + i} className="h-20 sm:h-24" />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const d = i + 1;
                const evs = eventMap[dayKey(year, month, d)] || [];
                const isToday = isCurrentMonth && d === todayNum;
                const first = evs[0];
                return (
                  <button
                    key={d}
                    onClick={() => evs.length > 0 && setSelected(evs.length === 1 ? first : { multi: evs, dateLabel: `${d} ${monthName}` })}
                    disabled={evs.length === 0}
                    className={`h-20 sm:h-24 rounded-xl border p-2 text-left flex flex-col ${isToday ? "bg-indigo-600 text-white border-indigo-600" : first ? `${KIND_STYLE[first.kind] || ""} hover:shadow-md` : "bg-slate-50 dark:bg-[#172033] border-slate-200 dark:border-[#243044]"}`}
                  >
                    <span className={`text-sm font-bold ${isToday ? "text-white" : ""}`}>{d}</span>
                    {first && (
                      <span className={`text-[10px] leading-tight mt-1 line-clamp-2 ${isToday ? "text-indigo-100" : "text-slate-700 dark:text-slate-300"}`}>
                        {evs.length > 1 ? `${evs.length} items` : first.title}
                      </span>
                    )}
                    {evs.length > 0 && (
                      <span className="flex gap-1 mt-1">
                        {Array.from(new Set(evs.map((e) => e.kind))).map((k) => (
                          <span key={k} className={`w-2 h-2 rounded-full ${KIND_DOT[k] || "bg-slate-400"}`} />
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
          <div className="flex flex-wrap gap-3 mt-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500" />Exam</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" />Event</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" />Holiday</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
            <h3 className="font-semibold flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-indigo-600" />Upcoming</h3>
            <div className="mt-4 space-y-3">
              {loading ? (
                <p className="text-xs text-slate-500">Loading…</p>
              ) : upcoming.length === 0 ? (
                <p className="text-xs text-slate-500">Nothing scheduled after today this month.</p>
              ) : (
                upcoming.map((e) => (
                  <button key={e.uuid} onClick={() => setSelected(e)} className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-[#243044] hover:bg-slate-50 dark:hover:bg-[#1E293B]">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${KIND_DOT[e.kind] || "bg-slate-400"}`} />
                      {e.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {new Date(e.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" })} • {KIND_LABEL[e.kind] || e.kind}{e.detail ? ` • ${e.detail}` : ""}
                    </p>
                  </button>
                ))
              )}
            </div>
          </div>
          {selected && !selected.multi && (
            <div className="bg-indigo-600 text-white rounded-2xl p-6">
              <p className="text-sm text-indigo-100">
                {new Date(selected.date || selected.dateLabel).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })} • {KIND_LABEL[selected.kind] || ""}
              </p>
              <p className="font-bold">{selected.title}</p>
              {selected.detail && <p className="text-sm text-indigo-100 mt-1">{selected.detail}</p>}
              <button onClick={() => setSelected(null)} className="mt-3 text-xs bg-white/20 px-3 py-1.5 rounded-full">Close</button>
            </div>
          )}
          {selected?.multi && (
            <div className="bg-indigo-600 text-white rounded-2xl p-6 space-y-3">
              <p className="text-sm text-indigo-100">{selected.dateLabel}</p>
              {selected.multi.map((e) => (
                <div key={e.uuid}>
                  <p className="font-bold text-sm">{e.title}</p>
                  {e.detail && <p className="text-xs text-indigo-100">{e.detail}</p>}
                </div>
              ))}
              <button onClick={() => setSelected(null)} className="mt-1 text-xs bg-white/20 px-3 py-1.5 rounded-full">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
