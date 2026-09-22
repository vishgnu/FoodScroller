// One game: a single free static site, alone in its own resource group so
// that deleting the game is deleting the group.

@minLength(3)
@maxLength(10)
param projectName string
param gameName string
param location string
param environment string

resource site 'Microsoft.Web/staticSites@2023-12-01' = {
  name: 'stapp-${projectName}-${gameName}-${environment}'
  location: location
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    // No repositoryUrl / repositoryToken on purpose. Wiring the repository
    // here mints a long-lived deployment token, which is exactly what the
    // federated-credential setup in the workflows exists to avoid.
    allowConfigFileUpdates: true
    // Finite on this tier. A workflow that opens a pre-production
    // environment per pull request and never closes one will hit the cap and
    // fail deploys with an error that does not mention the cap.
    stagingEnvironmentPolicy: 'Enabled'
  }
}

output staticSiteName string = site.name
output defaultHostname string = site.properties.defaultHostname
