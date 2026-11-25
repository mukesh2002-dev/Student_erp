"use client";
import { useState } from "react";
import { Paperclip, Search } from "lucide-react";
import { notices } from "@/data/notices";
import { Badge, Card, EmptyState, Input, PageHeader, Select } from "@/components/ui";

const priorityVariant = { High: "danger", Medium: "warning", Low: "default" };

export default function NoticesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(notices.map((notice) => notice.category))];
  const filtered = notices.filter((notice) => {
    const matchesQuery =
      notice.title.toLowerCase().includes(query.toLowerCase()) ||
      notice.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || notice.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="enter mx-auto max-w-5xl space-y-6">
      <PageHeader title="Notices" description="School announcements and circulars" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <Input
          icon={Search}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search notices"
          aria-label="Search notices"
          className="flex-1"
        />
        <Select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by category"
          className="sm:w-44"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No notices match" description="Try a different search term or category." />
      ) : (
        <Card>
          <ul className="divide-y divide-hairline">
            {filtered.map((notice) => (
              <li key={notice.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="record">
                      {notice.date} · {notice.category}
                    </p>
                    <h2 className="mt-1 text-sm font-medium text-ink">{notice.title}</h2>
                  </div>
                  <Badge variant={priorityVariant[notice.priority] || "default"}>{notice.priority}</Badge>
                </div>
                <p className="mt-2 text-[13px] leading-6 text-ink-secondary">{notice.description}</p>
                {notice.attachment && (
                  <a
                    href="#"
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-accent transition-opacity hover:opacity-80"
                  >
                    <Paperclip className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {notice.attachment}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
