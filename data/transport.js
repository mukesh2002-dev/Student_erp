export const transportInfo = {
  studentName: "Aman Kumar",
  studentId: "STU-2026-001",
  class: "10-A",
  busNumber: "BUS-024",
  route: "Madhubani → School Campus",
  routeName: "Madhubani City Route",
  pickupStop: "Madhubani Main Chowk",
  pickupTime: "07:25 AM",
  dropStop: "Madhubani Main Chowk",
  dropTime: "03:45 PM",
  driver: "Ramesh Kumar",
  driverPhone: "+91 98765 43210",
  status: "Active",
  busStatus: "On Route",
  lastUpdated: "07:32 AM",
  currentLocation: "Madhubani Main Road",
  eta: "08:05 AM",
};

export const busRouteTimeline = [
  { time: "06:55 AM", stop: "Bus Depot", desc: "Departure" },
  { time: "07:05 AM", stop: "Station Road", desc: "Pickup Point 1" },
  { time: "07:15 AM", stop: "Madhubani Main Chowk", desc: "Pickup Point 2" },
  { time: "07:25 AM", stop: "Student Pickup", desc: "Aman Kumar — Boarding" },
  { time: "07:40 AM", stop: "Town Hall", desc: "Pickup Point 3" },
  { time: "08:05 AM", stop: "School Campus", desc: "Arrival" },
];

export const transportHistory = [
  { date: "20 Sep 2026", bus: "BUS-024", route: "Madhubani Route", pickup: "07:25 AM", drop: "03:45 PM", status: "Completed" },
  { date: "19 Sep 2026", bus: "BUS-024", route: "Madhubani Route", pickup: "07:26 AM", drop: "03:46 PM", status: "Completed" },
  { date: "18 Sep 2026", bus: "BUS-024", route: "Madhubani Route", pickup: "07:24 AM", drop: "03:44 PM", status: "Completed" },
  { date: "17 Sep 2026", bus: "BUS-024", route: "Madhubani Route", pickup: "07:27 AM", drop: "03:47 PM", status: "Completed" },
  { date: "16 Sep 2026", bus: "BUS-024", route: "Madhubani Route", pickup: "-", drop: "-", status: "Absent" },
];

export const transportNotifications = [
  { id: 1, message: "Bus BUS-024 is running 5 minutes late.", time: "07:28 AM", type: "delay" },
  { id: 2, message: "Your pickup time is 07:25 AM. Be ready 5 mins early.", time: "06:45 AM", type: "info" },
  { id: 3, message: "Transport route changed for tomorrow due to road work.", time: "Yesterday", type: "alert" },
  { id: 4, message: "Bus reached school campus at 08:05 AM.", time: "Yesterday 08:05 AM", type: "success" },
];
