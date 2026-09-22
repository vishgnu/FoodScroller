# Art style guide — v1 "Doomfeed"

This is the canonical spec for FoodScroller's visual identity — what a
post, an avatar, or an icon has to look like to belong in this game. It is
kept separate from the `graphics` and `art-director` agent definitions on
purpose: this doc is the swappable part.

**Precedence:** if this doc and an agent definition disagree, this doc
wins for anything about *how the art should look*; the agent definition
wins for *where files live* and *what tooling is allowed*.

Status: **current style** (v1.0.1 — icon location corrected) — arrived at from the user's direction ("a mix
of YouTube Shorts, TikTok and Insta, so addicted teens relate") read
against Constitution Principle I. The canonical reference assets are the
hero post illustration and the icon set in `src/assets/`.

Every registered asset records the version in this file's title.

## Direction and references

**A vertical, full-bleed, short-form feed that any teenager recognises in
half a second and cannot name.**

The references are the *format* shared by YouTube Shorts, TikTok and
Instagram Reels: one post filling the whole screen, snap-scrolled
vertically, a column of engagement icons down the right edge, creator
handle and caption stacked bottom-left, a persistent tab bar at the
bottom. That grammar is the reference — the feel of the thing, learned by
muscle memory from all three.

What it is **not**, and this is enforceable rather than cautious:

- **Not any one of them.** No real wordmark, logo, app icon, or brand
  name appears anywhere, in art or in copy. The platform in this game is
  fictional and unnamed-by-any-real-name.
- **Not their exact colours.** The palette below is deliberately none of
  the three signature schemes. An asset that lands on a real platform's
  signature colour pair is wrong even if it looks good.
- **Not photographic.** All food is illustrated flat vector. Photoreal
  food reads as a stock library and drags provenance questions in with
  it.
- **Not affectionate.** The look is slick, dense, and slightly too loud —
  the point is that it is *effective*, not that it is pretty. Charm is a
  near-miss.

A near-miss to watch for: "tasteful minimal food app." That is a different
genre and it kills the premise, because nobody is addicted to a tasteful
minimal food app.

## Palette

**Hard budget: 8 colours and 1 gradient. An asset may only draw from
these. Extending the palette is an amendment to this document, not an
asset-level decision.**

| Token | Hex | Use |
|---|---|---|
| `void` | `#0B0B0F` | Feed background, behind everything |
| `surface` | `#16161C` | Cards, sheets, bars |
| `ink` | `#F5F5F7` | Primary text and icons on dark |
| `muted` | `#9A9AA8` | Secondary text, inactive icons, counts at rest |
| `pulse` | `#FF2D6F` | The engagement action. Reserved — nothing else uses it |
| `zest` | `#FFC53D` | Food warmth, "sponsored", anything selling you something |
| `mint` | `#2BD9A6` | Verification ticks, confirmations, "safe" signals |
| `grape` | `#7C4DFF` | The second half of the gradient; sparingly on its own |

**`ring` gradient**: `pulse → grape`, 135°. Used only for the avatar ring
and the one place the UI wants you to feel that something is live. Never
as a fill for food.

`pulse` being reserved for engagement is the single most load-bearing
palette rule here. It is how the eye learns where the reward is, which is
the mechanic.

## Resolution, format, and aspect

Exact, because the build depends on them:

- **Post media**: aspect **9:16**, authored at **1080×1920** intrinsic.
  Full-bleed — the media reaches every edge of the viewport and is
  overlaid by UI. No baked-in margins, no baked-in text.
- **Avatars**: **1:1**, authored at 96×96, displayed at 44px.
- **Icons**: **24×24** grid, **2px** stroke, rounded caps and joins.
- **Format**: **SVG only.** All authored art is hand-written vector in
  this repository. No raster assets, no generated images. This is the
  provenance position in Constitution Principle I made concrete — every
  asset's origin is its own source, readable in the diff.
- **Text is never art.** Captions, handles and counts are live DOM text,
  always. Nothing legible is drawn into an SVG. This is an accessibility
  requirement, not a preference.
