# FoodScroller Constitution

The principles this project is held to. Fill in every `[bracket]` before
treating this as ratified — an unfilled bracket means that principle has not
actually been decided yet.

This file is the project's single constitution. It lives at the Spec Kit
path so the `speckit-*` skills can read and amend it; it carries the
lane-kit content that every lane defers to. There is deliberately no second
copy under `docs/`.

## Core Principles

### I. Originality and Licensing
Every piece of content shipped — story, character names, dialogue, art,
music, sound — MUST be **original work produced inside this repository**.
There are no third-party assets and therefore no attribution file; if that
ever changes, this sentence changes first. Genre, technique, and mechanics
may be studied and copied; another work's specific text, characters, or
assets may not be reproduced, even when referenced for tone.

What is being homaged: **the shared interface grammar of vertical
short-form feeds** — full-bleed posts, snap scrolling, a right-hand
engagement rail, bottom tab bar. That grammar is a format, and formats are
free to satirise. It licenses nothing else: not a name, not a wordmark, not
an app icon, not a signature colour pair, not a real account's text.

This project is satire of a social feed, which makes the line above load
bearing rather than boilerplate. The position is **fictional platform,
recognisable format**:

- The platform in the game is fictional and carries no real product's name.
  No real platform, company, brand or product name appears in art, copy,
  identifiers, filenames or commit messages.
- **No real people.** No likeness, no name, no handle, no reproduced text
  from any real account, categorically — not as a joke, not as a cameo.
- **No real businesses.** No real restaurant, chain or food brand appears
  as the subject of a post. "Utter nonsense" about a real business is the
  one version of this that could harm someone specific.
- No real wordmark, logo, app icon or signature colour pair is reproduced;
  see `docs/art-style-guide.md`, which makes this checkable.

Parody of a format is not licence to reproduce a trademark, a logo, a real
person's likeness, or a real account's text.

Generated art and audio make provenance a live concern, not a theoretical
one: a model's output can carry recognizable characters, logos, style
signatures, or watermarks, and the tool's own terms decide what may ship.
The project's position is the strictest one available, and it is chosen
because it makes the question disappear rather than manage it: **no
generative image or audio tooling is used at all.** Every asset is
hand-authored SVG committed to this repository. Provenance is the source
file and its diff — there is nothing else to record, and nothing to review
for a watermark or a memorised logo. An asset whose provenance cannot be
stated is not shippable; here, an asset that is not readable vector source
in this repo is not an asset.

### II. Lane-Scoped Ownership
Work is split into lanes, each with a defined file scope, declared in its
agent definition. The lanes are: `engineer`, `writer`, `graphics`,
`art-director`, `sound`, `game-design`, `tester`, `devops`,
`infrastructure`, `pm`. A lane editing outside its declared scope is a
flagged exception, not a routine choice — the affected lane should review it.

Lanes in play for the current milestone: `pm`, `engineer`, `game-design`,
`graphics`, `art-director`, `tester`. A lane not in play has no spec guide in `docs/`
yet; the guide is copied when the lane is first dispatched, never earlier.

<!-- Keep this a bare list of lane names and let each lane's own definition
     carry its file scope. The project this constitution was extracted from
     restated every lane's scope here, and the list drifted out of date on
     exactly this point — lanes existed that the constitution never
     mentioned. A short list is one that stays true. -->

Rationale: this division is what prevents cross-lane content collisions;
the collisions that do happen are almost always the ones where this
discipline lapsed.

### III. No Scope Creep, Bounded Cycles
Build exactly what's asked. No speculative abstractions, no unrequested
polish, no half-finished features. Work happens in small cycles — a scoped
milestone, built by the relevant lanes, tested, merged — rather than one
long-running branch accumulating unrelated changes. Each cycle must be
independently mergeable and leave the game playable. Rationale: it keeps any
one branch's diff reviewable and keeps the project shippable at every merge
point.

