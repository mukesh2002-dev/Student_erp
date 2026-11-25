"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, GraduationCap, BookOpen, ClipboardList, Home, Library, FileText,
  ClipboardCheck, BarChart3, Award, Wallet, Bell, MessageCircle, Calendar, Plane, User,
  Settings, Bus, Clock, ArrowRight,
} from "lucide-react";
import { student } from "@/data/student";

const primary = { label: "Dashboard", href: "/student", icon: LayoutDashboard };

const groups = [
  {
    heading: "Academic",
    items: [
      { label: "My class", href: "/student/classes", icon: GraduationCap },
      { label: "Subjects", href: "/student/subjects", icon: BookOpen },
      { label: "Classwork", href: "/student/classwork", icon: ClipboardList },
      { label: "Homework", href: "/student/homework", icon: Home },
      { label: "Assignments", href: "/student/assignments", icon: ClipboardCheck },
      { label: "Syllabus", href: "/student/topics", icon: Library },
      { label: "Timetable", href: "/student/timetable", icon: Clock },
    ],
  },
  {
    heading: "Attendance",
    items: [{ label: "Attendance", href: "/student/attendance", icon: ClipboardCheck }],
  },
  {
    heading: "Examinations",
    items: [
      { label: "Exams", href: "/student/exams", icon: FileText },
      { label: "Results", href: "/student/results", icon: BarChart3 },
      { label: "Report card", href: "/student/report-card", icon: Award },
    ],
  },
  {
    heading: "Communication",
    items: [
      { label: "Notices", href: "/student/notices", icon: Bell },
      { label: "Messages", href: "/student/messages", icon: MessageCircle },
      { label: "Calendar", href: "/student/calendar", icon: Calendar },
    ],
  },
  {
    heading: "Services",
    items: [
      { label: "Transport", href: "/student/transport", icon: Bus },
      { label: "Fees", href: "/student/fees", icon: Wallet },
      { label: "Leave request", href: "/student/leave", icon: Plane },
    ],
  },
  {
    heading: "Account",
    items: [
      { label: "Profile", href: "/student/profile", icon: User },
      { label: "Settings", href: "/student/settings", icon: Settings },
    ],
  },
];

function isActive(pathname, href) {
  return href === "/student" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

function NavItem({ item, pathname, onNavigate }) {
  const Icon = item.icon;
  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`relative flex h-10 items-center gap-2.5 rounded-lg px-2.5 text-[13px] transition-colors lg:h-9 ${
        active
          ? "bg-surface-sunken font-medium text-ink"
          : "text-ink-secondary hover:bg-surface-raised hover:text-ink"
      }`}
    >
      <Icon
        className={`h-[18px] w-[18px] shrink-0 ${active ? "text-ink" : "text-ink-muted"}`}
        strokeWidth={1.5}
      />
      <span className="truncate">{item.label}</span>
      {active && (
        <span className="absolute inset-y-1.5 left-0 w-[2px] rounded-full bg-accent" aria-hidden />
      )}
    </Link>
  );
}

/** Shared sidebar body, used by the desktop rail and the mobile drawer. */
export function SidebarPanel({ onNavigate }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-hairline px-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-[10px] font-medium tracking-wide text-canvas">
          SE
        </span>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-medium leading-5 text-ink">Student ERP</p>
          <p className="truncate text-[11px] leading-4 text-ink-muted">Academic portal</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <NavItem item={primary} pathname={pathname} onNavigate={onNavigate} />
        {groups.map((group) => (
          <div key={group.heading}>
            <p className="px-2 pb-2 pt-6 text-[11px] font-medium leading-4 text-ink-muted">
              {group.heading}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItem key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-hairline p-4">
        <p className="record">Class teacher</p>
        <p className="mt-1 text-[13px] font-medium text-ink">{student.classTeacher}</p>
        <Link
          href="/student/messages"
          onClick={onNavigate}
          className="mt-2 inline-flex items-center gap-1 text-xs text-ink-muted transition-colors hover:text-ink"
        >
          Send a message
          <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[264px] lg:shrink-0 lg:flex-col lg:border-r lg:border-hairline lg:bg-surface">
      <SidebarPanel />
    </aside>
  );
}
