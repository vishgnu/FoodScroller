# 0004: One constitution, at the Spec Kit path

Date: 2026-09-21
Status: decided
Kind: process
Issue: —

## Context

Two constitution files landed in the repo from two different sources: the
Spec Kit scaffold wrote `.specify/memory/constitution.md`, and the lane
kit's `project-setup` scaffold writes `docs/constitution.md`. The
`speckit-*` skills read and amend the former; the lane agent definitions
point at the latter. Left alone, the two would drift and each half of the
toolchain would be held to a different document.

## Decision

Merge into a single file at **`.specify/memory/constitution.md`**, the
Spec Kit path, carrying the lane kit's richer content. `docs/constitution.md`
is deleted. `CLAUDE.md` points at the surviving path.

## Consequence

`speckit-constitution` keeps working unmodified, since the merged file
retains the headings and version line it expects. The trade-off is that
the constitution no longer sits beside the other project docs in `docs/`,
so `CLAUDE.md` is the only thing pointing a lane at it — that pointer must
not be broken.

Worth feeding upstream to the kit: any project that runs both Spec Kit
and this lane roster hits this collision on day one.
