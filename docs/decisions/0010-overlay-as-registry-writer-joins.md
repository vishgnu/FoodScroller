# 0010: The overlay is a registry, and `writer` joins with two dispatches

Date: 2026-09-22
Status: decided
Kind: product + process
Issue: #7

## Context

Phase 2 is the dark-pattern teaching overlay — the answer to the known
design risk carried from 0006 and phase 1's spec: *satire of compulsion
that successfully creates compulsion is indistinguishable from its
subject unless something makes the seam visible.* The overlay is the
seam.

Two questions had to be answered before anything could be specified, and
both were the user's: the autonomy grant recorded in 0007 was scoped to
phase 1's build and closed when #8 merged.

**1. Ordering.** #4's roadmap had phase 2 as the escalation curve.
Putting the overlay second moves the curve to phase 3, and an overlay
that labels dark patterns needs dark patterns to label. Phase 1 ships a
thin syllabus.

**2. Roster check** (the rule from 0006 — every phase boundary asks the
lane question). The overlay's text *is* the product: a label and an
explanation per pattern, written to teach, in a register unlike the
satire post copy, which is still placeholder from phase 1.

## Decision

**1. Option C — the overlay ships now, built as a registry.** Not a
screen. A dark pattern cannot be added to the game without declaring
itself: its id, its label, its explanation, and the element it anchors
to. Every later phase extends the syllabus by construction rather than
by someone remembering to.

Rejected: option A (overlay now, no registry) because the course
material can then silently fall behind the game; option B (escalation
curve first) because it leaves the seam invisible for another full
phase, and the seam is the thing 0006 flagged as a requirement rather
than a nice-to-have.

**2. `writer` joins, with two separately-scoped dispatches.**

- **Dispatch 1 — the teaching copy.** One label and one explanation per
  registered pattern. This carries the entire educational value of the
  artifact.
- **Dispatch 2 — the satire copy.** Replacing phase 1's visibly-marked
  placeholder post copy wholesale, against the corpus constraints
  recorded in 0009 (81 artId-declaring templates; the off-affinity pool
  must stay deeper than 20).

Two briefs rather than one because the registers are opposites — one
teaches plainly, the other performs the nonsense being taught about, and
a single brief would have to hold both voice targets at once.

This is not a reversal of #2. Option B, as accepted there, already said
`writer` joins in milestone 2 and replaces the placeholder copy; 0007
recorded B but softened the timing to "when the lane joins". This
ratifies the timing per 0006's roster-check rule.

`docs/tone-and-voice-guide.md` is copied at `writer`'s first dispatch,
per the constitution's rule that a lane's guide is copied when the lane
is first dispatched and never earlier.

## Consequence

Lanes in play: `pm`, `engineer`, `game-design`, `graphics`,
`art-director`, `tester`, **`writer`**. Still out: `sound`, `devops`,
`infrastructure`. Constitution amended to 1.0.2 (PATCH — the roster list
is a statement of fact about the current milestone, not a principle).

The registry is a constraint on every future phase, not just this one:
escalation, streaks, intermittent reinforcement, notification pressure
and ads all arrive already owing a label and an explanation. That is the
point — it turns "how not to do addictive design" into an enforced
property of the codebase: **if it manipulates, it is labelled.**

The escalation curve moves to phase 3. Phase 2's syllabus is thin by
construction and that is accepted; the registry is what stops it staying
thin.

Phase 2 owes the **full** Spec Kit pipeline — specify → clarify → plan →
tasks → analyze → taskstoissues, with per-task sub-issues. The shortcut
phase 1 took was recorded in `specs/001-endless-food-feed/plan.md` as a
single-session trade and explicitly not a precedent.
