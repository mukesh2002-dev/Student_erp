export const conversations = [
  { id: 1, name: "Rajesh Kumar", role: "Class Teacher", avatar: "RK", lastMessage: "Please submit your maths homework by tomorrow.", time: "10:30 AM", unread: 2 },
  { id: 2, name: "Dr. Sunita Sharma", role: "Science Teacher", avatar: "SS", lastMessage: "Your practical file is excellent!", time: "Yesterday", unread: 0 },
  { id: 3, name: "School Admin", role: "Administration", avatar: "SA", lastMessage: "Fee receipt has been generated.", time: "Yesterday", unread: 1 },
  { id: 4, name: "Parent Coordinator", role: "Coordinator", avatar: "PC", lastMessage: "PTM timings shared.", time: "18 Sep", unread: 0 },
];

export const messagesData = {
  1: [
    { from: "teacher", text: "Good morning Aman, how is your preparation for unit test?", time: "09:00 AM" },
    { from: "student", text: "Good morning sir, preparation is going well. Revised quadratic equations.", time: "09:05 AM" },
    { from: "teacher", text: "Please submit your maths homework by tomorrow.", time: "10:30 AM" },
    { from: "teacher", text: "Also bring your geometry box for tomorrow's class.", time: "10:31 AM" },
  ],
  2: [{ from: "teacher", text: "Your practical file is excellent! Keep it up.", time: "Yesterday 03:00 PM" }],
  3: [{ from: "admin", text: "Fee receipt has been generated for Rs. 500. Check fees section.", time: "Yesterday 11:00 AM" }],
  4: [{ from: "teacher", text: "PTM on 25 Sep, 09 AM to 01 PM. Please inform parents.", time: "18 Sep 04:00 PM" }],
};
