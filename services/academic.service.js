import api from "./api";

/**
 * Academic service — subjects, timetable, results, homework, etc.
 * Backed by Next.js /api routes (see app/api/*).
 */
export const academicService = {
  getSubjects: () => api.get("/academic/subjects"),
  getTimetable: () => api.get("/academic/timetable"),
  getResults: () => api.get("/academic/results"),
  getNotices: () => api.get("/academic/notices"),
};
