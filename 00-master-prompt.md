# School ERP — Master Prompt (Robust · Next.js Backend-like · v2)

> Stack: Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TanStack Query v5 · Zustand · Axios · react-hot-toast · date-fns · nprogress
> Backend strategy: **Next.js Route Handlers as the backend** (`app/api/*`). Same-origin by default (`NEXT_PUBLIC_API_URL=/api`); swappable to a separate Node/Django service via env without touching components.

## 1. Product Goal

Build a complete production-style School Management Platform / ERP with a real frontend ↔ backend separation **inside Next.js**:

- `app/*` = presentation only (thin pages that compose components)
- `app/api/*` = backend-like layer (Route Handlers, validation, standard envelope)
- `services/*` = the ONLY frontend code allowed to call HTTP
- `data/*` = demo persistence layer (replaces DB until Prisma/Drizzle is added)
- All actions work in demo mode. Never claim real payment, biometric, SMS, email, CI/CD or deployment integrations unless actually implemented.

## 2. Core Requirements

- [x] Responsive desktop/tablet/mobile UI (Sidebar + MobileNav + BottomNav pattern)
- [x] Light/dark/system theme (`components/ThemeProvider`, no FOUC)
- [x] Reusable UIKit (`components/ui/*` + barrel `index.js`)
- [x] Relational demo data (`data/*` keyed by studentId/class/session)
- [x] Backend-like service layer (`app/api/*` + `services/*.service.js`)
- [x] Forms with validation (React Hook Form + Zod when adding new forms)
- [x] Tables with search/filter/sort/pagination (`components/ui/Table` + `hooks/usePagination` + `hooks/useDebounce`)
- [x] Detail pages, drawers/modals, confirmations and toasts (`Modal`, `ConfirmDialog`, `Toaster`)
- [x] Loading, empty and error states on every data page (`PageLoader`, `TableSkeleton`, `CardSkeleton`, `EmptyState`, `ErrorState`, `ErrorBoundary`)
- [x] Accessible UI (labels, aria, ESC-to-close modals, 44px touch targets, focus states)
- [x] Demo authentication + role-aware navigation (`store/authStore`, `hooks/useAuth`, `/login`, `/api/auth/*`, 401 → `/login`)

## 3. Architecture (must follow)

```
Student_erp/
├── app/
│   ├── layout.js                 # wraps AppProviders only
│   ├── login/page.js             # demo login
│   ├── student/
│   │   ├── layout.js             # Sidebar + Navbar + <ErrorBoundary>
│   │   ├── page.js               # thin composition
│   │   ├── fees/page.js          # REFERENCE: useFees + feature components
│   │   └── .../
│   └── api/                      # ← BACKEND (Route Handlers)
│       ├── _lib/respond.js       # ok(data) / fail(msg, code, status) envelope
│       ├── health/route.js
│       ├── dashboard/route.js
│       ├── fees/route.js         # GET + POST (pay simulation)
│       ├── fees/history/route.js
│       ├── fees/pay/route.js
│       ├── attendance/route.js
│       ├── attendance/leave/route.js
│       ├── academic/subjects|timetable|results|notices/route.js
│       └── auth/login|logout|me/route.js
├── components/
│   ├── ui/                       # Dumb UIKit (Button, Input, Select, Modal, Badge, Card, Table, Spinner, Skeleton, Alert, EmptyState, ErrorState, PageHeader, StatCard, Tooltip, ConfirmDialog)
│   ├── shared/                   # ErrorBoundary, RouteProgress
│   └── features/<module>/        # e.g. fees/FeesSummaryCard, FeesTable, FeesBadge, FeesPayButton
├── hooks/
│   ├── useAuth.js, useDebounce.js, usePagination.js
│   ├── fees/useFees.js           # useFees, useFeesHistory, usePayFees
│   ├── attendance/useAttendance.js
│   └── dashboard/useDashboard.js
├── services/                     # ONLY HTTP layer
│   ├── api.js                    # axios instance + token + unwrap + 401 redirect
│   ├── auth.service.js, fees.service.js, attendance.service.js, dashboard.service.js, academic.service.js
├── store/                        # client state only (Zustand)
│   ├── authStore.js, uiStore.js
├── providers/AppProviders.jsx    # Theme + QueryClient + Toaster + RouteProgress + Devtools
├── lib/
│   ├── config.js                 # env access (never hardcode URLs)
│   ├── formatters.js             # date/currency/number (date-fns + Intl)
│   ├── constants.js              # QUERY_KEYS, ROUTES, TOKEN_KEY
│   ├── errors.js                 # parseError → { message, code, status }
│   └── utils.js                  # cn() + calculations
├── data/                         # demo DB (fees.js, attendance.js, student.js, ...)
└── .env.local                    # NEXT_PUBLIC_API_URL=/api (gitignored)
```

