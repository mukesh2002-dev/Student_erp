"use client";
import { useEffect, useMemo, useState } from "react";
import { studentService } from "@/services/student.service";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATUS_STYLE = {
  present: "bg-emerald-500 text-white border-emerald-500",
  absent: "bg-red-500 text-white border-red-500",
  late: "bg-amber-500 text-white border-amber-500",
  excused: "bg-blue-500 text-white border-blue-500",
  leave: "bg-blue-500 text-white border-blue-500",
};
const STATUS_SHORT = { present: "Pr", absent: "Ab", late: "Lt", excused: "Lv", leave: "Lv" };

function normStatus(s) {
  const v = String(s ?? "").toLowerCase();
  if (v === "excused" || v === "leave") return "leave";
  if (v === "absent") return "absent";
  if (v === "late") return "late";
  return "present";
}

export default function AttendancePage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1); // 1-12
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await studentService.getAttendance(month, year);
        if (!cancelled) {
          setRecords(Array.isArray(data?.records) ? data.records : []);
          setSummary(data?.summary ?? null);
        }
      } catch (e) {
        if (!cancelled) setError(e?.message || "Could not load attendance");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [month, year]);

  const statusMap = useMemo(() => {
    const m = {};
    for (const r of records) {
      const d = new Date(r.date);
      const key = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
      m[key] = normStatus(r.status);
    }
    return m;
  }, [records]);

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth() + 1;

  const shiftMonth = (dir) => {
    let m = month + dir, y = year;
    if (m < 1) { m = 12; y -= 1; }
    if (m > 12) { m = 1; y += 1; }
    setMonth(m);
    setYear(y);
  };

  const pct = summary?.total > 0 ? Math.round(((summary.present + summary.late) / summary.total) * 100) : 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div><h1 className="text-2xl font-bold">My Attendance</h1><p className="text-sm text-slate-500">View-only • Marked by your teacher</p></div>

      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
        <p className="text-indigo-100 text-sm">Overall Attendance</p>
        <p className="text-4xl font-bold mt-1">{loading ? "…" : `${pct}%`}</p>
        <div className="grid grid-cols-4 gap-3 mt-4 text-center">
          {[
            ["Present", summary?.present ?? 0],
            ["Absent", summary?.absent ?? 0],
            ["Late", summary?.late ?? 0],
            ["Leave", summary?.excused ?? 0],
          ].map(([label, val]) => (
            <div key={label} className="bg-white/15 rounded-xl p-3">
              <p className="text-lg font-bold">{loading ? "…" : val}</p>
              <p className="text-xs text-indigo-100">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => shiftMonth(-1)} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#243044] text-sm hover:bg-slate-50 dark:hover:bg-[#172033]">← Prev</button>
          <h3 className="font-semibold">{MONTHS[month - 1]} {year}</h3>
          <button onClick={() => shiftMonth(1)} disabled={isCurrentMonth} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#243044] text-sm hover:bg-slate-50 dark:hover:bg-[#172033] disabled:opacity-40">Next →</button>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500 text-center py-10">Loading attendance…</p>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-sm font-semibold">Couldn&apos;t load attendance</p>
            <p className="text-xs text-slate-500 mt-1">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500 mb-2">
              {DAYS.map((d) => <div key={d} className="py-2">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => <div key={"e" + i} className="h-10 sm:h-12" />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const d = i + 1;
                const key = `${year}-${month}-${d}`;
                const s = statusMap[key];
                const isFuture = isCurrentMonth && key > todayKey;
                const noRecord = !s && !isFuture;
                return (
                  <div
                    key={d}
                    title={s ? `${MONTHS[month - 1]} ${d}: ${s}` : noRecord ? `${MONTHS[month - 1]} ${d}: not marked` : `${MONTHS[month - 1]} ${d}`}
                    className={`h-10 sm:h-12 rounded-xl flex flex-col items-center justify-center text-xs font-medium border ${
                      s
                        ? STATUS_STYLE[s]
                        : noRecord
                          ? "bg-slate-200 dark:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                          : "bg-slate-50 dark:bg-[#172033] border-slate-200 dark:border-[#243044] text-slate-400"
                    }`}
                  >
                    <span>{d}</span>
                    {s ? (
                      <span className="text-[9px]">{STATUS_SHORT[s]}</span>
                    ) : noRecord ? (
                      <span className="text-[9px]">—</span>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3 mt-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" />Present</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500" />Absent</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" />Late</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500" />Leave</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-300 dark:bg-slate-600" />Not marked</span>
            </div>
          </>
        )}
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-[#243044]"><h3 className="font-semibold">Records — {MONTHS[month - 1]} {year} ({records.length})</h3></div>
        {records.length === 0 && !loading ? (
          <p className="text-sm text-slate-500 text-center py-8">No attendance marked this month yet.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-[#243044] max-h-96 overflow-auto">
            {records.map((r) => {
              const d = new Date(r.date);
              const s = normStatus(r.status);
              const label = { present: "Present", absent: "Absent", late: "Late", leave: "Leave" }[s];
              const cls = { present: "bg-emerald-500 text-white", absent: "bg-red-500 text-white", late: "bg-amber-500 text-white", leave: "bg-blue-500 text-white" }[s];
              return (
                <div key={r.uuid} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">{d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</p>
                    <p className="text-xs text-slate-500">{d.toLocaleDateString("en-IN", { weekday: "long", timeZone: "UTC" })}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${cls}`}>{label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
