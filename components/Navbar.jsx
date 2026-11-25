"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight, BarChart3, Bell, LogOut, Menu, MessageCircle, Moon, Search, Settings,
  Sun, User,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { Skeleton } from "@/components/ui";

const searchable = [
  { label: "Mathematics · Quadratic equations", href: "/student/subjects" },
  { label: "Science · Life processes", href: "/student/subjects" },
  { label: "Quadratic equation practice · Homework", href: "/student/homework" },
  { label: "Geometry questions · Classwork", href: "/student/classwork" },
  { label: "Unit test 1 · Mathematics", href: "/student/exams" },
  { label: "Parent teacher meeting · Notice", href: "/student/notices" },
  { label: "Attendance", href: "/student/attendance" },
  { label: "Results", href: "/student/results" },
];

const notifications = [
  { id: 1, title: "New homework in Mathematics", meta: "2h ago", read: false },
  { id: 2, title: "Unit test on 30 Sep", meta: "5h ago", read: false },
  { id: 3, title: "Science result published", meta: "1d ago", read: true },
];

const menuClass =
  "absolute right-0 z-50 mt-1.5 overflow-hidden rounded-lg border border-hairline bg-surface shadow-[0_10px_30px_rgba(16,19,20,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)]";
const menuItemClass =
  "flex h-9 w-full items-center gap-2 px-3 text-[13px] text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink";
