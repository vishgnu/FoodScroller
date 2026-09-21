# 0003: Lanes in play for milestone 1

Date: 2026-09-21
Status: decided
Kind: process
Issue: —

## Context

The `project-setup` skill copies a lane's spec guide when that lane is
first dispatched, never earlier — a guide full of brackets is read by a
lane as the decision. So the lane roster has to be named before the
guides are copied.

## Decision

In play: `pm`, `engineer`, `graphics`, `art-director`, `tester`.
Not in play: `writer`, `sound`, `game-design`, `devops`,
`infrastructure`.

Consequently `docs/art-style-guide.md` is copied now;
`docs/tone-and-voice-guide.md`, `docs/audio-direction-guide.md` and
`docs/progression-spec.md` are not.

## Consequence

No audio and no formal progression/gating spec in milestone 1. The
`writer` exclusion sits awkwardly against decision 0001 — a satire is
made of its writing — and is tracked in #2 as an open question rather
than settled here. The copied art style guide is fully bracketed and
blocks both art lanes until #3 is answered.
