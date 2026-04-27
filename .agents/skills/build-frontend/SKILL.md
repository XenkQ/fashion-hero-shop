---
name: build-frontend
description: Implement frontend pages, sections, and components in this Next.js ecommerce project from specs or agent research. Use when asked to build UI from docs, screenshots, TARGET.md, or docs/research component specs.
---

# Build Frontend

Use this skill to implement researched UI inside the existing FashionHero app.

## Workflow

1. Read `AGENTS.md` and the relevant files in `docs/agents/`.
2. If building from target research, read the relevant `docs/research/components/*.spec.md` files.
3. Map the work to existing routes, components, data files, and shared types.
4. Implement with existing Tailwind, shadcn/ui, provider, and data patterns.
5. Run `npm run lint` and `npm run build`.

## Implementation Rules

- Keep route files thin; move reusable UI into `src/components`.
- Keep catalog facts in `src/data` and shared shapes in `src/types`.
- Prefer existing design tokens and utilities.
- Use local images under `public/images`.
- Do not add vendor-specific agent config.

Use `references/frontend-patterns.md` for project-specific implementation guidance.
