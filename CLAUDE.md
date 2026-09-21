# CLAUDE.md

Orientation for Claude Code sessions working in this repo. See `README.md`
for what FoodScroller is and `specs/<n>-<name>/spec.md` (Spec Kit) for the
current scope baseline. Project principles live in
`.specify/memory/constitution.md` — the project's single constitution.

## Lanes

- The lane roster (engineer, writer, graphics, art-director, sound,
  game-design, tester, devops, infrastructure, pm) ships as the
  `gamedev-lanes` plugin, one agent definition per lane. Read the relevant
  lane's definition before doing that lane's work.
- To customize a single lane for this project, add a project-local
  `.claude/agents/<name>.md` with the same name as the plugin lane — the
  project-local file overrides the plugin's version of that lane. That is
  the supported way to adapt one lane; do not fork the kit for it.
- Lanes this project has overridden or added locally: none yet. Lanes in
  play for the current milestone: `pm`, `engineer`, `graphics`,
  `art-director`, `tester`.

## Agent Orchestration

- Keep orchestrator/PM work token-lean: delegate concrete work (builds,
  tests, verification runs, multi-file investigation, code/content edits)
  to small, single-purpose subagents rather than doing it inline in the
  main/orchestrating chat. Fold back only the subagent's short report, not
  its raw tool output, logs, or diffs. Planning — breaking work into
  tasks, reviewing/synthesizing reports, writing GitHub issues, recording
  decisions — is the exception and stays inline; see the `pm` lane
  definition's rule 9 for the full version of this rule.
- When a task doesn't cleanly fit any existing lane's scope, don't
  improvise by wedging it into the nearest one — that's a decision for the
  user (new specialist lane vs. stretching an existing lane vs. a one-off),
  so file it as a GitHub issue per the Decisions section below and proceed
  with the closest available lane only once it's resolved (or the piece is
  stubbed/deferred in the meantime). See the `pm` lane definition's rule 7.

## Decisions

- Non-trivial architectural, scope, or coverage decisions get tracked as
  a GitHub issue (title starting `Decide:`) before being acted on — lay
  out the options and a recommendation, then wait for the answer rather
  than guessing.
- Once resolved, close the issue and record it as a short entry in
  `docs/decisions/` (see that directory's `README.md` for the template
  and numbering convention) — the issue is where it got decided, the
  decisions log is the durable record of what and why.

## Editing Conventions

- Agent and skill definitions are Markdown (`.claude/agents/*.md`,
  `.claude/skills/*/SKILL.md`). Read the existing file before editing one —
  preserve its frontmatter and heading/numbering structure, and edit
  surgically rather than rewriting wholesale, since other rules
  cross-reference specific rule numbers. A wholesale rewrite silently drops
  rules and breaks those cross-references; this has actually happened, which
  is why the rule is here.
- Application code is TypeScript with Phaser 3, bundled by Vite —
  [tsconfig strictness, project-specific code rules, and the `lint command`
  to run before a change counts as done: `engineer` fills these in when the
  toolchain lands].
- Source paths by area: [engine/app code path], [content/data path],
  [asset paths], [test path] — `engineer` fills these in with the toolchain;
  no lane should write files until they are named.

## Commits

- Commit after each logically complete change (one fix, one feature
  slice, one agent-definition change) rather than batching unrelated
  changes into one commit.
- Reference the related GitHub issue in the commit body when there is
  one, so the tracker and the history stay linked.
- Every commit carries a `Co-Authored-By:` trailer naming the agent that
  produced it.
