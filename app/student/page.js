"use client";
import Link from "next/link";
import { GreetingHeader, AttendanceSection, FeeSection, HomeworkSection, ExamsSection } from "@/components/features/dashboard/DashboardSections";
import { ClipboardCheck, BookOpen, Calendar, BarChart3, Wallet, Clock } from "lucide-react";

/**
 * Student dashboard (task.md): NO mega API. Each section below loads
 * independently with its own skeleton + error state, so one slow or
 * failed section never blocks the rest of the page.
 */
const quickActions = [
  { label: "Attendance", href: "/student/attendance", icon: ClipboardCheck, color: "bg-indigo-600" },
  { label: "Homework", href: "/student/homework", icon: BookOpen, color: "bg-emerald-600" },
  { label: "Timetable", href: "/student/timetable", icon: Clock, color: "bg-blue-600" },
  { label: "Results", href: "/student/results", icon: BarChart3, color: "bg-orange-600" },
  { label: "Exams", href: "/student/exams", icon: Calendar, color: "bg-rose-600" },
  { label: "Fees", href: "/student/fees", icon: Wallet, color: "bg-violet-600" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <GreetingHeader />

      {/* Quick Actions */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044]">
        <h3 className="font-semibold mb-4 text-slate-900 dark:text-[#F8FAFC]">Quick Actions</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link key={a.label} href={a.href} className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-[#1E293B] transition text-center">
                <div className={`w-12 h-12 rounded-2xl ${a.color} flex items-center justify-center text-white`}><Icon className="w-6 h-6" /></div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{a.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <AttendanceSection />
        <FeeSection />
        <HomeworkSection />
      </div>

      <ExamsSection />
    </div>
  );
}
