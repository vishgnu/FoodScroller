# 0008: Fictional platform, recognisable format

Date: 2026-09-21
Status: decided
Kind: product
Issue: #1, #3

## Context

#1 asked what is being satirised and how close it gets, with three
options: A (fictional platform, recognisable format), B (real platforms
named in text), C (full pastiche with recognisable branding).

The user's direction: *"I want it to look like a mix of YouTube Shorts,
TikTok and Insta. So all addicted teens will relate. Will be great for the
development course on how not to do social media and addictive design."*

## Decision

**Option A, and the word that decides it is "mix."**

A mix of three platforms is, by construction, none of them. What is shared
across all three is the *interface grammar* — full-bleed vertical posts,
snap scrolling, a right-hand engagement rail, creator handle and caption
bottom-left, a persistent bottom tab bar. That grammar is the thing a
teenager recognises in half a second, and it belongs to no one.

So: the platform in the game is fictional and unnamed-by-any-real-name.
No wordmark, no logo, no app icon, no signature colour pair, no real
platform name in art, copy, identifiers, filenames or commits. No real
people, no real businesses, categorically.

**Provenance, resolving #1's third sub-question:** no generative image or
audio tooling is used at all. Every asset is hand-authored SVG committed
to this repository, so provenance is the source file and its diff. This is
the strictest available position and it is chosen because it makes the
question disappear rather than manage it.

**The stated purpose changes the brief, not just the context.** The game
is teaching material for a course on how *not* to do social media and
addictive design. A demonstration of dark patterns has to be legible as
one — which is the "seam" problem recorded in 0006 and in the phase 1
spec, arriving with its own answer attached.

Recorded in `docs/art-style-guide.md` v1 "Doomfeed", which makes all of
this checkable rather than aspirational, and in Constitution Principle I,
now ratified at v1.0.0.

## Consequence

`graphics` and `art-director` are unblocked. #1 and #3 close.

The user's direction reads as a *relaxation* of the satire boundary
("look like the real thing") and is implemented as the opposite — the
recognisability lives entirely in the format, which costs nothing
comedically, while the brand surface is ruled out entirely. If the
intended reading was closer to option B or C, this is the entry to
reverse, and it should be reversed before any art is produced rather than
after.

The course framing gives the seam problem a direction it did not have:
the dark patterns should be demonstrable, not merely present. What that
looks like in the product is phase 2's question. Phase 1 establishes the
pull, because there is nothing to demonstrate in a feed nobody is drawn
into.
