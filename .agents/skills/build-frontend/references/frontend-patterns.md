# Frontend Patterns

## Routes

Use App Router pages in `src/app`. Dynamic collection and product pages should resolve records by slug from `src/data` helpers.

## Components

Use named exports. Use PascalCase component names and camelCase helpers. Client components should declare `"use client"` only when they need state, effects, event handlers, context hooks, or browser APIs.

## Styling

Use Tailwind utility classes and existing global tokens. Add CSS to `globals.css` only for true global tokens, utilities, or keyframes.

## Data

When a UI change needs new catalog fields, update `src/types` before updating `src/data`, then update all affected components.

## Verification

Run `npm run lint` and `npm run build`. For visual changes, inspect desktop and mobile behavior before handoff.
