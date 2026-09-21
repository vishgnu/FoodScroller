# Progression spec — v1 "The Pull"

This is the canonical spec for FoodScroller's progression. It is kept
separate from the `game-design` agent definition on purpose: this doc is
the swappable part.

**Precedence:** if this doc and an agent definition disagree, this doc
wins for anything about *what the game's progression should be*; the agent
definition wins for *where files live* and *what tooling is allowed*.

Status: **current design** — arrived at from decision 0006 (the feed is
endless) and the phase 1 spec, `specs/001-endless-food-feed/spec.md`.

## The progression model

**There is no progression graph. There is one reinforcement loop.**

The shape is a single variable-reward loop over an unbounded sequence.
Nothing unlocks, nothing is earned, nothing is completed. What changes
over a session is only *what the feed serves you*, and it changes in
response to what you engaged with — never in response to time, score, or
position.

Size: unbounded. Everything is open at once because there is nothing to
open.

This is a deliberate structural joke. A progression spec for a game with
no progression is the point: the format promises advancement and delivers
recurrence, and the design document is where that is easiest to see.

## Gates

**None.** No content is locked. No state gates any other state.

This section exists to say so explicitly, because a blank gates section
reads like an omission and this is a decision. Any future proposal to add
a gate is a change to this document first.

## The state vocabulary

All state is session-local and discarded when the tab closes (decision
0006, spec FR-008).

- **`seen`** — how many posts have passed. Used for nothing that changes
  the feed in phase 1; recorded so later phases have it.
- **`engaged`** — the set of post ids the player has engaged with. Drives
  the post's own engaged appearance, and nothing else.
- **`affinity`** — a short, decaying window of the **tags** carried by
  recently engaged posts. This is the only state that changes what the
  feed serves. Window: the last 5 engagements. Older ones fall out
  entirely rather than fading to a weight.

`affinity` being a short window rather than an accumulating profile is
load-bearing. An accumulating profile is a progression system wearing a
disguise, and it would make the feed converge instead of churn. Churn is
the mechanic.

## Reachability invariants

There is no path to guarantee, but there are two properties the feed must
hold, and both are testable:

1. **No tag can capture the feed.** At least **40%** of served posts must
   fall outside the current `affinity` window, always. A feed that
   collapses to one topic stops being a feed and becomes a search result.
2. **No post repeats within 20 posts.** Recurrence is the joke; visible
   repetition is a bug.

## Resolution conditions

**None.** No win, no loss, no ending, no run boundary, no score to beat.
The session ends when the player closes the tab, and nothing in the game
acknowledges that this happened.

This is deleted rather than deferred (decision 0006). A later proposal to
add an ending is a redesign, not a feature.

## Outcome variety

Not applicable — there are no outcomes. The variety that matters is
*within* a session: what the feed serves, how quickly it reacts, and
whether the reaction is legible.

## Pacing and difficulty intent

There is no difficulty. There is pacing, and in phase 1 it is
deliberately **flat**:

- The feed serves at a constant register. Nothing escalates.
- One engagement produces one visible response within **5 posts**
  (spec SC-004).
- Elapsed time changes nothing (spec FR-011).

The escalation curve — how nonsense compounds the longer you stay — is
**phase 2's**, and phase 1 must not pre-empt it by hard-coding a ramp.
Phase 1 establishes the flat baseline that a curve is later measured
against. Without the baseline there is no way to tell escalation from
noise.

## Known risks

- **Degenerate feed collapse.** `affinity` pulls everything toward one
  tag and the feed becomes monotonous. *Caught by* reachability invariant
  1, which is a testable ratio, not a judgement call.
- **Accumulating state creeping in.** Someone adds a counter that
  persists across the window "because it's useful", and the feed quietly
  gains a progression system. *Caught by* the state vocabulary above
  being exhaustive: state not listed here does not exist.
- **The seam problem.** Recorded in decision 0006 and in the phase 1
  spec's Known Design Risk: satire of compulsion that successfully
  creates compulsion is indistinguishable from its subject unless
  something makes the seam visible. Phase 1 establishes the pull and does
  not answer this. It is an outstanding requirement on a later phase, and
  it is a progression question rather than a writing or art one, because
  the answer is about what the loop *does*.

## What this doc does not cover

Process rules — file scope, tooling, handoff — live in the `game-design`
agent definition, not here.
