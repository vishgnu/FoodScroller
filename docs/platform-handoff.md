# Owner runbook

Everything here is the account owner's to run. `infrastructure` rule 4:
an agent has no tenant, no subscription and no credential, and inventing
one to get further is a failure rather than initiative. An agent's job is
to produce this list and then stop.

Work top to bottom. Steps 1 and 2 cannot be expressed as
infrastructure-as-code — consumer identity tenants and app registrations
are not resources the templating layer can create — which is why they are
prose while everything after them is not.

Replace every `[BRACKETED]` value. None of them belong in the repository.

---

## 1. The subscription

**Use a credit-bearing subscription and leave the spending limit on.**

The spending limit is the only mechanism here that actually stops a
charge; budgets send mail and nothing else. With it on, paid services are
disabled when the credit runs out and free-tier services keep running —
for a playground that is the behaviour you want, and it is the wrong
behaviour for anything with real users. A subscription with a *recurring*
monthly credit beats a one-off trial credit, because the limit keeps
working after a trial period would have lapsed.

- [ ] Confirm the subscription is credit-bearing and the spending limit
      reads as enabled.
- [ ] Note the subscription ID somewhere outside this repository.

Verify:

```
az account show --query "{name:name, id:id, state:state}" -o table
```

---

## 2. The player identity tenant

Players sign in against a **consumer identity tenant**, which is a
separate tenant from the one the subscription lives in. One tenant serves
every game; a second tenant means a second sign-up for the same person
and a second thing to configure wrong.

- [ ] Create an external-facing tenant in the portal, in a region close
      to the players.
- [ ] Link it to the subscription from step 1 for billing. It stays free
      below the monthly-active-user threshold; linking is what stops it
      expiring, not what starts charging.
- [ ] Add the sign-in methods: email with one-time passcode at minimum,
      plus any social providers wanted. Each social provider needs its own
      registration with that provider — budget time for it.
- [ ] Create the sign-up and sign-in user flow and note its name.
- [ ] Note the tenant ID.

---

## 3. Register the game and the API

In the tenant from step 2:

- [ ] Register the game as a **single-page application**.
- [ ] Redirect URIs: the production hostname, plus `http://localhost:[PORT]`
      for local development. Add pre-production hostnames as they appear.
- [ ] Expose an API scope on the same registration, e.g. `access_as_user`,
      and grant the SPA consent to it.
- [ ] Note the client ID and the application ID URI — the URI is what the
      API validates the token audience against.

```
# Run against the player tenant, not the subscription's tenant.
az login --tenant [CIAM_TENANT_ID] --allow-no-subscriptions

az ad app create \
  --display-name "[GAME_NAME]" \
  --sign-in-audience AzureADandPersonalMicrosoftAccount \
  --spa-redirect-uris "https://[GAME_HOSTNAME]" "http://localhost:[PORT]"
```

---

## 4. Register the deployment identity

In the **subscription's own tenant**, not the player tenant.

- [ ] Register an application for CI and create a service principal for it.
- [ ] Add **four** federated credentials, one per GitHub environment used
      by the workflows. Four rather than one wildcard because a wildcard
      subject makes the whole mechanism decorative — any workflow in any
      branch could then assume this identity.

| Environment | Subject |
|---|---|
| `plan` | `repo:[OWNER]/[REPO]:environment:plan` |
| `preview` | `repo:[OWNER]/[REPO]:environment:preview` |
| `production` | `repo:[OWNER]/[REPO]:environment:production` |
| `infrastructure` | `repo:[OWNER]/[REPO]:environment:infrastructure` |

```
az ad app create --display-name "[PROJECT]-ci"
# then, per environment:
az ad app federated-credential create \
  --id [CI_CLIENT_ID] \
  --parameters '{
    "name": "gh-production",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:[OWNER]/[REPO]:environment:production",
    "audiences": ["api://AzureADTokenExchange"]
  }'
```

- [ ] Assign **Contributor at the subscription scope** — required, because
      the deployment creates resource groups, which cannot be done from
      inside one. This is the widest grant in the whole design; it is here
      because nothing narrower creates a resource group, and it is worth
      re-reading before accepting. Never Owner: Owner adds the ability to
      grant roles, which a deployment identity has no reason to hold.

