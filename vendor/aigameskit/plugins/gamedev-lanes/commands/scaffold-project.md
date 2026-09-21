---
description: Copy the per-project templates — orientation doc, constitution, decision log, and the spec guides — into this project.
---

Scaffold this project's own documents from the `project-setup` skill's
bundled templates.

A plugin cannot write into a consuming project at install time; nothing
lands in a repository until an agent puts it there during a session. That
is what this command is for, and it is why the templates are read and
written rather than copied by a shell command — `${CLAUDE_PLUGIN_ROOT}`
resolves in this file, not inside a Bash invocation.

## Do this

1. Read `${CLAUDE_PLUGIN_ROOT}/skills/project-setup/SKILL.md` and follow
   it. This command is the file-copying part of that procedure, not a
   replacement for it — in particular, step 3 there says the four spec
   guides are copied per lane when that lane is first dispatched, not all
   at once at project start.

2. Ask which of the spec guides this project needs now, unless the user
   already said. The first three rows below are always copied; the rest
   are copied only for lanes about to be used. Copying a guide nobody
   fills in is how a lane ends up reading a placeholder as the decision.

3. Check what is already here before writing anything. If any destination
   below exists, stop and show the user the file and what would replace
   it. These documents hold a project's ratified principles and recorded
   decisions, and nothing else holds a second copy — overwriting one
   loses the only copy.

4. Copy, reading each from the skill directory and writing it into the
   project:

   | From `${CLAUDE_PLUGIN_ROOT}/skills/project-setup/` | To | When |
   |---|---|---|
   | `assets/claude-md-template.md` | `CLAUDE.md` | always |
   | `assets/constitution.md` | `docs/constitution.md` | always |
   | `assets/decisions/README.md` | `docs/decisions/README.md` | always |
   | `assets/art-style-guide.md` | `docs/art-style-guide.md` | with `graphics` / `art-director` |
   | `assets/audio-direction-guide.md` | `docs/audio-direction-guide.md` | with `sound` |
   | `assets/tone-and-voice-guide.md` | `docs/tone-and-voice-guide.md` | with `writer` |
   | `assets/progression-spec.md` | `docs/progression-spec.md` | with `game-design` |

   `docs/` is the convention the lanes look in and the orientation doc
   names. A project that keeps its docs elsewhere may put them there —
   then say so in `CLAUDE.md`, because that is the file every lane reads
   to find the rest.

5. Leave every `[bracketed]` placeholder alone. They are this project's
   open questions — its stack, its paths, its licensing position, its
   palette, its register. Filling one in on the project's behalf produces
   a document that reads as decided and was not, which is a rule
   violation rather than a completed step.

6. Do not dispatch any lane. A lane dispatched against a bracketed guide
   will treat the bracket as the spec; the filling-in happens first, and
   it is the user's.

## Then

Tell the user, in this order: which files were written, which
placeholders are still open and which lane each one blocks, and that
`CLAUDE.md` is the one to fill in first because every other document is
found through it.
