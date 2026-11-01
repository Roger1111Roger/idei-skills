---
name: idei-spec
description: Write a detailed requirements specification (step 9) and main test cases (step 10) for an idea that has passed the feasibility check. Use only for ideas with status approved, when the user asks for a spec, technical task, requirements, acceptance criteria, first-version scope or test cases. Produces spec.md and cases.md in ideas/<slug>/.
---

# Spec and test cases

First: the rules for all skills in `idei/SKILL.md` and `${CLAUDE_PLUGIN_ROOT}/catalog/PROVENANCE.md`.

## Preconditions

Needed: `ideas/<slug>/idea.md` with status `approved` and `check.md` with decision `go`. If not, explain that a spec is written only for a checked idea and go back to `idei` or `idei-check`.

## Step 9: spec → `spec.md`

1. Read the step 9 and step 10 sections of `${CLAUDE_PLUGIN_ROOT}/catalog/steps.md` and pick suitable methods from the step's method list (EARS, Kano model, MoSCoW, user stories, use cases). Open a card only if that method is chosen.
2. Ask only for what the spec lacks: who uses it, in what environment or format, which constraints and rules apply.
3. Create `spec.md` from `${CLAUDE_PLUGIN_ROOT}/templates/spec.md`, `version: 1`.
   - One requirement: one verifiable statement with a number `R-001`, `R-002` and a MoSCoW priority.
   - Write constraints with their reasons.
   - Describe the **first-version boundaries** separately: what is in, what is out, what comes later.
   - Mark open questions; do not invent answers for the user.

## Step 10: cases → `cases.md`

1. Create `cases.md` from the template; `spec_version` equals the version of `spec.md`.
2. Every requirement gets at least one case `C-001...`: what it covers, input data, steps, expected result. The Given / When / Then format also suits acceptance criteria. For requirements with ranges add cases for value classes and boundaries.
3. End with a traceability table: every requirement has a case, every case has a requirement. Close the gaps.
4. Do not include implementation: this is only a description of checks.

## If the spec changes later

Increase `version` in `spec.md`, review the cases, and only after the review update `spec_version` in `cases.md`. The prompt `prompt.md` becomes stale: tell the user and offer to rebuild it (`idei-prompt`).

## Afterwards

Offer, optionally, the implementation prompt (`idei-prompt`).
