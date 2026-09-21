# Art style guide — v[N] "[short name for this visual direction]"

This is the canonical spec for [project]'s visual identity — what a
background, a character, or an icon has to look like to belong in this
game. It is kept separate from the `graphics` and `art-director` agent
definitions on purpose: this doc is the swappable part. If the game's
whole look changes later, this file gets re-versioned and every asset
gets a pass against the new version, while those agents' *process* rules
(file scope, tooling, handoff) keep working unchanged.

**Precedence:** if this doc and an agent definition disagree, this doc
wins for anything about *how the art should look*; the agent definition
wins for *where files live* and *what tooling is allowed*.

Status: **[current style | draft | superseded by vN]** — [one line on how
this version was arrived at, and which reference assets embody it].

Every registered asset records the version in this file's title, so
bumping the version produces the list of assets that need a pass. Bump it
whenever a rule below changes in a way that would make existing art wrong.

## Direction and references

[The one-sentence version of the look, then the references that pin it
down — eras, media, specific games or artists, and just as importantly
what it is *not*.] Write this so someone can tell a near-miss from a hit;
everything below is the enforceable form of what this section claims.

## Palette

[Total color budget, the named palette families, and their hex values.
Say what a new asset may do: extend the palette, or only draw from it.]
Palette is the fastest way a generated asset betrays that it came from
somewhere else, so state the budget as a hard number.

## Resolution, format, and aspect

[Canvas sizes and aspect ratios per asset class; file formats; native vs.
display resolution; transparency, margin, and pivot/anchor conventions.]
These are the rules the build and the engine actually depend on, so keep
them exact rather than descriptive.

## Character construction

[Proportions, silhouette rules, outline treatment, shading limits, facial
detail budget, draw order, animation frame conventions.] Say which of
these must be identical across the whole cast and which are the character's
own — that split is what makes a cast read as one cast.

## Environments and backgrounds

[Perspective and horizon conventions, depth and layering, lighting model
and where light is allowed to come from, density of detail, and how much
contrast the playable foreground must keep against the background.]

## UI and icons

[Frames, panels, typography or lettering treatment, icon grid and weight,
state treatments (hover, disabled, selected), and how UI relates to the
world art — same look, or deliberately separate.]

## Must read at gameplay resolution

[The things that have to survive being shown at actual in-game size:
which silhouettes must be distinguishable from each other, which
interactive elements must be findable, what minimum contrast and stroke
weight hold.] Art is reviewed at this size, not at the size it was made.

## Consistency anchors for generated art

[The traits that must hold identical across every generation — the ones a
reviewer checks first: outline weight, proportion ratios, lighting angle,
palette membership, level of detail, edge treatment.] List them as
checkable properties, not adjectives.

[Also name the reference assets that are canonical for each asset class.]
New work is compared against these originals, never only against the most
recently accepted asset.

## Known drift risks

[The ways generated art has already been seen to wander on this project:
each entry is what drifts, in which direction, and the check that catches
it.] Add an entry every time the review gate returns an asset for the same
reason twice — that is the signal the guide, not the prompt, was at fault.

## What this doc does not cover

Process rules — file scope, allowed tooling, where assets live, how the
asset pipeline runs — live in the agent definitions and the
`asset-pipeline` skill, not here. This doc should be replaceable wholesale
without touching any of them.