### IV. One Requirement, One Issue — Decisions Wait for the User
Every requirement or todo gets exactly one GitHub issue as its single source
of truth (full rule: the `pm` lane definition). Before opening one, check for
an existing issue covering the same thing. Separate routine work (track it,
assign it to a lane, close it when done) from an actual **decision only the
user can make** (conflicting options, a scope or creative-direction call,
anything needing the user's own accounts or infrastructure access). For the
latter, lay out options and a recommendation in the issue and wait for the
user's actual answer — proceeding on silence is not permitted, except where
the user has explicitly pre-authorized autonomous decision-making for a
bounded window, recorded as such when it happens. Rationale: this keeps the
tracker trustworthy as a durable record instead of noise, and keeps `pm`
from quietly making calls that were never the user's intent.

### V. Verify Before Claiming Done
A task is not done because the code was written or read — it's done when
`npm run build` and `npm run check` (lint + typecheck) are clean AND the
actual runtime behavior was verified (browser automation against the dev
server for anything touching the running game; a manual check for anything
else with observable output). A lane without shell access hands off exactly what still
needs verification rather than asserting it's clean. Rationale: code reads
miss the bugs that only appear at runtime — asset-id mismatches between
lanes, interaction states, timing.

## Technical Constraints

- **Stack**: TypeScript with React, bundled by Vite. No game engine and no
  backend at this stage. The feed is DOM, not canvas — native scrolling,
  text layout and accessibility are requirements here, not conveniences.
  [Pinned major versions and the tsconfig strictness setting — `engineer`
  fills these in when the toolchain lands.]
- **Art tooling**: hand-authored **SVG only**, written as source in this
  repository. No image generation tooling, no raster editors, no binary
  image assets. This is a hard constraint, not a stylistic preference —
  code or plans that assume an unavailable tool are broken by definition.
  The art style itself is governed by `docs/art-style-guide.md`,
  versioned separately from the `graphics`/`art-director` lane definitions so
  the *look* can be swapped without rewriting the *process* rules.
- **Audio tooling**: [not decided — the `sound` lane is not in play. Decide
  when it is, and copy its guide at the same time.]
- **Runtime/deployment**: static single-page app. No backend, no network
  requests at runtime, no accounts, no analytics. All state is in memory
  for the current session only — nothing is written to storage of any kind.
  Deploy target is `devops`'s to decide and that lane is not yet in play.
- **Other hard constraints**: mobile-first browser, reference viewport
  **390×844**, must remain usable with mouse and keyboard on desktop.
  Performance budget: scrolling after 200 posts is indistinguishable from
  scrolling at the first post. Accessibility floor: all legible content is
  live text, 4.5:1 contrast minimum, and `prefers-reduced-motion` is
  honoured.

## Development Workflow

- Decisions (resolved questions, direction calls, anything that changed a
  prior assumption) get recorded as a short dated entry in
  `docs/decisions/` — one file per decision, using that directory's
  template — not just closed as a GitHub issue comment. This is the durable
  "what and why" record that survives after the issue closes.
- Commit early and often in small logical chunks, each with a clear message
  and the `Co-Authored-By:` trailer for the agent that produced it. Push
  regularly rather than batching a large diff — work in progress should be
  recoverable, not sitting only in an uncommitted working tree.
- A milestone with multiple lane-scoped sub-tasks gets one parent tracking
  issue plus one sub-issue per lane, not one issue trying to hold the whole
  breakdown.
- This project runs spec-driven on Spec Kit. Anything that adds or changes a
  feature, mechanic, or user-facing content goes through
  specify → clarify → plan → tasks → analyze → taskstoissues, producing
  `specs/<n>-<name>/`. `speckit-implement` is not used: the generated tasks
  are filed as issues and executed by the owning lane, so lane-scoped
  ownership (Principle II) survives the pipeline.

## Governance

This constitution supersedes ad hoc practice for anything it covers.
Amendments happen via a reviewed edit to this file and MUST update the
version line below per semantic versioning: MAJOR for a backward-incompatible
principle removal or redefinition, MINOR for a new principle or materially
expanded guidance, PATCH for wording or clarification only. Every amendment
gets a `docs/decisions/` entry explaining what changed and why, per the
Development Workflow section above. Compliance is reviewed the same way any
lane's output is reviewed — against this document and the repo's existing
conventions, not reviewer preference.

**Version**: 1.0.0 | **Ratified**: 2026-09-21 | **Last Amended**: 2026-09-21
