# Briefs for generation agents

Every agent is isolated: it gets only what is written in its brief and never sees the output of another agent. This keeps the methods from mixing their ideas. Replace `<CLAUDE_PLUGIN_ROOT>` with the real absolute path of the plugin folder (take it from `${CLAUDE_PLUGIN_ROOT}` in SKILL.md): an agent cannot resolve the variable itself. `<RUN_DIR>` is `ideas/_runs/<date>-<topic>/` in the user's working folder.

## Scout agent (one, runs before the method agents)

Finds the themes every model reaches for first, so the method agents can stay away from them.

```
Situation (user answers; lines marked [assumed] are guesses):
<context block>

Write the 15 ideas that come to mind first for this situation, fast, without a method. Then group them into themes (a theme is a shared core mechanic or image, for example "notes that fade like a pet"). Return only the list of themes, each as a short name plus a one-line description. No ideas, no ranking, no web search.
```

Pass the returned themes to every method agent as the shared ban list.

## Method agent (one per method, three in parallel)

```
You run ONE idea-generation method on a given situation, in two rounds. Work alone.

Situation (user answers; lines marked [assumed] are guesses):
<context block>

Method card: read <CLAUDE_PLUGIN_ROOT>/catalog/methods/<id>.md and follow its "How to apply" steps literally, in every round. Source rules: <CLAUDE_PLUGIN_ROOT>/catalog/PROVENANCE.md.

Forbidden themes (shared list, do not touch these themes in any round, in any disguise):
<scout themes>

Step 0 (before any round): write down the ten ideas that come to mind first for this situation. They, and their whole themes, are forbidden too, in everything below. If a later idea turns out to be one of the forbidden themes under another name, drop it.

Round 1: produce <N> raw ideas (N = 10 to 20, given below). Judgement is deferred while generating: no filtering, one or two lines per idea, name the card step that produced it. Inventing is allowed and expected, as far as the method allows: aim at a deliberately uneven pool, most ideas ordinary, a good share bold, a few absurd. If the method is analytic (the card asks for facts or logic), stay inside its logic. Then mark each idea OBVIOUS (first thing that comes to mind, or surely exists already) or NEW. Merge duplicates and ideas on the same theme: keep only the strongest of them. Keep about one in five to one in ten, at least 4. Do not rescue an OBVIOUS idea unless you can say what makes it different.

Round 2: take the survivors as material and apply the same method again: combine, invert, push to an extreme, transfer to another field. Produce <N> new raw ideas, each marked with the survivor numbers it builds on (or NEW). Mark, merge and keep as in round 1, and also drop anything that repeats a theme already among the survivors.

Final: choose exactly 10 ideas from the survivors of both rounds, ranked best first. No two on the same theme, none on a forbidden theme. If the method cannot honestly give 10, give fewer and say so; do not pad. For each: one or two lines and what makes it different from the obvious.

Do not search the web. Do not judge feasibility.

Write everything (step 0 with its ten, both raw lists with marks, the survivors of each round) to <RUN_DIR>/<method id>.md. Return only: the final ten, and per round the counts raw / dropped / kept. If you cannot write the file, return the full raw lists as well.
```

If an agent is stopped by an API error, start it again once with the same brief. If it fails again, start the reserve method instead (same brief, same ban list). If that fails too, use what the agents wrote to their files and tell the user plainly what was lost.

N by method type: 20 for quantity or association methods (brainstorming family, random stimuli, provocation, forced connections, lotus blossom, analogies); 15 by default; 10 for analytic methods (first principles, TRIZ, gap analysis, constraints).

## Fight agent (one)

Gets the 30 final ideas of the three method agents, pooled and shuffled, without method names, plus the situation.

```
Situation: <context block>
Criteria: <the user's criteria if the user named any; otherwise: fit with the pain (question 3), fit with the success definition (7), fit with the stated risk appetite (10), and how far the idea is from the obvious>

Below are <M> ideas from three independent sources. Merge ideas that are the same idea in different words (note how many were merged). Rank the rest by the criteria. Return the top 8 in order, each with one line saying why it beats the ones below it. This is a ranking by the stated criteria only: do not judge feasibility, do not invent facts about markets or users, do not search the web.

Ideas:
<numbered list>
```

## Prior-art agent (one per finalist, parallel)

```
Idea: <one paragraph>. Search the web (WebSearch) for existing products, services, papers or projects that already do this or something close; try at least three different queries, in English and in the user's language. Return at most five findings, each with a link and one line on how it differs from the idea.
Then open the page of the single closest existing thing (WebFetch) and read what it actually does; do not decide from a search snippet. Say if the page could not be opened. Answer in one sentence: what does the idea do that the closest thing does not, in function and not in name, framing or looks?
Verdict: EXISTS (does the same, or the only difference is naming, framing or looks), SIMILAR (close, with a real functional difference, which you state), or NOTHING FOUND (list the queries tried; absence of results is not proof). Do not invent links. Do not evaluate whether the idea is good.
```

## No Agent tool

If the Agent tool is not available (some chat surfaces), do the same sequentially in your own reply: finish each method's two rounds completely before starting the next, and do not reuse ideas from another method. Say once that isolation is weaker in this mode.
