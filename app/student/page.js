"use client";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import { dashboardStats } from "@/data/student";
import { todayTimetable } from "@/data/timetable";
import { attendanceSummary, attendanceChartData } from "@/data/attendance";
import Link from "next/link";
import { Clock, MapPin, User, Calendar, ArrowRight, Eye, BookOpen, ClipboardCheck, FileText, PenTool, BarChart3, Wallet } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, CartesianGrid } from "recharts";
import { useTheme } from "@/components/ThemeProvider";
import { getChartTheme } from "@/lib/chartTheme";

const performance = [
  { subject: "Mathematics", value: 88, color: "indigo" },
  { subject: "Science", value: 84, color: "emerald" },
  { subject: "English", value: 79, color: "blue" },
  { subject: "Hindi", value: 86, color: "orange" },
  { subject: "Social Science", value: 81, color: "rose" },
];

const events = [
  { title: "Unit Test — Mathematics", date: "30 September 2026", type: "Exam" },
  { title: "Science Practical", date: "02 October 2026", type: "Practical" },
  { title: "Parent Teacher Meeting", date: "05 October 2026", type: "Meeting" },
  { title: "Half Yearly Examination", date: "10 October 2026", type: "Exam" },
];

const quickActions = [
  { label: "View Attendance", href: "/student/attendance", icon: ClipboardCheck, color: "bg-indigo-600" },
  { label: "View Homework", href: "/student/homework", icon: BookOpen, color: "bg-emerald-600" },
  { label: "Study Materials", href: "/student/materials", icon: FileText, color: "bg-blue-600" },
  { label: "Practice Test", href: "/student/practice-tests", icon: PenTool, color: "bg-violet-600" },
  { label: "View Results", href: "/student/results", icon: BarChart3, color: "bg-orange-600" },
  { label: "Exam Schedule", href: "/student/exams", icon: Calendar, color: "bg-rose-600" },
];

export default function Dashboard() {
  const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening";
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const chartTheme = getChartTheme(isDark);
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-20" />
        <div className="relative">
          <h1 className="text-2xl sm:text-3xl font-bold">{greeting}, Aman 👋</h1>
          <p className="text-indigo-100 mt-1">Here&apos;s your academic overview.</p>
          <p className="text-sm text-indigo-200 mt-2">21 September 2026 • Monday • Class 10-A</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {dashboardStats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044]">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {quickActions.map(a => {
            const Icon = a.icon;
            return <Link key={a.label} href={a.href} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#1E293B] transition text-center"><div className={`w-12 h-12 rounded-2xl ${a.color} flex items-center justify-center text-white`}><Icon className="w-6 h-6" /></div><span className="text-xs font-medium">{a.label}</span></Link>;
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Performance */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <h3 className="font-semibold">Academic Performance</h3>
          <p className="text-xs text-slate-500 mb-4">Overall • 82.4%</p>
          <div className="space-y-4">
            {performance.map(p => (
              <div key={p.subject}>
                <div className="flex justify-between text-sm mb-1"><span className="font-medium">{p.subject}</span><span className="text-slate-500">{p.value}%</span></div>
                <ProgressBar value={p.value} color={p.color} />
              </div>
            ))}
          </div>
          <Link href="/student/results" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-600">View Details <ArrowRight className="w-4 h-4" /></Link>
        </div>

        {/* Attendance */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-slate-900 dark:text-[#F8FAFC]">Attendance</h3><span className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 px-2.5 py-1 rounded-full font-medium">95% • Excellent</span></div>
          <div className="grid grid-cols-3 gap-3 text-center mb-4">
            <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3"><p className="text-lg font-bold">120</p><p className="text-xs text-slate-500">Working Days</p></div>
            <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-3"><p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">114</p><p className="text-xs text-slate-500">Present</p></div>
            <div className="bg-red-50 dark:bg-red-950 rounded-xl p-3"><p className="text-lg font-bold text-red-600">6</p><p className="text-xs text-slate-500">Absent</p></div>
          </div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceChartData}><CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} vertical={false} /><XAxis dataKey="month" tick={{ fontSize: 11, fill: chartTheme.axis }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: chartTheme.tooltipBg, border: `1px solid ${chartTheme.tooltipBorder}`, color: chartTheme.tooltipText, borderRadius: "12px", fontSize: "12px" }} cursor={{ fill: isDark ? "#1E293B" : "#f1f5f9" }} /><Bar dataKey="present" fill={chartTheme.bar} radius={[6, 6, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </div>
          <Link href="/student/attendance" className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition"><Eye className="w-4 h-4" />View Attendance</Link>
        </div>

        {/* Timetable */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Today&apos;s Timetable</h3><span className="text-xs text-slate-500">21 Sep 2026</span></div>
          <div className="space-y-3">
            {todayTimetable.slice(0, 4).map((t, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#172033] border border-slate-100 dark:border-[#243044]">
                <div className="text-xs font-bold text-indigo-600 whitespace-nowrap mt-0.5">{t.time}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{t.subject}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1"><User className="w-3 h-3" />{t.teacher} • {t.room}</p>
                </div>
                <span className={`text-[11px] px-2 py-1 rounded-full font-medium h-fit border ${t.status === "Completed" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/50" : t.status === "Ongoing" ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-900/50" : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-900/50"}`}>{t.status}</span>
              </div>
            ))}
          </div>
          <Link href="/student/classes" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-600">View Full Timetable <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
        <h3 className="font-semibold mb-4">Upcoming Events</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {events.map((e, i) => (
            <div key={i} className="p-4 rounded-2xl border border-slate-200 dark:border-[#243044] hover:shadow-md transition">
              <span className={`text-[11px] px-2 py-1 rounded-full font-medium ${e.type === "Exam" ? "bg-rose-50 text-rose-700" : e.type === "Practical" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}>{e.type}</span>
              <p className="font-medium text-sm mt-2">{e.title}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Calendar className="w-3 h-3" />{e.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
