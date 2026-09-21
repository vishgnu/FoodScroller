---
name: project-setup
description: Setting a project up to be run by the lane roster — the root orientation doc, the constitution, the decision log, and the versioned spec guides each content lane reads (art style, audio direction, tone and voice, progression). Use when starting a new project with this kit, when a lane reports that the spec it needs does not exist, when adding a content lane to a project that has never had that lane's guide, and when deciding where a project's own docs live.
---

# Project setup

The per-project documents the lanes read but do not own: what this project
is, what it is held to, what has already been decided, and what its
content is supposed to look, sound and read like.

Every lane in this roster defers to a project document for direction and
keeps only process rules of its own — `writer` to a tone and voice guide,
`art-director` and `graphics` to an art style guide, `sound` to an audio
direction guide, `game-design` to a progression spec, `infrastructure` to
a platform guide (that one belongs to the `azure-platform` skill, not
here). This skill is where those documents come from.

`/gamedev-lanes:scaffold-project` is the file-copying half of this
procedure. It is not a replacement for reading the rest of it: the copy
takes seconds and the filling-in is the work.

## The files

| Bundled as | Copied to | Read by |
|---|---|---|
| `assets/claude-md-template.md` | `CLAUDE.md` | every session, before anything else |
| `assets/constitution.md` | `docs/constitution.md` | `pm`, and any lane arguing a principle |
| `assets/decisions/README.md` | `docs/decisions/README.md` | `pm`, and anyone recording a decision |
| `assets/art-style-guide.md` | `docs/art-style-guide.md` | `art-director`, `graphics` |
| `assets/audio-direction-guide.md` | `docs/audio-direction-guide.md` | `sound` |
| `assets/tone-and-voice-guide.md` | `docs/tone-and-voice-guide.md` | `writer` |
| `assets/progression-spec.md` | `docs/progression-spec.md` | `game-design` |

The orientation doc is bundled under a different name than it is copied
to. A file called `CLAUDE.md` inside this repository would be loaded as
real instructions by any session that touches this directory, and it is
not instructions — it is a form, and every rule in it is bracketed. The
platform guide in `azure-platform` is renamed on copy for the same
reason.

## 1. Copy the orientation doc and the constitution — owner: **the human**, with `pm`

`CLAUDE.md` and `docs/constitution.md` come first because everything
else is dispatched on the strength of them. The constitution's own header
says an unfilled bracket means that principle has not been decided yet;
that is literally true, and it is true of the orientation doc too.

Fill in the stack, the source paths, the lint command, the lane
overrides, and the licensing and provenance position. These are decisions
about this project, not blanks to be plausibly completed — a lane that
reads an invented path will write files where nobody is looking for them.

**Done when:** no `[bracketed]` placeholder remains in either file, and
`CLAUDE.md` names the constitution's actual path.

## 2. Start the decision log on day one — owner: `pm`

Copy `docs/decisions/README.md` before there is anything to record. A log
started late is a log whose first ten decisions were reconstructed from
memory, which is how a decision log becomes a design document.

The convention is already in the file. The only project-specific part is
remembering that process decisions get fed back to this kit rather than
buried — see this repository's `docs/decisions/README.md` for that half.

**Done when:** the directory exists and the first real decision is in it.

## 3. Copy each spec guide before that lane's first task — owner: `pm`

Not up front, and not after. The four content guides are per-lane, and a
guide is copied when the lane that reads it is about to be dispatched for
the first time.

Copying all four at project start produces four documents full of
brackets, and a lane reads a bracket as the decision — the guides
themselves say so in their own headers. `art-director` will gate assets
against an unfilled palette; `writer` will match a register that nobody
chose. An absent guide, by contrast, makes the lane stop and ask, which
is the correct behaviour.

So: no audio yet means no audio direction guide yet. A game with no
gating means no progression spec. Add the guide when adding the lane.

**Done when:** every lane that has been dispatched has a filled-in guide,
and every guide in `docs/` belongs to a lane that is actually in use.

## 4. Hand back what still needs deciding — owner: whoever scaffolded

The copy is not the deliverable; the list of unanswered questions is.
Report which files were written, which placeholders are still open, and
which of them block which lane. A scaffold reported as "done" with sixty
brackets outstanding is the failure mode this step exists to prevent.

**Done when:** the user has that list, in those terms.

## Rules

1. **Never overwrite without showing what would be lost first.** These
   files accumulate a project's actual decisions, and nothing else holds
   a second copy of them. Re-running a scaffold over a filled-in
   constitution replaces ratified principles with a form. Check, show,
   and let the user choose.
2. **Do not fill in a `[bracketed]` placeholder on the project's
   behalf.** A bracket is an open question. Answering it plausibly
   produces a document that reads as decided and was not, which is worse
   than the blank — the blank at least stops a lane.
3. **The copies belong to the project from the moment they land.**
   Updating the plugin does not update them, and it must not: a project's
   constitution is not the kit's to re-version. Improvements flow the
   other way, as a decision recorded in the kit's log.
4. **The guides are versioned; the lanes that read them are not.** Every
   guide carries a version in its title and every asset, cue or content
   batch records the version it was produced under. That is what turns a
   direction change into a finite list of work instead of a vague pass
   over everything. Keep the version line; it is not decoration.
5. **These templates are read and written, never shell-copied.**
   `${CLAUDE_PLUGIN_ROOT}` resolves in skill, agent and command markdown
   and **not** inside a Bash invocation, so a `cp "${CLAUDE_PLUGIN_ROOT}/..."`
   fails with what looks like a missing file rather than an unresolved
   variable. See `docs/decisions/0003` in the kit.
6. **A project document that no lane reads is a document that will rot.**
   Before adding a new one here, name the lane that will open it and the
   task that makes it do so. If neither exists, the content belongs in
   the constitution or in a decision entry, not in a new spec.
