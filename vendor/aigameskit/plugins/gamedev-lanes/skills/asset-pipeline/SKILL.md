---
name: asset-pipeline
description: The five-stage pipeline for producing a game art asset — brief, generate, review gate, register, style versioning. Use whenever a sprite, background, portrait, icon, tileset, or UI art element is requested, generated, regenerated, reviewed, or added to the game, and when a style-guide bump means existing art needs a pass.
---

# Asset pipeline

Every art asset that ships moves through five stages in order: nothing is
generated before someone wrote down what it should be, and nothing is
wired into the game before someone other than its producer accepted it.
`art-director` owns intent and verdict, `graphics` owns production.

## 1. Brief — owner: `art-director`

A request ("we need a shopkeeper sprite") is not a brief. Before anything
is generated, `art-director` writes one covering:

- What the asset is, and the asset ID it will be registered under.
- Where it appears, at what on-screen size, and what must stay legible there.
- Subject, pose, composition; which style-guide sections govern it, and
  the guide version in force.
- Consistency anchors: the existing assets this one must sit beside
  without looking like it came from a different game.
- Format, dimensions/aspect, transparency, margin or pivot rules, and
  explicit exclusions — the things that keep coming out wrong.

**Done when:** the brief is written down and names the asset ID, the
style-guide version, and the neighbours it must match.

## 2. Generate — owner: `graphics`

`graphics` produces candidates against the brief — more than one, so the
gate can choose — capturing provenance per candidate as it is made, never
reconstructed afterwards:

- The exact prompt, plus any negative prompt or constraint text.
- Tool and model identifier, with version.
- Seed or whatever reproducibility handle the tool offers — if none,
  record that explicitly rather than leaving the field blank.
- The style-guide version the brief cited.
- Reference or conditioning images used, by asset ID, and any
  post-generation edits (crop, palette reduction, background removal).

Provenance makes a later regeneration a variation rather than a fresh
guess; an asset without it cannot be iterated on.

**Done when:** candidates exist, each with a complete provenance record.

## 3. Review gate — owner: `art-director`

`art-director` compares candidates against the brief and the style guide
and returns one of two verdicts: **accepted**, or **returned with specific
reasons**. "Looks fine" is not an acceptance; "doesn't feel right" is not
a return — a return names the rule or brief line that was missed.

**Production never signs off on itself.** `graphics` does not accept its
own asset, and an asset that has not passed the gate does not reach
stage 4.

The gate checks at least:

- Brief compliance (format, dimensions, exclusions) and style-guide
  compliance, rule by rule, for the sections the brief cited.
- Legibility at gameplay size, not at generation size.
- **Drift.** Each asset can satisfy every rule individually while the set
  drifts — outlines thinning, palettes warming, proportions slimming —
  because each generation anchors on the last one rather than on the
  originals. The gate is the only place drift is visible, so review new
  work beside the *oldest* still-canonical assets of its class, not only
  the most recent. Drift caught at the gate is a return; drift found
  after registration is a batch re-pass.

**When the gate returns an asset**, choose deliberately:

- **Regenerate** when the brief was right and the output missed it — same
  brief, adjusted prompt or seed. Log the new attempt's provenance
  alongside the old; do not overwrite it.
- **Re-brief** when the brief was wrong, ambiguous, or silent about what
  went wrong. Fix the brief, then generate against it. If the same gap
  would bite the next asset too, fix the style guide, not just this brief.

Two consecutive returns for the same reason mean the brief or the guide is
at fault, not the generator. Stop regenerating and go up a level.

**Done when:** a verdict is recorded and any accepted candidate is
identified unambiguously.

## 4. Register — owner: `graphics`, enforced by the build

The accepted asset lands in a typed registry that is the single source of
truth for asset IDs. Content, scenes, and engine code reference assets
only through those IDs — never a raw path, never a string assembled at
runtime.

**An unknown or missing asset ID must be a build error, not a runtime
surprise.** Whatever the language, the registry needs these properties:

- Valid asset IDs form a closed, declared set — not an open string key —
  and a reference to an ID outside that set fails to build.
- The registry is exhaustive over that set: an ID declared but never
  supplied with a file fails to build.
- Entries are checked mechanically against what is on disk, so a renamed
  or deleted file surfaces at build time.

The source project proved both halves: where it typed a record
exhaustively over a closed key set, a missing entry was a compile error
that could not ship; where it keyed a lookup by loose strings, an asset-ID
mismatch between two lanes slipped past every check and became a bug found
in play. The only difference was whether the key set was typed.

**Done when:** the asset is in the registry, every reference resolves
through it, and removing the entry breaks the build.

## 5. Style versioning — owner: `graphics`, audited by `art-director`

Every registry entry records the style-guide version its asset was made
under, beside its provenance — mandatory, copied from the brief, never
inferred.

Stored per asset, it makes a guide bump yield a **queryable work list**:
every registered asset whose recorded version is below the current one is
stale by definition. `art-director` triages that list — re-pass,
regenerate, or accept as still-conforming with the version updated and a
recorded reason — and the bump is not done until the list is empty. Without
this field a bump produces only an instruction someone must turn into work
by hand, and it silently never happens.

**Done when:** no registered asset carries a style-guide version older
than the current one, except with a recorded, reasoned exception.

## Not allowed

Generating before a brief exists; `graphics` accepting its own output;
registering an asset the gate did not accept; an asset ID living as a loose
string outside the registry; a registry entry with no style-guide version.
