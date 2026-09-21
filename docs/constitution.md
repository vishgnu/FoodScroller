# [Project name] Constitution

The principles this project is held to. Fill in every `[bracket]` before
treating this as ratified — an unfilled bracket means that principle has not
actually been decided yet.

## Core Principles

### I. Originality and Licensing
Every piece of content shipped — story, character names, dialogue, art,
music, sound — MUST be [this project's position: e.g. original work; or
original plus explicitly licensed third-party assets, listed in
`[attribution file]`]. Genre, technique, and mechanics may be studied and
copied; another work's specific text, characters, or assets may not be
reproduced, even when referenced for tone. Where the project builds on an
existing genre or homage, say so here: [what is being homaged, and what that
does not license].

Generated art and audio make provenance a live concern, not a theoretical
one: a model's output can carry recognizable characters, logos, style
signatures, or watermarks, and the tool's own terms decide what may ship.
State the project's position: [which generation tools are permitted, under
which license terms, what review a generated asset gets before it ships, and
where provenance is recorded]. An asset whose provenance cannot be stated is
not shippable.

### II. Lane-Scoped Ownership
Work is split into lanes, each with a defined file scope, declared in its
agent definition. The lanes are: `engineer`, `writer`, `graphics`,
`art-director`, `sound`, `game-design`, `tester`, `devops`,
`infrastructure`, `pm`. A lane editing outside its declared scope is a
flagged exception, not a routine choice — the affected lane should review it.

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
[build command] and [lint/typecheck command] are clean AND the actual runtime
behavior was verified ([runtime verification method, e.g. browser automation]
for anything touching the running game; a manual check for anything else with
observable output). A lane without shell access hands off exactly what still
needs verification rather than asserting it's clean. Rationale: code reads
miss the bugs that only appear at runtime — asset-id mismatches between
lanes, interaction states, timing.

## Technical Constraints

- **Stack**: [language, build tool, frameworks — or explicitly "none"].
- **Art tooling**: [which generation or authoring tools exist in this
  environment, and which do not]. This is a hard constraint, not a stylistic
  preference — code or plans that assume an unavailable tool are broken by
  definition. If the art style itself is governed by a separate document,
  name it here: [art style guide path], versioned separately from the
  `graphics`/`art-director` lane definitions so the *look* can be swapped
  without rewriting the *process* rules.
- **Audio tooling**: [same, for sound].
- **Runtime/deployment**: [backend or static-only, state storage, deploy
  target].
- **Other hard constraints**: [target platforms, resolution/scaling,
  performance budget, accessibility floor].

## Development Workflow

- Decisions (resolved questions, direction calls, anything that changed a
  prior assumption) get recorded as a short dated entry in
  `docs/decisions/` — one file per decision, using that directory's
  template — not just closed as a GitHub issue comment. This is the durable
  "what and why" record that survives after the issue closes.
- Commit early and often in small logical chunks, each with a clear message
  and [any required trailers]. Push regularly rather than batching a large
  diff — work in progress should be recoverable, not sitting only in an
  uncommitted working tree.
- A milestone with multiple lane-scoped sub-tasks gets one parent tracking
  issue plus one sub-issue per lane, not one issue trying to hold the whole
  breakdown.
- [Any spec-driven or planning workflow this project uses, and how its
  output is still executed through the lane structure above.]

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

**Version**: 0.1.0 | **Ratified**: [YYYY-MM-DD] | **Last Amended**: [YYYY-MM-DD]
