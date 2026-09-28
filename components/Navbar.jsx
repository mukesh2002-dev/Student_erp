"use client";
import { useState } from "react";
import { Search, Bell, MessageCircle, Sun, Moon, Menu, Globe, LogOut, User, BarChart3, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useStudentHeader } from "@/hooks/student/useStudentPortal";
import { Skeleton } from "@/components/ui";

const searchable = [
  { label: "Mathematics - Quadratic Equations", href: "/student/subjects" },
  { label: "Science - Life Processes", href: "/student/subjects" },
  { label: "Quadratic Equation Practice - Homework", href: "/student/homework" },
  { label: "Geometry Questions - Classwork", href: "/student/classwork" },
  { label: "Unit Test 1 - Mathematics", href: "/student/exams" },
  { label: "PTM Notice", href: "/student/notices" },
  { label: "Attendance", href: "/student/attendance" },
  { label: "Results", href: "/student/results" },
];

export default function Navbar({ onMenu }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  // Dedicated header API (task.md): name, class, photo, campus — never bundled.
  const { data: header, isLoading: headerLoading } = useStudentHeader();
  const displayName = header?.name || "Student";
  const classLabel = header?.class ? `${header.class.name}${header.class.section ? `-${header.class.section}` : ""}` : "";
  const avatarSrc =
    header?.avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(displayName)}`;
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [lang, setLang] = useState("EN");
  const [notifs, setNotifs] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const n = JSON.parse(localStorage.getItem("notifications") || "null");
      if (n) return n;
    } catch {}
    return [
      { id: 1, title: "New homework in Mathematics", time: "2h ago", read: false },
      { id: 2, title: "Unit Test on 30 Sep", time: "5h ago", read: false },
      { id: 3, title: "Science result published", time: "1d ago", read: true },
    ];
  });
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(dark ? "light" : "dark");
  };

  const filtered = query ? searchable.filter(s => s.label.toLowerCase().includes(query.toLowerCase())) : [];
  const unread = notifs.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#0F172A] backdrop-blur-xl border-b border-slate-200 dark:border-[#243044] transition-colors">
      <div className="flex items-center gap-2 sm:gap-4 px-3 sm:px-6 py-3">
        <button onClick={onMenu} aria-label="Open menu" className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-700 dark:text-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors">
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1 max-w-xl hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setShowSearch(true); }}
            onFocus={() => setShowSearch(true)}
            onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            placeholder="Search subjects, homework, materials..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] focus:border-indigo-500 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-[#111827] rounded-xl text-sm outline-none transition text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          {showSearch && query && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044] rounded-xl shadow-xl overflow-hidden z-50">
              {filtered.length ? filtered.map((r, i) => (
                <button key={i} onClick={() => { router.push(r.href); setQuery(""); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-[#172033] text-slate-900 dark:text-slate-100 transition-colors">{r.label}</button>
              )) : <p className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">No results found</p>}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          <button onClick={() => setLang(l => l === "EN" ? "HI" : "EN")} className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1E293B] text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors min-h-[44px]">
            <Globe className="w-4 h-4" />{lang}
          </button>
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-700 dark:text-slate-200 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="relative">
            <button onClick={() => setShowNotif(v => !v)} aria-label="Notifications" className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-700 dark:text-slate-200 relative transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
              <Bell className="w-5 h-5" />
              {unread > 0 && <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">{unread}</span>}
            </button>
            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044] rounded-2xl shadow-xl overflow-hidden z-50">
                <div className="p-4 border-b border-slate-200 dark:border-[#243044] flex items-center justify-between">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">Notifications</p>
                  <button onClick={() => { const u = notifs.map(n => ({ ...n, read: true })); setNotifs(u); localStorage.setItem("notifications", JSON.stringify(u)); }} className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Mark all read</button>
                </div>
                <div className="max-h-80 overflow-auto divide-y divide-slate-100 dark:divide-[#243044]">
                  {notifs.map(n => (
                    <div key={n.id} className={`p-4 ${!n.read ? "bg-indigo-50/50 dark:bg-indigo-950/20" : "bg-white dark:bg-[#111827]"}`}>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{n.title}</p><p className="text-xs text-slate-500 dark:text-slate-400">{n.time}</p>
                    </div>
                  ))}
                </div>
                <Link href="/student/notices" onClick={() => setShowNotif(false)} className="block text-center py-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 border-t border-slate-200 dark:border-[#243044] hover:bg-slate-50 dark:hover:bg-[#172033]">View all</Link>
              </div>
            )}
          </div>

          <Link href="/student/messages" className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1E293B] text-slate-700 dark:text-slate-200 hidden sm:flex min-h-[44px] min-w-[44px] items-center justify-center"><MessageCircle className="w-5 h-5" /></Link>

          <div className="relative">
            <button onClick={() => setShowProfile(v => !v)} className="flex items-center gap-3 pl-2 min-h-[44px]" aria-label="Profile menu">
              <div className="hidden sm:block text-right">
                {headerLoading ? (
                  <div className="space-y-1.5">
                    <Skeleton className="h-3.5 w-24 ml-auto" />
                    <Skeleton className="h-3 w-16 ml-auto" />
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-semibold leading-none text-slate-900 dark:text-slate-100">{displayName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{classLabel}</p>
                  </>
                )}
              </div>
              <img src={avatarSrc} alt="avatar" className="w-9 h-9 rounded-full bg-indigo-100 object-cover border border-slate-200 dark:border-[#243044]" />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044] rounded-2xl shadow-xl overflow-hidden z-50">
                <div className="p-4 border-b border-slate-200 dark:border-[#243044]">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{displayName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {[classLabel, header?.campus?.name].filter(Boolean).join(" • ") || "Student"}
                  </p>
                </div>
                <div className="p-2 space-y-1">
                  <Link href="/student/profile" onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-[#172033] text-sm text-slate-700 dark:text-slate-300"><User className="w-4 h-4" />My Profile</Link>
                  <Link href="/student/results" onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-[#172033] text-sm text-slate-700 dark:text-slate-300"><BarChart3 className="w-4 h-4" />My Results</Link>
                  <Link href="/student/settings" onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-[#172033] text-sm text-slate-700 dark:text-slate-300"><Settings className="w-4 h-4" />Settings</Link>
                  <button onClick={() => setShowProfile(false)} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/50 text-sm text-red-600 dark:text-red-400"><LogOut className="w-4 h-4" />Logout</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="sm:hidden px-3 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-indigo-500" />
        </div>
      </div>
    </header>
  );
}
