import { backendApi } from "./api";

/**
 * Student self-service portal — real Node.js backend (`/api/v1/student/*`).
 * Every endpoint resolves the logged-in student's OWN profile server-side
 * (task.md: student-scoped only). No studentId is ever sent from the client.
 */
export const studentService = {
  getHeader: () => backendApi.get("/student/header"),
  getDashboard: () => backendApi.get("/student/dashboard"),
  getClass: () => backendApi.get("/student/class"),
  getSubjects: () => backendApi.get("/student/subjects"),
  getClasswork: () => backendApi.get("/student/classwork"),
  getHomework: () => backendApi.get("/student/homework"),
  getTimetable: () => backendApi.get("/student/timetable"),
};
