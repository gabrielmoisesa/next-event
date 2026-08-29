<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project overview
- This repository is a Next.js 16 application using the App Router, React 19, TypeScript, and Tailwind CSS.
- Core app code lives in `app/`; shared UI components live in `components/`; reusable helpers and constants live in `lib/`.
- Use the alias `@/*` when importing project files to match the existing TypeScript configuration.
- Do not edit build artifacts in `.next/`, lockfiles, or local environment files unless the task explicitly requires it.

## Commands
- Install dependencies: `npm install`
- Start the app locally: `npm run dev`
- Lint the project: `npm run lint`
- Build for production: `npm run build`
- Run the production build locally: `npm run start`

## Coding expectations
- Prefer the existing project patterns over inventing new ones.
- Keep components small, readable, and aligned with the design already present in the app.
- Use server components by default unless the task requires client-side interactivity.
- Keep styling in Tailwind classes and `app/globals.css` rather than adding ad hoc CSS files unless there is a clear need.
- If a task changes behavior or public interfaces, validate with the smallest relevant command (`npm run lint` or `npm run build` as appropriate).

## Local workflow
- Stay focused on the request; avoid unrelated refactors.
- If you add files, prefer the current conventions and naming used in nearby code.
- Summarize the intent and validation before finishing a task when the change is non-trivial.

## Commit conventions
- Use Conventional Commits for all commit messages, following the format: `type(scope): subject`.
- Preferred types: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`, `perf`, `ci`, `revert`.
- Use a brief, imperative subject, for example: `feat(nav): add event filters` or `fix(layout): correct hero spacing`.
- Keep the subject in lowercase and avoid a trailing period.
- Use a scope only when it adds clarity; otherwise, omit it.
- If the task is small and non-user-facing, prefer `chore` or `fix` over introducing a new type.
