"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { latestResult, resultHistory, analytics } from "@/data/results";
import { Badge, Card, CardBody, CardHeader, PageHeader, Table } from "@/components/ui";

const gradeVariant = (grade) => (grade.startsWith("A") ? "success" : grade === "B+" ? "default" : "warning");

const columns = [
  { key: "name", header: "Subject", render: (row) => <span className="font-medium text-ink">{row.name}</span> },
  {
    key: "obtained",
    header: "Marks",
    align: "right",
    render: (row) => (
      <span className="tabular-nums">
        <span className="text-ink">{row.obtained}</span>
        <span className="text-ink-muted"> / {row.max}</span>
      </span>
    ),
  },
  { key: "percent", header: "Percent", align: "right", render: (row) => <span className="tabular-nums">{row.percent}%</span> },
  {
    key: "grade",
    header: "Grade",
    align: "center",
    render: (row) => <Badge variant={gradeVariant(row.grade)}>{row.grade}</Badge>,
  },
];

const chartData = latestResult.subjects.map((subject) => ({
  subject: subject.name.split(" ")[0],
  marks: subject.obtained,
}));

export default function ResultsPage() {
  return (
    <div className="enter mx-auto max-w-5xl space-y-6">
      <PageHeader
        title="Results"
        description={`${latestResult.exam} · ${latestResult.date} · Session 2026-27`}
        actions={<Badge variant="success">{latestResult.result}</Badge>}
      />

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-4">
        {[
          { label: "Overall", value: `${latestResult.percentage}%`, sub: `Class average ${latestResult.classAverage}%` },
          { label: "Total marks", value: `${latestResult.totalObtained}`, sub: `out of ${latestResult.totalMax}` },
          { label: "Grade", value: latestResult.grade, sub: "Session grade" },
          { label: "Class position", value: latestResult.position, sub: "of 42 students" },
        ].map((cell) => (
          <div key={cell.label} className="bg-surface p-5">
            <p className="text-xs font-medium text-ink-muted">{cell.label}</p>
            <p className="mt-2 text-[28px] font-medium leading-8 tabular-nums text-ink">{cell.value}</p>
            <p className="mt-1 text-xs text-ink-secondary">{cell.sub}</p>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader className="flex items-baseline justify-between gap-4">
          <h2 className="text-sm font-medium text-ink">Subject marks</h2>
          <span className="record">{latestResult.subjects.length} subjects</span>
        </CardHeader>
        <Table columns={columns} rows={latestResult.subjects} emptyMessage="No marks published" />
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-sm font-medium text-ink">Marks by subject</h2>
            <p className="mt-0.5 text-xs text-ink-secondary">Out of 100 per subject</p>
          </CardHeader>
          <CardBody className="px-2 pb-4 pt-4">
            <div className="h-[248px] w-full" role="img" aria-label="Marks by subject, out of 100">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 4, right: 12, bottom: 0, left: 0 }} barCategoryGap="34%">
                  <CartesianGrid vertical={false} stroke="var(--hairline)" />
                  <XAxis
                    dataKey="subject"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 11, fill: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
                  />
                  <YAxis
                    width={28}
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--surface-sunken)" }}
                    contentStyle={{
                      background: "var(--surface)",
                      border: "1px solid var(--hairline)",
                      borderRadius: 8,
                      fontSize: 12,
                      color: "var(--ink)",
                      boxShadow: "none",
                    }}
                    labelStyle={{ color: "var(--ink-secondary)", fontSize: 11 }}
                    formatter={(value) => [`${value} / 100`, "Marks"]}
                  />
                  <Bar dataKey="marks" fill="var(--accent)" radius={[2, 2, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-sm font-medium text-ink">Previous exams</h2>
          </CardHeader>
          <ul>
            {resultHistory.map((item) => (
              <li key={item.exam} className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-3 last:border-b-0">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-ink">{item.exam}</p>
                  <p className="record mt-0.5">{item.date}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2.5">
                  <span className="text-[13px] tabular-nums text-ink">{item.percentage}%</span>
                  <Badge variant={gradeVariant(item.grade)}>{item.grade}</Badge>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-hairline px-5 py-3">
            <p className="record">Highest {analytics.highest} · Lowest {analytics.lowest}</p>
          </div>
        </Card>
      </div>

      <p className="record">Rankings are illustrative prototype data</p>
    </div>
  );
}
