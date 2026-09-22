# 0012: The constitution permits accounts, a backend and saves

Date: 2026-09-22
Status: decided
Kind: product
Issue: https://github.com/vishgnu/FoodScroller/issues/17

## Context

Decision 0011 landed the Azure reference platform while recording that it
contradicted the constitution's *Runtime/deployment* clause — "No backend,
no network requests at runtime, no accounts, no analytics… nothing is
written to storage of any kind." #17 put three options to the owner:
strip the platform to hosting only (A), amend the constitution (B), or
defer (C). The recommendation was A. The owner chose **B**.

## Decision

Amend the constitution rather than the platform. `.specify/memory/constitution.md`
goes to **2.0.0** — a MAJOR bump, because this is a backward-incompatible
redefinition of a ratified constraint, which the Governance section
requires. The *Runtime/deployment* clause now permits the shared platform
in `docs/platform-guide.md`: sign-in against a consumer identity tenant,
one serverless API shared across games, player-save and large-asset
storage behind it, and telemetry. The *Stack* clause's "no backend at this
stage" is amended in step.

Four rules bind that permission and were added with it, so the amendment
widens what is allowed without discarding what the original clause was
protecting:

1. **Free tier is the budget** — every service inside a permanent free
   grant; leaving it is a numbered decision.
2. **No stored credentials** — managed identity for the API, workload
   identity federation for CI, no real identifier in the repo.
3. **Everything additive fails soft** — the feed stays fully playable with
   no network and no account; sign-in, saves and telemetry never block,
   error or gate content.
4. **Telemetry is bounded** — no post content, no dwell or engagement
   trace, nothing identifying a player beyond an explicit opt-in. A satire
   of engagement instrumentation does not get to instrument engagement.

Rule 4 is the one the owner did not ask for. It is included because #7's
teaching overlay is the project's thesis, and shipping unbounded analytics
underneath it would undercut the work rather than extend it. It is a
constraint on *how* telemetry is used, not a partial refusal of option B —
the platform lands whole.

## Consequence

- Phase 1 was built and shipped against "no storage of any kind."
  `src/feed/`, the feed schema in `src/feed/types.ts`, and the spec
  baseline in `specs/001-endless-food-feed/` all assume a session that
  cannot persist. Revisiting them is `engineer`'s, tracked separately.
- Browser storage stays off-limits. Saves go through the platform API, not
  `localStorage`. `CLAUDE.md`'s project-specific rule is amended to say so
  rather than deleted.
- `docs/platform-guide.md` still has 14 unresolved `[brackets]` and is
  still not a ratified spec. The `infrastructure` lane remains blocked on
  the owner filling them; this decision unblocks the *question*, not the
  guide.
- The three workflows still fail at `azure/login` on every push. That is
  unchanged by this decision and tracked separately.
- The constitution's own no-backend posture is gone permanently. Returning
  to it would be another MAJOR bump, not a revert.