```
az role assignment create \
  --assignee [CI_CLIENT_ID] \
  --role Contributor \
  --scope /subscriptions/[SUBSCRIPTION_ID]
```

---

## 5. GitHub configuration

- [ ] Create the four environments: `plan`, `preview`, `production`,
      `infrastructure`.
- [ ] Put **required reviewers on `infrastructure`**. It is the only human
      gate between a typo in a template and a resource group that no longer
      exists.
- [ ] Add these as repository **variables**, not secrets. They are
      identifiers, not credentials — nothing here can be used to
      authenticate on its own. They live in GitHub rather than in the repo
      because rule 5 keeps real identifiers out of version control.

| Variable | Value |
|---|---|
| `AZURE_CLIENT_ID` | `[CI_CLIENT_ID]` |
| `AZURE_TENANT_ID` | `[TENANT_ID]` |
| `AZURE_SUBSCRIPTION_ID` | `[SUBSCRIPTION_ID]` |
| `CIAM_TENANT_ID` | `[CIAM_TENANT_ID]` |
| `API_AUDIENCE` | `api://[GAME_CLIENT_ID]` |
| `BUDGET_ALERT_EMAIL` | `[YOUR_EMAIL]` |

There are no repository secrets. If one appears, something regressed.

---

## 6. First deployment

The three parameters that must never live in the repo are passed on the
command line, exactly as `.github/workflows/infra.yml` passes them. Without
these overrides the bracketed placeholders in `main.bicepparam` reach Azure
as literal strings.

```
az bicep build --file infra/main.bicep

az deployment sub what-if \
  --location [REGION] \
  --template-file infra/main.bicep \
  --parameters infra/main.bicepparam \
  --parameters ciamTenantId='[CIAM_TENANT_ID]' \
               apiAudience='api://[GAME_CLIENT_ID]' \
               budgetAlertEmails='["[YOUR_ALERT_EMAIL]"]'
```

Read the what-if output before applying. Then either merge a change under
`infra/` to let the workflow apply it, or apply once by hand to bootstrap:

```
az deployment sub create \
  --location [REGION] \
  --name bootstrap \
  --template-file infra/main.bicep \
  --parameters infra/main.bicepparam \
  --parameters ciamTenantId='[CIAM_TENANT_ID]' \
               apiAudience='api://[GAME_CLIENT_ID]' \
               budgetAlertEmails='["[YOUR_ALERT_EMAIL]"]'
```

- [ ] Add the resulting static site hostnames to the game registration's
      redirect URIs (step 3) — they do not exist until this deployment has
      run, which is why this step is last and not part of step 3.

---

## 7. Prove it

Not "it deployed". These four:

- [ ] An unauthenticated call to the API is rejected. The API workflow
      asserts this on every deploy, but confirm it once by hand.
- [ ] A signed-in player can read and write their own record.
- [ ] A signed-in player **cannot** reach another player's record. Test
      this with two accounts; it is the one failure that looks like success
      from a single account.
- [ ] The budget exists and the telemetry daily cap is set.

```
az consumption budget list -o table
az monitor log-analytics workspace show \
  --resource-group [PLATFORM_RG] --workspace-name [WORKSPACE] \
  --query "workspaceCapping.dailyQuotaGb"
```

---

## Known gaps

- Steps 1–3 are manual and stay manual. The identity layer is not
  ARM-templatable.
- The CI identity holds subscription-scope Contributor (step 4). Narrowing
  it means pre-creating resource groups by hand and changing the deployment
  from subscription scope to resource-group scope — a real option, traded
  against never being able to add a game without a manual step first.
- The Bicep in this skill was authored without an Azure toolchain
  available: it has never been compiled and never deployed. Step 6 is
  where both of those change, and it is the reason step 6 begins with
  `az bicep build` rather than going straight to what-if.
- Role definition IDs in `modules/platform.bicep` are the well-known
  built-in ones but were not verified against a live tenant. Check them in
  the what-if output before applying; the wrong ID fails quietly.
