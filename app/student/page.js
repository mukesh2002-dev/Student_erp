"use client";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { ErrorState } from "@/components/ui";
import {
  AttendanceSection,
  DashboardHeader,
  DashboardSkeleton,
  DashboardStats,
  ExamsSection,
  FeeSection,
  HomeworkSection,
  NoticesSection,
  QuickActions,
  TodaySection,
} from "@/components/features/dashboard/DashboardSections";

/**
 * Student dashboard: one query, one page entrance.
 * The academic record answers four questions in order — who this is,
 * the standing figures, this week's work, then the timetable and notices.
 */
export default function DashboardPage() {
  const { data, isLoading, isError, error, refetch } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !data) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <div className="enter mx-auto max-w-[1180px] space-y-8">
      <DashboardHeader student={data.student} />
      <DashboardStats stats={data.stats} />
      <QuickActions />

      <div className="grid gap-6 lg:grid-cols-3">
        <AttendanceSection summary={data.attendanceSummary} chartData={data.attendanceChartData} />
        <TodaySection items={data.todayTimetable} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <HomeworkSection items={data.homework} />
        <FeeSection fees={data.fees} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ExamsSection items={data.exams} className="lg:col-span-2" />
        <NoticesSection items={data.notices} />
      </div>
    </div>
  );
}
