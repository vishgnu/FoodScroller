# Phase 2 working note: what phase 1 actually ships to label

Status: **working note, pre-`specify`.** Produced by `pm` on 2026-09-22 as
input to spec 002. `spec.md` supersedes this file once it exists; until
then this is the only durable record of the inventory.

> **Note for whoever runs `speckit-specify`:** this directory was created
> by hand, ahead of the skill. `speckit-specify` picks `NNN` by scanning
> `specs/`, so it will choose `003` if left to itself. Pass
> `SPECIFY_FEATURE_DIRECTORY=specs/002-dark-pattern-overlay` explicitly so
> the spec lands here rather than in a second directory.

## Why this exists

#7 states phase 1 ships **four** labellable dark patterns, and the whole
A/B/C ordering argument in that issue rests on that number — option B's
case was "the syllabus is too thin to teach against." An audit of the
merged phase 1 code found **thirteen**. The premise was wrong.

This does not reverse the decision recorded in
[0010](../../docs/decisions/0010-overlay-as-registry-writer-joins.md).
It strengthens it: option C (the registry) was chosen so the syllabus
cannot silently fall behind the game, and the syllabus was *already*
behind the game before phase 2 started. Nine patterns shipped unlabelled
and unrecorded inside a single phase. That is the failure mode C exists
to prevent, observed once already.

Every row below carries a `file:line` citation and was read against the
merged tree at `e0f3c6a`. Re-check rather than trust.

## The four patterns #7 names

| # | Pattern | Status | Evidence | Anchor |
|---|---|---|---|---|
| 1 | Infinite scroll, no stopping cue | shipped | `useFeed.ts:76-95` (`grow()` unbounded); `generator.ts:259-327` (`serveNext` always returns; L316 has no escape hatch); `Feed.tsx:118-131,156-159` (spacer `total * 100dvh`, no end marker) | `.feed` / `.feed__spacer` |
| 2 | "Variable reward" | shipped, **misnamed** | see below | `.rail__like` (trigger) + post sequence (payoff) |
| 3 | Inflated social proof | shipped | `ActionRail.tsx:19-24` (`count()`), `:30-34` (`DERIVED` fabricates comment/save/share from `baseLikes`), `:99`, `:109`; `types.ts:46-47` "displayed, never simulated" | `.rail__count` |
| 4 | Engagement-shaped feed response | shipped | `generator.ts:355-368` (`toggleEngagement` pushes tapped tag into `affinity`), `:163-237` (bias), `:34-37` (`RESPONSE_WINDOW=5`, `RESPONSE_MIN=2`); `useFeed.ts:160-182` | **none** — see anchor kinds |

### Pattern 2 is misnamed, and the overlay must not repeat the error

"Variable reward" implies a variable payout on the tap. The tap's payout
is **deterministic every time**: the heart fills and pops on every press
(`ActionRail.tsx:54-67`, `.rail__like--pop` in `global.css:453-457`).

What is actually variable is *when* the engagement's payoff arrives — a
response is guaranteed inside a five-post window but lands on a
stochastic slot within it (`generator.ts:34-37,280-284`), and which post
is served is a seeded weighted pick (`generator.ts:83-98,217-237`,
`ON_AFFINITY_P = 0.6` at L40). `docs/progression-spec.md:16-18` calls
this "a single variable-reward loop", which is where the name came from.

So it is a **variable-ratio arrival schedule**, not a variable payout.
The mechanism is real and worth teaching; the label is wrong. An overlay
that teaches a pattern inaccurately is worse than one that omits it —
the artifact's entire claim is that it explains what it is doing to you.
`writer`'s teaching-copy brief inherits this correction, and
`progression-spec.md` needs the same fix at source.

## The nine patterns #7 does not name

