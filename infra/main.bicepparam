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
param budgetStartDate = '[YYYY-MM-01]'
param telemetryDailyCapGb = '0.1'

param ciamTenantId = '[CIAM_TENANT_ID]'
param apiAudience = 'api://[GAME_CLIENT_ID]'
