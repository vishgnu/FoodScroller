# Progression spec — v[N] "[short name for this game's structure]"

This is the canonical spec for [project]'s progression — what gates what,
which state each gate reads, how a player gets from a fresh start to a
resolution, and which resolutions exist. It is kept separate from the
`game-design` agent definition on purpose: this doc is the swappable part.
If the structure is reworked later, this file gets re-versioned and every
gate, path and resolution gets a pass against it, while that agent's
*process* rules (file scope, tooling, handoff) keep working unchanged.

**Precedence:** if this doc and an agent definition disagree, this doc
wins for anything about *what the game's progression should be*; the agent
definition wins for *where files live* and *what tooling is allowed*.

Status: **[current design | draft | superseded by vN]** — [one line on how
this version was arrived at, and which existing content implements it].

Bump the version whenever a rule below changes in a way that would make
existing progression data wrong; the bump is what produces the list of
gates and resolutions that need re-checking.

## The progression model

[Name the shape this game's structure takes, before anything else: a
dependency graph, a level or chapter sequence, runs plus meta-progression,
a tech tree, an ability ladder, an economy curve — or a combination. Then
its size, and how much is open at once versus strictly ordered.]
Everything below is written in the vocabulary this section establishes;
without it the gates are ones nobody can place relative to each other.

## Gates

[Every kind of thing that blocks progress here and what opens it: an item
held, a prerequisite solved, a threshold reached, a choice taken, a
currency spent, a boss beaten, a run survived. Then the convention for
expressing a gate in this project's data — condition form, how multiple
requirements combine, whether gates are one-way.] State the convention
once, so gates are checkable mechanically rather than read one by one.

## The state vocabulary

[The flags, counters, inventory entries, unlocks and records the gates key
off — each one's name, what it means, what writes it, what reads it.] This
must correspond to the state schema the `engineer` lane owns: a gate may
only key off state that exists there *and* that something actually sets. A
gate keyed on state nothing ever writes is a dead gate — it never opens,
or opens immediately, and nothing errors. A name the schema lacks is a
handoff, not a fact this doc can assert alone.

## Reachability invariants

[What must hold for every legal sequence of player actions, not just the
intended one: which resolutions stay reachable from a fresh start, which
resources stay recoverable or are made unspendable, which transitions are
one-way and what must happen first.] Unwinnable states and softlocks are
the defect class — a consumable spent on the wrong door, a one-way
transition before a required pickup, a bankrupt economy. Write each
invariant so it can be traced against the data and falsified.

## Resolution conditions

[Every terminal or milestone state reachable — endings, win and lose
states, run outcomes, score or rank thresholds — and the exact condition
firing each, in the vocabulary above. For each: whether it ends the
session or is a beat that gates later content, and which wins when
several hold at once.] Ambiguous priority between simultaneously
satisfied resolutions is a real bug; settle it here, not in the runtime.

## Outcome variety

[How much the resolutions should differ, and along which axes — what the
player did, carried, sided with, how efficiently they finished, what they
left behind — and what distinguishes each from its nearest neighbour.]
Worth aiming at on a narrative project: outcomes are worth having when
they differ meaningfully from one another rather than being a win/lose
binary with a swapped adjective — different in what they say happened and
why. A score- or run-based game may reasonably leave this blank.

## Pacing and difficulty intent

[The shape the experience should have over time: how long a full path or a
single run takes, where difficulty peaks and relents, how fast the game
opens up, how much failure is expected, and what the first and last ten
minutes should feel like.]

## Known risks

[The places in *this* game's structure most likely to produce a softlock,
a dead gate, or an unreachable outcome: each entry names the structure at
risk, the failure it would produce, and the check that catches it.] Add an
entry whenever a trace or a playtest turns one up: the sections above say
what should be true, this one where it is most likely not to be.

## What this doc does not cover

Process rules — file scope, allowed tooling, where progression and
resolution data live, how a design pass is handed off — live in the agent
definitions, not here. The state *schema* belongs to `engineer` and any
outcome's prose to `writer`; this doc names the state a gate reads and
what an outcome must convey, never field types or text. It should be
replaceable wholesale without touching any of them.
