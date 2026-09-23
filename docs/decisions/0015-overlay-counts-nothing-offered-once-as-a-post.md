# 0015: The overlay counts nothing, and is offered once — as a post

Date: 2026-09-23
Status: decided
Kind: product
Issue: #24 (and spec 002's FR-007 clarification)

## Context

Spec 002 left two questions for the owner, and they were coupled.

**How the player comes to the overlay** (FR-007). Always on would stop
the compulsion forming, leaving nothing to see. A control the player
has to find hides the seam from exactly the players who never look,
which is the failure 0006 recorded. The third option was a findable
control plus one offer from the game after a stretch of scrolling.

**Whether the overlay may measure the player** (FR-010, #24).
Constitution 2.0.0 rule 4 forbids "any dwell or engagement trace", and
0012 says the rule was written *because of* this overlay.

The PM's framing said the offer needed a posts-scrolled count, so
choosing no measurement would collapse the offer back to the findable
control alone.

## Decision

**Q1: C. A findable control, plus one offer from the game.**
**Q2: B. The overlay measures nothing about the player.**

Both answers stand, so the framing above was wrong. The offer never
needed a count:

**The offer is a post.** The feed already serves every post as the post
at a given point in its sequence. The offer is one more post at a fixed
point, placed by the same mechanism that places every food post. It
arrives at the same point for every player. Nothing about how the player
behaves (speed, dwell, taps, topics) decides whether or when it comes,
and nothing about them is shown back. Scrolling past it is all it takes
to dismiss it. It is never served again.

It arrives **after the 50th post**. That is the line spec 001's SC-006
uses to define a player the pull has caught, so the offer reaches
players once they are hooked. It also cannot contaminate the SC-006
measurement, which is taken at 50. The exact position is game-design's.

**The overlay measures nothing.** No count, no timer, no trace. It may
explain that the feed personalises itself. It may not show the player
what the feed has learned about them.

## Consequence

The strongest line the overlay could have had, *"you have scrolled 214
posts"*, is gone, and so is the case for showing the player their own
affinity state. Both were raised on #24 as the most effective teaching
available. Both are refused for the reason rule 4 gives: a satire of
engagement instrumentation does not get to instrument engagement.

**What this does not forbid:** the like's own feedback. Phase 1's heart
filling, and #10's `+1` delta, show the result of a single tap on the
post that was tapped. That belongs to the like, decided separately on
#10. It is not the overlay reporting on the player, and it is unaffected.

The offer is the one place the overlay reaches toward a player who did
not ask. It avoids being a dark pattern because it is a post rather than
a modal, it blocks nothing, it asks nothing, it arrives once and is
never repeated, and scrolling past it is the whole dismissal. Spec 002's
FR-008 and SC-009 hold it to that.

Recorded as a correction as well as a decision: the PM said the two
answers were incompatible. They were not. A cheaper reading existed and
the owner's pair of answers is what surfaced it.
