# 0013: A proportional scrim was the wrong specification, and our instruments were blind

*Renumbered from 0010. Another lane, working in parallel, took 0010 and 0011
for the overlay registry and the platform while this entry was in flight, and
`CLAUDE.md` now cites 0011 for the platform. Renumbered on this side because
theirs is already cross-referenced and mine was not.*

Date: 2026-09-22
Status: decided
Kind: product + process
Issue: #9, #11, #12

## Context

Three defects closed after phase 1 merged. Two of them were specification
or measurement failures rather than coding mistakes, which is why they get
an entry rather than just a commit.

## Decision

**1. The scrim gets a floor.** `docs/art-style-guide.md` v1.1: the scrim
covers "the lower third, **or the caption stack's own footprint, whichever
is greater**". A third is proportional and the caption stack is not — it
has a minimum height — so at short viewports the protection shrank while
the thing needing protection did not.

A second finding earned its place in the guide: **covering the stack is
not the same as covering it with anything.** A 0→70% ramp is still near
zero where the text begins. The gradient now reaches full opacity inside
the floor and fades above it.

The floor is text-relative, so it grows with enlarged text.

**2. The fling headroom is sized in pixels, not posts.** A fling is a
pixel quantity; a post is one viewport. The same 40-notch burst is 12
posts on an 844px-tall phone and 32 on a 300px-tall landscape one, so a
fixed post count only ever protects one viewport.

**3. The stutter is fixed by deferring, not by generating less.** The
batched-lookahead theory — mine — was wrong: growth is one post per post
passed, never a chunk. The floor is the boundary state change; the
severity is the synchronous art mount.

## Consequence

Contrast at the caption stack went from **1.00:1** — literally `ink` text
on an `ink`-filled illustration, unreadable — to at worst 7.14:1 across
six viewports. That defect shipped to `main` in phase 1 and was invisible
to every check we ran.

Scroll-back history drops from 191 posts to 175, and to 132 at the
shortest viewport, because the headroom is spent out of the 200-post
retention cap. FR-012 holds ("for as long as they are retained") and the
cap itself never breached, but the number is smaller and that is a cost,
not a detail.

Frames ≥50ms fell 56% and total lost frame time 23%. Single 33ms drops
rose ~13%, because one long frame became two short ones — the right
direction, since two consecutive dropped frames read as a stutter and one
does not, but a trade rather than a free win. One dropped frame per
boundary remains (#13); removing it is architectural.

## The process finding, which outlives all three

**Both defects were invisible to checks that reported success with
confidence.**

The contrast check measured at 390×844 — the one viewport where the answer
was already good. The scroll harness drove the feed with `scrollTo` inside
a rAF loop, never exercising the input pipeline, and ran unthrottled, where
the per-post cost fits inside a frame. It reported frame times flat to
0.1ms across 4,200 frames. Under a 6× CPU throttle with real input the
hitch appears immediately.

Neither was caught by review, by the building lane, or by an adversarial
tester pass. Both were caught by **a person using the thing on a real
device**, and in the stutter's case the person contradicted our numbers and
was right.

Two rules follow, tracked in #15:

- **Measure where the answer is worst, not where it is representative.** A
  check run at the friendly case is a check that will pass.
- **A harness that cannot fail is not evidence.** Verification that does
  not reproduce real input, on realistic hardware, produces confidence
  rather than information.

This is Principle V's argument narrowed to a sharper point. The principle
says verify the running behaviour rather than trusting the code read; these
defects say verify it *under the conditions where it breaks*, or the
verification is theatre.
