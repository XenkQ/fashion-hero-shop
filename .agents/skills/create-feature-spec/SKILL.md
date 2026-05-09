---
name: create-feature-spec
description: Create or update concise FashionHero feature specification documents under .agents/context/specs/feautures from user notes, product opportunities, outcomes, user flows, acceptance criteria, exclusions, or examples. Use when asked to write, poprawić, uzupełnić, review, or refine a feature spec using the repo template and example format.
---

# Create Feature Spec

Use this skill to turn rough product notes into a repo-ready feature spec for FashionHero.

## Workflow

1. Read `AGENTS.md`.
2. Read `.agents/context/specs/feautures/feauture-spec-template.md`.
3. Read `.agents/context/specs/feautures/feauture-spec-example.md`.
4. If updating an existing spec, read that spec and preserve the user's existing decisions.
5. Draft or patch the spec in `.agents/context/specs/feautures/`. Keep the repo's misspelled folder name `feautures`.
6. If important product details are missing, either add an `Otwarte pytania` section or ask the user concise questions before finalizing, depending on whether the missing detail blocks the document.

## Spec Shape

Use this section order unless the user asks otherwise:

```markdown
# Feature: [Nazwa]

OPPORTUNITY: [problem użytkownika jego słowami]  
OUTCOME: [mierzalny wskaźnik sukcesu]

## Co budujemy

[2-3 krótkie zdania: co użytkownik zobaczy lub zrobi]

## User flow

1. [Krok użytkownika]
2. [Reakcja systemu]
3. [Rezultat]

## Kryteria akceptacji

- [Sprawdzalne stwierdzenie]

## Czego NIE budujemy

- [Jawne wykluczenie]

## Przykłady

Input: [konkretny scenariusz]  
Oczekiwany rezultat: [co powinno się stać]
```

## Writing Rules

- Write in the user's language. For Polish notes, write the spec in Polish.
- Keep the spec product-focused: describe `CO` and `CZEGO NIE`, not architecture or implementation details.
- Use simple, testable acceptance criteria.
- Prefer concrete labels, visible UI text, states, and user actions over vague intent.
- Make responsive behavior testable when it matters.
- Include empty/loading/error states only if the feature has async or missing-data behavior.
- Do not expose seller-side financial details in buyer-facing UI.
- Keep business logic and prices in the spec only when the user provides them or they are part of the feature decision.
- Do not invent backend systems, analytics, subscriptions, payments, or admin panels when the user explicitly excludes them.
- When suggesting missing package copy or benefit tiers, make conservative proposals aligned with FashionHero priorities: seller growth, buyer confidence, product discovery, fit confidence, and return reduction.

## Clarifying Questions

Ask or add open questions for missing details such as:

- Feature name and target user.
- Exact UI labels and CTA text.
- Package names, prices, or tier differences.
- Required eligibility or access rules.
- Responsive behavior and interaction states.
- What is explicitly out of scope.
- Whether analytics, persistence, notifications, payments, or admin controls are included.

If the user answers the questions, fold those answers into the spec and remove resolved open questions.

## File Handling

- For a new spec, create a descriptive kebab-case Markdown file under `.agents/context/specs/feautures/`.
- For an existing spec, patch only the relevant sections.
- Do not run `npm run lint` or `npm run build` for documentation-only spec changes unless code changed too.
