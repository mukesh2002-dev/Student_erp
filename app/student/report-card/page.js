"use client";
import { reportCard } from "@/data/reportCard";
import { Printer, Download, Award } from "lucide-react";

export default function ReportCardPage() {
  const print = () => window.print();
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h1 className="text-2xl font-bold">Report Card</h1><p className="text-sm text-slate-500">Academic Session {reportCard.session}</p></div>
        <div className="flex gap-2">
          <button onClick={print} className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 dark:border-[#243044] rounded-xl text-sm font-medium bg-white dark:bg-[#111827]"><Printer className="w-4 h-4" />Print</button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium"><Download className="w-4 h-4" />Download</button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white text-center">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto text-indigo-600 font-bold">SE</div>
          <h2 className="font-bold text-lg mt-3">Delhi Public School, Madhubani</h2>
          <p className="text-sm text-indigo-100">Affiliated to CBSE • Report Card • {reportCard.session}</p>
        </div>

        <div className="p-6">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Student Name</span><span className="font-semibold">{reportCard.student}</span></div>
            <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Class</span><span className="font-semibold">{reportCard.class}</span></div>
            <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Roll No</span><span className="font-semibold">{reportCard.roll}</span></div>
            <div className="flex justify-between p-3 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Attendance</span><span className="font-semibold">{reportCard.attendance}</span></div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-50 dark:bg-[#172033]"><th className="text-left p-3 rounded-tl-xl">Subject</th><th className="text-center p-3">Max Marks</th><th className="text-center p-3">Obtained</th><th className="text-center p-3">%</th><th className="text-center p-3 rounded-tr-xl">Grade</th></tr></thead>
              <tbody>
                {reportCard.subjects.map(s => (
                  <tr key={s.name} className="border-t border-slate-100 dark:border-[#243044]">
                    <td className="p-3 font-medium">{s.name}</td><td className="text-center p-3">{s.max}</td><td className="text-center p-3 font-bold">{s.obtained}</td><td className="text-center p-3">{s.percent}%</td><td className="text-center p-3"><span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-bold">{s.grade}</span></td>
                  </tr>
                ))}
                <tr className="bg-indigo-50 dark:bg-indigo-950 font-bold border-t border-indigo-200 dark:border-indigo-800">
                  <td className="p-3">Total</td><td className="text-center p-3">500</td><td className="text-center p-3">418</td><td className="text-center p-3">83.6%</td><td className="text-center p-3">A</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-950 rounded-xl p-4 text-center border border-emerald-200 dark:border-emerald-800"><p className="text-xs text-slate-500">Overall Grade</p><p className="text-2xl font-bold text-emerald-600">{reportCard.grade}</p></div>
            <div className="bg-indigo-50 dark:bg-indigo-950 rounded-xl p-4 text-center border border-indigo-200 dark:border-indigo-800"><p className="text-xs text-slate-500">Percentage</p><p className="text-2xl font-bold text-indigo-600">{reportCard.percentage}</p></div>
            <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-4 text-center"><p className="text-xs text-slate-500">Result</p><p className="text-2xl font-bold text-emerald-600">{reportCard.result}</p></div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950 rounded-xl border border-amber-200 dark:border-amber-800">
            <p className="text-sm font-semibold">Teacher Remarks</p><p className="text-sm text-slate-700 dark:text-slate-300 mt-1 italic">&quot;{reportCard.remarks}&quot;</p>
            <p className="text-xs text-slate-500 mt-2">— {reportCard.classTeacher}, Class Teacher</p>
          </div>

          <div className="mt-6 flex justify-between text-xs text-slate-500 pt-6 border-t border-dashed border-slate-300 dark:border-[#243044]">
            <div className="text-center"><div className="w-32 border-t border-slate-400 mx-auto pt-2">Class Teacher</div></div>
            <div className="text-center"><div className="w-32 border-t border-slate-400 mx-auto pt-2">Principal</div></div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">{reportCard.date} • This is a computer generated report card</p>
        </div>
      </div>
    </div>
  );
}
