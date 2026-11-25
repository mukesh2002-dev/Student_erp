"use client";
import { useState } from "react";
import { ArrowLeft, Paperclip, Search, Send } from "lucide-react";
import { conversations, messagesData } from "@/data/messages";
import { Button, Card, Input, PageHeader } from "@/components/ui";

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function MessagesPage() {
  const [selected, setSelected] = useState(1);
  const [messages, setMessages] = useState(messagesData);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");

  const threads = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(query.trim().toLowerCase())
  );
  const current = conversations.find((conversation) => conversation.id === selected);
  const thread = messages[selected] || [];

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((previous) => ({
      ...previous,
      [selected]: [...(previous[selected] || []), { from: "student", text, time: "Just now" }],
    }));
    setDraft("");
  };

  return (
    <div className="enter mx-auto max-w-6xl space-y-6">
      <PageHeader title="Messages" description="Conversations with class teachers and the school office" />

      <Card className="flex h-[min(72vh,660px)] min-h-[520px] overflow-hidden">
        {/* Conversation list */}
        <div
          className={`w-full shrink-0 flex-col border-hairline sm:flex sm:w-[300px] sm:border-r ${
            selected ? "hidden" : "flex"
          }`}
        >
          <div className="border-b border-hairline p-4">
            <Input
              icon={Search}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search people"
              aria-label="Search conversations"
            />
          </div>

          <div className="flex-1 divide-y divide-hairline overflow-y-auto">
            {threads.length === 0 && <p className="px-4 py-6 text-[13px] text-ink-secondary">No matching conversations.</p>}
            {threads.map((conversation) => {
              const active = conversation.id === selected;
              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setSelected(conversation.id)}
                  aria-current={active ? "true" : undefined}
                  className={`flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors ${
                    active
                      ? "bg-accent-soft shadow-[inset_2px_0_0_var(--accent)]"
                      : "hover:bg-surface-raised"
                  }`}
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-hairline bg-surface-sunken text-[11px] font-medium text-ink-secondary">
                    {initials(conversation.name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-[13px] font-medium text-ink">{conversation.name}</span>
                      <span className="shrink-0 text-[11px] tabular-nums text-ink-muted">{conversation.time}</span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-ink-secondary">{conversation.lastMessage}</span>
                  </span>
                  {conversation.unread > 0 && (
                    <span
                      className="mt-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-on"
                      aria-label={`${conversation.unread} unread`}
                    >
                      {conversation.unread}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Thread */}
        <div className={`min-w-0 flex-1 flex-col ${selected ? "flex" : "hidden sm:flex"}`}>
          <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Back to conversations"
              className="-ml-1 flex h-8 w-8 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink sm:hidden"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-hairline bg-surface-sunken text-[11px] font-medium text-ink-secondary">
              {initials(current?.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-ink">{current?.name}</p>
              <p className="truncate text-xs text-ink-secondary">{current?.role}</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-surface-raised px-4 py-4">
            {thread.map((message, index) => {
              const mine = message.from === "student";
              return (
                <div key={`${message.time}-${index}`} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[78%] rounded-lg border px-3.5 py-2.5 text-[13px] leading-5 ${
                      mine
                        ? "border-transparent bg-accent text-accent-on"
                        : "border-hairline bg-surface text-ink-secondary"
                    }`}
                  >
                    <p className={mine ? "text-accent-on" : "text-ink"}>{message.text}</p>
                    <p className={`mt-1 text-[10px] ${mine ? "text-accent-on/70" : "text-ink-muted"}`}>{message.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 border-t border-hairline p-3">
            <button
              type="button"
              aria-label="Attach a file"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-hairline text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink"
            >
              <Paperclip className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && send()}
              placeholder="Write a message"
              aria-label="Write a message"
              className="h-9 min-w-0 flex-1 rounded-md border border-hairline bg-surface px-3 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-hairline-strong"
            />
            <Button size="sm" onClick={send} disabled={!draft.trim()} aria-label="Send message" className="h-9 w-9 p-0">
              <Send className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
