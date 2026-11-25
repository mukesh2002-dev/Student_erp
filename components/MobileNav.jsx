"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Clock, ClipboardCheck, Home, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  ClipboardList, Library, FileText, Award, Wallet, Bell, MessageCircle, Calendar,
  Plane, User, Settings, BookOpen, GraduationCap, BarChart3, Bus,
} from "lucide-react";

const bottomNav = [
  { label: "Home", href: "/student", icon: LayoutDashboard },
  { label: "Timetable", href: "/student/timetable", icon: Clock },
  { label: "Assignments", href: "/student/assignments", icon: ClipboardCheck },
  { label: "Homework", href: "/student/homework", icon: Home },
  { label: "More", href: "#more", icon: Menu },
];

const moreLinks = [
  { label: "My class", href: "/student/classes", icon: GraduationCap },
  { label: "Subjects", href: "/student/subjects", icon: BookOpen },
  { label: "Classwork", href: "/student/classwork", icon: ClipboardList },
  { label: "Syllabus", href: "/student/topics", icon: Library },
  { label: "Attendance", href: "/student/attendance", icon: ClipboardList },
  { label: "Exams", href: "/student/exams", icon: FileText },
  { label: "Results", href: "/student/results", icon: BarChart3 },
  { label: "Report card", href: "/student/report-card", icon: Award },
  { label: "Transport", href: "/student/transport", icon: Bus },
  { label: "Fees", href: "/student/fees", icon: Wallet },
  { label: "Notices", href: "/student/notices", icon: Bell },
  { label: "Messages", href: "/student/messages", icon: MessageCircle },
  { label: "Calendar", href: "/student/calendar", icon: Calendar },
  { label: "Leave request", href: "/student/leave", icon: Plane },
  { label: "Profile", href: "/student/profile", icon: User },
  { label: "Settings", href: "/student/settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="safe-area-pb fixed bottom-0 left-0 right-0 z-40 border-t border-hairline bg-surface lg:hidden">
        <div className="grid grid-cols-5">
          {bottomNav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            if (item.label === "More") {
              return (
                <button
                  key={item.label}
                  onClick={() => setOpen(true)}
                  className="flex min-h-[56px] flex-col items-center justify-center gap-1 text-ink-muted transition-colors hover:text-ink"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                  <span className="text-[10px] font-medium leading-none">More</span>
                </button>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex min-h-[56px] flex-col items-center justify-center gap-1 transition-colors ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {active && (
                  <span className="absolute inset-x-6 top-0 h-[2px] rounded-full bg-accent" aria-hidden />
                )}
                <Icon className="h-5 w-5" strokeWidth={1.5} />
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-auto rounded-t-xl border-t border-hairline bg-surface">
            <div className="sticky top-0 flex items-center justify-between border-b border-hairline bg-surface px-4 py-3">
              <p className="text-sm font-medium text-ink">All sections</p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-secondary transition-colors hover:bg-surface-sunken"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 p-2">
              {moreLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex h-11 items-center gap-2.5 rounded-lg px-2.5 text-[13px] text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink"
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0 text-ink-muted" strokeWidth={1.5} />
                    <span className="truncate">{link.label}</span>
                  </Link>
                );
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
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-slate-950/40" onClick={onClose} aria-hidden />
      <div className="absolute bottom-0 left-0 top-0 w-[85%] max-w-[300px] overflow-auto border-r border-hairline bg-surface">
        {children}
      </div>
    </div>
  );
}
