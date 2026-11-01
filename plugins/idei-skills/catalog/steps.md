# Steps

Steps 1-8: feasibility check of an idea; on rework return to step 2. The decision at step 8 sets the idea status.
Steps 9-11 run only for an approved idea and are optional: requirements spec, test cases, implementation prompt.

## Step 1 · Hypothesis

Formulate it so that it can be tested: “If [action], then [measurable result], because [assumption]”. The result is described as specific and measurable, and a hypothesis is written for each assumption of the idea, not for the idea as a whole.

- Source: https://www.producttalk.org/experiment-design/
- Step methods: n17 PICO
- Additional methods: n19 Falsifiability
- Do not forget: e1 Goal and decision

## Step 2 · Assumptions and risks

Write down the assumptions and rank them by risk. First check the one that, if wrong, kills the whole idea and for which there is no evidence.

- Source: https://www.strategyzer.com/library/how-assumptions-mapping-can-focus-your-teams-on-running-experiments-that-matter
- Step methods: r2 Assumption map; r1 Pre-mortem; i9 Reverse brainstorming
- Additional methods: v3 Discovery-driven planning
- Do not forget: e2 Idea prioritization

## Step 3 · Success criteria

The metric and the threshold of success and failure are set before the experiment. Otherwise the result is fitted to the expectation. It is useful to divide criteria into mandatory and desirable. Decide in advance what to do if the hypothesis is confirmed, refuted or the result is unclear.

- Source: https://www.producttalk.org/experiment-design/ https://www.inloox.com/company/blog/articles/product-development-with-the-stage-gate-r-process-part-3-procedure-and-structure/
- Step methods: v3 Discovery-driven planning; n19 Falsifiability
- Additional methods: v2 Stage-Gate; n20 Preregistration
- Do not forget: e5 Resources and deadlines

## Step 4 · Desk research

Literature, analogues, patents, existing solutions. Perhaps everything has already been checked before you. For patents: come up with search terms, search in USPTO, Espacenet and Google Patents, widen the search by CPC classes and check the references in the closest patents.

- Source: https://libguides.msoe.edu/patent-search/Searching
- Step methods: r3 Fermi estimation
- Do not forget: e3 Competitors and alternatives; e10 AI in research; e11 Honesty of evidence; e12 Different viewpoints

## Step 5 · Assessment: three axes

Technical: can it be built and with what risks. Economic: cost, payback, scale. User: do people need it and will they pay for or use it. Assumptions are divided into desirability (do they want it), feasibility (can it be built) and viability (will it pay off). Five kinds of feasibility: see the TELOS method.

- Source: https://www.strategyzer.com/library/how-assumptions-mapping-can-focus-your-teams-on-running-experiments-that-matter
- Step methods: r4 Technology readiness levels (TRL); v1 TELOS: five kinds of feasibility; v4 Idea evaluation cards; j2 WSR: three views; n16 FINER criteria
- Additional methods: i12 Disney method
- Do not forget: e4 Law and ethics

## Step 6 · Mini-experiment

The cheapest way to get data: a prototype, a mockup, “Wizard of Oz”, a landing page with pre-registration, a measurement on a small sample.

- Source: https://uxpajournal.org/wp-content/uploads/sites/7/pdf/JUS_Kelley_May2018.pdf
- Step methods: r5 Wizard of Oz; n18 Strong inference (Platt)
- Do not forget: e7 Reproducibility

## Step 7 · Measurement

Compare the result with the thresholds from step 3, check for bias and chance. Each conclusion is labeled by its origin, and it has a check that can fail.

- Source: https://www.statology.org/5-types-of-data-bias-and-how-to-address-them/
- Step methods: n20 Preregistration
- Do not forget: e6 Data and bias; e11 Honesty of evidence; e13 Limits of the check

## Step 8 · Decision

Continue, change direction or stop. Record the result, including a negative one. Then either iterate from step 2 or take a new idea. If the idea passes, the project outcome is a detailed spec and the main test cases for checking the implementation. The gate may also put the project on hold (hold) or send it back for rework (rework).

- Source: https://www.inloox.com/company/blog/articles/product-development-with-the-stage-gate-r-process-part-3-procedure-and-structure/
- Step methods: v2 Stage-Gate
- Additional methods: v3 Discovery-driven planning
- Do not forget: e8 Hypothesis log; e9 Stakeholders; e13 Limits of the check

## Step 9 · Requirements specification (approved ideas only)

For an idea that has passed the check: a detailed requirements document. What the system does, for whom, what the constraints and acceptance criteria are. Requirements are written to be verifiable, so that a test case can be made for each. The boundaries of the first version are described separately: what is in it and what is not (MoSCoW is suitable for this).

- Source: https://en.wikipedia.org/wiki/Easy_Approach_to_Requirements_Syntax https://en.wikipedia.org/wiki/User_story
- Step methods: t1 EARS; t2 Kano model; t3 MoSCoW; t4 User stories; t5 Use cases
- Additional methods: t6 Equivalence classes and boundaries; t7 Given / When / Then; t8 Requirements traceability

## Step 10 · Test cases (approved ideas only)

The main test cases for checking that the implementation is correct. Each requirement has a matching case, and a case has input data, steps and an expected result. The implementation is not part of the project.

- Source: https://martinfowler.com/bliki/GivenWhenThen.html https://istqb.org/wp-content/uploads/2025/10/Boundary-Value-Analysis-white-paper.pdf
- Step methods: t6 Equivalence classes and boundaries; t7 Given / When / Then; t8 Requirements traceability

## Step 11 · Implementation prompt (approved ideas only)

For an approved idea: a prompt from which the executor (an AI, a team or a contractor) can start work without your involvement. It is assembled entirely from the spec (step 9) and the test cases (step 10) and adds no content of its own, so it is rebuilt whenever those steps change. Contents: goal and context explaining why it is needed; requirements; boundaries of the first version; acceptance cases as the criterion of readiness; constraints with reasons; how to ask questions and how to report. Check: give the prompt to a person who does not know the task; if it is unclear to them, it will be unclear to the AI as well. The implementation is not part of the project.

- Source: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
