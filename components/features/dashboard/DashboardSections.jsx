"use client";
import Link from "next/link";
import {
  ArrowRight, BarChart3, BookOpen, ClipboardCheck, Clock, FileText, Wallet,
} from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/formatters";
import { Skeleton } from "@/components/ui";

/**
 * Dashboard sections for the academic record.
 * Presentation only — the page owns the single /api/dashboard query.
 */

const quickActions = [
  { label: "Attendance", href: "/student/attendance", icon: ClipboardCheck },
  { label: "Homework", href: "/student/homework", icon: BookOpen },
  { label: "Timetable", href: "/student/timetable", icon: Clock },
  { label: "Results", href: "/student/results", icon: BarChart3 },
  { label: "Exams", href: "/student/exams", icon: FileText },
  { label: "Fees", href: "/student/fees", icon: Wallet },
];

const figureLabels = {
  attendance: "Overall attendance",
  marks: "Average marks",
  fees: "Fees due",
  pending: "Homework pending",
};

function shortDate(value) {
  const [day = "—", month = ""] = String(value || "").split(" ");
  return { day, month };
}

/** Card shell with a section rule, a quiet meta line and one link out. */
function Section({ title, meta, href, linkLabel, className, children }) {
  return (
    <section className={cn("rounded-xl border border-hairline bg-surface", className)}>
      <div className="flex items-baseline justify-between gap-4 px-5 pb-4 pt-5">
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="h-1 w-1 shrink-0 bg-accent" aria-hidden />
          <h2 className="shrink-0 text-sm font-medium text-ink">{title}</h2>
          {meta && <span className="record truncate">{meta}</span>}
        </div>
        {href && (
          <Link
            href={href}
            className="inline-flex shrink-0 items-center gap-1 text-xs text-ink-muted transition-colors hover:text-ink"
          >
            {linkLabel}
            <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

/** Record masthead: who this file belongs to, and for which session. */
export function DashboardHeader({ student }) {
  return (
    <header className="border-b border-hairline pb-6">
      <p className="record">
        {student.studentId} · Roll {student.rollNumber} · Class {student.class} · Session {student.academicSession}
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[28px] font-medium leading-9 tracking-[-0.01em] text-ink sm:text-[32px] sm:leading-10">
            {student.name}
          </h1>
          <p className="mt-1 text-sm text-ink-secondary">
            Academic record · Class teacher {student.classTeacher} · {student.house}
          </p>
        </div>
        <Link
          href="/student/profile"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-hairline bg-surface px-3 text-[13px] text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink"
        >
          Full profile
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </div>
    </header>
  );
}

/** Four figures that answer the question a parent opens the portal for. */
export function DashboardStats({ stats = [] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline lg:grid-cols-4">
      {Object.keys(figureLabels).map((key) => {
        const stat = stats.find((item) => item.icon === key);
        if (!stat) return null;
        const meta = key === "attendance" ? stat.sub.replace("/", " of ") : stat.sub;
        return (
          <div key={key} className="bg-surface p-5">
            <p className="text-xs font-medium text-ink-muted">{figureLabels[key]}</p>
            <p className="mt-2 text-[28px] font-medium leading-8 tabular-nums text-ink">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-secondary">{meta}</p>
          </div>
        );
      })}
    </div>
  );
}

/** Quiet shortcuts — text and line icons, no colored tiles. */
export function QuickActions() {
  return (
    <div>
      <h2 className="mb-3 text-[13px] font-medium text-ink">Quick actions</h2>
      <div className="flex flex-wrap gap-2">
        {quickActions.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-hairline bg-surface px-3 text-[13px] text-ink-secondary transition-colors hover:bg-surface-sunken hover:text-ink"
          >
            <Icon className="h-4 w-4 text-ink-muted" strokeWidth={1.5} />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/** The page's one rich moment: monthly present days with missed days marked. */
export function AttendanceSection({ summary, chartData = [] }) {
  const lastIndex = chartData.length - 1;
  const chartLabel = chartData
    .map((row) => `${row.month}: ${row.present} present, ${row.absent} absent`)
    .join("; ");

  return (
    <Section
      title="Attendance"
      meta="Apr–Sep 2026"
      href="/student/attendance"
      linkLabel="Attendance record"
      className="lg:col-span-2"
    >
      <div className="flex items-center gap-4 px-5 pb-3 text-[11px] text-ink-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-[2px] bg-hairline-strong" aria-hidden />
          Present
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-[2px] bg-negative opacity-40" aria-hidden />
          Absent
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-[2px] bg-accent" aria-hidden />
          Current month
        </span>
        <span className="record ml-auto hidden sm:inline">Days per month</span>
      </div>

      <div className="h-[232px] w-full pl-2 pr-5" role="img" aria-label={`Monthly attendance. ${chartLabel}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }} barCategoryGap="32%">
            <CartesianGrid vertical={false} stroke="var(--hairline)" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tick={{ fontSize: 11, fill: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}
            />
            <YAxis
              width={28}
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
              itemStyle={{ color: "var(--ink)" }}
              formatter={(value, name) => [`${value} days`, name === "present" ? "Present" : "Absent"]}
            />
            <Bar dataKey="present" stackId="days" maxBarSize={36}>
              {chartData.map((row, index) => (
                <Cell
                  key={row.month}
                  fill={index === lastIndex ? "var(--accent)" : "var(--hairline-strong)"}
                />
              ))}
            </Bar>
            <Bar
              dataKey="absent"
              stackId="days"
              fill="var(--negative)"
              fillOpacity={0.4}
              radius={[2, 2, 0, 0]}
              maxBarSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 border-t border-hairline px-5 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="record">Session to date</p>
            <p className="mt-0.5 text-[11px] text-ink-muted">
              {summary.totalWorkingDays} working days · {summary.percentage}% present
            </p>
          </div>
          <dl className="flex items-center gap-5">
            {[
              ["Present", summary.present],
              ["Absent", summary.absent],
              ["Late", summary.late],
              ["Leave", summary.leave],
            ].map(([label, value]) => (
              <div key={label} className="text-right">
                <dt className="text-[10px] leading-4 text-ink-muted">{label}</dt>
                <dd className="text-[13px] font-medium leading-5 tabular-nums text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

/** Fee ledger: one outstanding figure, one bar, the lines behind it. */
export function FeeSection({ fees }) {
  const paidPercent = Math.round((fees.paid / fees.total) * 100);

  return (
    <Section title="Fees" meta="2026-27" href="/student/fees" linkLabel="Fee ledger">
      <div className="px-5 pb-5">
        <p className="record">Outstanding</p>
        <p className="mt-1 text-[32px] font-medium leading-9 tabular-nums text-ink">{formatINR(fees.due)}</p>
        <p className="mt-1 text-xs text-ink-secondary">Due {fees.nextDueDate}</p>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
          <div className="h-full rounded-full bg-accent" style={{ width: `${paidPercent}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-ink-muted">
          <span className="tabular-nums">{formatINR(fees.paid)} paid</span>
          <span className="tabular-nums">{formatINR(fees.total)} billed</span>
        </div>

        <ul className="mt-4 border-t border-hairline">
          {fees.breakdown.map((row) => (
            <li
              key={row.name}
              className="flex items-center justify-between gap-3 border-b border-hairline py-2 last:border-b-0"
            >
              <span className="truncate text-[13px] text-ink-secondary">{row.name}</span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="text-[13px] tabular-nums text-ink">{formatINR(row.amount)}</span>
                <span
                  className={cn(
                    "w-11 text-right text-[11px]",
                    row.status === "Paid" ? "text-ink-muted" : "text-warning"
                  )}
                >
                  {row.status}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/** Recent homework as a ledger of due dates, subjects and status. */
export function HomeworkSection({ items = [] }) {
  const pending = items.filter((item) => item.status === "Pending").length;
  const rows = items.slice(0, 4);

  return (
    <Section
      title="Recent homework"
      meta={`${pending} pending`}
      href="/student/homework"
      linkLabel="All homework"
      className="flex flex-col lg:col-span-2"
    >
      {rows.length === 0 ? (
        <p className="border-t border-hairline px-5 py-6 text-[13px] text-ink-muted">No homework assigned</p>
      ) : (
        <ul className="border-t border-hairline">
          {rows.map((item) => {
            const due = shortDate(item.dueDate);
            return (
              <li
                key={item.id}
                className="flex items-center gap-4 border-b border-hairline px-5 py-3 last:border-b-0"
              >
                <span className="w-10 shrink-0">
                  <span className="block text-[13px] font-medium leading-5 tabular-nums text-ink">{due.day}</span>
                  <span className="record block leading-4">{due.month}</span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink">{item.title}</p>
                  <p className="mt-0.5 truncate text-[11px] text-ink-muted">
                    {item.subject} · {item.teacher}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 text-[11px] font-medium",
                    item.status === "Pending" ? "text-warning" : "text-ink-muted"
                  )}
                >
                  {item.status}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {items.length > 0 && (
        <p className="record mt-auto border-t border-hairline px-5 py-3">
          {items.length - pending} of {items.length} submitted this week
        </p>
      )}
    </Section>
  );
}

/** Today's periods, in order, with the one in progress marked. */
export function TodaySection({ items = [] }) {
  return (
    <Section
      title="Today"
      meta={`${items.length} ${items.length === 1 ? "period" : "periods"}`}
      href="/student/timetable"
      linkLabel="Timetable"
    >
      {items.length === 0 ? (
        <p className="border-t border-hairline px-5 py-6 text-[13px] text-ink-muted">No periods scheduled</p>
      ) : (
        <ul className="border-t border-hairline">
          {items.map((item) => {
            const ongoing = item.status === "Ongoing";
            return (
              <li
                key={`${item.time}-${item.subject}`}
                className="flex items-center gap-3 border-b border-hairline px-5 py-2.5 last:border-b-0"
              >
                <span
                  className={cn(
                    "w-[58px] shrink-0 whitespace-nowrap font-mono text-[11px] tabular-nums",
                    ongoing ? "text-accent" : "text-ink-muted"
                  )}
                >
                  {item.time}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink">{item.subject}</p>
                  <p className="mt-0.5 truncate text-[11px] text-ink-muted">
                    {item.room} · {item.duration}
                  </p>
                </div>
                {ongoing ? (
                  <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    Now
                  </span>
                ) : (
                  <span className="shrink-0 text-[11px] text-ink-muted">{item.status}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Section>
  );
}

/** Notices as headlines with a date gutter and a priority word. */
export function NoticesSection({ items = [] }) {
  const rows = items.slice(0, 3);

  return (
    <Section title="Notices" href="/student/notices" linkLabel="All notices">
      {rows.length === 0 ? (
        <p className="border-t border-hairline px-5 py-6 text-[13px] text-ink-muted">No notices published</p>
      ) : (
        <ul className="border-t border-hairline">
          {rows.map((item) => {
            const date = shortDate(item.date);
            return (
              <li
                key={item.id}
                className="flex items-start gap-3 border-b border-hairline px-5 py-3 last:border-b-0"
              >
                <span className="w-9 shrink-0 border-r border-hairline pr-3 text-right">
                  <span className="block text-[15px] font-medium leading-5 tabular-nums text-ink">{date.day}</span>
                  <span className="record block leading-4">{date.month}</span>
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-ink">{item.title}</p>
                  <p className="mt-0.5 truncate text-[11px] text-ink-muted">
                    {item.category}
                    {item.priority === "High" ? " · High priority" : ""}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Section>
  );
}

/** Upcoming exams with a date gutter. */
export function ExamsSection({ items = [], className }) {
  const rows = items.filter((item) => item.status === "Upcoming").slice(0, 3);

  return (
    <Section
      title="Upcoming exams"
      meta={`${rows.length} scheduled`}
      href="/student/exams"
      linkLabel="Exam schedule"
      className={className}
    >
      {rows.length === 0 ? (
        <p className="border-t border-hairline px-5 py-6 text-[13px] text-ink-muted">No upcoming exams</p>
      ) : (
        <ul className="border-t border-hairline">
          {rows.map((item) => {
            const date = shortDate(item.date);
            return (
              <li
                key={item.id}
                className="flex items-start gap-3 border-b border-hairline px-5 py-3 last:border-b-0"
              >
                <span className="w-9 shrink-0 border-r border-hairline pr-3 text-right">
                  <span className="block text-[15px] font-medium leading-5 tabular-nums text-ink">{date.day}</span>
                  <span className="record block leading-4">{date.month}</span>
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium text-ink">{item.name}</p>
                  <p className="mt-0.5 truncate text-[11px] text-ink-muted">
                    {item.subject} · {item.time}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Section>
  );
}

/** First-load skeleton that mirrors the final rhythm. */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3 border-b border-hairline pb-6">
        <Skeleton className="h-3 w-72" />
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-3 w-80" />
      </div>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline lg:grid-cols-4">
        {[0, 1, 2, 3].map((key) => (
          <div key={key} className="space-y-3 bg-surface p-5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {[0, 1, 2, 3, 4, 5].map((key) => (
          <Skeleton key={key} className="h-9 w-28" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-hairline bg-surface p-5 lg:col-span-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-4 h-[232px] w-full" />
        </div>
        <div className="rounded-xl border border-hairline bg-surface p-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-10 w-32" />
          <Skeleton className="mt-4 h-1.5 w-full" />
          <Skeleton className="mt-4 h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
