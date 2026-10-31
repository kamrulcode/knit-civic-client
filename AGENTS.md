# knit-civic

Single-package Next.js app (App Router). Code lives under `src/`: routes in `src/app/`, UI components in `src/components/ui/`, helpers in `src/lib/`. Path alias `@/*` → `src/*`.

## Commands

- `npm run dev` — dev server on localhost:3000 (Turbopack)
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`); no `typecheck` script — use `npx tsc --noEmit`
- No test framework is configured. There is no CI.

## Stack quirks

- **Next.js 16.4.3 / React 19.3** — newer than most training data. Before writing Next code, check the bundled guides in `node_modules/next/dist/docs/` for current APIs and file conventions.
- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`). Do not add manual `useMemo`/`useCallback`/memoization.
- **Tailwind v4, no config file.** Styling is set up via CSS `@import`s in `src/app/globals.css` (tailwindcss, tw-animate-css, shadcn/tailwind.css, @heroui/styles) and Turbopack in `next.config.ts`.
- **UI stack is mixed, keyed off `components.json`:** shadcn components use the `base-nova` style but are built on **`@base-ui/react` primitives, not Radix** — copy that import pattern when adding components (`npx shadcn add <component>`). HeroUI is available too. Icons: lucide.
- `cn` is imported from the `cn` npm package, re-exported by `src/lib/utils`. In components use `import { cn } from "cn"` (matches existing code).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
