# Platform guide — v[N]

This is the canonical spec for what [project]'s platform *is*: the cloud
account it lives in, how a player proves who they are, where their data
sits, what runs the code, and what stops it costing money. It is kept
separate from the `infrastructure` and `devops` agent definitions on
purpose — those are portable across projects, and this is not.

**Precedence:** if this doc and an agent definition disagree, this doc
wins for anything about *what the platform should be*; the agent
definition wins for *where files live, what tooling is allowed, and what
a lane may not do*. A recorded decision in `docs/decisions/` beats both.

Status: **[current | draft | superseded by vN]** — [one line on where
this version came from and what changed].

Bump the version whenever a change here would make existing
infrastructure wrong, and say so in the decision that caused it.

## Identifiers

Real tenant, subscription, client and object IDs **never appear in this
repo**, including in examples and comments. Name each value and say where
the real one lives.

| Value | Placeholder | Where the real one lives |
|---|---|---|
| Tenant (workforce) | `[TENANT_ID]` | [e.g. the owner's password manager] |
| Tenant (players) | `[CIAM_TENANT_ID]` | [...] |
| Subscription | `[SUBSCRIPTION_ID]` | [...] |
| CI app registration | `[CI_CLIENT_ID]` | [...] |
| Game app registration | `[GAME_CLIENT_ID]` | [...] |

## Subscription and cost posture

[Which subscription type, and whether the spending limit is on.] State
explicitly what happens when credit is exhausted — whether services stop
or the bill continues — because that is the single most consequential
property of this platform and it is invisible from the code.

[Budget amount, alert thresholds, and who the alerts reach.] Budgets
notify; they do not stop spending. If something here relies on spending
actually stopping, say which mechanism does it.

[Telemetry retention and daily ingestion cap.]

## Environment layout

[How environments are separated — subscriptions, resource groups, or
tags — and which resources are shared across all games versus owned by
one.] Sharing an app registration across environments defeats the
subject scoping that makes federated credentials worth having, so if
anything is shared, say why and what the blast radius is.

| Resource group | Holds | Shared or per-game |
|---|---|---|
| `[rg-name]` | [...] | [...] |

## Identity model

[Who signs in, from which tenant, against which app registration, and by
what flow.] Say whether the host or the application performs the
authentication — they are different architectures with different costs
and they are not interchangeable later.

[Redirect URIs, scopes, and the token audience the API validates.]

[Which principal the API runs as and which named data-plane roles it
holds, at what scope.] "Appropriate permissions" is not a specification;
name the role.

## Hosting and runtime

[What serves the built game, on which plan, in which region.]

[What runs server-side code, on which plan, and how it authenticates to
storage.]

[Any plan limit this project is expected to approach — app counts,
egress, bundle size, concurrent pre-production environments — and what
happens when it does.]

## Data

[What is stored, in what service, keyed how, and how a player's own
records are isolated from another player's.]

[Where large assets live and how they are served.] Assets in the site
bundle rather than in storage is the failure mode this section exists to
prevent.

[Backup and deletion posture, including what happens to a player's data
if they stop playing.]

## Deployment

[Which repository, which branches, which workflows, and what each one
deploys.]

[How CI authenticates, and the exact subject scoping of any federated
credential.] A wildcard subject makes federated identity decorative.

[What is deployed automatically and what requires a human.]

## Handoff boundary

[Exactly what the account owner runs by hand and what an agent may run.]
By default `infrastructure` applies nothing — it produces reviewed
infrastructure-as-code and the owner runs it. If this project grants a
lane real provisioning authority, say so here explicitly and name its
scope; the lane will not infer the grant from credentials merely being
present.

## Known gaps

[What is not automated, not verified, or knowingly wrong, and why.] A gap
recorded here is a decision; a gap discovered later is an incident.