const iconButtonClass =
  "flex h-9 w-9 items-center justify-center rounded-lg text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink";

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function Navbar({ onMenu }) {
  const { setTheme } = useTheme();
  const { data, isLoading } = useDashboard();
  const student = data?.student;
  const displayName = student?.name || "Student";
  const classLabel = student?.class ? `Class ${student.class}` : "Student record";

  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [lang, setLang] = useState("EN");
  const [read, setRead] = useState(() => new Set());

  const searchRef = useRef(null);
  const actionsRef = useRef(null);
  const router = useRouter();

  const unread = notifications.filter((item) => !item.read && !read.has(item.id)).length;

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setShowSearch(false);
        setShowNotif(false);
        setShowProfile(false);
      }
    };
    const onPointerDown = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setShowNotif(false);
        setShowProfile(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  // Read the applied class rather than theme state, so the icon never
  // disagrees with what is painted (the pre-hydration script owns <html>).
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  const filtered = query
    ? searchable.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
    : [];

  const openResult = (href) => {
    router.push(href);
    setQuery("");
    setShowSearch(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <div className="flex h-[60px] items-center gap-2 px-3 sm:gap-4 sm:px-6">
        <button onClick={onMenu} aria-label="Open menu" className={`${iconButtonClass} lg:hidden`}>
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <div className="relative hidden max-w-sm flex-1 sm:block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            strokeWidth={1.5}
          />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setShowSearch(true);
            }}
            onFocus={() => setShowSearch(true)}
            onBlur={() => setTimeout(() => setShowSearch(false), 160)}
            placeholder="Search records"
            aria-label="Search subjects, homework and notices"
            className="h-9 w-full rounded-lg border border-hairline bg-surface-raised pl-9 pr-16 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-hairline-strong focus:bg-surface"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[10px] leading-4 text-ink-muted">
            Ctrl K
          </kbd>
          {showSearch && query && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-lg border border-hairline bg-surface py-1 shadow-[0_10px_30px_rgba(16,19,20,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
              {filtered.length ? (
                filtered.map((result) => (
                  <button
                    key={result.label}
                    type="button"
                    onMouseDown={() => openResult(result.href)}
                    className={`${menuItemClass} text-left`}
                  >
                    <span className="truncate">{result.label}</span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-[13px] text-ink-muted">No matching records</p>
              )}
            </div>
          )}
        </div>

        <div ref={actionsRef} className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <button
            onClick={() => setLang((value) => (value === "EN" ? "HI" : "EN"))}
            aria-label="Switch language"
            className="hidden h-9 items-center rounded-lg px-2 font-mono text-[11px] text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink sm:flex"
          >
            {lang}
          </button>

          <button onClick={toggleTheme} aria-label="Toggle theme" className={iconButtonClass}>
            <Moon className="h-[18px] w-[18px] dark:hidden" strokeWidth={1.5} />
            <Sun className="hidden h-[18px] w-[18px] dark:block" strokeWidth={1.5} />
          </button>

          <Link href="/student/messages" aria-label="Messages" className={`${iconButtonClass} hidden sm:flex`}>
            <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Link>

          <div className="relative">
            <button
              onClick={() => {
                setShowNotif((value) => !value);
                setShowProfile(false);
              }}
              aria-label={unread ? `Notifications, ${unread} unread` : "Notifications"}
              aria-expanded={showNotif}
              className={iconButtonClass}
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {unread > 0 && (
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              )}
            </button>
            {showNotif && (
              <div className={`${menuClass} w-80`}>
                <div className="flex items-center justify-between border-b border-hairline px-3 py-2.5">
                  <p className="text-[13px] font-medium text-ink">
                    Notifications
                    {unread > 0 && <span className="ml-1.5 font-mono text-[11px] text-ink-muted">{unread}</span>}
                  </p>
                  <button
                    onClick={() => setRead(new Set(notifications.map((item) => item.id)))}
                    className="text-[11px] text-ink-muted transition-colors hover:text-ink"
                  >
                    Mark all read
                  </button>
                </div>
                <ul className="max-h-80 divide-y divide-hairline overflow-auto">
                  {notifications.map((item) => {
                    const isRead = item.read || read.has(item.id);
                    return (
                      <li key={item.id} className="px-3 py-2.5">
                        <p className={`text-[13px] leading-5 ${isRead ? "text-ink-secondary" : "font-medium text-ink"}`}>
                          {item.title}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-ink-muted">{item.meta}</p>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="/student/notices"
                  onClick={() => setShowNotif(false)}
                  className="flex h-9 items-center justify-center gap-1 border-t border-hairline text-xs text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink"
                >
                  All notices
                  <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
                </Link>
              </div>
            )}
          </div>

          <div className="mx-1 hidden h-6 w-px bg-hairline sm:block" aria-hidden />

          <div className="relative">
            <button
              onClick={() => {
                setShowProfile((value) => !value);
                setShowNotif(false);
              }}
              aria-label="Profile menu"
              aria-expanded={showProfile}
              className="flex h-9 items-center gap-2.5 rounded-lg pl-1 pr-1.5 transition-colors hover:bg-surface-sunken"
            >
              <div className="hidden text-right sm:block">
                {isLoading ? (
                  <div className="space-y-1">
                    <Skeleton className="ml-auto h-3 w-24" />
                    <Skeleton className="ml-auto h-2.5 w-16" />
                  </div>
                ) : (
                  <>
                    <p className="text-[13px] font-medium leading-4 text-ink">{displayName}</p>
                    <p className="font-mono text-[10px] leading-4 text-ink-muted">{classLabel}</p>
                  </>
                )}
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-surface-sunken font-mono text-[10px] font-medium text-ink-secondary">
                {student?.avatar || initials(displayName)}
              </span>
            </button>
            {showProfile && (
              <div className={`${menuClass} w-56`}>
                <div className="border-b border-hairline px-3 py-2.5">
                  <p className="text-[13px] font-medium text-ink">{displayName}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-ink-muted">
                    {student?.studentId || classLabel}
                  </p>
                </div>
                <div className="p-1">
                  <Link href="/student/profile" onClick={() => setShowProfile(false)} className={menuItemClass}>
                    <User className="h-4 w-4 text-ink-muted" strokeWidth={1.5} />
                    My profile
                  </Link>
                  <Link href="/student/results" onClick={() => setShowProfile(false)} className={menuItemClass}>
                    <BarChart3 className="h-4 w-4 text-ink-muted" strokeWidth={1.5} />
                    My results
                  </Link>
                  <Link href="/student/settings" onClick={() => setShowProfile(false)} className={menuItemClass}>
                    <Settings className="h-4 w-4 text-ink-muted" strokeWidth={1.5} />
                    Settings
                  </Link>
                  <button
                    onClick={() => setShowProfile(false)}
                    className={`${menuItemClass} text-negative hover:text-negative`}
                  >
                    <LogOut className="h-4 w-4" strokeWidth={1.5} />
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-hairline px-3 py-2 sm:hidden">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
            strokeWidth={1.5}
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search records"
            aria-label="Search"
            className="h-9 w-full rounded-lg border border-hairline bg-surface-raised pl-9 pr-3 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-hairline-strong focus:bg-surface"
          />
        </div>
      </div>
    </header>
  );
}
