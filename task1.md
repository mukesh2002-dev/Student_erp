# 🎯 Frontend Architecture Improvement Plan — Student ERP

> **Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TanStack Query · Separate Node.js backend (API server on different port/domain)

---

## 1. 📁 Folder Structure Reorganisation

Restructure the project for scalability and clear separation of concerns:

```
Student_erp/
├── app/                        # Next.js App Router pages only
│   └── student/
│       ├── dashboard/
│       ├── fees/
│       └── ...
├── components/
│   ├── ui/                     # UIKit — pure, reusable, dumb components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Badge.jsx
│   │   ├── Spinner.jsx
│   │   ├── Skeleton.jsx
│   │   ├── Alert.jsx
│   │   ├── Card.jsx
│   │   ├── Table.jsx
│   │   ├── EmptyState.jsx
│   │   └── index.js            # Barrel export
│   ├── shared/                 # Shared layout/feature components
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── MobileNav.jsx
│   │   ├── ThemeProvider.jsx
│   │   └── ErrorBoundary.jsx
│   └── features/               # Feature-specific components (per module)
│       ├── fees/
│       ├── attendance/
│       ├── results/
│       └── ...
├── hooks/                      # Custom React hooks
│   ├── useAuth.js
│   ├── usePagination.js
│   └── useDebounce.js
├── services/                   # API service layer (all fetch calls here)
│   ├── api.js                  # Base axios/fetch instance
│   ├── auth.service.js
│   ├── fees.service.js
│   ├── attendance.service.js
│   └── ...
├── lib/                        # Pure utilities (no React)
│   ├── utils.js
│   ├── formatters.js           # Date, currency, number formatting
│   └── constants.js            # App-wide constants
├── store/                      # Global client state (Zustand or Context)
│   ├── authStore.js
│   └── uiStore.js
└── providers/                  # App-level providers (QueryClient, Theme, Auth)
    └── AppProviders.jsx
```

---

## 2. 🌐 API Layer — Centralised HTTP Client

**Goal:** One single place for all backend communication. No raw `fetch` scattered across components or pages.

### Tasks:
- [ ] Create `services/api.js` — base HTTP client using `axios` or native `fetch` wrapper
  - Set `baseURL` from `process.env.NEXT_PUBLIC_API_URL`
  - Attach auth token from localStorage/cookie on every request via interceptor/wrapper
  - Centralised response unwrapping (always return `data`, throw on error)
  - Centralised error normalisation — convert all backend errors to a consistent `{ message, code, status }` shape
- [ ] Add request/response logging in development only
- [ ] Create one service file per feature module (e.g. `fees.service.js`, `attendance.service.js`)
- [ ] Add `.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:3000` (backend port)
- [ ] Never call API directly from a component — always go through a service function

### Standard API Response Shape (agree with backend):
```js
// Success
{ success: true, data: {...}, message: "OK" }

// Error
{ success: false, error: { code: "NOT_FOUND", message: "Resource not found" } }
```

---

## 3. ⚡ TanStack Query (React Query) — Production Setup

**Goal:** All server state managed by TanStack Query. No manual loading/error states for API data.

### Tasks:
- [ ] Install: `npm i @tanstack/react-query @tanstack/react-query-devtools`
- [ ] Create `providers/AppProviders.jsx` with `QueryClientProvider`
  - Configure `QueryClient` with production-grade defaults:
    ```js
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,   // 5 minutes
          gcTime: 1000 * 60 * 10,      // 10 minutes
          retry: 2,
          refetchOnWindowFocus: false,
        },
        mutations: {
          onError: (err) => toast.error(err.message),
        },
      },
    })
    ```
- [ ] Add `ReactQueryDevtools` in development only
- [ ] Wrap `app/layout.js` with `AppProviders`
- [ ] Create custom hooks per feature using `useQuery` / `useMutation`:
  - e.g. `hooks/fees/useFees.js`, `hooks/attendance/useAttendance.js`
- [ ] Use `queryKey` factories for consistent cache management
- [ ] Handle optimistic updates for mutations where needed

---

## 4. ⏳ Centralised Loading State

**Goal:** Consistent loading UI everywhere — no per-page spinner code duplication.

### Tasks:
- [ ] Create `components/ui/Spinner.jsx` — animated loading spinner (multiple sizes)
- [ ] Create `components/ui/Skeleton.jsx` — skeleton loader for cards, tables, lists
- [ ] Create `components/ui/PageLoader.jsx` — full-page loading overlay
- [ ] Create `components/ui/TableSkeleton.jsx` — skeleton rows for table loading
- [ ] Create `components/ui/CardSkeleton.jsx` — skeleton for stat cards / dashboard cards
- [ ] Use TanStack Query's `isLoading`, `isFetching` flags — never manage loading state manually with `useState`
- [ ] Add loading skeleton to every page that fetches data (replace old spinner `useEffect` patterns)
- [ ] Show subtle top progress bar (e.g. `nprogress`) on route navigation

---

## 5. ❌ Centralised Error Handling

**Goal:** Errors are caught, displayed consistently, and never silently swallowed.

### Tasks:
- [ ] Create `components/ui/Alert.jsx` — inline error/warning/success alert component
- [ ] Create `components/ui/ErrorState.jsx` — full-section error display with retry button
- [ ] Create `components/shared/ErrorBoundary.jsx` — React Error Boundary for unexpected crashes
  - Wrap the student layout with `<ErrorBoundary>`
- [ ] In TanStack Query:
  - Use `onError` in `QueryClient` defaults for global error toasts
  - Use per-query `onError` for inline errors where needed
