"use client";
import { useQuery } from "@tanstack/react-query";
import { studentService } from "@/services/student.service";
import { QUERY_KEYS } from "@/lib/constants";

/**
 * Student self-service hooks — one hook per portal endpoint.
 * Each page/section subscribes independently so loading skeletons
 * and error states never block each other (task.md dashboard rule).
 */

const portalOptions = {
  staleTime: 1000 * 60 * 5,
  retry: 2,
  refetchOnWindowFocus: false,
};

/** Dedicated header profile: name, class, photo, campus (task.md). */
export function useStudentHeader() {
  return useQuery({
    queryKey: QUERY_KEYS.studentHeader,
    queryFn: studentService.getHeader,
    ...portalOptions,
  });
}

/** Dashboard sections in one round-trip; sections render independently. */
export function useStudentDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.studentDashboard,
    queryFn: studentService.getDashboard,
    ...portalOptions,
  });
}

/** Own class detail + weekly timetable. */
export function useStudentClass() {
  return useQuery({
    queryKey: QUERY_KEYS.studentClass,
    queryFn: studentService.getClass,
    ...portalOptions,
  });
}

/** Subjects of the student's own class only. */
export function useStudentSubjects() {
  return useQuery({
    queryKey: QUERY_KEYS.studentSubjects,
    queryFn: studentService.getSubjects,
    ...portalOptions,
  });
}

/** Classwork progress only — no marks (task.md). */
export function useStudentClasswork() {
  return useQuery({
    queryKey: QUERY_KEYS.studentClasswork,
    queryFn: studentService.getClasswork,
    ...portalOptions,
  });
}

/** Homework list: title, due date, status. */
export function useStudentHomework() {
  return useQuery({
    queryKey: QUERY_KEYS.studentHomework,
    queryFn: studentService.getHomework,
    ...portalOptions,
  });
}

/** Weekly timetable grid. */
export function useStudentTimetable() {
  return useQuery({
    queryKey: QUERY_KEYS.studentTimetable,
    queryFn: studentService.getTimetable,
    ...portalOptions,
  });
}
