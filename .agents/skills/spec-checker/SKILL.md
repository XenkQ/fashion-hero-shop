---
name: spec-checker
description: "Quick pass/fail check on an AI spec before pasting it into Lovable, Claude Code, or Cursor. Scores against 5 research-backed criteria. Use when user says \"check my spec\", \"sprawdz specyfikacje\", \"is this spec ready\", or \"review my prompt/config/spec\"."
compatibility: opencode
---

# Spec Checker

Evaluate the spec the user provides against 5 criteria. Auto-detect the tier:
- **Project Config** if it has Boundaries/ALWAYS/NEVER sections or describes the whole project
- **Feature Spec** if it has Acceptance criteria, User flow, or describes one feature
- **Session prompt** if it's a short instruction set for a build session

## Criteria

1. **Word Budget** - Project config: <300w. Feature spec: <200w. Session: <150w.
2. **Boundaries** - 2+ explicit "never"/"don't"/scope exclusions. Feature spec needs "NOT building" section.
3. **Verification** - 3+ checkable acceptance criteria. Not vague ("should work well" fails).
4. **Examples** - 1+ concrete input/output example with specific values.
5. **Single Focus** - One tier, one feature. No mixing project config with feature details.

## Scoring

Each criterion scores 0-2 points:
- **2** = fully met
- **1** = partially met (present but weak - e.g. vague criteria, generic example, soft boundaries)
- **0** = missing entirely

**Total: 0-10.** The score is the sum of all 5 criteria.

| Score | Verdict |
|-------|---------|
| 9-10  | READY - ship it |
| 7-8   | ALMOST - small fixes, see below |
| 4-6   | WEAK - significant gaps |
| 0-3   | REWRITE - start over with the template |

## Output

Return the scorecard, then improvement suggestions. Two sections - score first, coaching second.

### Section 1: Scorecard

```
SPEC CHECK: [detected tier] | [N]w / [limit]w

1. Budget:       [0/1/2] - OK | OVER ([N]w - cut [diff])
2. Boundaries:   [0/1/2] - OK | ADD [what's missing]
3. Verification: [0/1/2] - OK | [N] criteria vague - make checkable
4. Examples:     [0/1/2] - OK | ADD input/output example
5. Focus:        [0/1/2] - OK | SPLIT - covers [N] features/tiers

SCORE: [N]/10 - [READY/ALMOST/WEAK/REWRITE]
```

### Section 2: How to improve (for each criterion scoring <2)

For each criterion that scored 0 or 1, show:
- **What's wrong** - one sentence naming the specific problem
- **How to fix it** - one concrete suggestion with a BEFORE/AFTER example pulled from their actual spec

Format:

```
## How to improve

### [Criterion name] ([0 or 1]/2)
Problem: [what's wrong - one sentence]
Fix: [what to do - one sentence]

Before: "[quote the weak/missing part from their spec]"
After: "[rewritten version that would score 2/2]"
```

The AFTER example must be specific to THEIR spec content - not generic advice. Show them exactly what their line/section should look like after fixing it. This is how they learn the pattern.

If all criteria score 2 (READY), skip Section 2 and just say: "Nothing to fix. Paste it into Lovable."

## Rules

- Do NOT rewrite the full spec. Show targeted before/after for each weak criterion only.
- Respond in the language the user prompted in.
- Keep criterion names in English regardless of response language.
- Before/after examples must use content from the user's actual spec, not generic placeholders.
- If the user asks WHY a criterion matters, give a one-sentence answer referencing the research (e.g. "Specs over 200 words cause AI output to decline, not just plateau - arXiv:2508.03678").
