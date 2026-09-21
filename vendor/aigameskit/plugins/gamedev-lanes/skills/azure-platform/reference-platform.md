# Why this platform looks like this

The reasoning behind the choices in `SKILL.md`. Read this before changing
one of them, and before defending one to someone who thinks it is
overcomplicated — several of them look wrong until you see the number
attached.

Every figure here was correct when written and none of them are
contractual. Re-check the pricing calculator before committing; a free
grant is a business decision someone else can revise.

## The workload

A handful of browser games, each a static build. Players sign in. Each
player has a small amount of state — saves, settings, scores. Traffic is
hobby-scale: tens of users, not thousands, and long idle stretches. No
availability requirement worth the name. Cost matters more than uptime,
which is an unusual constraint and it drives most of what follows.

## The bill

| Piece | Service | Plan | Free grant | Cost here |
|---|---|---|---|---|
| Game hosting | Static Web Apps | Free | 100 GB egress/mo, custom domain + TLS | $0 |
| Player sign-in | Entra External ID | — | first 50,000 monthly active users | $0 |
| API | Functions | Flex Consumption | 250k executions + 100k GB-s/mo per subscription | $0 |
| Player saves | Storage, Tables | Standard LRS | — | cents |
| Large assets | Storage, Blobs | Standard LRS | — | cents |
| Secrets | none | — | — | $0 |

Realistically zero to a dollar a month. Not "affordable" — actually
nothing, provided the two ceilings below are respected.

## The expensive mistake

Static Web Apps has built-in authentication, and wiring it to a consumer
identity tenant is the obvious thing to do. It is also the one decision
here that costs real money.

Built-in auth covers a small set of preconfigured providers at no charge.
A consumer identity tenant is not one of them — it connects as a *custom*
OpenID Connect provider, and custom providers require the Standard
hosting plan. That plan is a flat monthly fee **per app, per active
environment**. Five games with a preview environment each is ten billable
units for something that is otherwise free.

So authentication does not live in the host. The browser authenticates
directly against the identity tenant with MSAL, and the API validates the
bearer token itself. The static host serves files and knows nothing about
who is asking. Every game stays on the free plan permanently, at any
number of games.

What it costs instead: an auth module somebody has to write — MSAL
configuration, token acquisition, a validation middleware, CORS. Once,
for the kit, not once per game. That is the entire trade.

The preconfigured-provider route is still the right answer for a
throwaway — it is twenty minutes and no identity tenant at all — but it
only admits players who already hold an account with one of those
providers. It cannot take a public sign-up. Choosing it is choosing a
rewrite of the client auth layer later, in every game, because the two
approaches expose the signed-in user through entirely different
mechanisms.

## Two ceilings

**Free static web apps are capped per subscription**, and the cap cannot
be raised — not by a support plan, not by asking. For a kit whose purpose
is to produce many games, that is the real limit on how many games can
exist before something has to change. When it is reached: host several
games as paths under one app, or add a second subscription. Decide which
before it happens, because the error arrives at deploy time.

**Telemetry ingestion is uncapped by default.** It is the most common way
a hobby subscription produces a bill that has nothing to do with traffic.
Set a daily cap at provisioning time.

## Why the API is separate from the host

Static Web Apps can host an API itself. On the free plan that API cannot
hold a managed identity — which means it reaches storage with a
connection string, a long-lived secret, and `infrastructure` rule 2 says
no. Linking an external function app instead is a paid-plan feature.

A function app that is simply *not linked to the host at all* sidesteps
both. The browser calls it directly, cross-origin, with the same bearer
token it already has. It holds a managed identity because it is an
ordinary function app. Nothing is paid for and nothing is stored.

The cost is CORS configuration and a cold start of a few seconds on the
first call after an idle period. For a game that already has a loading
screen, the cold start is free in practice.

## Why Flex Consumption rather than Consumption

The older Consumption plan has a four-times-larger free execution grant.
Flex Consumption was chosen anyway, because it supports identity-based
storage connections end to end, and the older plan still requires a
stored connection string for its content share on Linux — one secret,
in exactly the place this design is trying to have none.

The grant that was given up is not a real constraint: the smaller one is
still roughly eight thousand calls a day, every day, and this workload
will not approach it. If it ever does, the free grant is the wrong thing
to be optimising.

## Storage: tables, not a document database

Player state is key-value by player, read and written one record at a
time. Tables handle that for a fraction of a cent and support the same
role-based, identity-based access as everything else.

A document database is the obvious alternative and its free tier is
generous, but: it is one free-tier account per subscription — a scarce
resource shared across every game, which makes it a coordination problem
the moment there is a second game — and its free tier does not apply to
the serverless mode, which is the mode that actually suits spiky hobby
traffic. Reach for it only when a game genuinely needs querying, and
record the decision when you do.

## Cost control that actually works

Budgets do not stop spending. They send mail. This is documented,
frequently misread, and the misreading is how hobby subscriptions produce
surprising bills.

What does stop spending is the **subscription spending limit**, available
on credit-based subscriptions. When the credit is exhausted, paid
services are disabled for the rest of the period. Free-tier services keep
running.

For a playground that is the correct behaviour: a game going offline is
recoverable, and an unbounded bill is not. It is the wrong behaviour for
anything with users who matter, which is worth stating plainly in the
project's guide so nobody inherits the setting without the reasoning.

A subscription carrying a recurring monthly credit is strictly better
than a one-off trial credit here, because the limit keeps working after
the trial period would have ended.

## What is not here, and why

- **No load balancer, no multi-region, no CDN tier.** Static hosting is
  already globally distributed at the free tier. Everything else on that
  list is availability engineering for a workload that has no
  availability requirement.
- **No key vault.** It exists to store secrets. There are none.
- **No container platform.** Its free grant is generous and it is the
  right answer for a long-running process, but none of this is
  long-running. A function that runs when a player saves is a better fit
  and a smaller thing to operate.
- **No infrastructure-as-code for the identity tenant.** Consumer
  identity tenants and app registrations are not resources the ARM
  templating layer can create; they are portal and Graph operations.
  This is a genuine gap in the automation, not an oversight, and it is
  why the runbook exists as prose.
