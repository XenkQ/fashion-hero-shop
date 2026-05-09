---
name: visual-qa
description: Perform visual and interaction QA for this frontend against screenshots, target research, or expected ecommerce behavior. Use when asked to review UI fidelity, compare against references, test responsive behavior, or find visual regressions.
---

# Visual QA

Use this skill after UI implementation or before handoff.

## Workflow

1. Read the relevant expected behavior in `TARGET.md`, `.agents/context/`, and `.agents/context/qa-checklist.md`.
2. Run static checks when code changed: `npm run lint` and `npm run build`.
3. Compare desktop, tablet, and mobile layouts against available screenshots.
4. Test primary interactions: navigation, search, quick view, cart, wishlist, filters, accordions, and checkout flow.
5. Report discrepancies with file paths, affected viewport, and reproduction steps.

## Output

Summarize:

- Checks run and results.
- Visual or interaction issues found.
- Known gaps that were not testable.
- Suggested fixes ordered by user impact.

Use `references/visual-checklist.md` for the detailed pass.
