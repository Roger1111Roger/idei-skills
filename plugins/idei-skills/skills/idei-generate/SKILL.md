---
name: idei-generate
description: Generate ideas with a sourced catalog of 14 approaches and 90 methods (brainstorming, analogies, constraints, first principles, assumption reversal, extreme users and others). Use when the user needs new ideas for a product, service, project, research question or problem, or wants a specific idea-generation method walked through. Starts with a roast of the topic, runs isolated method agents in light, middle or deep mode, ranks the results, checks prior art, shows a numbered list, and repeats the cycle with the user's picks until they are satisfied.
---

# Idea generation

First: the rules for all skills in `idei/SKILL.md` (answer language, sources, the user brings the data) and `${CLAUDE_PLUGIN_ROOT}/catalog/PROVENANCE.md` (read once per session). Read both files in `${CLAUDE_PLUGIN_ROOT}/skills/idei-generate/references/` (`roast.md`, `agent-briefs.md`) before step 1.

The goal is a wide, messy pool first and a hard selection after it. A short answer with a few safe ideas is a failure of this skill.

## Modes

Every mode has the scout, the agent fight and the prior-art search. Modes differ only in how many methods run.

| Mode | Methods | Fit of the method to the situation |
|---|---|---|
| light | 1 | best fit |
| middle (default) | 3, plus 1 in reserve | one best fit, one median, one least fit |
| deep | 14, one from each approach | spread evenly: about a third high fit, a third median, a third least fit |

## One cycle

1. **Roast.** Follow `references/roast.md`: no topic, no work; then the questions about the topic, the mode, and the context block with `[assumed]` lines. Done once; later cycles only add the user's feedback to the context block.
2. **Choose methods.** Read `${CLAUDE_PLUGIN_ROOT}/catalog/approaches.md` and `methods-index.md`. Judge each method's fit to the situation as high, medium or low, quickly, from names and approach descriptions (open a card only to settle a doubt). Do not drop a method because it looks irrational: the least-fit one is chosen on purpose, because it can open a view the fitting ones cannot. Pick by the mode table, taking different approaches where possible; the reserve is another high or medium method. Take method ids only from `methods-index.md`. Say in one line why each was chosen. If the user names methods, use theirs. Recompute the fits in every new cycle, since the feedback changes the situation.
3. **Scout, once in the first cycle.** One scout agent lists the themes models reach for first. They form the ban list together with, from the second cycle on, the themes of ideas the user already saw and did not pick.
4. **Isolated runs.** Create the run folder `ideas/_runs/<date>-<topic>/`. Start the method agents in parallel with the method-agent brief, the ban list and, from the second cycle, the seeds. Each agent runs its own two rounds and returns up to ten ideas; the agents never see each other's output and write their raw lists to `<method id>.md` in the run folder, saving after each stage. An agent stopped by an API error is started again once, then replaced by the reserve; if that fails too, use what was written to the files and say what was lost.
5. **Fight.** One fight agent (two stages in deep mode) merges identical ideas, scores novelty and buildability, and returns the top eight.
6. **Prior art, once.** One agent per finalist, in parallel, as in the brief; each opens the page of the closest thing and names the missing core function. Drop EXISTS ideas and replace them from the next in the ranking (search the replacements too). Say plainly if the verdicts rest on search snippets.
7. **Show a numbered list** of up to eight ideas, ordered by the three scores (novelty, buildability, analogs), in the user's language, as a table with numbers and no checkboxes:

   `№ | Idea | Essence | Analogs | Score`

   "Analogs" is the verdict with the closest thing and a link; "Score" shows novelty / buildability. Add the counts (raw per method, kept, merged, dropped); the raw lists are in the run folder. Do not claim an idea is good. Then ask: **"Write the numbers of the ideas you like, with comments if you have them: what you like, what to drop, what is missing. Or say 'enough' to choose."**
8. **Next cycle.** Add the user's comments to the context block. The liked ideas become seeds; the themes of the others join the ban list. Go back to step 2. Save the list shown and the answer in the run folder (`cycle<N>.md`). Repeat until the user is satisfied.
9. **Final choice.** When the user says they are satisfied, they name one idea or a pair. Only then create `ideas/<slug>/idea.md` for each (from `${CLAUDE_PLUGIN_ROOT}/templates/idea.md`: status `draft`, origin, prior art, the idea in the user's words) and offer `idei-check`. Do not assess feasibility here.

## Rules for volume and invention

- Every round of a method run yields 10 to 20 raw ideas. Fewer means the step was skipped; say so.
- Duplicates and repeated themes are removed inside each method agent's pool. Identical ideas from different agents are merged in the fight.
- Inventing is allowed and wanted in generation, as far as the method permits it. A pool where only about one idea in ten is good is normal. The good ones are found by selection, not by self-censoring.
- The proportions of the pool and the keep rate (one in five to one in ten) are the project's rules, not a source's; the catalog's 70/20/10 figure is unconfirmed (see `PROVENANCE.md`).
- Generating and selecting are separate steps: no judging inside a generation run.
- Invented ideas are ideas, not facts. Never invent data about markets, users or competitors; prior-art claims come only from the search. Buildability is a rough estimate against the stated assets, not a check.

## Do not

- Start without a topic.
- Quote a method's author or attribute words to them that are not in the card.
- Call a method verified: all catalog methods count as retellings.
- Run the methods in one agent or show one method the output of another before the fight.
- Start the spec, test cases or prompt: they come only after the user's final choice and the check.
