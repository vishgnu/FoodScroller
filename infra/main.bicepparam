using 'main.bicep'

// Placeholders only. Real tenant, subscription and client IDs never enter
// this repo — infrastructure rule 5. Supply them at deploy time from
// wherever the project's platform guide says the real values live.

param projectName = 'aigames'
param location = 'westeurope'
param environment = 'prod'

param games = [
  'foodscroller'
]

param budgetAmount = 5
param budgetAlertEmails = [
  '[YOUR_ALERT_EMAIL]'
]
// Not an identifier, and nothing overrides it at deploy time — infra.yml
// passes ciamTenantId, apiAudience and budgetAlertEmails, not this. Left
// bracketed it reaches Azure as the literal string and the budget fails.
param budgetStartDate = '2026-09-01'
param telemetryDailyCapGb = '0.1'

param ciamTenantId = '[CIAM_TENANT_ID]'
param apiAudience = 'api://[GAME_CLIENT_ID]'
