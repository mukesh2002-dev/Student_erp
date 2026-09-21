"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({ hwNotif: true, examNotif: true, resultNotif: true, noticeNotif: true, messageNotif: true, lang: "English" });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentSettings") || "null");
    if (saved) setSettings(s => ({ ...s, ...saved }));
  }, []);
  useEffect(() => {
    localStorage.setItem("studentSettings", JSON.stringify(settings));
  }, [settings]);

  const Toggle = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#172033] rounded-xl border border-slate-200 dark:border-[#243044]">
      <span className="text-sm font-medium text-slate-900 dark:text-[#F8FAFC]">{label}</span>
      <button onClick={() => onChange(!value)} aria-label={label} className={`w-12 h-7 rounded-full p-1 transition flex ${value ? "bg-indigo-600 justify-end" : "bg-slate-300 dark:bg-[#334155] justify-start"}`}><span className="w-5 h-5 bg-white rounded-full shadow" /></button>
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl mx-auto w-full min-w-0 overflow-x-hidden">
      <div className="min-w-0"><h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">Settings</h1><p className="text-sm text-slate-500 dark:text-[#94A3B8]">Manage your account preferences</p></div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044] space-y-6">
        <div>
          <h3 className="font-semibold mb-3 text-slate-900 dark:text-[#F8FAFC]">Appearance</h3>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mb-3">Select theme — persists after refresh via student-erp-theme</p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <button onClick={() => setTheme("light")} className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-medium transition min-h-[80px] justify-center ${theme === "light" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 dark:bg-[#172033] border-slate-200 dark:border-[#243044] text-slate-700 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#1E293B]"}`}>
              <Sun className="w-6 h-6" /> Light
            </button>
            <button onClick={() => setTheme("dark")} className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-medium transition min-h-[80px] justify-center ${theme === "dark" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 dark:bg-[#172033] border-slate-200 dark:border-[#243044] text-slate-700 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#1E293B]"}`}>
              <Moon className="w-6 h-6" /> Dark
            </button>
            <button onClick={() => setTheme("system")} className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-medium transition min-h-[80px] justify-center ${theme === "system" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 dark:bg-[#172033] border-slate-200 dark:border-[#243044] text-slate-700 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-[#1E293B]"}`}>
              <Monitor className="w-6 h-6" /> System
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-2">Current: <span className="font-medium text-slate-900 dark:text-[#F8FAFC]">{theme}</span> — {theme === "system" ? "follows device preference" : theme === "dark" ? "dark #0B1120" : "light #f8fafc"}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-slate-900 dark:text-[#F8FAFC]">Notifications</h3>
          <div className="space-y-3">
            <Toggle label="Homework Notifications" value={settings.hwNotif} onChange={v => setSettings({ ...settings, hwNotif: v })} />
            <Toggle label="Exam Notifications" value={settings.examNotif} onChange={v => setSettings({ ...settings, examNotif: v })} />
            <Toggle label="Result Notifications" value={settings.resultNotif} onChange={v => setSettings({ ...settings, resultNotif: v })} />
            <Toggle label="Notice Notifications" value={settings.noticeNotif} onChange={v => setSettings({ ...settings, noticeNotif: v })} />
            <Toggle label="Message Notifications" value={settings.messageNotif} onChange={v => setSettings({ ...settings, messageNotif: v })} />
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-slate-900 dark:text-[#F8FAFC]">Language</h3>
          <div className="flex gap-2">
            <button onClick={() => setSettings({ ...settings, lang: "English" })} className={`flex-1 py-3 rounded-xl text-sm font-medium border min-h-[44px] ${settings.lang === "English" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 dark:bg-[#172033] border-slate-200 dark:border-[#243044] text-slate-700 dark:text-[#94A3B8]"}`}>English</button>
            <button onClick={() => setSettings({ ...settings, lang: "Hindi" })} className={`flex-1 py-3 rounded-xl text-sm font-medium border min-h-[44px] ${settings.lang === "Hindi" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 dark:bg-[#172033] border-slate-200 dark:border-[#243044] text-slate-700 dark:text-[#94A3B8]"}`}>हिंदी (Hindi)</button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-slate-900 dark:text-[#F8FAFC]">Account</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#172033] rounded-xl border border-slate-200 dark:border-[#243044]"><span className="text-slate-500 dark:text-[#94A3B8]">Student ID</span><span className="font-medium text-slate-900 dark:text-[#F8FAFC]">STU-2026-001</span></div>
            <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#172033] rounded-xl border border-slate-200 dark:border-[#243044]"><span className="text-slate-500 dark:text-[#94A3B8]">Email</span><span className="font-medium text-slate-900 dark:text-[#F8FAFC] text-xs sm:text-sm truncate ml-2">aman.kumar@student.demo</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