| Pattern | Evidence | Anchor |
|---|---|---|
| Mandatory snap removes the "where do I stop" decision | `global.css:118-119` (`scroll-snap-type: y mandatory`), `:143-151` (`scroll-snap-stop: always`); `Feed.tsx:121-128,160` | `.feed`, `.snap` |
| Ambient media drift — the screen stays alive while the player is still | `global.css:194-207` (18s `drift` loop); `PostCard.tsx:141` (active only) | `.media--drift .media__art` |
| Spinning disc implying audio that never plays | `ActionRail.tsx:113-115`; `global.css:488-491` (7s `spin`); `PostMeta.tsx:39-42` | `.rail__disc`, `.meta__sound` |
| Inert comment/save/share — false affordances that still carry counts | `ActionRail.tsx:102-111` (`rail__action--inert`) | `.rail__action--inert` |
| Decorative "Follow" `+` that does nothing | `ActionRail.tsx:71-79` | `.rail__follow` |
| Unearned "Verified" tick on every handle | `PostMeta.tsx:30-32` | `.meta__tick` |
| Decoy navigation — 4/5 bottom items and 1/2 top tabs permanently inert, so exploration always leads nowhere without ever visibly failing | `BottomNav.tsx:20-30`, `TopTabs.tsx:12-14` | `.nav__tab--inert`, `.toptabs__tab--inert` |
| No timestamps anywhere — no elapsed-time or session-duration cue | no time field in `types.ts:33-50`, `corpus.ts`, or any component | **none** — absence |
| Opaque personalization — `affinity`/`seen` steer the feed, never surfaced | `types.ts:58-65`; `progression-spec.md:44-51` | **none** — absence |

**Not a dark pattern:** sponsored posts *are* labelled (`PostMeta.tsx:26`).
That is honest disclosure. Do not register it as a pattern; registering
honest behaviour as manipulation would discredit the ones that are real.

## Constraint on the registry contract

A registry keyed one-pattern-one-element cannot hold three of the
thirteen. The anchor field needs at least three kinds:

- **element** — a DOM node exists to point at (10 of 13).
- **temporal** — a trigger element plus a manifestation that is a
  *sequence* of later posts, not a node (pattern 4).
- **absence** — the pattern *is* the missing element; the anchor is the
  place it would have been (no timestamps; opaque personalization).

The absence cases are the two most worth teaching and the two hardest to
point at. Getting them out of the contract because they are awkward
would be the registry quietly excusing itself from its own rule.

## Anchoring has almost no infrastructure yet

**Correction, same day:** an earlier revision of this note claimed there
are zero `data-*` attributes in `src/`. That was wrong when written.
`src/assets/art/Composition.tsx:67,72` carries `data-layer="field"` and
`data-layer="subject"`, documented at `:7`. Two, not zero.

The conclusion survives the correction but the reasoning changes. No
`data-pattern` anchor exists and there is nothing a registry can bind to
today, so stable anchoring still means new markup. What is different is
that `data-*` is already an established convention here rather than
something phase 2 introduces — `data-layer` is the precedent to follow,
not a pattern to invent.

Otherwise what exists is a consistent BEM-ish class vocabulary a registry
could target by selector — fragile, since a style rename would silently
unbind a label and style-only classes could match by accident.

**Anchoring is no longer blocked.** An earlier revision said it waited on
in-flight work in `Feed.tsx`, `useFeed.ts` and `global.css`. That landed
in #16. Every citation above was re-verified against the merged tree:
seven moved, no mechanism changed, no new pattern arrived, and the
thirteen still stand.

**CI now exists.** `.github/workflows/game-ci.yml` runs `npm ci` → `lint`
→ `typecheck` → `test` → `build` on every push to `main` and every PR
touching `src/`. Phase 1's gates were hand-run; phase 2's are not.

## Carried into `specify`

1. Thirteen patterns, not four — scope call on how many register in phase 2.
2. Pattern 2 renamed at source, in `progression-spec.md` and the teaching copy.
3. Anchor kinds: element / temporal / absence, in the contract from the start.
4. #10 (the `+1` invisible at millions) is plausibly this overlay's *subject*
   rather than a bug — open scope call.
5. Anchoring follows the existing `data-layer` precedent in `Composition.tsx`.
6. #13 — one dropped frame per post boundary — is postponed by the owner
   until infra exists. The overlay must not add work to the post-boundary
   path without measuring it; the known residue is already at the threshold.
7. 0014 carries a recommendation into this phase: run the real SC-006
   playtest with strangers **before phase 2 ships**. If the feed does not
   compel, the overlay is labelling a loop that does not exist.
