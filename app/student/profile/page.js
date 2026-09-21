"use client";
import { student } from "@/data/student";
import { useState } from "react";

export default function ProfilePage() {
  const [edit, setEdit] = useState(false);
  const [address, setAddress] = useState(student.address);
  const [phone, setPhone] = useState(student.parentPhone);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h1 className="text-2xl font-bold">My Profile</h1><p className="text-sm text-slate-500">Your personal and academic information</p></div>
        <button onClick={() => setEdit(!edit)} className={`px-5 py-2.5 rounded-xl text-sm font-medium ${edit ? "bg-emerald-600 text-white" : "bg-indigo-600 text-white"}`}>{edit ? "Save" : "Edit Profile"}</button>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044] flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <img src="https://api.dicebear.com/9.x/initials/svg?seed=Aman%20Kumar" alt="avatar" className="w-24 h-24 rounded-3xl bg-indigo-100 object-cover border-4 border-indigo-100 dark:border-indigo-900" />
        <div>
          <h2 className="text-xl font-bold">{student.name}</h2>
          <p className="text-sm text-slate-500">{student.class} • Roll {student.rollNumber} • {student.house}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">{student.studentId}</span>
            <span className="text-xs bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] px-3 py-1 rounded-full font-medium">{student.admissionNo}</span>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-medium">{student.academicSession}</span>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <h3 className="font-semibold mb-4">Student Details</h3>
          <div className="space-y-3 text-sm">
            {[
              ["Student ID", student.studentId],
              ["Admission No", student.admissionNo],
              ["Class", student.class],
              ["Section", student.section],
              ["Roll Number", student.rollNumber],
              ["Date of Birth", student.dob],
              ["Gender", student.gender],
              ["Blood Group", student.bloodGroup],
              ["House", student.house],
            ].map(([k, v]) => <div key={k} className="flex justify-between p-2.5 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">{k}</span><span className="font-medium">{v}</span></div>)}
          </div>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200 dark:border-[#243044]">
          <h3 className="font-semibold mb-4">Parent & Contact</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-2.5 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Father</span><span className="font-medium">{student.father}</span></div>
            <div className="flex justify-between p-2.5 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Mother</span><span className="font-medium">{student.mother}</span></div>
            <div className="flex justify-between p-2.5 bg-slate-50 dark:bg-[#172033] rounded-xl items-center"><span className="text-slate-500">Parent Phone</span>{edit ? <input value={phone} onChange={e => setPhone(e.target.value)} className="font-medium bg-white dark:bg-[#111827] border border-indigo-200 rounded-lg px-2 py-1 text-sm w-36 text-right" /> : <span className="font-medium">{phone}</span>}</div>
            <div className="flex justify-between p-2.5 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Student Email</span><span className="font-medium text-xs">{student.email}</span></div>
            <div className="flex justify-between p-2.5 bg-slate-50 dark:bg-[#172033] rounded-xl items-center"><span className="text-slate-500">Address</span>{edit ? <input value={address} onChange={e => setAddress(e.target.value)} className="font-medium bg-white dark:bg-[#111827] border border-indigo-200 rounded-lg px-2 py-1 text-sm w-36 text-right" /> : <span className="font-medium">{address}</span>}</div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Academic Information</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-2.5 bg-indigo-50 dark:bg-indigo-950 rounded-xl"><span className="text-slate-500">Class Teacher</span><span className="font-medium">{student.classTeacher}</span></div>
              <div className="flex justify-between p-2.5 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Admission Date</span><span className="font-medium">{student.admissionDate}</span></div>
              <div className="flex justify-between p-2.5 bg-slate-50 dark:bg-[#172033] rounded-xl"><span className="text-slate-500">Session</span><span className="font-medium">{student.academicSession}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