- [ ] Create `lib/errors.js` — error parsing utility:
  ```js
  export function parseError(err) {
    return err?.response?.data?.error?.message || err?.message || "Something went wrong";
  }
  ```
- [ ] Install and configure a toast library: `npm i react-hot-toast`
  - Add `<Toaster />` in `AppProviders`
  - Use toasts for mutation success/error feedback
- [ ] Never use `console.error` as the only error handling in production code

---

## 6. 🎨 UIKit — Reusable Component Library

**Goal:** Every UI pattern used more than once lives in `components/ui/`. No duplicated markup.

### Components to Build:

| Component | Description |
|---|---|
| `Button.jsx` | Variants: primary, secondary, danger, ghost. Sizes: sm, md, lg. Loading state. |
| `Input.jsx` | Label, error message, helper text, icon support |
| `Select.jsx` | Styled dropdown with label and error |
| `Modal.jsx` | Accessible dialog with backdrop, close on ESC |
| `Badge.jsx` | Colour variants for status display |
| `Card.jsx` | Container with header, body, footer slots |
| `Table.jsx` | Responsive table with header, loading, empty state |
| `Spinner.jsx` | Animated loading indicator (sm/md/lg) |
| `Skeleton.jsx` | Configurable skeleton block |
| `Alert.jsx` | Info, success, warning, error variants |
| `EmptyState.jsx` | Illustration + message + optional action button |
| `ErrorState.jsx` | Error icon + message + retry button |
| `PageHeader.jsx` | Page title + breadcrumb + action slot |
| `StatCard.jsx` | Metric card with icon, value, trend |
| `Tooltip.jsx` | Hover tooltip |
| `ConfirmDialog.jsx` | "Are you sure?" modal for destructive actions |

- [ ] Create `components/ui/index.js` barrel export for all UI components
- [ ] Document each component with JSDoc props comment

---

## 7. 🔪 Component Splitting Rules

**Goal:** No component file exceeds ~150 lines. Every component has a single responsibility.

### Rules:
- [ ] Split large page files (`page.js`) into smaller feature components in `components/features/<module>/`
- [ ] Example for fees page:
  ```
  components/features/fees/
  ├── FeesSummaryCard.jsx
  ├── FeesTable.jsx
  ├── FeesBadge.jsx
  └── FeesPayButton.jsx
  ```
- [ ] The `page.js` file should only import and compose — no business logic inside it
- [ ] Avoid prop drilling more than 2 levels deep — use context or Zustand store
- [ ] Keep layout components (`Sidebar`, `Navbar`) only concerned with layout — extract nav item rendering to separate files

---

## 8. 🔐 Auth & Token Management

**Goal:** Secure, consistent auth across all API calls.

### Tasks:
- [ ] Store JWT token in `httpOnly` cookie (preferred) or `localStorage`
- [ ] Create `hooks/useAuth.js` — expose `user`, `login()`, `logout()`, `isAuthenticated`
- [ ] Create `store/authStore.js` using Zustand for global auth state
- [ ] In `services/api.js` interceptor — automatically attach `Authorization: Bearer <token>` header
- [ ] Handle `401 Unauthorized` globally — redirect to login page automatically
- [ ] Protect all `/student/*` routes with a middleware or layout-level auth check

---

## 9. 🌍 Environment Configuration

- [ ] Create `.env.local` (never commit to git):
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:3000    # Node.js backend
  NEXT_PUBLIC_APP_NAME=Student ERP
  NEXT_PUBLIC_APP_ENV=development
  ```
- [ ] Create `.env.production`:
  ```env
  NEXT_PUBLIC_API_URL=https://api.yourdomain.com
  ```
- [ ] Access all env vars via a single `lib/config.js` file — never hardcode URLs in components
- [ ] Add `.env.local` to `.gitignore`

---

## 10. 📦 Recommended Packages to Add

| Package | Purpose |
|---|---|
| `@tanstack/react-query` | Server state management |
| `@tanstack/react-query-devtools` | Dev debugging |
| `axios` | HTTP client with interceptors |
| `react-hot-toast` | Toast notifications |
| `zustand` | Lightweight global client state |
| `date-fns` | Date formatting utilities |
| `nprogress` | Route change progress bar |

```bash
npm i @tanstack/react-query @tanstack/react-query-devtools axios react-hot-toast zustand date-fns nprogress
```

---

## 11. 🧹 Code Quality & Conventions

- [ ] All components use named exports (not default) — except page/layout files required by Next.js
- [ ] File naming: `PascalCase` for components, `camelCase` for hooks/utils/services
- [ ] No inline styles — use Tailwind classes only
- [ ] Avoid untyped props — add JSDoc `@param` comments or migrate to TypeScript later
- [ ] Consistent import order: React → Next → 3rd party → internal (use ESLint `import/order` rule)

---

## 12. 🚀 Priority Order (Do This First)

| Priority | Task |
|---|---|
| 🔴 P0 | Create `services/api.js` base HTTP client + `.env.local` |
| 🔴 P0 | Setup TanStack Query in `AppProviders.jsx` |
| 🔴 P0 | Install `react-hot-toast` and add `<Toaster />` |
| 🟠 P1 | Create UIKit: `Button`, `Spinner`, `Skeleton`, `Alert`, `ErrorState`, `EmptyState` |
| 🟠 P1 | Create `ErrorBoundary` and wrap layout |
| 🟡 P2 | Migrate each page's data fetching to `useQuery` hooks |
| 🟡 P2 | Split large page components into feature components |
| 🟢 P3 | Auth store + token interceptor |
| 🟢 P3 | Route-level loading with `nprogress` |