- **Safe area**: UI keeps 16px from the viewport edge and clears the
  bottom tab bar; media does not.

## Character construction

"Characters" here are creator avatars, not a cast. Identical across all of
them:

- Flat vector, no gradients except `ring`, no texture, no drop shadows.
- 2px outline in `void` where a shape meets a like-valued shape; none
  otherwise.
- Single light source, top-left, 45°. One shading step maximum.
- Face detail budget: **two dots and one arc**, or no face at all.
  Anything more reads as a character and this is not a game with a cast.

The avatar's own: silhouette, palette pair drawn from the eight, and one
accessory shape.

## Environments and backgrounds

There are effectively none — a post fills the screen and *is* the
background. Where a post's illustration needs depth, it gets exactly two
layers: subject and flat field. No horizon, no perspective, no
atmospheric depth.

The foreground rule that matters: **UI must hold contrast against any
post.** Every post illustration must keep its bottom-left third and
right edge visually quiet enough that `ink` text and icons stay legible
over them, or carry the scrim defined in the UI section.

## UI and icons

- **Typography**: the system UI stack. Counts and handles heavy (700),
  captions regular (400). Never a display face — the genre uses system
  type and that is part of why it feels native.
- **Icon grid**: 24×24, 2px stroke, rounded. Filled only to show an
  active state.
- **Corner radii**: 8 (chips), 16 (cards), 24 (sheets). No other values.
- **States**: at rest `muted`; active `ink`; engaged `pulse`, filled, with
  one scale pop. Disabled is `muted` at 40% and does not appear in this
  phase.
- **Scrim**: any UI over media sits on a bottom-up `void` gradient, 0% to
  70%, covering the lower third, and a right-edge vignette at 40%. This
  is what makes the contrast rule above enforceable.
- **Relationship to the art**: deliberately separate. The UI is crisp,
  systemic and cold; the food is warm and hand-drawn. That tension is the
  joke — the interface is not on the food's side.

## Must read at gameplay resolution

Reviewed at **390×844** (a phone), not at authoring size:

- Every action-rail icon is distinguishable from the others in
  silhouette alone, greyscale, at 24px.
- `ink` on any post holds **4.5:1** contrast, with the scrim applied.
- `pulse` is identifiable as the engagement colour without reading any
  label.
- The food in a post is identifiable as *what food it is* at full-screen
  size, from across a room.

## Consistency anchors for generated art

Checkable properties, in review order:

1. Palette membership — every fill and stroke is one of the eight tokens
   or the named gradient. No exceptions, no "nearly".
2. Stroke weight — 2px at the 24px icon grid; proportionally scaled
   elsewhere, never optically adjusted.
3. Light source — top-left, 45°, one shading step.
4. Corner radii — 8, 16, or 24. Nothing between.
5. Detail level — two layers per illustration, face budget two dots and
   one arc.
6. `pulse` usage — engagement only. A `pulse` fill anywhere else fails.
7. No text inside any SVG.

Canonical references: the post illustrations in `src/assets/`. The
action-rail icons live in `src/components/Icon.tsx`, not in `src/assets/`
— they are interface, not art, and this document defers to the plan for
where files live. New work is compared against those, never only
against the most recently accepted asset.

## Known drift risks

- **Drift toward one real platform.** The mix collapses toward whichever
  of the three the author used most recently. *Check*: hold the screen up
  and try to name it. If a name comes, it has drifted.
- **Palette creep.** A ninth colour arrives as "just this once" for a
  badge. *Check*: anchor 1, mechanically.
- **`pulse` leaking.** Used for a non-engagement highlight because it
  looks good. *Check*: anchor 6.
- **Food getting tasteful.** Illustrations drift calm and muted, and the
  feed stops feeling loud. *Check*: does it still look like it is trying
  to sell you something?

## What this doc does not cover

Process rules — file scope, allowed tooling, where assets live, how the
asset pipeline runs — live in the agent definitions and the
`asset-pipeline` skill, not here.
