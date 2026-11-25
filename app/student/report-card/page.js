"use client";
import { Download, Printer } from "lucide-react";
import { reportCard } from "@/data/reportCard";
import { Badge, Button, Card, PageHeader, Table } from "@/components/ui";

const gradeVariant = (grade) => (grade.startsWith("A") ? "success" : grade === "B+" ? "default" : "warning");

const columns = [
  { key: "name", header: "Subject", render: (row) => <span className="font-medium text-ink">{row.name}</span> },
  { key: "max", header: "Max", align: "right", render: (row) => <span className="tabular-nums">{row.max}</span> },
  {
    key: "obtained",
    header: "Obtained",
    align: "right",
    render: (row) => <span className="font-medium tabular-nums text-ink">{row.obtained}</span>,
  },
  { key: "percent", header: "Percent", align: "right", render: (row) => <span className="tabular-nums">{row.percent}%</span> },
  {
    key: "grade",
    header: "Grade",
    align: "center",
    render: (row) => <Badge variant={gradeVariant(row.grade)}>{row.grade}</Badge>,
  },
];

const identity = [
  { label: "Student", value: reportCard.student },
  { label: "Class", value: reportCard.class },
  { label: "Roll no", value: reportCard.roll },
  { label: "Attendance", value: reportCard.attendance },
];

const results = [
  { label: "Overall grade", value: reportCard.grade },
  { label: "Percentage", value: reportCard.percentage },
  { label: "Result", value: reportCard.result },
];

export default function ReportCardPage() {
  return (
    <div className="enter mx-auto max-w-4xl space-y-6">
      <PageHeader
        title="Report card"
        description={`Academic session ${reportCard.session} · issued ${reportCard.date}`}
        actions={
          <div className="flex items-center gap-2 print:hidden">
            <Button variant="secondary" onClick={() => window.print()}>
              <Printer className="h-4 w-4" strokeWidth={1.5} />
              Print
            </Button>
            <Button variant="secondary" disabled title="PDF export is not available in this prototype">
              <Download className="h-4 w-4" strokeWidth={1.5} />
              Download
            </Button>
          </div>
        }
      />

      <Card className="overflow-hidden">
        <div className="border-b border-hairline px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-medium text-ink">Delhi Public School, Madhubani</h2>
              <p className="mt-0.5 text-xs text-ink-secondary">Affiliated to CBSE · Statement of marks</p>
            </div>
            <p className="record">
              Roll {reportCard.roll} · Class {reportCard.class} · Session {reportCard.session}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px border-b border-hairline bg-hairline sm:grid-cols-4">
          {identity.map((cell) => (
            <div key={cell.label} className="bg-surface px-6 py-4">
              <p className="text-xs text-ink-muted">{cell.label}</p>
              <p className="mt-1 text-[13px] font-medium tabular-nums text-ink">{cell.value}</p>
            </div>
          ))}
        </div>

        <Table columns={columns} rows={reportCard.subjects} emptyMessage="No marks recorded" />

        <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-hairline bg-surface-raised px-6 py-3">
          <p className="record">Total · {reportCard.subjects.length} subjects</p>
          <p className="text-[13px] tabular-nums text-ink">
            <span className="font-medium">{reportCard.total}</span>
            <span className="ml-2 text-ink-secondary">{reportCard.percentage}</span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-px border-b border-hairline bg-hairline">
          {results.map((cell) => (
            <div key={cell.label} className="bg-surface px-6 py-5">
              <p className="text-xs text-ink-muted">{cell.label}</p>
              <p className="mt-1.5 text-xl font-medium tabular-nums text-ink">{cell.value}</p>
            </div>
          ))}
        </div>

        <div className="px-6 py-5">
          <blockquote className="border-l-2 border-hairline-strong pl-4">
            <p className="text-[13px] leading-6 text-ink-secondary italic">{reportCard.remarks}</p>
            <footer className="mt-2">
              <p className="record">{reportCard.classTeacher} · Class teacher</p>
            </footer>
          </blockquote>
        </div>

        <div className="grid grid-cols-2 gap-6 border-t border-hairline px-6 py-6">
          {[
            { name: reportCard.classTeacher, role: "Class teacher" },
            { name: reportCard.principal, role: "Principal" },
          ].map((signatory) => (
            <div key={signatory.role}>
              <div className="h-8 border-b border-hairline-strong" />
              <p className="mt-2 text-[13px] font-medium text-ink">{signatory.name}</p>
              <p className="text-xs text-ink-secondary">{signatory.role}</p>
            </div>
          ))}
        </div>

        <p className="record border-t border-hairline px-6 py-3">Computer generated on {reportCard.date}</p>
      </Card>
    </div>
  );
}
