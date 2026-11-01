---
name: idei-generate
description: Generate ideas with a sourced catalog of 14 approaches and 90 methods (brainstorming, analogies, constraints, first principles, assumption reversal, extreme users and others). Use when the user needs new ideas for a product, service, project, research question or problem, or wants a specific idea-generation method walked through. Runs three isolated methods of three rounds each, pits their ten best ideas against each other, checks prior art for the finalists, shows the best five and writes chosen ideas to the registry in ideas/.
---

# Idea generation

First: the rules for all skills in `idei/SKILL.md` (answer language, sources, the user brings the data) and `${CLAUDE_PLUGIN_ROOT}/catalog/PROVENANCE.md` (read once per session).

The goal is a wide, messy pool first and a hard selection after it. A short answer with a few safe ideas is a failure of this skill. Briefs for the agents and the question list are in `${CLAUDE_PLUGIN_ROOT}/skills/idei-generate/references/` (read both files before step 1).

## Order

1. **Context: ten questions.** Ask all ten from `references/questions.md` in one message. For anything the user does not know or skips, fill it in yourself with a specific assumption marked `[assumed]` and go on (details in that file). Show the final context block once.
2. **Choose three methods.** Read `${CLAUDE_PLUGIN_ROOT}/catalog/approaches.md` and `methods-index.md`. Pick three methods from three different approaches that fit the situation, and say in one line why each. Mix at least one divergent method with one that forces a different angle (analogy, reversal, constraint, extreme user, wild ideas). Take method ids only from `methods-index.md`. If the user names methods, use theirs. Do not wait for approval unless the user asked to choose.
3. **Three isolated runs.** Start three agents in parallel, one per method, with the method-agent brief. Each runs its own three rounds (raw ideas, then a second and third pass over its own survivors), skips the obvious themes, removes duplicates inside its own pool, and returns its ten best ideas. The agents never see each other's output. Their full raw lists go to `ideas/_runs/<date>-<topic>/<method id>.md`.
4. **The fight.** Pool the thirty ideas, shuffle them and remove method names. Start one fight agent: it merges identical ideas, ranks the rest by the user's criteria (or the defaults in the brief) and returns the top eight.
5. **Prior art.** One agent per finalist, in parallel, with the prior-art brief. Verdicts: EXISTS, SIMILAR, NOTHING FOUND, with links. Drop EXISTS ideas unless the user can say what makes theirs different, and fill the gap from the next in the ranking.
6. **Show the best five.** For each: the idea, which methods produced it (re-attach the names now), why it won, the prior-art verdict with links. Add the counts (raw per method, kept, merged, dropped). Raw lists are in the run folder and shown on request. Do not claim feasibility.
7. **Ask for details.** After the five, ask the user: which of the five pull them and which do not (and why); which `[assumed]` context lines were wrong; and three to five questions you generate from the five ideas (what must be true for the idea to be worth building, who would use it first, what it must not become). Offer a new cycle using the answers; reuse the run folder, new files per cycle.
8. **Selection.** The user picks one to three ideas to check. For each create `ideas/<slug>/idea.md` from `${CLAUDE_PLUGIN_ROOT}/templates/idea.md`: status `draft`, origin (methods, run folder), prior art, the idea in the user's own words.
9. **Next.** Offer to hand the idea to `idei-check`. Do not assess feasibility here.

## Rules for volume and invention

- Every round of a method run yields 10 to 20 raw ideas. Fewer means the step was skipped; say so.
- Duplicates and repeated themes are removed inside each method agent's pool. Identical ideas from different agents are merged in the fight, not before.
- Inventing is allowed and wanted in generation, as far as the method permits it. A pool where only about one idea in ten is good is normal, and so is a share of absurd ideas. The good ones are found by selection, not by self-censoring.
- The "uneven pool" proportion and the keep rate (one in five to one in ten) are the project's rules, not a source's. If the proportion is named, call it a project rule; the catalog's 70/20/10 figure is unconfirmed (see `PROVENANCE.md`).
- Generating and selecting are separate steps: no judging inside a generation run.
- Invented ideas are ideas, not facts. Never invent data about markets, users or competitors; prior-art claims come only from the search.

## Do not

- Quote a method's author or attribute words to them that are not in the card.
- Call a method verified: all catalog methods count as retellings.
- Claim an idea is good or bad: the check decides, from data.
- Run the methods in one agent or show one method the output of another before the fight.
