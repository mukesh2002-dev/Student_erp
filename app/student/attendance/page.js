"use client";
import { attendanceSummary, monthlyAttendance, attendanceChartData, attendanceBySubject } from "@/data/attendance";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { useTheme } from "@/components/ThemeProvider";
import { getChartTheme } from "@/lib/chartTheme";

const statusColor = { Present: "bg-emerald-500 text-white", Absent: "bg-red-500 text-white", Late: "bg-amber-500 text-white", Leave: "bg-blue-500 text-white", Holiday: "bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-300" };

export default function AttendancePage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const chartTheme = getChartTheme(isDark);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Build September 2026 calendar view (Sep 1 is Tue in 2026? Actually 2026 Sep 1 is Tue)
  const year = 2026, month = 8; // 0-indexed Sep=8
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const statusMap = {};
  monthlyAttendance.forEach(m => {
    const d = parseInt(m.date.split(" ")[0]);
    statusMap[d] = m.status;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div><h1 className="text-2xl font-bold">My Attendance</h1><p className="text-sm text-slate-500">View-only • Teacher managed</p></div>

      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
        <p className="text-indigo-100 text-sm">Overall Attendance</p>
        <p className="text-4xl font-bold mt-1">{attendanceSummary.percentage}%</p>
        <div className="grid grid-cols-4 gap-3 mt-4 text-center">
          <div className="bg-white/15 rounded-xl p-3"><p className="text-lg font-bold">{attendanceSummary.present}</p><p className="text-xs text-indigo-100">Present</p></div>
          <div className="bg-white/15 rounded-xl p-3"><p className="text-lg font-bold">{attendanceSummary.absent}</p><p className="text-xs text-indigo-100">Absent</p></div>
          <div className="bg-white/15 rounded-xl p-3"><p className="text-lg font-bold">{attendanceSummary.late}</p><p className="text-xs text-indigo-100">Late</p></div>
          <div className="bg-white/15 rounded-xl p-3"><p className="text-lg font-bold">{attendanceSummary.leave}</p><p className="text-xs text-indigo-100">Leave</p></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <h3 className="font-semibold mb-4">September 2026 Calendar</h3>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500 mb-2">
            {days.map(d => <div key={d} className="py-2">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={"e" + i} className="h-10 sm:h-12" />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const s = statusMap[d] || (d > 21 ? "Present" : "");
              return (
                <div key={d} className={`h-10 sm:h-12 rounded-xl flex flex-col items-center justify-center text-xs font-medium border ${s ? statusColor[s] || "bg-slate-100" : "bg-slate-50 dark:bg-[#172033] border border-slate-200 dark:border-[#243044]"}`}>
                  <span>{d}</span>{s && <span className="text-[9px]">{s.slice(0, 2)}</span>}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 mt-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" />Present</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500" />Absent</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500" />Late</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500" />Leave</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-300" />Holiday</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
            <h3 className="font-semibold mb-4">Monthly Trend</h3>
            <div className="h-48"><ResponsiveContainer width="100%" height="100%"><BarChart data={attendanceChartData}><CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} /><XAxis dataKey="month" tick={{ fontSize: 12, fill: chartTheme.axis }} axisLine={false} tickLine={false} /><YAxis hide /><Tooltip contentStyle={{ background: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, color: chartTheme.tooltipText, borderRadius: "12px", fontSize: "12px" }} cursor={{ fill: isDark ? "#1E293B" : "#f1f5f9" }} /><Bar dataKey="present" fill={chartTheme.bar} radius={[8, 8, 0, 0]} /><Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></div>
          </div>
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
            <h3 className="font-semibold mb-3">Subject-wise Attendance</h3>
            <div className="space-y-3">
              {attendanceBySubject.map(s => (
                <div key={s.subject}>
                  <div className="flex justify-between text-sm"><span>{s.subject}</span><span className="font-medium">{s.present}/{s.total} • {s.percent}%</span></div>
                  <div className="mt-1 h-2 bg-slate-100 dark:bg-[#1E293B] rounded-full overflow-hidden"><div className="h-full bg-indigo-600 rounded-full" style={{ width: `${s.percent}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-[#243044]"><h3 className="font-semibold">Attendance Report — September 2026</h3></div>
        <div className="divide-y divide-slate-100 dark:divide-[#243044] max-h-96 overflow-auto">
          {monthlyAttendance.map((m, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div><p className="text-sm font-medium">{m.date}</p><p className="text-xs text-slate-500">{m.day}</p></div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[m.status]}`}>{m.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
