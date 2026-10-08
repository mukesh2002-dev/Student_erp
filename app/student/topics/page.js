"use client";
import { useEffect, useMemo, useState } from "react";
import { studentService } from "@/services/student.service";
import { BookOpen, ChevronDown, FileText, ListOrdered, User } from "lucide-react";

export default function TopicsPage() {
  const [subjects, setSubjects] = useState([]);
  const [selectedUuid, setSelectedUuid] = useState(null);
  const [openChapters, setOpenChapters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await studentService.getSyllabus();
        if (!cancelled) {
          const list = Array.isArray(data?.subjects) ? data.subjects : [];
          setSubjects(list);
          if (list.length > 0) setSelectedUuid(list[0].uuid);
        }
      } catch (e) {
        if (!cancelled) setError(e?.message || "Could not load syllabus");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const selected = useMemo(
    () => subjects.find((s) => s.uuid === selectedUuid) ?? null,
    [subjects, selectedUuid]
  );

  const toggleChapter = (uuid) =>
    setOpenChapters((p) => ({ ...p, [uuid]: !p[uuid] }));

  const totalTopics = useMemo(
    () => subjects.reduce((a, s) => a + (s.topicCount ?? 0), 0),
    [subjects]
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Topics / Syllabus</h1>
        <p className="text-sm text-slate-500">Your class syllabus — subject → chapter → topics. Read-only, managed by teachers.</p>
      </div>

      {loading ? (
        <p className="text-sm text-slate-500 text-center py-10">Loading syllabus…</p>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-sm font-semibold">Couldn&apos;t load syllabus</p>
          <p className="text-xs text-slate-500 mt-1">{error}</p>
        </div>
      ) : subjects.length === 0 ? (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-10 text-center border border-slate-200 dark:border-[#243044]">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold mt-2">No subjects assigned</p>
          <p className="text-xs text-slate-500 mt-1">Subjects for your class will appear here once added.</p>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white">
            <p className="text-indigo-100 text-sm">Syllabus Overview</p>
            <div className="flex gap-6 mt-2">
              <div><p className="text-2xl font-bold">{subjects.length}</p><p className="text-xs text-indigo-100">Subjects</p></div>
              <div><p className="text-2xl font-bold">{subjects.reduce((a, s) => a + (s.chapterCount ?? 0), 0)}</p><p className="text-xs text-indigo-100">Chapters</p></div>
              <div><p className="text-2xl font-bold">{totalTopics}</p><p className="text-xs text-indigo-100">Topics</p></div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {subjects.map((s) => (
              <button
                key={s.uuid}
                onClick={() => setSelectedUuid(s.uuid)}
                className={`p-4 rounded-2xl border text-left transition ${selectedUuid === s.uuid ? "bg-indigo-600 text-white border-indigo-600" : "bg-white dark:bg-[#111827] border-slate-200 dark:border-[#243044] hover:shadow-md"}`}
              >
                <p className="text-sm font-semibold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 shrink-0" />{s.name}
                </p>
                <p className={`text-xs mt-1 ${selectedUuid === s.uuid ? "text-indigo-100" : "text-slate-500"}`}>
                  {s.chapterCount ?? 0} chapters • {s.topicCount ?? 0} topics
                </p>
                {s.teacher?.name && (
                  <p className={`text-[11px] mt-1 flex items-center gap-1 ${selectedUuid === s.uuid ? "text-indigo-100" : "text-slate-400"}`}>
                    <User className="w-3 h-3" />{s.teacher.name}
                  </p>
                )}
              </button>
            ))}
          </div>

          {selected && (
            <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-[#243044]">
                <h3 className="font-bold text-lg">{selected.name} — Chapters</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {(selected.chapters ?? []).length} chapters • {selected.topicCount ?? 0} topics
                  {selected.code ? ` • Code ${selected.code}` : ""}
                </p>
              </div>
              {(selected.chapters ?? []).length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">No chapters added for {selected.name} yet.</p>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-[#243044]">
                  {(selected.chapters ?? []).map((ch) => {
                    const open = !!openChapters[ch.uuid];
                    return (
                      <div key={ch.uuid}>
                        <button onClick={() => toggleChapter(ch.uuid)} className="w-full p-5 flex items-center gap-3 text-left hover:bg-slate-50 dark:hover:bg-[#172033]">
                          <span className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0">
                            {ch.chapterNumber}
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block font-semibold text-sm truncate">{ch.title}</span>
                            <span className="block text-[11px] text-slate-500">{(ch.topics ?? []).length} topics{ch.description ? ` • ${ch.description.slice(0, 60)}` : ""}</span>
                          </span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>
                        {open && (
                          <div className="px-5 pb-5 pl-16 space-y-2">
                            {(ch.topics ?? []).length === 0 ? (
                              <p className="text-xs text-slate-500">No topics added in this chapter yet.</p>
                            ) : (
                              (ch.topics ?? []).map((t) => (
                                <div key={t.uuid} className="flex items-start gap-2.5 text-sm">
                                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                    {t.topicOrder}
                                  </span>
                                  <span className="flex-1 min-w-0">
                                    <span className="block text-slate-700 dark:text-slate-300">{t.title}</span>
                                    {t.description && <span className="block text-[11px] text-slate-500 mt-0.5">{t.description}</span>}
                                    {t.estimatedClasses != null && (
                                      <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                                        <FileText className="w-3 h-3" />~{t.estimatedClasses} classes
                                      </span>
                                    )}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <p className="text-[11px] text-slate-400 flex items-center gap-1.5 justify-center">
            <ListOrdered className="w-3.5 h-3.5" /> Chapters and topics are ordered by your teachers (chapter number → topic order).
          </p>
        </>
      )}
    </div>
  );
}
