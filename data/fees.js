export const feesData = {
  total: 48000,
  paid: 43500,
  due: 4500,
  nextDueDate: "30 September 2026",
  breakdown: [
    { name: "Tuition Fee", amount: 30000, status: "Paid", paid: 30000 },
    { name: "Transport Fee", amount: 8000, status: "Paid", paid: 8000 },
    { name: "Computer Fee", amount: 5000, status: "Paid", paid: 5000 },
    { name: "Activity Fee", amount: 5000, status: "Partial", paid: 500 },
  ],
  history: [
    { date: "10 Apr 2026", particular: "Tuition Fee - Q1", amount: 7500, method: "Online", status: "Paid", receipt: "RCPT-001" },
    { date: "10 Jul 2026", particular: "Tuition Fee - Q2", amount: 7500, method: "Online", status: "Paid", receipt: "RCPT-002" },
    { date: "15 Aug 2026", particular: "Transport Fee", amount: 8000, method: "Cash", status: "Paid", receipt: "RCPT-003" },
    { date: "05 Sep 2026", particular: "Activity Fee", amount: 500, method: "Online", status: "Paid", receipt: "RCPT-004" },
  ],
};
