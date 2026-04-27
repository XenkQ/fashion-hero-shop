---
name: inspect-website
description: Inspect a target website and produce vendor-neutral research artifacts for AI-assisted frontend rebuilds. Use when asked to analyze, reverse-engineer, audit, or prepare specs for a website or page before implementation.
---

# Inspect Website

Use this skill to convert a target website into auditable implementation inputs.

## Workflow

1. Read `TARGET.md` for URL, pages, fidelity, scope, and exclusions.
2. Capture desktop, tablet, and mobile screenshots into `docs/design-references/`.
3. Extract design tokens, component inventory, layout architecture, assets, and interaction behavior.
4. Write findings into `docs/research/`.
5. For each buildable section, write a component spec in `docs/research/components/`.

## Required Outputs

- `docs/research/DESIGN_TOKENS.md`
- `docs/research/COMPONENT_INVENTORY.md`
- `docs/research/LAYOUT_ARCHITECTURE.md`
- `docs/research/INTERACTION_PATTERNS.md`
- `docs/research/ASSETS.md`
- One `docs/research/components/<component-name>.spec.md` file per section or component to build

Use `references/inspection-checklist.md` for the detailed capture checklist.
