"use client";
import { useParams } from "next/navigation";
import { assignments } from "@/data/assignments";
import Badge from "@/components/Badge";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Calendar, User, Award, Paperclip, Upload, CheckCircle, FileText, Clock } from "lucide-react";

function getBadgeVariant(status) {
  if (status === "Pending") return "warning";
  if (status === "Submitted") return "indigo";
  if (status === "Under Review") return "default";
  if (status === "Completed") return "success";
  if (status === "Overdue") return "danger";
  return "default";
}

export default function AssignmentDetailPage() {
  const { id } = useParams();
  const assignment = assignments.find(a => String(a.id) === String(id));
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const s = JSON.parse(localStorage.getItem("assignmentSubmissions") || "[]");
      return s.includes(Number(id));
    } catch {
      return false;
    }
  });
  const [dateStr, setDateStr] = useState("");

  if (!assignment) return <div className="max-w-3xl mx-auto py-12 text-center"><p>Assignment not found</p><Link href="/student/assignments" className="text-indigo-600 text-sm">Back to Assignments</Link></div>;

  const handleSubmit = () => {
    const s = JSON.parse(localStorage.getItem("assignmentSubmissions") || "[]");
    if (!s.includes(assignment.id)) s.push(assignment.id);
    localStorage.setItem("assignmentSubmissions", JSON.stringify(s));
    setSubmitted(true);
    setDateStr(new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }));
  };

  const effStatus = submitted ? "Submitted" : assignment.status;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto w-full min-w-0 overflow-x-hidden">
      <Link href="/student/assignments" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 min-h-[44px]"><ArrowLeft className="w-4 h-4" />Back to Assignments</Link>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044] min-w-0">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3 min-w-0">
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold leading-tight">{assignment.title}</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">{assignment.subject} • {assignment.topic} • {assignment.chapter}</p>
            </div>
            <Badge variant={getBadgeVariant(effStatus)}>{effStatus}</Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
            <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3"><p className="text-slate-500 flex items-center gap-1"><User className="w-3 h-3" />Teacher</p><p className="font-medium">{assignment.teacher}</p></div>
            <div className="bg-slate-50 dark:bg-[#172033] rounded-xl p-3"><p className="text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3" />Assigned</p><p className="font-medium">{assignment.assignedDate}</p></div>
            <div className="bg-amber-50 dark:bg-amber-950 rounded-xl p-3"><p className="text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" />Due</p><p className="font-bold text-amber-700 dark:text-amber-400">{assignment.dueDate}</p></div>
            <div className="bg-indigo-50 dark:bg-indigo-950 rounded-xl p-3"><p className="text-slate-500 flex items-center gap-1"><Award className="w-3 h-3" />Marks</p><p className="font-bold text-indigo-600">{assignment.marks}</p></div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044] space-y-4 min-w-0">
        <div>
          <h3 className="font-semibold text-sm sm:text-base">Description</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{assignment.description}</p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-950 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
          <h4 className="font-semibold text-sm">Instructions</h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">{assignment.instructions}</p>
        </div>
        {assignment.attachments.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm flex items-center gap-2"><Paperclip className="w-4 h-4" />Attachments</h4>
            <div className="mt-2 space-y-2">
              {assignment.attachments.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-[#172033] rounded-xl border border-slate-200 dark:border-[#243044]">
                  <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span className="text-sm font-medium truncate">{a}</span>
                  <span className="ml-auto text-xs bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044] px-2.5 py-1 rounded-full">PDF</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {assignment.remarks && <div className="p-3 bg-emerald-50 dark:bg-emerald-950 rounded-xl border border-emerald-200 dark:border-emerald-800 text-sm"><span className="font-semibold">Teacher Remarks:</span> {assignment.remarks}</div>}
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-[#243044] min-w-0">
        <h3 className="font-semibold text-sm sm:text-base">Submission</h3>
        {submitted ? (
          <div className="mt-4 text-center py-6 bg-emerald-50 dark:bg-emerald-950 rounded-2xl border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
            <p className="font-semibold text-emerald-800 dark:text-emerald-300 mt-2">Submitted Successfully</p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Submission Date: {dateStr || "24 Sep 2026"}</p>
            <p className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-full inline-block mt-2">Status: Submitted</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Text Response</label>
              <textarea value={text} onChange={e => setText(e.target.value)} rows={4} placeholder="Type your response here..." className="w-full mt-2 p-3 border border-slate-200 dark:border-[#243044] rounded-xl bg-slate-50 dark:bg-[#172033] text-sm outline-none focus:border-indigo-300 min-h-[100px]" />
            </div>
            <div>
              <label className="text-sm font-medium">Attachments</label>
              <div className="mt-2 border-2 border-dashed border-slate-300 dark:border-[#243044] rounded-xl p-6 sm:p-8 text-center hover:border-indigo-300 transition">
                <Upload className="w-8 h-8 mx-auto text-slate-400" />
                <p className="text-sm font-medium mt-2">Upload Files (UI only)</p>
                <p className="text-xs text-slate-500">PDF, DOC, JPG, PNG — drag & drop or click to browse</p>
                <input type="file" multiple onChange={e => setFiles(Array.from(e.target.files || []).map(f => f.name))} className="mt-3 text-xs" />
                {files.length > 0 && <ul className="mt-3 text-xs text-left list-disc list-inside">{files.map((f, i) => <li key={i}>{f}</li>)}</ul>}
              </div>
            </div>
            <button onClick={handleSubmit} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 min-h-[44px]">Submit Assignment</button>
          </div>
        )}
      </div>
    </div>
  );
}
