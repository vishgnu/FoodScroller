// Subscription-scope entry point: resource groups, the shared platform,
// one static site per game, and the budget.
//
// NOT DEPLOYED. Compile and review before handing this to an owner:
//   az bicep build --file infra/main.bicep
//   az deployment sub what-if --location <region> \
//     --template-file infra/main.bicep --parameters infra/main.bicepparam

targetScope = 'subscription'

@description('Short project prefix. Lowercase letters and digits only — it becomes part of globally unique storage account names.')
@minLength(3)
@maxLength(10)
param projectName string

@description('Region for every resource. The free static-hosting tier is only offered in a subset of regions; check availability before changing this.')
param location string = 'westeurope'

@description('Environment discriminator. Each environment gets its own resource groups and its own app registrations — sharing one registration across environments defeats federated-credential subject scoping.')
@allowed([ 'dev', 'prod' ])
param environment string = 'prod'

@description('Game slugs. One resource group and one free static site per entry, so deleting a game is deleting a resource group. The free tier caps static sites per subscription — see reference-platform.md before exceeding it.')
param games array = []

@description('Monthly budget in the billing currency. This ALERTS ONLY. Budgets have never stopped a charge; the subscription spending limit is what does that.')
param budgetAmount int = 5

@description('Addresses that receive budget alerts.')
param budgetAlertEmails array

@description('First day of the month the budget period starts, as YYYY-MM-01.')
param budgetStartDate string

@description('Daily telemetry ingestion cap in GB, as a string so a fraction can be passed. Uncapped ingestion is the most common surprise bill on a hobby subscription.')
param telemetryDailyCapGb string = '0.1'

@description('Placeholder for the consumer identity tenant ID. Supply at deploy time — never commit the real value (infrastructure rule 5).')
param ciamTenantId string

@description('Audience the API validates bearer tokens against, e.g. api://[GAME_CLIENT_ID].')
param apiAudience string

var platformRgName = 'rg-${projectName}-platform-${environment}'

resource platformRg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: platformRgName
  location: location
}

resource gameRgs 'Microsoft.Resources/resourceGroups@2024-03-01' = [for game in games: {
  name: 'rg-${projectName}-${game}-${environment}'
  location: location
}]

module gameSites 'modules/game.bicep' = [for (game, i) in games: {
  name: 'game-${game}'
  scope: gameRgs[i]
  params: {
    projectName: projectName
    gameName: game
    location: location
    environment: environment
  }
}]

module platform 'modules/platform.bicep' = {
  name: 'platform'
  scope: platformRg
  params: {
    projectName: projectName
    location: location
    environment: environment
    telemetryDailyCapGb: telemetryDailyCapGb
    ciamTenantId: ciamTenantId
    apiAudience: apiAudience
    // The API is called cross-origin by each game, because the static host
    // deliberately does not proxy it — see reference-platform.md.
    allowedOrigins: [for (game, i) in games: 'https://${gameSites[i].outputs.defaultHostname}']
  }
}

// Alerts only. Present because infrastructure rule 7 treats an unbudgeted
// environment as incomplete, not because it caps anything.
resource budget 'Microsoft.Consumption/budgets@2023-05-01' = {
  name: 'budget-${projectName}-${environment}'
  properties: {
    category: 'Cost'
    amount: budgetAmount
    timeGrain: 'Monthly'
    timePeriod: {
      startDate: budgetStartDate
    }
    notifications: {
      actual50: {
        enabled: true
        operator: 'GreaterThan'
        threshold: 50
        contactEmails: budgetAlertEmails
        thresholdType: 'Actual'
      }
      actual90: {
        enabled: true
        operator: 'GreaterThan'
        threshold: 90
        contactEmails: budgetAlertEmails
        thresholdType: 'Actual'
      }
      forecast100: {
        enabled: true
        operator: 'GreaterThan'
        threshold: 100
        contactEmails: budgetAlertEmails
        thresholdType: 'Forecasted'
      }
    }
  }
}

output platformResourceGroup string = platformRg.name
output functionAppName string = platform.outputs.functionAppName
output apiBaseUrl string = platform.outputs.functionAppUrl
output dataStorageAccount string = platform.outputs.dataStorageAccountName
output gameHostnames array = [for (game, i) in games: gameSites[i].outputs.defaultHostname]
