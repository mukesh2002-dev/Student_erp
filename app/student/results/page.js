"use client";
import { latestResult, analytics } from "@/data/results";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, CartesianGrid } from "recharts";
import Badge from "@/components/Badge";
import { useTheme } from "@/components/ThemeProvider";
import { getChartTheme } from "@/lib/chartTheme";

export default function ResultsPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const chartTheme = getChartTheme(isDark);
  const chartData = latestResult.subjects.map(s => ({ subject: s.name.slice(0, 7), marks: s.obtained }));
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div><h1 className="text-2xl font-bold">Results</h1><p className="text-sm text-slate-500">Latest result • {latestResult.exam} • {latestResult.date}</p></div>

      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-indigo-100 text-sm">Overall Percentage</p>
            <p className="text-4xl font-bold">{latestResult.percentage}%</p>
            <p className="text-indigo-100 text-sm mt-1">Grade A • PASS • Position {latestResult.position}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-white/15 rounded-xl p-4"><p className="text-xl font-bold">{latestResult.totalObtained}/{latestResult.totalMax}</p><p className="text-xs text-indigo-100">Total</p></div>
            <div className="bg-white/15 rounded-xl p-4"><p className="text-xl font-bold">{analytics.highest}</p><p className="text-xs text-indigo-100">Highest</p></div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {latestResult.subjects.map(s => (
          <div key={s.name} className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044]">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{s.name}</p>
              <Badge variant={s.grade === "A+" ? "success" : s.grade === "A" ? "success" : "warning"}>{s.grade}</Badge>
            </div>
            <p className="text-2xl font-bold mt-2">{s.obtained}<span className="text-sm font-normal text-slate-500">/{s.max}</span></p>
            <p className="text-xs text-slate-500">{s.percent}% • {s.grade}</p>
            <div className="mt-3 h-2 bg-slate-100 dark:bg-[#1E293B] rounded-full overflow-hidden"><div className="h-full bg-indigo-600 rounded-full" style={{ width: `${s.percent}%` }} /></div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <h3 className="font-semibold mb-4">Subject Performance</h3>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} /><XAxis dataKey="subject" tick={{ fontSize: 11, fill: chartTheme.axis }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: chartTheme.axis, fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} /><Tooltip contentStyle={{ background: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, color: chartTheme.tooltipText, borderRadius: "12px", fontSize: "12px" }} cursor={{ fill: isDark ? "#1E293B" : "#f1f5f9" }} /><Bar dataKey="marks" fill={chartTheme.bar} radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <h3 className="font-semibold mb-4">Analytics</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-4 text-center"><p className="text-xs text-slate-500">Highest Marks</p><p className="text-xl font-bold text-emerald-600">{analytics.highest}</p></div>
            <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-4 text-center"><p className="text-xs text-slate-500">Lowest Marks</p><p className="text-xl font-bold text-red-500">{analytics.lowest}</p></div>
            <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-4 text-center"><p className="text-xs text-slate-500">Overall Avg</p><p className="text-xl font-bold">{analytics.average}%</p></div>
            <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-4 text-center"><p className="text-xs text-slate-500">Class Avg</p><p className="text-xl font-bold">{analytics.classAverage}%</p></div>
          </div>
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950 rounded-xl border border-amber-200 dark:border-amber-800">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Class Position: {analytics.position} (out of 42)</p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">Dummy data for prototype — ranks are illustrative only.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
