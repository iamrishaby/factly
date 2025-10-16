# Factly

Factly is a small Next.js + TypeScript app for sharing short "facts". It uses Tailwind CSS for styling, Supabase for storage, and a small UI component set based on Radix and shadcn patterns.

This README covers getting started locally, environment variables, common issues (especially on Windows), and where to look when you want to change the UI.

---

## Features

- Submit and list short facts via a simple UI
- Animated add-fact panel with autofocus
- Responsive layout and subtle site gradient
- Supabase-backed API routes for persistence

---

## Tech stack

- Next.js (app router) 14.x
- React 18 + TypeScript
- Tailwind CSS
- Radix UI primitives and shadcn UI patterns
- Supabase (client + serverless usage)

---

## Prerequisites

- Node 18+ (or compatible LTS)
- npm (bundled with Node) — the project uses npm in the repository scripts
- Optional: pnpm (some environments/tools may expect it)

On Windows, you'll want to run commands from a standard Command Prompt (cmd) or PowerShell. If you run into permission or locked-file issues with native binaries, see the Troubleshooting section.

---

## Local setup

1. Clone the repo and install dependencies:

```bash
# from project root
npm install
```

2. Create a `.env.local` with your Supabase details. Example:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your_anon_key...
```

The API routes expect a Supabase anon/public key for client calls. If you intend to use Supabase server-side functions, add the service role key to server-only envs.

3. Start the dev server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

---

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run built app
- `npm run lint` — run ESLint (project configured with common rules)

---

## Where things live

- `app/` — Next.js App Router pages and layout
- `components/` — React components (Add Fact form, Facts list, Footer)
- `components/ui/` — UI primitives used across the app
- `styles/` — global Tailwind/Tailwind-plugins styles
- `api/facts` — serverless API routes for creating/listing facts

---

## Styling & fonts

- Tailwind is used for styling. The project includes local CSS tweaks under `styles/globals.css`.
- The app uses the Coiny font for headings. The project imports Coiny via Google Fonts in CSS and via `next/font/google` for optimized loading — this covers both local dev and Next's font optimization in production.

---

## Troubleshooting (Windows / native binary issues)

You might run into problems on Windows when deleting or reinstalling `node_modules` due to native `.node` binaries used by tooling (e.g., `lightningcss`, `next-swc`, tailwind native tooling). The common symptoms are `EPERM`/`EBUSY` errors and failures to unlink `.node` files.

Common remedies:

1. Kill running Node processes that might hold Open file handles:

```powershell
# list node processes
tasklist /FI "IMAGENAME eq node.exe"
# kill node processes
taskkill /IM node.exe /F
```

2. Remove `node_modules` and reinstall:

```bash
# from project root (cmd or powershell)
rd /s /q node_modules
npm install
```

3. If Next attempts to download SWC or uses pnpm, you can either install pnpm globally or set an env var to skip SWC download during local experiments (not recommended for production):

```bash
# skip automatic SWC download (dev-only troubleshooting)
set NEXT_SWC_SKIP_DOWNLOAD=1
npm install
```

4. If you still see locked files, a reboot often clears file locks.

---

## Contributing

Contributions are welcome. A simple workflow:

1. Create a branch from `main`.
2. Make changes and run `npm run dev` to verify UI.
3. Open a PR with a short description of the change.

If you're changing UI, prefer adding small, focused commits and keep accessibility in mind (labels, focus management, contrast).

---

## Notes / future ideas

- Add tests for API routes (small Jest + supertest harness)
- Use Supabase Edge Functions for server-side validation and rate-limiting
- Add unit/integration tests for the Add Fact form and API

---

If you'd like, I can also:
- Generate a minimal CONTRIBUTING.md and CODE_OF_CONDUCT
- Add a Dockerfile for reproducible dev builds
- Run a production build locally and confirm fonts and native binaries behave correctly

If anything in this README is missing or you'd like a different style, tell me what to adjust and I'll update it.
# Factly

Factly is a small Next.js + TypeScript app for sharing short "facts".

This README covers getting started locally, environment variables, common issues (especially on Windows), and where to look when you want to change the UI.




You might run into problems on Windows when deleting or reinstalling `node_modules` due to native `.node` binaries used by tooling (e.g., `lightningcss`, `next-swc`, tailwind native tooling). The common symptoms are `EPERM`/`EBUSY` errors and failures to unlink `.node` files.

Common remedies:

1. Kill running Node processes that might hold Open file handles:

```powershell
# list node processes
## Features
# kill node processes

```

2. Remove `node_modules` and reinstall:

```bash
# from project root (cmd or powershell)
rd /s /q node_modules
npm install
```

3. If Next attempts to download SWC or uses pnpm, you can either install pnpm globally or set an env var to skip SWC download during local experiments (not recommended for production):

```bash
# skip automatic SWC download (dev-only troubleshooting)
set NEXT_SWC_SKIP_DOWNLOAD=1
npm install
```

4. If you still see locked files, a reboot often clears file locks.
- Submit and list short facts via a simple UI
- Animated add-fact panel with autofocus
- Responsive layout and subtle site gradient
- Supabase-backed API routes for persistence

---

## Tech stack

- Next.js (app router) 14.x
- React 18 + TypeScript
- Tailwind CSS
- Radix UI primitives and shadcn UI patterns
- Supabase (client + serverless usage)

---

## Prerequisites

- Node 18+ (or compatible LTS)
- npm (bundled with Node) — the project uses npm in the repository scripts
- Optional: pnpm (some environments/tools may expect it)

On Windows, you'll want to run commands from a standard Command Prompt (cmd) or PowerShell. If you run into permission or locked-file issues with native binaries, see the Troubleshooting section.

---

## Local setup

1. Clone the repo and install dependencies:

```bash
# from project root
npm install
```

2. Create a `.env.local` with your Supabase details. Example:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your_anon_key...
```

The API routes expect a Supabase anon/public key for client calls. If you intend to use Supabase server-side functions, add the service role key to server-only envs.

3. Start the dev server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

---

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run built app
- `npm run lint` — run ESLint (project configured with common rules)

---

## Where things live

- `app/` — Next.js App Router pages and layout
- `components/` — React components (Add Fact form, Facts list, Footer)
- `components/ui/` — UI primitives used across the app
- `styles/` — global Tailwind/Tailwind-plugins styles
- `api/facts` — serverless API routes for creating/listing facts

---

## Styling & fonts

- Tailwind is used for styling. The project includes local CSS tweaks under `styles/globals.css`.
- The app uses the Coiny font for headings. The project imports Coiny via Google Fonts in CSS and via `next/font/google` for optimized loading — this covers both local dev and Next's font optimization in production.

---
