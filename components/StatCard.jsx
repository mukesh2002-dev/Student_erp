"use client";
import { TrendingUp, BookOpen, Layers, Trophy, Clock, FileText, Wallet, ClipboardList } from "lucide-react";
const iconMap = { attendance: ClipboardList, homework: BookOpen, syllabus: Layers, marks: Trophy, pending: Clock, exam: FileText, assignment: FileText, fees: Wallet };
const colorMap = { indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400", emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400", blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400", violet: "bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400", amber: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400", rose: "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400", cyan: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400", orange: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400" };
export default function StatCard({ label, value, sub, icon, color }) {
  const Icon = iconMap[icon] || BookOpen;
  return (
    <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-[#243044] hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
          <p className="text-xs text-slate-500 mt-1">{sub}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color] || colorMap.indigo}`}><Icon className="w-5 h-5" /></div>
      </div>
    </div>
  );
}
