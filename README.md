# FoodScroller

An endless, satirical food feed. You scroll, you tap a heart, the feed
notices and serves you more of that. There is no score, no win, no lose,
and no ending — the session stops when you close the tab, and the game
does not acknowledge that it happened.

It is built as teaching material for a course on **how not to do social
media and addictive design**: the dark patterns are real, they work, and
the point is to be able to name them.

## Run it

```bash
npm install
npm run dev
```

Open the printed URL. Best viewed at phone size — 390×844 in devtools, or
an actual phone.

```bash
npm run check    # eslint + tsc --noEmit
npm run build    # production build
npm test         # feed generator invariants
```

## Where things are

| | |
|---|---|
| `CLAUDE.md` | Orientation for anyone (or anything) working in this repo |
| `.specify/memory/constitution.md` | The principles this project is held to |
| `docs/decisions/` | What was decided and why, one file per decision |
| `docs/art-style-guide.md` | v1 "Doomfeed" — the look, as checkable rules |
| `docs/progression-spec.md` | v1 "The Pull" — the loop, and why there is no progression |
| `specs/001-endless-food-feed/` | Phase 1's spec and plan |

## Status

**Phase 1** — the endless feed and the engagement loop. In progress.

**Phase 2** — the dark-pattern teaching overlay: every manipulation in the
game labelled and explained on screen. Tracked in issue #7.

Later: the escalation curve, real written copy, hosting.

## A note on what this satirises

The platform in this game is fictional. It borrows the *interface grammar*
of vertical short-form feeds — full-bleed posts, snap scrolling, an
engagement rail — because that grammar is what makes it recognisable in
half a second. It borrows nothing else: no real product name, no logo, no
signature colour scheme, no real people, no real businesses. See
Constitution Principle I.

All art is hand-authored SVG in this repository. No generative tooling.
