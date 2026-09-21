# 0002: Stack is Phaser 3 + TypeScript on Vite

Date: 2026-09-21
Status: decided
Kind: product
Issue: —

## Context

The constitution's Stack constraint was an open bracket, and no lane can
be dispatched without it — `engineer` cannot scaffold a toolchain and no
other lane knows what schema it writes content against.

## Decision

TypeScript with **Phaser 3**, bundled by **Vite**. No backend at this
stage.

## Consequence

Phaser was chosen over a plain React/DOM app with the trade-off stated up
front: a feed-scrolling, choice-driven game is UI- and text-shaped, which
is React's strength, and Phaser's scene/sprite/physics machinery earns
less of its keep there. Accepted deliberately — Phaser gives one
consistent rendering and asset pipeline for the illustrated feed content
that `graphics` produces, and scene management for the shell around it.

The cost to watch for: text layout, scroll inertia and accessibility are
hand-rolled in canvas rather than free from the browser. If milestone 1
shows that cost dominating, revisit here rather than drifting into a
half-DOM hybrid.

Pinned versions and tsconfig strictness remain open — `engineer` records
them in the constitution when the toolchain lands.
