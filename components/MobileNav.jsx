"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Clock, ClipboardCheck, Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { ClipboardList, Library, FileText, Award, Wallet, Bell, MessageCircle, Calendar, Plane, User, Settings, BookOpen, GraduationCap, BarChart3, Bus } from "lucide-react";

const bottomNav = [
  { label: "Home", href: "/student", icon: LayoutDashboard },
  { label: "Timetable", href: "/student/timetable", icon: Clock },
  { label: "Assignments", href: "/student/assignments", icon: ClipboardCheck },
  { label: "Homework", href: "/student/homework", icon: Home },
  { label: "More", href: "#more", icon: Menu },
];

const moreLinks = [
  { label: "My Classes", href: "/student/classes", icon: GraduationCap },
  { label: "Subjects", href: "/student/subjects", icon: BookOpen },
  { label: "Class Work", href: "/student/classwork", icon: ClipboardList },
  { label: "Topics", href: "/student/topics", icon: Library },
  { label: "Attendance", href: "/student/attendance", icon: ClipboardList },
  { label: "Exams", href: "/student/exams", icon: FileText },
  { label: "Results", href: "/student/results", icon: BarChart3 },
  { label: "Report Card", href: "/student/report-card", icon: Award },
  { label: "Transport", href: "/student/transport", icon: Bus },
  { label: "Fees", href: "/student/fees", icon: Wallet },
  { label: "Notices", href: "/student/notices", icon: Bell },
  { label: "Messages", href: "/student/messages", icon: MessageCircle },
  { label: "Calendar", href: "/student/calendar", icon: Calendar },
  { label: "Leave", href: "/student/leave", icon: Plane },
  { label: "Profile", href: "/student/profile", icon: User },
  { label: "Settings", href: "/student/settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#0F172A] border-t border-slate-200 dark:border-[#243044] z-40 safe-area-pb">
        <div className="grid grid-cols-5">
          {bottomNav.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href;
            if (item.label === "More") {
              return <button key={item.label} onClick={() => setOpen(true)} className="flex flex-col items-center gap-1 py-3 min-h-[56px] justify-center text-slate-500 dark:text-[#94A3B8] hover:text-indigo-600 dark:hover:text-indigo-400"><Icon className="w-5 h-5" /><span className="text-[10px] font-medium">More</span></button>;
            }
            return (
              <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-1 py-3 min-h-[56px] justify-center ${active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-[#94A3B8] hover:text-slate-700 dark:hover:text-slate-300"}`}>
                <Icon className="w-5 h-5" /><span className="text-[10px] font-medium leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-[#0F172A] rounded-t-3xl max-h-[80vh] overflow-auto border-t border-slate-200 dark:border-[#243044]">
            <div className="sticky top-0 bg-white dark:bg-[#0F172A] p-4 border-b border-slate-200 dark:border-[#243044] flex items-center justify-between">
              <p className="font-semibold text-slate-900 dark:text-[#F8FAFC]">More Menu</p><button onClick={() => setOpen(false)} className="p-2 rounded-xl bg-slate-100 dark:bg-[#1E293B] text-slate-700 dark:text-slate-300 min-h-[44px] min-w-[44px] flex items-center justify-center"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-3 gap-3 p-4">
              {moreLinks.map(l => {
                const Icon = l.icon;
                return <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-[#172033] hover:bg-indigo-50 dark:hover:bg-[#1E293B] text-center min-h-[88px] justify-center border border-slate-200 dark:border-[#243044] hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"><Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" /><span className="text-xs font-medium leading-tight text-slate-700 dark:text-[#94A3B8]">{l.label}</span></Link>;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function MobileSidebar({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="lg:hidden fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white dark:bg-[#0F172A] overflow-auto shadow-2xl border-r border-slate-200 dark:border-[#243044]">{children}</div>
    </div>
  );
}
