---
name: inspect-website
description: Inspect a target website and produce vendor-neutral research artifacts for AI-assisted frontend rebuilds. Use when asked to analyze, reverse-engineer, audit, or prepare specs for a website or page before implementation.
---

# Inspect Website

Use this skill to convert a target website into auditable implementation inputs.

## Workflow

1. Read `TARGET.md` for URL, pages, fidelity, scope, and exclusions.
2. Capture desktop, tablet, and mobile screenshots into `.agents/context/`.
3. Extract design tokens, component inventory, layout architecture, assets, and interaction behavior.
4. Write findings into `.agents/context/`.
5. For each buildable section, write a component spec in `.agents/context/`.

## Required Outputs

- `.agents/context/DESIGN_TOKENS.md`
- `.agents/context/COMPONENT_INVENTORY.md`
- `.agents/context/LAYOUT_ARCHITECTURE.md`
- `.agents/context/INTERACTION_PATTERNS.md`
- `.agents/context/ASSETS.md`
- One `.agents/context/<component-name>.spec.md` file per section or component to build

Use `references/inspection-checklist.md` for the detailed capture checklist.
