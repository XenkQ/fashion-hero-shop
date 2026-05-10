# Agent Guide

This repository is both a working FashionHero ecommerce demo and a reusable starting point for AI-assisted website builds. Keep guidance vendor-neutral: use this file for always-on repo instructions, `.agents/skills/*/SKILL.md` for reusable workflows, and `.agents/context/` for deeper project context.

## Stack

- Next.js 16 App Router, React 19, TypeScript strict
- Tailwind CSS v4 with shadcn/ui conventions
- `lucide-react` for new icons unless the project already has a matching local icon
- Static catalog data in TypeScript files under `src/data`

## Commands

- `npm run dev` starts the local Next.js server.
- `npm run build` verifies a production build.
- `npm run lint` runs ESLint.

Run `npm run lint` and `npm run build` before handing off changes that touch code, styling, routing, data contracts, or dependencies.

## Project Map

- `src/app/`: App Router routes and metadata.
- `src/components/`: Shared UI, shell providers, ecommerce components, and homepage sections.
- `src/components/ui/`: shadcn-style primitives.
- `src/data/`: Static collections, products, sellers, and hero slide content.
- `src/types/`: Shared TypeScript contracts for product, seller, cart, and collection data.
- `public/images/`: Local image assets used by Next Image.
- `.agents/context/`: Agent-facing architecture, design, data, QA notes, generated inspection notes, and visual references.
- `.agents/context/specs/`: Project and feature specs used to guide implementation.
- `.agents/context/implementation-plans/`: Generated implementation plans.
- `.agents/context/implementation-summaries/`: Generated implementation summaries.
- `.agents/skills/`: Vendor-neutral agent skills for repeatable workflows.

## Editing Rules

- Preserve user changes. Do not revert unrelated files or restore deleted historical assets unless explicitly asked.
- Prefer existing components, data shapes, CSS tokens, and route patterns over new abstractions.
- Keep TypeScript strict. Avoid `any`; update shared types when data contracts change.
- Use `@/` imports for `src` modules.
- Keep UI changes responsive and accessible: semantic links/buttons, useful `alt` text, keyboard-friendly controls, and no text overlap.
- Use real local assets when available. Generated or downloaded artifacts belong in `public/` or `.agents/context/` as appropriate.
- Do not add vendor-specific command files or docs such as `.claude`, `.cursor`, or tool-specific slash-command instructions.
- Preserve existing behavior when adding new features unless the user explicitly asks to change it.
- Avoid hardcoded prices, commission rules, return policies, or other business logic when the existing data model or static data layer should own them.

## Implementation Boundaries

Always:

- Add loading and error states for asynchronous operations.
- Show intentional empty states when data is missing instead of broken layouts.
- Keep buyer-facing flows responsive across mobile and desktop.
- Use existing UI components and local patterns for consistency.
- Update shared types and static data contracts together when a feature changes the data shape.

Ask first:

- Before changing checkout or payment flows.
- Before modifying authentication or account flows.
- Before adding a new runtime dependency or UI library.
- Before changing database-like data structures or broad shared contracts.
- Before changing global navigation, app shell layout, or route structure.

Never:

- Expose seller financial details such as margins, commission economics, or internal return costs to shoppers.
- Hardcode business rules that should come from data or shared contracts.
- Remove or rewrite existing features, components, styles, or assets unless the user specifically asks.
- Change unrelated code as part of a feature implementation.

## Agent Workflows

- For website inspection or rebuild work, start with `TARGET.md`.
- Use `.agents/skills/inspect-website` to research a target and write specs.
- Use `.agents/skills/build-frontend` to implement from specs in this app.
- Use `.agents/skills/visual-qa` to compare implementation against references.
- Keep generated research auditable. Specs should include source URL, viewport, assets, interaction states, and implementation targets.

## More Context

- Product & Domain: `.agents/context/product.md`
- Architecture: `.agents/context/architecture.md`
- Design: `.agents/context/DESIGN.md`
- Data contracts: `.agents/context/data-contracts.md`
- QA checklist: `.agents/context/qa-checklist.md`
