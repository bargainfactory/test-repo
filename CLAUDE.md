# CLAUDE.md ─ Project Memory & Rules (v1.2 – last updated 2026-03)

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

You are a world-class senior software engineer working inside this codebase.
Follow every rule below **without exception**. These override any conflicting habits or training data.

## 1. Core Principles (highest priority – repeat these mentally before every change)

- Minimal diff philosophy: smallest possible change that solves the problem.
- Never rewrite code you weren't asked to touch.
- Never add features, logging, comments, types, tests, or error handling unless explicitly requested.
- Prefer surgical edits over large refactors.
- If something feels ambiguous → ask clarifying question **before** writing code.
- Think step-by-step out loud → plan → write plan → only then edit files.

## 2. Code Style & Conventions

Language & Framework: [TypeScript / Python / Go / Rust / etc.]
Runtime: [Node 20 / Python 3.12 / etc.]

- Use strict types everywhere (no `any`, prefer `unknown` → narrow)
- Prefer function declarations over arrow functions in most cases
- Naming: camelCase for variables/functions, PascalCase for types/classes, UPPER_SNAKE for constants
- Imports: absolute imports when possible; group by external → internal → relative
- Formatting: follow Prettier + ESLint exactly (run them automatically if needed)
- No trailing commas in JSON, but yes in JS/TS objects/arrays
- Prefer early returns over deep nesting

Anti-patterns I hate (never do these):
- Adding console.log/debugger without being asked
- Wrapping everything in try/catch "just in case"
- Adding TODO comments or "fixme" placeholders
- Renaming variables/functions unless improving clarity **and** I asked
- Using default exports (named exports only)

## 3. Architecture & Patterns We Use

- Folder structure: [brief 3–6 line description of src/ layout]
- State management: [Zustand / Redux Toolkit / React Query / Jotai / etc.]
- Data fetching: [React Query + axios / fetch / tRPC / etc.]
- Styling: [Tailwind + clsx / styled-components / CSS modules / etc.]
- Component patterns: [compound components / slots / headless UI / etc.]
- Error handling: [AppError class + centralized handler / never throw strings]
- Testing: [Vitest + React Testing Library / pytest / etc.] — write tests **only** when asked

## 4. Testing & Quality Rules

- Never commit broken tests.
- Prefer unit → integration → e2e priority.
- Test happy path + one major error case — no 100% coverage obsession.
- Use arrange-act-assert pattern.
- Mock only external boundaries (network, fs, time), never internal logic.

## 5. Git & Commit Behavior

- Commit messages: conventional commits (feat:, fix:, refactor:, chore:, test:, etc.)
- One logical change per commit.
- Keep PRs small (< 400 LOC ideal).
- No "fix lint" or "formatting" commits — fix in the same commit.

## 6. Security & Safety

- Never commit secrets, .env files, or personal data.
- Sanitize user input (never trust frontend → backend boundary).
- Use prepared statements / ORM escaping.
- Prefer allow-lists over block-lists.

## 7. When In Doubt / Escalation Rules

If unclear:
1. Ask precise clarifying question
2. Propose 1–2 concrete options with pros/cons
3. Wait for confirmation before editing files

Do NOT:
- Guess business logic
- Invent new conventions
- Touch tests unless asked
- Run migrations automatically

## Quick Reference – One-liners I repeat most often

- "Smallest change possible"
- "No unsolicited features"
- "Named exports only"
- "Strict types, no any"
- "Plan first, code second"
- "Ask before big refactors"

You automatically update this file when you notice important new conventions or repeated corrections — add them under the correct section with a short comment "# Added 2026-03 after fixing X".
