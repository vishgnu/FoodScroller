# Decisions log

Short, dated records of decisions made on this project — not a design
document, just "what we decided and why," so the reasoning survives even
after the GitHub issue that raised it is closed.

## Two kinds of decision

- **Product decisions** — what this game is and does: scope calls, creative
  direction, mechanics, hosting, schema shapes. They belong here and nowhere
  else; they are specific to this project.
- **Process decisions** — how the team of agents works: a lane's scope
  changing, a new lane existing at all, an orchestration or verification rule
  that turned out to be wrong. These belong here too, but they are also the
  ones worth feeding back upstream into the kit, since a process rule learned
  the hard way on one project is a rule every later project gets for free.
  Tag them so they are easy to find later, and when one has proven itself,
  open an issue against the kit rather than leaving it buried in this log.

## Convention

- One file per decision: `NNNN-short-title.md`, numbered sequentially.
- Filed by `pm` when an open question (tracked as a GitHub issue) gets
  resolved, or by anyone when a decision is made in conversation and
  should be recorded.
- Keep it short — a paragraph of context, the decision, and the
  consequence/trade-off. Link the GitHub issue it closes, if any.

## Template

```markdown
# NNNN: <title>

Date: YYYY-MM-DD
Status: decided
Kind: product | process
Issue: <link, if one existed>

## Context

What question or problem prompted this.

## Decision

What was decided.

## Consequence

What this rules in/out, or what it costs.
```
