# Implementation Plan: Endless Food Feed — Scroll and Act

**Spec**: [spec.md](./spec.md) · **Created**: 2026-09-21 · **Status**: approved for build

Authority for anything not settled here: `.specify/memory/constitution.md`
(v1.0.0), `docs/art-style-guide.md` (v1 "Doomfeed"),
`docs/progression-spec.md` (v1 "The Pull").

## Constitution check

| Principle | How this plan complies |
|---|---|
| I — Originality | Fictional platform, format-only homage. All art is hand-authored SVG in-repo. No real names anywhere, including identifiers and filenames. |
| II — Lane scope | `engineer` owns everything under `src/` except `src/assets/`; `graphics` owns `src/assets/`; `tester` owns `tests/` and runs verification. |
| III — Bounded cycles | One phase, independently mergeable, leaves a playable game. No abstractions for phases not yet specified — in particular, no escalation ramp. |
| IV — One issue | Parent tracking issue per phase. Per-task issues deliberately skipped this round; see Deviations. |
| V — Verify | `npm run build` and `npm run check` clean, plus a browser run against the dev server. Not done until all three pass. |

## Stack

TypeScript (strict) + React 18 + Vite 5. No router, no state library, no CSS
framework, no UI kit, no animation library. Runtime dependencies: `react`
and `react-dom` only.

Justification for the emptiness: every one of those would be an abstraction
bought for a phase that has not been specified. A single full-screen list
with one interaction does not need a router or a store.

## Module contracts

These are the seams between lanes and between phases. Everything else is
implementation detail and may change without a plan amendment.

### `src/feed/types.ts` — the schema every other lane writes against

```ts
export type Tag =
  | 'noodles' | 'cheese' | 'dessert' | 'cursed'
  | 'healthy' | 'meat' | 'drink' | 'breakfast';

export interface Post {
  id: string;            // unique per served post, stable while retained
  artId: ArtId;          // key into the art registry owned by `graphics`
  tags: Tag[];           // at least one; tags[0] is primary
  handle: string;        // fictional creator handle, PLACEHOLDER
  caption: string;       // PLACEHOLDER copy
  sound: string;         // fictional audio credit line, PLACEHOLDER
  baseLikes: number;     // inflated social proof, displayed not simulated
  sponsored: boolean;    // renders the `zest` treatment
}

export interface SessionState {
  seen: number;
  engaged: ReadonlySet<string>;   // post ids
  affinity: readonly Tag[];       // last 5 engaged primary tags, FIFO
}
```

State not in `SessionState` does not exist (progression spec, State
vocabulary). Nothing is written to `localStorage`, `sessionStorage`,
IndexedDB, cookies, or the network — FR-008 is absolute.

### `src/assets/index.ts` — the art registry, owned by `graphics`

```ts
export type ArtId = string;
export interface ArtEntry { id: ArtId; tags: Tag[]; Component: React.FC }
export const ART: readonly ArtEntry[];
```

`graphics` adds entries; `engineer` never edits this file. Each SVG is
9:16, viewBox `0 0 1080 1920`, uses only palette tokens, contains no text.

### `src/feed/generator.ts` — the loop

Pure functions, no React. This is where the progression spec is enforced
and where `tester` will point:

- `nextPost(state, history): Post`
- Serves an affinity-matching post with probability 0.6, off-affinity
  otherwise, and **hard-guarantees at least 40% off-affinity over any
  20-post window** (reachability invariant 1).
- **No artId repeats within 20 posts** (reachability invariant 2).
- After an engagement, **at least 2 of the next 5 posts share a tag** with
  the engaged post (SC-004, FR-010).
- Depends on nothing but its arguments, so all three invariants are unit
  testable without a browser.

## Rendering approach

Each post is exactly one viewport tall (`100dvh`) in a `scroll-snap-type:
y mandatory` container. Because every row is the same known height, the
list is windowed with pure arithmetic rather than a measurement library:

- Container height = `count * 100dvh`, via a single spacer.
- Render only indices `active ± 3`, absolutely positioned at
  `index * 100dvh`.
- Retain at most **200** posts; drop from the front. FR-012 holds "for as
  long as they are retained", and 200 posts is far past any session the
  success criteria measure.

This is what satisfies SC-002 (scrolling at post 200 feels like post 1)
without a virtualisation dependency.

`prefers-reduced-motion` disables the like-pop scale and any media drift,
and never disables scrolling itself.

## File layout

```
index.html
package.json  tsconfig.json  vite.config.ts  eslint.config.js
src/
  main.tsx  App.tsx
  styles/tokens.css        # the 8 palette tokens, radii, gradient — single source
  styles/global.css
  feed/types.ts  feed/corpus.ts  feed/generator.ts  feed/useFeed.ts
  components/Feed.tsx  PostCard.tsx  ActionRail.tsx  PostMeta.tsx
  components/TopTabs.tsx  BottomNav.tsx  Icon.tsx
  assets/index.ts  assets/posts/*.tsx  assets/avatars/*.tsx     # graphics only
tests/generator.test.ts     # the three invariants
```

`src/styles/tokens.css` is the only place a colour literal may appear.
An asset or component with a raw hex is a review failure — that is what
makes art-style-guide anchor 1 mechanically checkable.

## Placeholder copy (FR-005)

Every caption, handle and sound line is prefixed so it cannot be mistaken
for finished writing, and the corpus file carries a header saying so. The
`writer` lane replaces this wholesale (#2); nothing downstream may depend
on its content, only on its shape.

## Verification

1. `npm run check` — eslint + `tsc --noEmit`, zero warnings.
2. `npm run build` — clean production build.
3. `npm test` — the three generator invariants.
4. Browser run at 390×844 and at desktop width: scroll, engage, scroll
   back, confirm the engaged state survives and a response appears.

A lane reporting "done" without all four is not done (Principle V).

## Deviations from the standard pipeline, recorded rather than hidden

- **`speckit-clarify` was not run.** Its two questions were answered
  directly under the build authorization in decision 0007, and written
  into the spec. The step would have asked exactly those two questions.
- **`speckit-tasks` and `speckit-taskstoissues` were skipped.** One
  parent tracking issue covers phase 1 instead of ~20 per-task issues
  filed and closed within a day. This is a deliberate trade against
  Principle IV for a single-session build, and it is recorded here so it
  is a visible choice. It should not become the habit; phase 2 runs the
  full pipeline.
