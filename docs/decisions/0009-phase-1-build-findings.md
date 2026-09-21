# 0009: Four conflicts the phase 1 build surfaced

Date: 2026-09-21
Status: decided
Kind: product + process
Issue: #6

## Context

Building phase 1 against the spec, the plan and the two guides turned up
four places where the documents disagreed with each other or with
reality. All four were resolved during the build and are recorded here
because each one amends a document.

## Decision

**1. The 40% off-affinity floor outranks the five-post response
guarantee.** They are not jointly satisfiable above roughly one tap every
five posts — a single-tagged engaged post can only be answered by an
on-affinity post, and the floor caps on-affinity at 12 of any 20. The
floor holds absolutely; the response degrades to a strong tendency
(measured above 90% of taps answered even at 100% engagement). Recorded
in `docs/progression-spec.md`.

*Why this way round*: a feed that collapses to one topic has stopped
being a feed. A tap that goes unanswered one time in ten is
indistinguishable from the real thing being satirised.

**2. FR-012 outranks SC-004 for a post already scrolled past.** Answering
a late tap would require regenerating the queue from that post, which
would change posts the player has already seen. Seen posts stay put; the
response is served from the furthest post reached.

**3. `artId` is a corpus-declared key, not an entry in the art
registry.** "No artId repeat within 20" is unsatisfiable against a
three-entry registry. The corpus declares 81 artIds; unregistered ones
render a neutral stand-in, which is FR-003 and Story 4 scenario 3
exercised for real rather than hypothetically.

**4. Action-rail icons live in `src/components/`, not `src/assets/`.**
The art guide and the plan disagreed. The plan wins — the guide itself
defers to the agent definitions and the plan for where files live, and
the icons are interface rather than art. Guide corrected.

## Consequence

The corpus grew from the ~40 templates the brief asked for to 81, because
the no-repeat-within-20 rule needs the off-affinity pool deeper than 20
against a five-tag affinity window. That is now a written requirement in
the corpus header, so `writer` inherits the constraint rather than
discovering it.

The plan's `nextPost(state, history)` signature was insufficient — the
generator needs serve-time facts (was this off-affinity *then*, what was
engaged *then*) that cannot be recovered from a `Post[]`. The contract
name survives as a wrapper; `history` is a richer type.

The plan's windowing approach was also incomplete: a mandatory-snap
container can only stop where a snap area exists, so windowing to
`active ± 3` alone makes any long jump snap back. Fixed with lightweight
snap anchors across the retained range; the posts themselves are still
windowed by arithmetic.

Constitution amended to 1.0.1 (PATCH — pinned toolchain versions filled
into a bracket that was explicitly reserved for them, no principle
changed).

**Process note worth keeping.** All four were found by building, not by
review — `speckit-analyze` reads documents against each other and would
have caught at most the fourth. The first three needed a running browser
and a test suite. That is Principle V's argument restated: a plan is a
hypothesis until something executes it.
