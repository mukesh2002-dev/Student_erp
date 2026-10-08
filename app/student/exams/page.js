"use client";
import { useEffect, useState } from "react";
import { studentService } from "@/services/student.service";
import { Calendar, Clock, Award, MapPin, ChevronDown, FileText } from "lucide-react";

const EXAM_STATUS = {
  upcoming: { label: "Upcoming", cls: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
  ongoing: { label: "In Progress", cls: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  completed: { label: "Completed", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  cancelled: { label: "Cancelled", cls: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" },
};

const PAPER_STATUS = {
  today: { label: "Today", cls: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  upcoming: { label: "Upcoming", cls: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
  completed: { label: "Done", cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  cancelled: { label: "Cancelled", cls: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" },
};

function fmtDate(value) {
  if (!value) return "—";
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function ExamsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openExam, setOpenExam] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await studentService.getExams();
        if (!cancelled) setData(res ?? null);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Could not load exams");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const counts = data?.counts ?? null;
  const years = data?.academicYears ?? [];
  const classLabel = data?.class
    ? `${data.class.name}${data.class.section ? ` - ${data.class.section}` : ""}`
    : "";

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Examinations</h1>
        <p className="text-sm text-slate-500">
          {classLabel ? `Class ${classLabel} · ` : ""}Academic year wise exam schedule
        </p>
      </div>

      {loading && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-10 border border-slate-200 dark:border-[#243044] text-center text-sm text-slate-500">
          Loading exams…
        </div>
      )}

      {!loading && error && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 rounded-2xl p-5 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044] text-center">
              <p className="text-2xl font-bold text-amber-600">{counts?.upcoming ?? 0}</p>
              <p className="text-xs text-slate-500">Upcoming</p>
            </div>
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044] text-center">
              <p className="text-2xl font-bold text-emerald-600">{counts?.completed ?? 0}</p>
              <p className="text-xs text-slate-500">Completed</p>
            </div>
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-[#243044] text-center">
              <p className="text-2xl font-bold">{counts?.total ?? 0}</p>
              <p className="text-xs text-slate-500">Total Exams</p>
            </div>
          </div>

          {years.length === 0 && (
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-10 border border-slate-200 dark:border-[#243044] text-center text-sm text-slate-500">
              No exams published for your class yet.
            </div>
          )}

          {years.map((group) => (
            <div key={group.year} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">{group.year}</h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-medium">
                  Academic Year
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-[#243044]" />
              </div>

              {group.exams.map((e) => {
                const st = EXAM_STATUS[e.status] ?? EXAM_STATUS.upcoming;
                const isOpen = openExam === e.uuid;
                return (
                  <div key={e.uuid} className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044]">
                    <button
                      type="button"
                      onClick={() => setOpenExam(isOpen ? null : e.uuid)}
                      className="w-full flex items-center gap-4 p-5 text-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold">{e.name}</p>
                          <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${st.cls}`}>{st.label}</span>
                          {e.type && (
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-[#172033] dark:text-slate-300 font-medium">
                              {e.type}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {fmtDate(e.startDate)}{e.endDate && e.endDate !== e.startDate ? ` → ${fmtDate(e.endDate)}` : ""}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            {e.papers?.length ?? 0} paper{(e.papers?.length ?? 0) === 1 ? "" : "s"}
                          </span>
                          {e.mode && <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" />{e.mode}</span>}
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-200 dark:border-[#243044] p-5 space-y-3">
                        <div className="grid gap-2">
                          {(e.papers ?? []).map((p) => {
                            const ps = PAPER_STATUS[p.status] ?? PAPER_STATUS.upcoming;
                            const day = p.date ? DAY_NAMES[new Date(`${p.date}T00:00:00`).getDay()] : null;
                            return (
                              <div
                                key={p.uuid}
                                className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-xl bg-slate-50 dark:bg-[#172033] px-4 py-3 text-sm"
                              >
                                <span className="font-medium min-w-28">{p.subject ?? "—"}</span>
                                <span className="text-xs text-slate-500">{fmtDate(p.date)}{day ? ` · ${day}` : ""}</span>
                                <span className="flex items-center gap-1 text-xs text-slate-500">
                                  <Clock className="w-3.5 h-3.5" />
                                  {p.startTime ?? "—"}–{p.endTime ?? "—"}
                                  {p.durationMins ? ` (${Math.floor(p.durationMins / 60)}h${p.durationMins % 60 ? ` ${p.durationMins % 60}m` : ""})` : ""}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-slate-500">
                                  <Award className="w-3.5 h-3.5" />
                                  {p.totalMarks} marks · pass {p.passingMarks}
                                </span>
                                {p.room && (
                                  <span className="flex items-center gap-1 text-xs text-slate-500">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {p.room}
                                  </span>
                                )}
                                <span className={`ml-auto text-[11px] px-2 py-0.5 rounded-full font-medium ${ps.cls}`}>{ps.label}</span>
                              </div>
                            );
                          })}
                        </div>
                        {e.instructions && (
                          <div className="bg-amber-50 dark:bg-amber-950 rounded-xl p-3">
                            <p className="text-xs font-semibold text-amber-800 dark:text-amber-200">Instructions</p>
                            <p className="text-xs mt-1 text-amber-700 dark:text-amber-300 whitespace-pre-wrap">{e.instructions}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
