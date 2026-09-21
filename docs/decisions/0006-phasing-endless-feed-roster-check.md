# 0006: Five phases, an endless feed, and a roster check at every boundary

Date: 2026-09-21
Status: decided
Kind: product + process
Issue: #4

## Context

#4 proposed a six-phase roadmap ordered by which unknown each phase
retires, and raised two scope calls inside it: whether to merge phases 1
and 2 after the stack reversal (0005) removed phase 1's reason to exist,
and whether phase 4 — run structure — exists at all.

## Decision

**1. Phases 1 and 2 merge.** The first phase ships the toolchain, the
post data schema, a scrolling feed, one illustrated post, a choice
affordance, state that records it, and one visible consequence. It leaves
a game playable, not a list scrolling. Five phases remain.

**2. The feed is endless.** No win state, no lose state, no run
resolution. The session ends when the player closes the tab. Former phase
4 (run structure) is deleted rather than deferred.

**3. The design thesis, in the user's words:** players should get
*addicted by utter nonsense, to showcase the stupidity of social media*.
Compulsion is the mechanic and the subject at once.

**4. Roster check at every phase boundary.** Each phase transition gets
an explicit decision about which lanes join, recorded here, before any
lane is dispatched. `game-design` joins now, as a consequence of the
merge; `docs/progression-spec.md` is copied with it.

## Consequence

Lanes in play: `pm`, `engineer`, `game-design`, `graphics`,
`art-director`, `tester`. Still out: `writer` (#2), `sound`, `devops`.

An endless feed means the choice system needs only local, recent state —
no durable accumulating run state, no save/resume, no ending conditions.
That is a materially smaller phase 1 than a resolving run would have
been, and it is why answering this before phase 1 rather than after
mattered.

`docs/progression-spec.md` is unusually thin for this project: with no
gates, no endings and no win conditions, what it has to specify is the
*escalation curve* — how nonsense compounds as the player scrolls — not
a dependency graph. Tracked as its own open question.

The thesis creates a design problem the spec has to answer rather than
inherit: satire of compulsion that successfully creates compulsion is
indistinguishable from the thing it satirises unless something makes the
seam visible. Recorded here so it is a known requirement, not a
late-phase discovery.
