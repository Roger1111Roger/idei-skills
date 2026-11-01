---
name: idei-check
description: Check whether an idea or hypothesis is feasible with eight steps - hypothesis, assumptions and risks, success criteria, desk research, three-axis assessment, mini-experiment, measurement, decision (go, rework, hold, stop). Use when the user wants to validate, test or evaluate an idea, hypothesis or project before building it. Keeps a check log in ideas/<slug>/check.md and sets the idea status.
---

# Feasibility check

First: the rules for all skills in `idei/SKILL.md` (language, sources, the user brings the data, do not implement) and `${CLAUDE_PLUGIN_ROOT}/catalog/PROVENANCE.md`.

## Preparation

1. Read `ideas/<slug>/idea.md`. If there is no idea, go back to skill `idei`. Set status `checking`.
2. If `check.md` does not exist, create it from `${CLAUDE_PLUGIN_ROOT}/templates/check.md`. If it exists, continue from the first unfilled step: the session may have been interrupted.
3. Read `${CLAUDE_PLUGIN_ROOT}/catalog/steps.md` (steps 1-8). If `origin.approach` is set, read the line "Check steps this approach helps" in `approaches.md`: give those steps more time, but still go through all eight in order.

## Steps

For each step: say briefly what it requires (from `steps.md`), ask the minimum of questions, offer one or two methods from the "Step methods" line (open a card only if the user picks that method), remind of the "Do not forget" items in one line each, record the result in `check.md`.

- **Step 3, success criteria.** Write the metric, the success threshold and the failure threshold before the experiment and before steps 6-7. If criteria change after data appears, record the change and the reason.
- **Step 4, desk research.** Look facts up in sources and give a link for each. If search is unavailable, say so and ask the user to bring sources. Never present facts "from memory" as verified.
- **Steps 6-7, experiment and measurement.** You may suggest the cheapest way to get data and what to measure. The user brings the results. While there is no data, write "waiting for data", save progress and stop. Compare the result with the step 3 criteria.
- **Step 8, decision.** Show data against criteria. Options: `go` (the idea is good), `rework` (return to step 2, `iteration` +1, record what changes), `hold` (pause), `stop`. The user decides. Record the outcome, negative ones too.

## Status from the decision

- `go` → status `approved`.
- `rework` → status `checking`, `iteration` +1, back to step 2.
- `hold` → status `parked`.
- `stop` → status `rejected`.
Update `updated` in `idea.md`.

## After approval

Say that next, optionally, come the spec and test cases (`idei-spec`), then the implementation prompt (`idei-prompt`). Do not start them yourself: the user decides.
