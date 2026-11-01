---
name: idei
description: Start here to invent an idea, check whether it is feasible, and optionally turn an approved idea into requirements, test cases and an implementation prompt. Use when the user wants new ideas for a product, service, project or research, wants to check or validate an idea or hypothesis, or asks what to do next with an idea. Keeps the idea registry in ideas/ and routes to idei-generate, idei-check, idei-spec and idei-prompt.
---

# Ideas: entry point

Rules for every skill in this plugin (keep them in mind throughout):
1. **Language.** Answer in the language of the user's latest message. The catalog is in English: convey its meaning in the user's language; keep method names, author names and links as in the catalog. In registry files keep field names, statuses and ids in English; write headings and text in the user's language (translate the template headings).
2. **Sources.** Once per session read `${CLAUDE_PLUGIN_ROOT}/catalog/PROVENANCE.md` and follow it: always name a method's source, present how-to steps as a project suggestion, treat methods as retellings.
3. **The user brings the data.** Never invent check results, numbers, market or user opinions. No data: write "no data" and say how to get it.
4. **Do not implement.** The skills invent and check ideas and prepare documents. The executor does the work from `prompt.md`.
5. **Do not assume the user's field.** The plugin is universal: an idea can be a product, service, research, process.

## What to do

1. **Look at the registry.** Read the start of `ideas/*/idea.md` (fields `title`, `status`, `iteration`) in the working folder. No `ideas/` folder means no ideas yet. Show a short list.
2. **Find out what the user wants and hand over:**
   - **New idea.** If the context is unclear, hand over to `idei-generate`, which asks ten context questions in one message and fills unanswered ones with labeled assumptions.
   - **The user brings their own idea.** Create a record from `${CLAUDE_PLUGIN_ROOT}/templates/idea.md` (status `draft`, empty `origin`, `language` set to the user's language) and hand it to `idei-check`.
   - **Continue an existing one.** By status: `draft` and `checking` go to `idei-check`; `approved`: say that next, optionally, come the spec and test cases (`idei-spec`), then the implementation prompt (`idei-prompt`); `rejected` and `parked`: show the reason from `check.md` and offer to return to the idea or start a new one.
3. **Statuses.** `draft → checking → approved | rejected | parked`. Only `idei-check` sets `approved`, `rejected` or `parked`, from the step 8 decision. Never start the spec, cases or prompt for an idea that is not `approved`: explain that a check comes first and offer it.
4. **Names and dates.** Idea folder `ideas/<slug>/`, slug in Latin letters with hyphens from the title. Use today's date from the environment.
5. **Calling other skills.** Through the Skill tool; the full names in the plugin are `idei-skills:idei-generate`, `idei-skills:idei-check`, `idei-skills:idei-spec`, `idei-skills:idei-prompt`.

Catalog layout: approaches `catalog/approaches.md`, steps `catalog/steps.md`, methods `catalog/methods/<id>.md`, method list `catalog/methods-index.md`, reminders `catalog/extras.md`.
