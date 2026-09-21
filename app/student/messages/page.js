"use client";
import { useState } from "react";
import { conversations, messagesData } from "@/data/messages";
import { Search, Send, Paperclip, ArrowLeft } from "lucide-react";

export default function MessagesPage() {
  const [selected, setSelected] = useState(1);
  const [msgs, setMsgs] = useState(messagesData);
  const [input, setInput] = useState("");
  const [q, setQ] = useState("");

  const filtered = conversations.filter(c => c.name.toLowerCase().includes(q.toLowerCase()));
  const current = conversations.find(c => c.id === selected);
  const thread = msgs[selected] || [];

  const send = () => {
    if (!input.trim()) return;
    setMsgs(m => ({ ...m, [selected]: [...(m[selected] || []), { from: "student", text: input, time: "Just now" }] }));
    setInput("");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-[#243044] overflow-hidden flex h-[70vh] min-h-[500px]">
        {/* List */}
        <div className={`${selected && "hidden sm:flex"} w-full sm:w-80 border-r border-slate-200 dark:border-[#243044] flex flex-col`}>
          <div className="p-4 border-b border-slate-200 dark:border-[#243044]">
            <h2 className="font-bold">Messages</h2>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none" />
            </div>
          </div>
          <div className="flex-1 overflow-auto divide-y divide-slate-100 dark:divide-[#243044]">
            {filtered.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)} className={`w-full text-left p-4 flex gap-3 hover:bg-slate-50 dark:hover:bg-[#1E293B] ${selected === c.id ? "bg-indigo-50 dark:bg-indigo-950" : ""}`}>
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">{c.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{c.name}</p>
                  <p className="text-xs text-slate-500 truncate">{c.lastMessage}</p>
                </div>
                <div className="text-right shrink-0"><p className="text-xs text-slate-400">{c.time}</p>{c.unread > 0 && <span className="inline-flex w-5 h-5 bg-indigo-600 text-white text-xs rounded-full items-center justify-center mt-1">{c.unread}</span>}</div>
              </button>
            ))}
          </div>
        </div>
        {/* Thread */}
        <div className={`${!selected ? "hidden sm:flex" : "flex"} flex-1 flex-col`}>
          <div className="p-4 border-b border-slate-200 dark:border-[#243044] flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="sm:hidden p-2 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155]"><ArrowLeft className="w-4 h-4" /></button>
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">{current?.avatar}</div>
            <div><p className="font-semibold text-sm">{current?.name}</p><p className="text-xs text-slate-500">{current?.role}</p></div>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950">
            {thread.map((m, i) => (
              <div key={i} className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${m.from === "student" ? "ml-auto bg-indigo-600 text-white rounded-br-sm" : "bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#243044] rounded-bl-sm"}`}>
                <p>{m.text}</p><p className={`text-[11px] mt-1 ${m.from === "student" ? "text-indigo-100" : "text-slate-400"}`}>{m.time}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-200 dark:border-[#243044] flex gap-2">
            <button className="p-2.5 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155]"><Paperclip className="w-5 h-5 text-slate-500" /></button>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..." className="flex-1 px-4 py-2.5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-[#334155] rounded-xl text-sm outline-none" />
            <button onClick={send} className="p-2.5 bg-indigo-600 text-white rounded-xl"><Send className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
