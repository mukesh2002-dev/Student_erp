"use client";
import { useStudentHeader } from "@/hooks/student/useStudentPortal";
import { PageHeader, CardSkeleton, ErrorState } from "@/components/ui";

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-3 p-2.5 bg-slate-50 dark:bg-[#172033] rounded-xl text-sm">
      <span className="text-slate-500 shrink-0">{label}</span>
      <span className="font-medium text-right text-slate-900 dark:text-slate-100">{value || "—"}</span>
    </div>
  );
}

function fmtDate(v) {
  if (!v) return "—";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/**
 * My profile — simple + fully dynamic (task.md).
 * Live data from the dedicated header API. Read-only.
 */
export default function ProfilePage() {
  const { data: s, isLoading, isError, refetch } = useStudentHeader();

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <PageHeader title="My Profile" description="Loading…" />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (isError || !s) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <PageHeader title="My Profile" />
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044]">
          <ErrorState onRetry={() => refetch()} />
        </div>
      </div>
    );
  }

  const avatarSrc = s.avatar || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(s.name || "Student")}`;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="My Profile" description="Your personal and academic information" />

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044] flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <img src={avatarSrc} alt="avatar" className="w-24 h-24 rounded-3xl bg-indigo-100 object-cover border-4 border-indigo-100 dark:border-indigo-900" />
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{s.name}</h2>
          <p className="text-sm text-slate-500">
            {[s.class ? `Class ${s.class.name}${s.class.section ? `-${s.class.section}` : ""}` : null,
              s.rollNo ? `Roll ${s.rollNo}` : null,
              s.campus?.name].filter(Boolean).join(" • ")}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 px-3 py-1 rounded-full font-medium">{s.admissionNo}</span>
            {s.category && (
              <span className="text-xs bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] px-3 py-1 rounded-full font-medium">{s.category}</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Student Details</h3>
          <div className="space-y-3">
            <Row label="Admission No" value={s.admissionNo} />
            <Row label="Class" value={s.class ? `${s.class.name}${s.class.section ? `-${s.class.section}` : ""}` : null} />
            <Row label="Roll Number" value={s.rollNo} />
            <Row label="Date of Birth" value={fmtDate(s.dob)} />
            <Row label="Gender" value={s.gender} />
            <Row label="Blood Group" value={s.bloodGroup} />
            <Row label="Admission Date" value={fmtDate(s.admissionDate)} />
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Guardian & Contact</h3>
          <div className="space-y-3">
            <Row label="Guardian" value={s.guardianName} />
            <Row label="Guardian Phone" value={s.guardianPhone} />
            <Row label="Guardian Email" value={s.guardianEmail} />
            <Row label="Address" value={[s.address, s.city, s.state].filter(Boolean).join(", ")} />
            <Row label="Campus" value={s.campus?.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
