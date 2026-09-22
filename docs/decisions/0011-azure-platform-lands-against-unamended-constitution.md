# 0011: The Azure platform lands against the unamended constitution

Date: 2026-09-22
Status: decided
Kind: process
Issue: —

## Context

The `azure-platform` skill's reference platform was scaffolded into this
repo on request: Bicep for a shared platform resource group plus one
resource group per game, and three GitHub Actions workflows.

It contradicts `.specify/memory/constitution.md` § Technical Constraints
→ *Runtime/deployment*, which ratifies a static single-page app with "no
backend, no network requests at runtime, no accounts, no analytics" and
"nothing is written to storage of any kind." Four of the five things the
platform provisions are forbidden by that clause:

| Provisioned | Constraint it contradicts |
|---|---|
| Entra External ID tenant, player sign-up | no accounts |
| Functions app, shared API | no backend, no network requests at runtime |
| Table + Blob storage for player saves | nothing written to storage of any kind |
| Application Insights telemetry | no analytics |
| Static Web App (Free) hosting | — compatible |

Decision 0003 also placed `infrastructure` and `devops` out of play for
milestone 1, and `CLAUDE.md`'s lane roster reflected that.

## Decision

Land the scaffold on `main` as shipped, with live workflow triggers, and
record the contradiction here rather than resolve it. The constitution is
**not** amended by this entry — its Technical Constraints stand unchanged
and still bind every lane. `infrastructure` joins the roster to own
`infra/**`; `devops` joins to own the workflows' build and deploy steps.

A staged variant (`workflow_dispatch:` only, no CI firing) was offered and
declined in favour of the platform as shipped.

## Consequence

- The repo now holds two conflicting statements about whether FoodScroller
  has a backend: this constitution clause and `docs/platform-guide.md`.
  Until one is amended, **the constitution wins** — it is the ratified
  document and this entry does not override it.
- All three workflows fire on the landing push and on subsequent pushes to
  their paths. Every one fails at `azure/login`, because the repository
  variables the OIDC login needs are unset. Expect recurring red checks on
  `main` until either those variables exist or the triggers are narrowed.
  `infra.yml`'s `apply` job is gated behind `needs: plan`, so no
  deployment is attempted and no Azure resource is created. Cost is zero.
- `docs/platform-guide.md` lands with its `[bracketed]` values unresolved.
  It is therefore **not** a ratified spec, and the `infrastructure` lane
  must not read a bracket as a decision — filling them in is the account
  owner's, per that lane's rule 5.
- Nothing here has been applied to any cloud. `docs/platform-handoff.md`
  remains the account owner's to run.
- Worth feeding upstream to the kit: `azure-platform` assumes a game with
  accounts and saves, and offers no path for a project whose constitution
  forbids both. A hosting-only subset would have fit here.
