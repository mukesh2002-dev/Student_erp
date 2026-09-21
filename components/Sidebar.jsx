"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, GraduationCap, BookOpen, ClipboardList, Home, Library, BookMarked, FileText, ClipboardCheck, HelpCircle, PenTool, BarChart3, Award, Wallet, Bell, MessageCircle, Calendar, Plane, User, Settings, Bus, Clock } from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/student", icon: LayoutDashboard },
  { label: "Academic", heading: true },
  { label: "My Classes", href: "/student/classes", icon: GraduationCap },
  { label: "Subjects", href: "/student/subjects", icon: BookOpen },
  { label: "Class Work", href: "/student/classwork", icon: ClipboardList },
  { label: "Home Work", href: "/student/homework", icon: Home },
  { label: "Assignments", href: "/student/assignments", icon: ClipboardCheck },
  { label: "Topics / Syllabus", href: "/student/topics", icon: Library },
  { label: "Study Materials", href: "/student/materials", icon: BookMarked },
  { label: "Timetable", href: "/student/timetable", icon: Clock },
  { label: "Attendance", heading: true },
  { label: "My Attendance", href: "/student/attendance", icon: ClipboardCheck },
  { label: "Examination", heading: true },
  { label: "Exams", href: "/student/exams", icon: FileText },
  { label: "Question Bank", href: "/student/question-bank", icon: HelpCircle },
  { label: "Practice Tests", href: "/student/practice-tests", icon: PenTool },
  { label: "Results", href: "/student/results", icon: BarChart3 },
  { label: "Report Card", href: "/student/report-card", icon: Award },
  { label: "Communication", heading: true },
  { label: "Notices", href: "/student/notices", icon: Bell },
  { label: "Messages", href: "/student/messages", icon: MessageCircle },
  { label: "Calendar", href: "/student/calendar", icon: Calendar },
  { label: "Other", heading: true },
  { label: "Transport", href: "/student/transport", icon: Bus },
  { label: "Fees", href: "/student/fees", icon: Wallet },
  { label: "Leave Request", href: "/student/leave", icon: Plane },
  { label: "Profile", href: "/student/profile", icon: User },
  { label: "Settings", href: "/student/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex w-[260px] shrink-0 flex-col bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-[#243044] sticky top-0 h-screen overflow-y-auto">
      <div className="p-5 border-b border-slate-200 dark:border-[#243044]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">SE</div>
          <div>
            <p className="font-bold text-slate-900 dark:text-[#F8FAFC] leading-none">Student ERP</p>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8]">Academic Portal</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {nav.map((item, i) => {
          if (item.heading) return <p key={i} className="text-[11px] font-semibold tracking-widest text-slate-400 dark:text-[#94A3B8] uppercase mt-4 mb-2 px-2">{item.label}</p>;
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${active ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800" : "text-slate-600 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#1E293B] hover:text-slate-900 dark:hover:text-[#F8FAFC] border border-transparent"}`}>
              <Icon className="w-[18px] h-[18px] shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-[#243044]">
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl p-4 border border-indigo-100 dark:border-indigo-900/50">
          <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">Need Help?</p>
          <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">Contact class teacher Rajesh Kumar</p>
        </div>
      </div>
    </aside>
  );
}
