---
name: azure-platform
description: Standing up and operating the cloud platform a browser game runs on — subscription and resource-group layout, public player sign-up via a consumer identity tenant, a shared serverless API, player-save and asset storage, keyless CI/CD from git, and the cost guardrails that keep a hobby project at zero. Use when setting up hosting, deployment, authentication, storage, CI/CD, or cost controls for a project, when writing or revising a project's platform guide, and when a deploy or identity change has to be handed to the account owner to run.
---

# Azure platform

The platform layer for a browser game: where the built game is served
from, how a player signs in, where their save lives, and how a push to
git becomes a deployed game without a stored credential anywhere.

This skill is the *procedure*. The reasoning behind each choice — what
was considered, what it costs, what it trades — is in
[reference-platform.md](reference-platform.md), and you should read it
before defending or changing any of these choices. The exact commands the
account owner must run are in [handoff-runbook.md](handoff-runbook.md).

`infrastructure` owns everything here except the build and deploy steps
of the workflows, which are `devops`'s. That boundary is the one in both
lane definitions; this skill does not move it.

## The shape

```
GitHub repo ──OIDC──► Azure          (no stored cloud credentials)
   │
   ├─► Static Web Apps (Free)         one per game, static build only
   │
   └─► Functions (Flex Consumption)   one, shared by every game
          │  system-assigned identity, no connection strings
          ▼
       Storage: Tables (saves) + Blobs (large assets)

   Entra External ID tenant           one, shared; free to 50k MAU
```

Two layers, and the split is load-bearing:

- **Shared platform**, one resource group: identity tenant, storage,
  the API, the budget. Built once, outlives any individual game.
- **Per game**, one resource group each: a single Static Web App.
  Deleting that resource group removes the game and touches nothing
  else. That is the whole reason a game gets its own group.

## 1. Write the platform guide first — owner: `infrastructure`

`infrastructure` refuses to design against an absent spec, and this is
that spec. Copy [platform-guide-template.md](platform-guide-template.md)
into the project (conventionally `docs/platform-guide.md`), fill in every
`[bracketed]` placeholder, and name it in the project's root orientation
doc so the lane can find it.

An unfilled guide is worse than none: the lane will read the placeholder
as the decision.

**Done when:** every placeholder is resolved and the guide names the
subscription posture, the identity model, and the budget.

## 2. Stand up the account — owner: **the human**, not a lane

Nothing in this step is a lane's to do, and rule 4 of `infrastructure`
says so: there is no tenant, no subscription and no credential in an
agent's environment, and inventing one to get further is a failure, not
initiative.

Give the owner [handoff-runbook.md](handoff-runbook.md) and let them run
it. It covers the subscription choice, the consumer identity tenant
(which is portal-only — it cannot be expressed as infrastructure-as-code),
the app registrations, and the federated credential for CI.

**Done when:** the owner reports back a subscription ID, a tenant ID, and
two client IDs. Record them as *placeholders* in the guide — rule 5: real
identifiers never enter the repo, not in examples and not in comments.

## 3. Scaffold the infrastructure — owner: `infrastructure`

Copy `assets/infra/` into the project as `infra/`, and
`assets/workflows/` into `.github/workflows/`. Adjust names and the
game list; do not restructure the modules without a recorded decision.

Then, before handing anything over:

```
az bicep build --file infra/main.bicep
az deployment sub what-if --location <region> --template-file infra/main.bicep --parameters infra/main.bicepparam
```

The templates shipped here have **never been compiled and never
deployed** — they were authored without an Azure toolchain available. Both
commands above are therefore first runs, not re-runs, and the first one
will find things. Say in your handback which of the two you actually ran
and what it reported; do not call the templates working on the strength
of having read them.

**Done when:** the template compiles, the what-if output is reviewed, and
the handback states what was verified and what was not.

## 4. Wire authentication — owner: `infrastructure`, with `engineer`

Authentication happens **in the game, not in the host**. The browser runs
MSAL against the identity tenant; the API validates the resulting token.
The static host is never configured as an auth provider.

This looks like the long way round. It is the *cheap* way round, and
[reference-platform.md](reference-platform.md) has the arithmetic: the
obvious wiring costs a fixed monthly fee per game, and this one costs
nothing at any number of games. Do not "simplify" it back without reading
that section — this is the single most expensive mistake available here.

The client-side MSAL wiring is application code and therefore
`engineer`'s. Specify it precisely — tenant, authority, client ID, scopes,
redirect URIs — and hand it over. Do not write it yourself (rule 10).

**Done when:** an unauthenticated call to the API is rejected, and a
signed-in player's call reaches their own data and no one else's.

## 5. Ship the guardrails with the platform, not after it

Rule 7: an unbudgeted environment is incomplete. Three things, all in the
same deployment as everything else:

- A subscription budget with alerts well below the pain threshold.
- A daily ingestion cap on telemetry. Uncapped log ingestion is the most
  common surprise bill on a hobby subscription by a wide margin.
- The subscription spending limit left **on**. Budgets only send mail;
  they have never stopped a charge. The spending limit actually disables
  paid services when credit runs out — for a playground, a game going
  offline is the correct failure mode and an unbounded bill is not.

**Done when:** the budget exists, telemetry is capped, and the guide
states what happens when credit is exhausted.

## Rules

1. **Free tier is a design constraint, not a starting point.** Every
   service here was chosen because its free grant covers this workload
   permanently. A change that leaves the free tier is a recorded
   decision with a number attached, not a convenience.
2. **Large assets never ship inside the site bundle.** Sprites, audio and
   video go to blob storage and are fetched at runtime. Static hosting
   has a per-app size cap and a monthly egress allowance, and a game is
   the one workload that will find both. This is the difference between
   this platform and a generic web-app platform.
3. **No connection strings.** The API reaches storage as a managed
   identity holding a named data-plane role. If something appears to need
   a stored credential, that is a design question, not an app setting.
4. **One identity tenant, many games.** A second tenant means a second
   sign-up for the same player and a second thing to configure wrong.
   Each game is an app registration in the one tenant.
5. **Scope the federated credential to a branch or environment.** A
   wildcard subject makes the whole mechanism decorative — that is rule
   2 of `infrastructure`, and it fails silently, which is why it is worth
   repeating here.
6. **Preview environments are finite.** The free static hosting tier caps
   concurrent pre-production environments. A workflow that opens one per
   pull request and never closes one will hit that cap and start failing
   deploys with an error that does not mention the cap.
