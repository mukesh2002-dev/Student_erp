"use client";
import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Card, CardHeader, PageHeader, Select } from "@/components/ui";

const THEMES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

const NOTIFICATIONS = [
  { key: "hwNotif", label: "Homework", description: "New work set by your subject teachers" },
  { key: "examNotif", label: "Exams", description: "Date sheets and exam-day reminders" },
  { key: "resultNotif", label: "Results", description: "Marks published for a completed exam" },
  { key: "noticeNotif", label: "Notices", description: "Circulars from the school office" },
  { key: "messageNotif", label: "Messages", description: "Replies from teachers and staff" },
];

const DEFAULT_SETTINGS = {
  hwNotif: true,
  examNotif: true,
  resultNotif: true,
  noticeNotif: true,
  messageNotif: true,
  lang: "English",
};

function readSavedSettings() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("studentSettings") || "null");
  } catch {
    return null;
  }
}

/** Switch — module scope so it is never re-created during render. */
function Switch({ label, checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full border p-0 transition-colors ${
        checked ? "border-transparent bg-accent" : "border-hairline bg-surface-sunken"
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-3.5 w-3.5 rounded-full transition-transform ${
          checked ? "translate-x-4 bg-accent-on" : "translate-x-0 bg-ink-muted"
        }`}
      />
    </button>
  );
}

function Row({ label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-ink">{label}</p>
        {description && <p className="mt-0.5 text-xs text-ink-secondary">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState(() => {
    const saved = readSavedSettings() || {};
    // Older builds stored the bare language name.
    const lang = saved.lang === "Hindi" ? "हिंदी (Hindi)" : saved.lang;
    return { ...DEFAULT_SETTINGS, ...saved, ...(lang ? { lang } : null) };
  });

  // Write-only persistence — no state update, so this effect is safe.
  useEffect(() => {
    try {
      localStorage.setItem("studentSettings", JSON.stringify(settings));
    } catch {
      /* storage unavailable */
    }
  }, [settings]);

  const setPreference = (key) => (value) => setSettings((previous) => ({ ...previous, [key]: value }));

  return (
    <div className="enter mx-auto max-w-3xl space-y-6">
      <PageHeader title="Settings" description="Appearance, notifications and account" />

      <Card>
        <CardHeader>
          <h2 className="text-sm font-medium text-ink">Appearance</h2>
          <p className="mt-0.5 text-xs text-ink-secondary">System follows your device at sunrise and after dark.</p>
        </CardHeader>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-hairline bg-hairline">
            {THEMES.map((option) => {
              const Icon = option.icon;
              const active = theme === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTheme(option.value)}
                  aria-pressed={active}
                  className={`flex flex-col items-center gap-2 py-4 text-xs font-medium transition-colors ${
                    active ? "bg-accent-soft text-accent" : "bg-surface text-ink-secondary hover:bg-surface-raised hover:text-ink"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                  {option.label}
                </button>
              );
            })}
          </div>
          <p className="mt-2.5 text-xs text-ink-muted">
            Current: <span className="text-ink-secondary">{theme}</span>
          </p>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-sm font-medium text-ink">Notifications</h2>
          <p className="mt-0.5 text-xs text-ink-secondary">Choose which updates reach you.</p>
        </CardHeader>
        <div className="divide-y divide-hairline px-5">
          {NOTIFICATIONS.map((item) => (
            <Row key={item.key} label={item.label} description={item.description}>
              <Switch
                label={`${item.label} notifications`}
                checked={Boolean(settings[item.key])}
                onChange={setPreference(item.key)}
              />
            </Row>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-sm font-medium text-ink">Language</h2>
          <p className="mt-0.5 text-xs text-ink-secondary">Applies to this browser.</p>
        </CardHeader>
        <div className="p-5">
          <Select
            label="Interface language"
            value={settings.lang}
            onChange={(event) => setPreference("lang")(event.target.value)}
          >
            <option>English</option>
            <option>हिंदी (Hindi)</option>
          </Select>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-sm font-medium text-ink">Account</h2>
        </CardHeader>
        <dl className="divide-y divide-hairline px-5">
          <div className="flex items-center justify-between gap-4 py-3.5">
            <dt className="text-[13px] text-ink-secondary">Student ID</dt>
            <dd className="font-mono text-[13px] tabular-nums text-ink">STU-2026-001</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-3.5">
            <dt className="text-[13px] text-ink-secondary">Email</dt>
            <dd className="truncate text-[13px] text-ink">aman.kumar@student.demo</dd>
          </div>
        </dl>
        <p className="record border-t border-hairline px-5 py-3">Changes are held in this browser</p>
      </Card>
    </div>
  );
}