## 4. Backend Contract (mandatory for every new route)

```js
// app/api/_lib/respond.js
ok(data, message)  // → { success: true, data, message }
// → { success: false, error: { code, message } }
fail(message, code, status)
```

- `GET /api/dashboard` → `{ student, stats, todayTimetable, attendanceSummary, attendanceChartData }`
- `GET /api/fees` → fees object; `POST /api/fees/pay { amount, method }` → `{ receipt, amount, status }`
- `GET /api/attendance` → `{ summary, monthly, chart, bySubject }`
- `POST /api/attendance/leave { from, reason }` → validates, 400 on missing fields
- `GET /api/academic/subjects|timetable|results|notices`
- `POST /api/auth/login { email }` → `{ user, token }` (demo); `GET /api/auth/me`; `POST /api/auth/logout`
- All errors use `fail()` with `VALIDATION_ERROR` / `AUTH_ERROR` / `PAYMENT_ERROR` / `INTERNAL_ERROR` codes.
- Frontend never unwraps manually — `services/api.js` interceptor returns `data` and throws normalised `Error { message, code, status }`.

## 5. Frontend Rules

1. **No raw fetch/axios in components.** Only `services/*.service.js` → called from `hooks/*` (`useQuery`/`useMutation`).
2. **No manual loading flags for server data.** Use `isLoading`/`isFetching`/`isPending` + `PageLoader`/`TableSkeleton`/`CardSkeleton`.
3. **No silent errors.** `ErrorState` + retry per section, `ErrorBoundary` per layout, `toast` on mutations, `parseError()` in `lib/errors.js`.
4. **Pages ≤ ~100 lines, components ≤ ~150 lines.** Split into `components/features/<module>/`.
5. **UIKit first.** If a pattern is used twice, move it to `components/ui/`.
6. **Named exports** for components/libs (except Next.js page/layout/route files). `PascalCase` components, `camelCase` hooks/services/utils. Tailwind only, no inline styles.
7. **Env via `lib/config.js` only.** Default `/api` so prod can swap to `https://api.domain.com` with zero code changes.
8. **Auth:** token in `localStorage` (demo) → `Authorization: Bearer` header in `services/api.js`; 401 clears token and redirects to `/login`. Production TODO: `httpOnly` cookie + middleware guard.

## 6. Main Modules (route map)

Dashboard (`/student`), Classes, Subjects, Classwork, Homework, Assignments (+`[id]`), Topics/Syllabus, Materials, Timetable, Attendance, Exams, Question Bank, Practice Tests, Results, Report Card, Notices, Messages, Calendar, Transport, Fees, Leave, Profile, Settings. Admin roadmap (separate role): Branches, Admissions, Students, Teachers, HR/Staff, Workers, Parents, Transport, Inventory, Expenses, Payroll, Documents, Reports, Settings, Global Search, Audit Logs, Biometric placeholder.

## 7. Production Upgrade Path (when leaving demo)

1. Replace `data/*` with Prisma/Drizzle + real DB; keep `app/api/*` signatures identical.
2. Real auth: `jose` JWT in `httpOnly` cookie + `middleware.js` protecting `/student/*` + `/admin/*`.
3. Validation: `zod` schemas in `app/api/*` + React Hook Form on every form.
4. Payments/SMS/biometric: isolate behind `services/*.service.js` adapters; keep UI unchanged.
5. Observability: route-level logging, rate limiting, Sentry/ErrorBoundary reporting.

## 8. Definition of Done (per phase)

- `npm run lint` clean, `npm run build` passes.
- Every new data page demonstrates: skeleton → data → empty → error+retry.
- Every new mutation demonstrates: pending state → success toast + cache invalidation → error toast.
- No hardcoded URLs, no `console.error`-only handling, no fetch outside `services/`.
- Mobile (360px), tablet, desktop + light/dark screenshots mentally verified.

## 9. Workflow

Implement phase-by-phase using the files in this folder. Reference implementation: `app/student/fees/page.js` + `hooks/fees/useFees.js` + `app/api/fees/*`. After each phase, run `npm run lint && npm run build`, fix errors, and stop until the next phase is explicitly started.
