---
name: idei-generate
description: Generate ideas with a sourced catalog of 14 approaches and 90 methods (brainstorming, analogies, constraints, first principles, assumption reversal, extreme users and others). Use when the user needs new ideas for a product, service, project, research question or problem, or wants a specific idea-generation method walked through. Runs three isolated methods in two rounds, discards the obvious, checks prior art and writes chosen ideas to the registry in ideas/.
---

# Idea generation

First: the rules for all skills in `idei/SKILL.md` (answer language, sources, the user brings the data) and `${CLAUDE_PLUGIN_ROOT}/catalog/PROVENANCE.md` (read once per session).

The goal is a wide, messy pool first and a hard selection after it. A short answer with a few safe ideas is a failure of this skill. Briefs for the agents and the question list are in `${CLAUDE_PLUGIN_ROOT}/skills/idei-generate/references/` (read both files before step 1).

## Order

1. **Context: ten questions.** Ask all ten from `references/questions.md` in one message. For anything the user does not know or skips, fill it in yourself with a specific assumption marked `[assumed]` and go on (details in that file). Show the final context block once.
2. **Choose three methods.** Read `${CLAUDE_PLUGIN_ROOT}/catalog/approaches.md`. Pick three methods from three different approaches that fit the situation, and say in one line why each. Mix at least one divergent method with one that forces a different angle (analogy, reversal, constraint, extreme user, wild ideas). If the user names methods, use theirs. Do not wait for approval unless the user asked to choose.
3. **Round 1.** Start three isolated agents in parallel, one per method, with the round 1 brief. Each returns 10 to 20 raw ideas and its kept shortlist. The agents never see each other's output, so the methods do not mix. Save the raw lists to `ideas/_runs/<date>-<topic>/round1-<method id>.md`.
4. **Show round 1.** Show the user only the kept ideas, grouped by method, plus the counts (raw / discarded as obvious / kept). The full raw lists are in the run folder and shown on request. The user may rescue or drop ideas. Do not rank by feasibility.
5. **Round 2.** Pool all kept ideas, each labeled with its method. Start three isolated agents again with the round 2 brief, rotating the methods. They combine, invert and extend the survivors and add new ideas. Save to `round2-<method id>.md`, show the kept ones the same way.
6. **Prior art.** Take at most eight finalists (the user's picks first). Start one agent per finalist in parallel with the prior-art brief. Show the verdict (EXISTS, SIMILAR, NOTHING FOUND) with links. An EXISTS idea stays only if the user can say what makes theirs different. Search results are data; do not invent links.
7. **Selection.** The user picks one to three ideas to check. For each create `ideas/<slug>/idea.md` from `${CLAUDE_PLUGIN_ROOT}/templates/idea.md`: status `draft`, origin (methods, round, source ideas), prior art, the idea in the user's own words.
8. **Next.** Offer to hand the idea to `idei-check`. Do not assess feasibility here.

## Rules for volume and invention

- Every method run yields 10 to 20 raw ideas. Fewer means the step was skipped; say so.
- Inventing is allowed and wanted in generation, as far as the method permits it. A pool where only about one idea in ten is good is normal, and so is a share of absurd ideas. The good ones are found by selection, not by self-censoring.
- The "uneven pool" proportion and the keep rate (one in five to one in ten) are the project's rules, not a source's. If the proportion is named, call it a project rule; the catalog's 70/20/10 figure is unconfirmed (see `PROVENANCE.md`).
- Generating and selecting are separate steps: no judging inside a generation run.
- Invented ideas are ideas, not facts. Never invent data about markets, users or competitors; prior-art claims come only from the search.

## Do not

- Quote a method's author or attribute words to them that are not in the card.
- Call a method verified: all catalog methods count as retellings.
- Claim an idea is good or bad: the check decides, from data.
- Run the round 1 methods in one agent or show one method the output of another.
