# CLAUDE.md

This file provides guidance for AI assistants (Claude and others) working in this repository.

## Repository Overview

**Name:** test-repo
**Owner:** bargainfactory
**Status:** Early-stage / minimal scaffold

The repository currently contains only a README. This CLAUDE.md serves as the foundational conventions document to be maintained as the project grows.

## Repository Structure

```
test-repo/
├── README.md       # Project description (currently minimal)
└── CLAUDE.md       # This file — AI assistant guidance
```

## Git Workflow

### Branches
- `main` — primary branch on the remote
- `master` — local default branch
- Feature branches follow the pattern: `claude/<description>-<id>`

### Commit Conventions
- Use clear, imperative commit messages (e.g., `Add README`, `Fix login bug`)
- Keep commits focused and atomic
- Do not commit unrelated changes together

### Push Workflow
```bash
git push -u origin <branch-name>
```
- Feature branches must start with `claude/` for CI/permission reasons
- Never push directly to `main`/`master` without review

## Development Conventions

Since the codebase is currently empty, the following conventions should be established as code is added:

### General
- Prefer editing existing files over creating new ones
- Avoid over-engineering; implement only what is currently needed
- Do not add comments unless the logic is non-obvious

### File Organization
- Group related files in clearly named directories
- Keep the root directory clean; move source code into appropriate subdirectories (e.g., `src/`, `lib/`)

### Security
- Never commit secrets, API keys, or credentials
- Validate all external input at system boundaries
- Avoid introducing OWASP Top 10 vulnerabilities (SQLi, XSS, command injection, etc.)

## AI Assistant Instructions

- Read files before proposing changes to them
- Do not create unnecessary files or abstractions
- Match the minimal, focused style of the existing codebase
- When in doubt about scope, do less and ask
- Keep this CLAUDE.md up to date as the project evolves — update it when new tools, workflows, or conventions are introduced

## Updating This File

When significant changes are made to the project (new language/framework adopted, CI added, testing strategy established), update this file to reflect the current state. Sections to add as needed:

- **Setup & Installation** — how to get the project running locally
- **Testing** — how to run tests and what coverage is expected
- **Linting & Formatting** — tools and configurations in use
- **Environment Variables** — required env vars and how to configure them
- **Deployment** — how and where the project is deployed
