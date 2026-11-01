---
name: idei-prompt
description: Assemble an implementation prompt (step 11) from the spec and test cases of an approved idea, so that any executor (AI, team or contractor) can start work without further context. Use only when ideas/<slug>/spec.md and cases.md exist, or when an existing prompt.md may be stale after the spec or cases changed.
---

# Implementation prompt

First: the rules for all skills in `idei/SKILL.md` and `${CLAUDE_PLUGIN_ROOT}/catalog/PROVENANCE.md`.

The prompt invents nothing. It carries the spec and the cases into a form the executor can understand without you. The executor is not named: it may be an AI, a team or a contractor, so do not write tools or languages into the text unless they are in `spec.md`.

## Preconditions

Needed: `idea.md` with status `approved`, `spec.md` and `cases.md`. If something is missing, go back to `idei-spec`. If the spec lacks needed information, do not fill it in yourself: go back to `idei-spec` and complete the spec.

## Staleness check

If `prompt.md` already exists, compare `built_from.spec` and `built_from.cases` with the current `version` in `spec.md` and `cases.md`. If the versions differ, tell the user the prompt is stale and offer to rebuild it. Also make sure `spec_version` in `cases.md` equals the version of `spec.md`; if not, review the cases first.

## Assembly

Create or update `prompt.md` from `${CLAUDE_PLUGIN_ROOT}/templates/prompt.md`:

1. **Goal and context.** Why it is needed, for whom, what the check showed. Explain reasons, not only commands.
2. **What to do.** Requirements from `spec.md` verbatim, with numbers `R-###`.
3. **First-version boundaries.** In and out, from `spec.md`.
4. **Constraints and why they matter.** Each with its reason. Phrase as "do this", not only "do not do that".
5. **How to tell it is done.** Cases from `cases.md` verbatim, with numbers `C-###`. The work is accepted when all pass.
6. **How to work.** In order: read the whole task and write down questions; when something is ambiguous, ask instead of guessing; work by priority; report on every case (passed or not, and what confirms it).
7. Write the current versions of `spec.md` and `cases.md` into `built_from` and update `updated`.

Do not add new requirements, cases or assumptions to the prompt: the only sources of truth are `spec.md` and `cases.md`.

## Self-check

Reread the finished prompt as a person who does not know the task and write down what would be unclear to them. Fix it, changing `spec.md` or `cases.md` through `idei-spec` if needed. Report to the user: what was assembled, from which versions, what remained unclear.

Basis: Anthropic's prompting guidance (clear explicit instructions, context and motivation, sequential steps, testing the prompt on a person without context): https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices . The prompt's structure is the project's own, not a ready-made method from that source.
