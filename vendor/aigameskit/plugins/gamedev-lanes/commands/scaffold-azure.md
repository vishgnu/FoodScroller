---
description: Copy the Azure platform templates — Bicep, workflows, and the platform guide — into this project.
---

Scaffold the cloud platform into the current project from the
`azure-platform` skill's bundled templates.

A plugin cannot write into a consuming project at install time; nothing
lands in a repository until an agent puts it there during a session. That
is what this command is for, and it is why the templates are read and
written rather than copied by a shell command — `${CLAUDE_PLUGIN_ROOT}`
resolves in this file, not inside a Bash invocation.

## Do this

1. Read `${CLAUDE_PLUGIN_ROOT}/skills/azure-platform/SKILL.md` and follow
   it. This command is the file-copying part of that procedure, not a
   replacement for it.

2. Check what is already here before writing anything. If `infra/`,
   `.github/workflows/`, or a platform guide already exist, stop and show
   the user what would be overwritten. Scaffolding over a configured
   platform is how a working deployment identity gets replaced with a
   placeholder.

3. Copy, reading each from the skill directory and writing it into the
   project:

   | From `${CLAUDE_PLUGIN_ROOT}/skills/azure-platform/` | To |
   |---|---|
   | `assets/infra/main.bicep` | `infra/main.bicep` |
   | `assets/infra/main.bicepparam` | `infra/main.bicepparam` |
   | `assets/infra/modules/platform.bicep` | `infra/modules/platform.bicep` |
   | `assets/infra/modules/game.bicep` | `infra/modules/game.bicep` |
   | `assets/workflows/game-ci.yml` | `.github/workflows/game-ci.yml` |
   | `assets/workflows/api-deploy.yml` | `.github/workflows/api-deploy.yml` |
   | `assets/workflows/infra.yml` | `.github/workflows/infra.yml` |
   | `platform-guide-template.md` | `docs/platform-guide.md` |
   | `handoff-runbook.md` | `docs/platform-handoff.md` |

4. Replace the placeholder names throughout with this project's own:
   `mygames` as the project prefix, `firstgame` as the game slug, and the
   region. They appear in `main.bicepparam` and in the `env:` block of each
   workflow, and the resource names in the workflows must match what the
   Bicep produces or the deploy fails at the point of no longer being cheap
   to fix.

5. Leave every `[BRACKETED]` value alone. Those are identifiers that must
   not enter the repository — they belong in GitHub variables and in the
   owner's own records. Filling one in is a rule violation, not a
   completed step.

6. Do not run any deployment. Nothing here applies infrastructure; the
   handoff runbook is the user's to execute.

## Then

Tell the user, in this order: which files were written, which placeholder
names still need deciding, and that `docs/platform-handoff.md` is theirs to
run — starting with `az bicep build`, because these templates have never
been compiled anywhere.
