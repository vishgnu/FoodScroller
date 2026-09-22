# 0005: Stack is React + TypeScript on Vite — supersedes 0002

Date: 2026-09-21
Status: decided
Kind: product
Issue: —
Supersedes: [0002](0002-stack-phaser-typescript.md)

## Context

0002 chose Phaser 3 and named its cost explicitly: in a feed-scrolling,
text-heavy game, scroll inertia, text layout and accessibility are all
hand-rolled in canvas rather than free from the browser, and Phaser's
scene/sprite/physics machinery earns little of its keep. That cost was
accepted at the time as the price of one consistent asset pipeline.

Re-examined before any code was written. Two things moved it:

1. The premise (0001) is a *feed*. Scrolling a list of text-and-image
   posts is the single thing the DOM does best and the thing a canvas
   framework makes hardest. The mismatch is not incidental to the game;
   it is the game's core interaction.
2. The phase roadmap (#4) put "does a canvas feed feel right to scroll"
   as the risk phase 1 existed to retire. A risk that only exists because
   of a tool choice is an argument against the tool, not a phase.

## Decision

**TypeScript with React, bundled by Vite.** No game engine. No backend at
this stage. The feed is DOM.

The hybrid option — DOM feed with Phaser for set pieces — was considered
and rejected: it pays both toolchains' costs to hedge a bet the project
has not needed to make, and it is precisely the half-DOM drift 0002's
Consequence section warned against.

## Consequence

Native scroll momentum, text layout, text selection, keyboard navigation
and screen-reader semantics come free rather than being built. React's
render model suits a feed that mutates in response to player choices,
which is phase 3's whole mechanic.

Given up: sprite batching, a scene graph, and built-in physics. If a
later phase wants a real-time set piece, it is a new decision at that
point, argued on its own merits — not a reason to carry an engine now.

Phase consequence: phase 1 in #4 loses most of its justification, since
its risk was a Phaser risk. Phases 1 and 2 should probably merge. That is
a scope call and is raised on #4 rather than settled here.

`graphics` is affected: assets are now DOM images in a responsive layout
rather than sprites on a fixed canvas, which changes the resolution and
aspect rules in `docs/art-style-guide.md` (#3) before that guide is
filled in. Answering #3 after this reversal rather than before is the
lucky ordering, not a near miss.
