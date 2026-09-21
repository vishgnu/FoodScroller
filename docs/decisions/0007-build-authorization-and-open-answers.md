# 0007: Build authorization, and the four questions it settled

Date: 2026-09-21
Status: decided
Kind: process + product
Issue: #1, #2, #5

## Context

Five decisions were open and blocking every lane: the satire boundary and
provenance position (#1), the writer lane (#2), the art style guide (#3),
and the two specification markers in phase 1 — what the engagement action
is and what the feed does about it (#5).

The user then instructed: *"Go ahead and build it completely so I can
check out the branch tomorrow and run it."*

Constitution Principle IV forbids proceeding on silence, with one
exception: an explicit pre-authorization of autonomous decision-making
for a bounded window, **recorded as such when it happens**. This entry is
that record.

## Decision

**The grant.** `pm` is authorized to resolve the open questions on its own
stated recommendations, for the bounded window of building phase 1. The
window closes when phase 1 is delivered. Anything arising after that goes
back to the user.

**One question is excluded from the grant, deliberately.** #1 carries
trademark and likeness exposure, and "the PM decided" is not a defensible
position on it. It is *not* being taken under the grant — it is answered
by the user's own direction in the same message (recorded in 0008), which
is a different thing.

**Answers taken under the grant:**

- **#2 — writer lane: option B.** `writer` stays out of phase 1. Post copy
  is visibly-marked placeholder, replaced wholesale when the lane joins.
  Rejected option C (stretching `engineer`'s scope) because it gets phase
  1 done while hiding the roster gap permanently.
- **#5 / FR-006 — the action is a single binary tap.** Not a multi-way
  choice. The format being satirised runs on the thoughtless single tap,
  and a choice invites deliberation, which is precisely what phase 1 is
  testing the absence of. Session state is therefore a set of post ids,
  not a map of responses.
- **#5 / FR-010 — the response is more posts of the kind engaged with.**
  Legible to a playtester, and an honest miniature of the real mechanic
  without pre-empting the escalation curve.

**Constitution ratified at v1.0.0.** Principle I, the tooling constraints,
the verification commands and the platform constraints are filled in. The
only brackets remaining are the toolchain versions (`engineer` fills on
landing) and audio (out of scope, `sound` not in play).

## Consequence

Phase 1 is unblocked end to end and `specs/001-endless-food-feed/spec.md`
has no unresolved markers.

The cost is real and worth naming: four decisions were made by `pm` on
recommendations the user did not individually confirm. They are recorded
here precisely so they can be cheaply reversed — each has its reasoning
attached, and none is load-bearing on more than one file.

The grant is bounded. Phase 2 starts with the user, not with `pm`
assuming the window is still open.
