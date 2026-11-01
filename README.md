# idei-skills

A Claude Code plugin with five skills that take you from nothing to a checked idea: generate ideas with a sourced catalog of 14 approaches and 90 methods, check feasibility in eight steps, and, only for an approved idea and only if you want it, write a requirements spec, test cases and an implementation prompt.

The plugin invents and checks ideas and prepares documents. It does not build anything: the executor (an AI, a team or a contractor) does the work from the prompt it produces. The skills are universal and not tied to any field: they ask what you do and what your constraints are. They answer in the language you write in.

## Skills

| Skill | What it does | Required |
|---|---|---|
| `idei` | Entry point: reads the idea registry, asks for context, hands over to the right skill | yes |
| `idei-generate` | Picks approaches and methods from the catalog, walks you through a method, records ideas | yes |
| `idei-check` | Eight feasibility steps with a way back for rework, decision go / rework / hold / stop | yes |
| `idei-spec` | Steps 9-10: requirements spec and test cases (approved ideas only) | no |
| `idei-prompt` | Step 11: implementation prompt built from the spec and cases (approved ideas only) | no |

## Install

In Claude Code:

```
/plugin marketplace add Roger1111Roger/idei-skills
/plugin install idei-skills@idei-skills
```

Then just say, for example, "help me come up with an idea for ..." or "check my idea ...". Skills are picked by their descriptions; `/idei-skills:idei` starts the entry point manually.

## Idea registry

Ideas are plain files in your working folder, `ideas/<slug>/`:

```
ideas/<slug>/
├─ idea.md     status, field, origin of the idea, hypothesis
├─ check.md    log of steps 1-8
├─ spec.md     requirements spec (after approval)
├─ cases.md    test cases
└─ prompt.md   implementation prompt
```

Statuses: `draft → checking → approved | rejected | parked`. `cases.md` records the spec version it was written from, and `prompt.md` records the spec and cases versions it was built from. If the spec changes later, the skill notices the mismatch and offers to rebuild.

## Sources and honesty

The catalog holds 90 methods, 14 approaches and 11 steps. Each one links to the pages its description was checked against. The authors' original works were mostly not read, so methods count as retellings: the skills name the source, separate the source's text from the project's own suggestions, and ask you to verify before quoting. Details and the known weak spots: [`plugins/idei-skills/catalog/PROVENANCE.md`](plugins/idei-skills/catalog/PROVENANCE.md).

## Map

[`map/idei.html`](map/idei.html) is the interactive map the catalog is generated from. Download it and open it in a browser. It is there as context for anyone who wants to extend the skills.

Regenerate the catalog from the map (Node only):

```
node tools/extract_catalog.js
```

## Layout

```
.claude-plugin/marketplace.json
plugins/idei-skills/
├─ .claude-plugin/plugin.json
├─ skills/            five skills
├─ catalog/           approaches, steps, methods, source rule
└─ templates/         registry record templates
map/idei.html         the map (source of the catalog)
tools/extract_catalog.js
```

## License

MIT, see [LICENSE](LICENSE). Method descriptions are written for this project as retellings with their sources linked; rights to the original works stay with their authors.
