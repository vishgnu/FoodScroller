# Audio direction guide — v[N] "[short name for this sonic direction]"

This is the canonical spec for [project]'s sound — what a footstep, a
menu blip, or a scene's ambience has to sound like to belong in this
game. It is kept separate from the `sound` agent definition on purpose:
this doc is the swappable part. If the game's sonic direction changes,
this file is re-versioned and every cue re-auditioned against it, while
that agent's *process* rules (file scope, tooling, manifest wiring) keep
working unchanged.

**Precedence:** if this doc and an agent definition disagree, this doc
wins for anything about *how the audio should sound*; the agent
definition wins for *where files live* and *what tooling is allowed*.

Status: **[current direction | draft | superseded by vN]** — [how this
version was arrived at, and which cues are its reference specimens].

Every cue records the version in this file's title, so bumping the
version produces the list of audio that needs a pass. Bump it whenever a
rule below changes in a way that makes existing cues wrong.

## Direction and references

[The one-sentence version of how the game sounds, then the references
that pin it down — eras, scores, specific games or composers — and just
as importantly what it is *not*.] Also state how audio is produced at
all: synthesized in code, sampled, recorded, or built through a
middleware pipeline. That choice constrains every section below.

## Palette and instrumentation

[The instruments, synthesis voices, and noise sources in bounds, and the
ones ruled out; tuning, scale or mode conventions; whether a new cue may
extend the palette or only draw from it.] Keep the roster short and
explicit — a stray realistic sample in a synthesized set is the fastest
way a cue betrays that it came from somewhere else.

## Mood mapping

[Which sonic treatment belongs to which game context: exploration,
tension, discovery, combat or its equivalent, menus, endings.] Give each
context its tempo, density, and register, so two cues written weeks apart
for the same context land in the same place rather than each merely
sounding good on its own.

## Loudness and mix

[Target loudness and peak ceiling, and the relative levels between music,
effects, ambience, and any voice — as numbers, not as "music sits under
the effects".] Name which category ducks for which, and the cap for cues
that fire on every interaction; those are the ones that turn fatiguing
first. State how the global mute and volume control apply.

## Formats, length, and looping

[File formats, sample rate and bit depth, mono vs. stereo per category;
length budgets per cue class; loop-point conventions, fade in and out,
and how a loop is proven seamless.] These are the rules the build and the
engine actually depend on, so keep them exact rather than descriptive.

## When audio plays — and when it does not

[Which events must be audible, which may be, and which are deliberately
silent.] Silence is a design choice with the same weight as a cue: name
the moments that stay quiet and why, the maximum density of overlapping
sounds, and the rule for a rapid repeat of the same cue (retrigger,
ignore, or vary).

## Accessibility

**Nothing may be conveyed by audio alone.** [For every cue that carries
information — a hazard, a state change, a success or failure, a timer —
name the visual or textual channel that carries the same information.]
The game must be fully playable muted, and a player who never hears a
cue must lose nothing but atmosphere. Any exception is a bug, not a
trade-off.

## Naming conventions

[The exact naming scheme for cues and files: event-name keys as the
content and engine layers reference them, category prefixes, variant
suffixes, and the casing and separator rules.] Fix the scheme here — a
cue nobody can find by name gets rewritten instead of reused.

## What this doc does not cover

Process rules — file scope, allowed tooling, where audio sources live,
how cues are wired into the manifest and triggered — live in the agent
definitions and the project's own `CLAUDE.md`, not here. Which events
exist at all is the engine's and game-design lane's business; this doc
governs only how the resulting audio sounds. It should be replaceable
wholesale without touching any of them.
