# 0011: Spec 001 accepted on an informal playtest

Date: 2026-09-22
Status: decided
Kind: product
Issue: #6

## Context

Phase 1 merged (#8), and the three follow-up defects merged (#16). Every
functional requirement FR-001..FR-015 is met and verified. Five of ten
success criteria were machine-verified; the other five — SC-003, SC-005,
SC-006, SC-007, SC-009 — were written to need human judgement and were
left open on purpose.

SC-006 is the one the phase was designed around: *in an unprompted
playtest, a majority of testers scroll past 50 posts before stopping of
their own accord.* It is the thesis from 0006 — addicted by utter
nonsense — made falsifiable.

The user played the build and reported it looked good, then instructed
the project to proceed.

## Decision

**Spec 001 is accepted and phase 1 is closed.**

## Consequence

**What this acceptance actually rests on, stated plainly so nobody later
reads it as more than it is:** one person, who had watched the thing being
built, playing it once. SC-006 as written asks for a *majority of several
testers*, *unprompted*, none of whom know what the feed is trying to do.
That test has not happened, and this entry is not a claim that it passed.

The gap matters in one specific direction. A build's own author is the
single worst judge of whether it pulls a stranger forward, because they
cannot un-know what the next post is for. The criterion was written that
way deliberately, and it is being satisfied informally rather than as
specified.

That is a legitimate call — the signal was positive, the cost of a formal
playtest is real, and phase 2 is waiting. It is recorded here rather than
quietly rounded up to "SC-006 passed", because the next phase builds a
teaching overlay whose entire premise is that the feed *is* compulsive. If
that premise is wrong, this is the entry that says where the belief came
from.

SC-003, SC-005, SC-007 and SC-009 are likewise unverified and carry the
same caveat.

**Recommendation carried forward:** run the real playtest before phase 2
ships, not before it starts. `npm run playtest` strips the placeholder
markers so the copy does not break immersion. If a majority of strangers
do not pass 50 posts, the overlay is labelling a compulsion loop that does
not compel, and that is worth knowing while the overlay is still cheap to
change.
