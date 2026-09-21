# Tone and voice guide — v[N] "[short name for this narrative voice]"

This is the canonical spec for [project]'s writing — what a line of
dialogue, a room description, or a one-word refusal has to sound like to
belong in this game. It is kept separate from the `writer` and any
narrative-design agent definitions on purpose: this doc is the swappable
part. If the narrative direction changes, this file is re-versioned and
every text pass re-read against it, while those agents' *process* rules
(file scope, schema, tooling, handoff) keep working unchanged.

**Precedence:** if this doc and an agent definition disagree, this doc
wins for anything about *how the writing should read*; the agent
definition wins for *where files live* and *what tooling is allowed*.

Status: **[current voice | draft | superseded by vN]** — [how this
version was arrived at, and which lines are its reference specimens].

Every content batch records the version in this file's title, so bumping
the version produces the list of copy that needs a re-read. Bump it
whenever a rule below changes in a way that makes existing writing wrong.

## Register and references

[The one-sentence version of how the game sounds, then the references
that pin it down — books, films, games, authors — and just as importantly
what it is *not*.] Write it so someone can tell a near-miss from a hit;
everything below is the enforceable form of this section.

## Person, tense, and address

[Narrative person and tense per kind of text, and how the game addresses
the player — second person present, past-tense narration, an in-world
narrator with a personality of its own, or none.] Keep this exact: it is
the rule that breaks most silently when two passes are written days apart.

## Humour

[How much, of what kind, and where it is allowed to land — dry
understatement, slapstick, absurdism, wordplay, or deliberately none.]
Say what jokes are never at the expense of, and whether the game may
break its own frame: winking at the player, at the genre, at itself.

## Character voices

[What distinguishes each speaking character — vocabulary range, sentence
length, what they never say, verbal tics used sparingly.] Name what holds
constant across the cast (reading level, profanity policy, how they
address the player) and what is each character's own — that split is what
makes a cast read as one cast, not one writer doing accents.

## Conventions per text surface

[Length, punctuation, and shape for each surface the game actually has:
interaction responses, item descriptions, scene and location text,
dialogue nodes, UI and system messages, epilogues.] Give word budgets as
hard numbers: a one-line refusal and a closing epilogue are different
crafts, and the budget keeps long-form habits out of short slots.

## Terminology and naming

[The in-world glossary: proper nouns, invented terms, and their exact
spelling and capitalisation; what real-world vocabulary is allowed in;
naming conventions for people, places, and items.] Fix each term once
here — inconsistent naming reads as a bug even when the prose is good.

## Tonal boundaries — what this game never does

[The hard lines: subjects, jokes, registers, and rhetorical moves out of
bounds however well they would play in a scene — gratuitous cruelty,
real-world politics, anachronism, meta-commentary, whatever this game
rules out.] This section prevents drift more reliably than any other;
write it as refusals, not as taste.

## Failure, death, and setback

[How the writing treats a wrong move, a locked door, a lost life, or an
unwinnable state — sympathetic, deadpan, mocking, silent — and whether
the game keeps score of failures in its voice.] Tone slips here first,
because failure text gets written last and in bulk; state the rule so a
batch of fifty refusals can be checked against it in one pass.

## Consistency anchors and drift risks

[The traits a reviewer checks first — person, address, word budget,
glossary spelling, joke density — as checkable properties, not
adjectives, plus the passages canonical for each surface, which new work
is compared against rather than against the latest accepted line. Then
each drift already seen: what wanders, which way, what catches it.] Log
one whenever review returns copy twice for the same reason.

## What this doc does not cover

Process rules — file scope, content schema shape, allowed tooling, where
text lives, how work is handed back — live in the agent definitions and
the project's own `CLAUDE.md`. Branching conditions and ending logic
belong to the game-design lane; this doc governs only how the resulting
lines read. It should be replaceable wholesale without touching any of
them.
