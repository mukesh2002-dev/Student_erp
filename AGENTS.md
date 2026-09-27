<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Student ERP — agent notes

JS-only Next.js 16 App Router + Turbopack, React 19, Tailwind v4. Path alias `@/*` → repo root (`jsconfig.json`). No TypeScript, no tests, no CI. Full spec: `00-master-prompt.md`; arch plan: `task1.md`.

## Commands

- Dev runs on **port 3001**: `npm run dev` (README's `:3000` is stale).
- Verify: `npm run lint` then `npm run build`. No test/typecheck scripts exist.
- Shell is **Windows PowerShell 5.1**: no `head`, no `&&`. Use `; if ($?) { ... }` for dependent commands.
- `.env*` is gitignored. Default backend is same-origin: `NEXT_PUBLIC_API_URL=/api` (see `.env.local`/`.env.example`).

## Architecture (follow it)

- `app/api/*` = backend-like Route Handlers, standard envelope `{ success: true, data, message }` / `{ success: false, error: { code, message } }` via **`lib/apiRespond.js`** (`ok`/`fail`). `app/api/_lib/respond.js` is legacy — import from `@/lib/apiRespond`.
- `services/*.service.js` = ONLY place allowed to call HTTP (axios instance in `services/api.js` unwraps the envelope, attaches `Bearer` token, redirects 401 → `/login`). Components must go through `hooks/*` (`useQuery`/`useMutation`), never fetch directly.
- `data/*` = demo DB standing in for a real database. `store/*` (zustand) = client state only.
- Two component worlds coexist: new UIKit `components/ui/*` (**named exports** + barrel `index.js`, prefer for new code) and legacy flat `components/*.jsx` (default exports: Sidebar, Navbar, Badge…). New feature UI goes in `components/features/<module>/`.
- Reference implementation: `app/student/fees/page.js` + `hooks/fees/useFees.js` + `app/api/fees/*`.

## Gotchas (all verified this repo)

- **No raw `<script>` in `app/layout.js`** — React errors with "Encountered a script tag…". Theme init script must use `next/script` with `strategy="beforeInteractive"`.
- **Route handlers: use `@/` imports, not relative `_lib` paths.** Relative `../_lib/respond` imports fail the Turbopack build with module-not-found.
- ESLint `react-hooks/set-state-in-effect` is **error-level**: hydrate localStorage via lazy `useState(() => …)` initializer, never `useEffect` + `setState`. Write-only persistence effects are fine.
- `react-hooks/purity` is error-level: no `Math.random()` during render — use `useId()`.
- `react-hooks/static-components` is error-level: never define a component inside render (prior `Toggle` bug in settings page).
- No `window.location.href = "/login"` (`@next/next/no-location-assign-relative-destination`) — `services/api.js` uses `window.location.assign` with an inline disable.
- Tailwind v4: theme via CSS vars + `@custom-variant dark (&:is(.dark *))` in `app/globals.css`; dark mode = `.dark` class, not media query.
