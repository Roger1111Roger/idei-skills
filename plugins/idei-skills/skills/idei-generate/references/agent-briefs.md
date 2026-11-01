# Briefs for generation agents

One agent per method, started in parallel with the Agent tool (general-purpose). Each agent is isolated: it gets only what is written in its brief and never sees the output of another agent. This stops the methods from mixing their ideas.

## Round 1 brief (one per method)

Send exactly this, filled in. Replace `<CLAUDE_PLUGIN_ROOT>` with the real absolute path of the plugin folder (take it from `${CLAUDE_PLUGIN_ROOT}` in SKILL.md): the agent cannot resolve the variable itself.

```
You run ONE idea-generation method on a given situation. Work alone.

Situation (user answers; lines marked [assumed] are guesses):
<context block>

Method card: read <CLAUDE_PLUGIN_ROOT>/catalog/methods/<id>.md and follow its "How to apply" steps literally, in order. Method source rules: <CLAUDE_PLUGIN_ROOT>/catalog/PROVENANCE.md.

Task:
1. Produce <N> raw ideas (N = 10 to 20, given below). Judgement is deferred while generating: do not filter, do not justify, one or two lines per idea. For each idea name the card step that produced it.
2. Inventing is allowed and expected, as far as the method allows it. Aim at a deliberately uneven pool: most ideas ordinary, a good share bold, a few that sound absurd. If the method is analytic (the card asks for facts or logic), stay inside its logic instead.
3. Then mark each idea: OBVIOUS (the first thing that comes to mind, or surely exists already), or NEW. Keep the best ones: about one in five to one in ten, never fewer than 3. Do not rescue an OBVIOUS idea unless you can say what makes it different.
4. Do not search the web. Do not judge feasibility.

Output, nothing else:
- Raw list: number, idea, card step, OBVIOUS or NEW
- KEPT: the numbers and a one-line reason each
```

N by method type: 20 for quantity or association methods (brainstorming family, random stimuli, provocation, forced connections, lotus blossom, analogies); 15 by default; 10 for analytic methods (first principles, TRIZ, gap analysis, constraints).

## Round 2 brief (one per method, again isolated)

Same as round 1, plus this block placed after the situation:

```
Survivors of round 1 (each labeled with the method that produced it):
<kept ideas only>

Use the method on these survivors as material: combine, invert, push to an extreme, transfer to another field. Produce <N> raw ideas, each marked with the survivor numbers it builds on (or NEW if it does not build on any).
```

Rotate the methods: in round 2 each agent gets a method that was not used by that agent slot in round 1 (the three methods shift by one). The agents are still isolated from each other.

## Prior-art brief (one per finalist, parallel)

```
Idea: <one paragraph>. Search the web (WebSearch) for existing products, services, papers or projects that already do this or something close. Return at most five findings, each with a link and one line on how it differs from the idea. Verdict: EXISTS (does the same), SIMILAR (close but different in <what>), or NOTHING FOUND (say which queries were tried; absence of results is not proof). Do not invent links. Do not evaluate whether the idea is good.
```

## No Agent tool

If the Agent tool is not available (some chat surfaces), do the same sequentially in your own reply: finish each method's section completely before starting the next, and do not reuse ideas from another method's section in round 1. Say once that isolation is weaker in this mode.
