export function calculatePercentage(obtained, total) {
  if (!total) return 0;
  return Math.round((obtained / total) * 100 * 10) / 10;
}
export function calculateGrade(percentage) {
  if (percentage >= 91) return "A+";
  if (percentage >= 81) return "A";
  if (percentage >= 71) return "B+";
  if (percentage >= 61) return "B";
  if (percentage >= 51) return "C";
  if (percentage >= 33) return "D";
  return "F";
}
export function calculateAttendance(present, total) {
  return total ? Math.round((present / total) * 100 * 10) / 10 : 0;
}
export function calculateHomeworkCompletion(submitted, total) {
  return calculatePercentage(submitted, total);
}
export function calculateSyllabusProgress(completed, total) {
  return calculatePercentage(completed, total);
}
export function calculatePracticeScore(correct, total) {
  return { score: correct, percentage: calculatePercentage(correct, total), grade: calculateGrade(calculatePercentage(correct, total)) };
}
export function calculateResult(marks) {
  const percentage = calculatePercentage(marks.obtained, marks.total);
  return { percentage, grade: calculateGrade(percentage), result: percentage >= 33 ? "PASS" : "FAIL" };
}
export function cn(...classes) { return classes.filter(Boolean).join(" "); }

export function getLS(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
export function setLS(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}
