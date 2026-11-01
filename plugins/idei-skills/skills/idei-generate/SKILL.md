---
name: idei-generate
description: Generate ideas with a sourced catalog of 14 approaches and 90 methods (brainstorming, analogies, constraints, first principles, assumption reversal, extreme users and others). Use when the user needs new ideas for a product, service, project, research question or problem, or wants a specific idea-generation method walked through. Writes chosen ideas to the registry in ideas/.
---

# Idea generation

First: the rules for all skills in `idei/SKILL.md` (answer language, sources, the user brings the data) and `${CLAUDE_PLUGIN_ROOT}/catalog/PROVENANCE.md` (read once per session).

## Order

1. **Context.** Needed: the user's field, for whom the idea is, what hurts or what is being improved, constraints. Ask for what is missing (at most five questions).
2. **Choose approaches.** Read `${CLAUDE_PLUGIN_ROOT}/catalog/approaches.md`. Pick two or three approaches that fit the situation and explain briefly why (from the "Why combine with checking" line and the description). If several fit equally, let the user choose.
3. **Choose methods.** From the chosen approach's method list offer one or two. Open `${CLAUDE_PLUGIN_ROOT}/catalog/methods/<id>.md` only for the chosen methods; do not read them all.
4. **Run the method.** One step at a time from the "How to apply" section: ask the user for material, write down their answer, add your own suggestions and label them as suggestions. Do not invent steps that are not in the card. Keep generating and selecting apart: collect ideas first, select afterwards by criteria the user names.
5. **Method name.** Whenever a method is named, give its source and caveat per `PROVENANCE.md` (from a retelling, verify before quoting).
6. **Selection.** The user picks ideas to check (usually one to three at a time, so the check is not spread thin). For each create `ideas/<slug>/idea.md` from `${CLAUDE_PLUGIN_ROOT}/templates/idea.md`: status `draft`, `origin.approach` and `origin.method` from the catalog, the idea in the user's own words.
7. **Next.** Offer to hand the idea to `idei-check`. Do not assess feasibility here: that is the check's job.

## Do not

- Quote a method's author or attribute words to them that are not in the card.
- Call a method verified: all catalog methods count as retellings.
- Claim an idea is good or bad: the check decides, from data.
