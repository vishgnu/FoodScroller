// The shared platform: storage, telemetry, and the one API every game calls.
// Built once and outlives any individual game.

@minLength(3)
@maxLength(10)
param projectName string
param location string
param environment string
param telemetryDailyCapGb string
param ciamTenantId string
param apiAudience string

@description('Game origins allowed to call the API cross-origin.')
param allowedOrigins array

// Storage account names are globally unique, lowercase alphanumeric, <= 24 chars.
var suffix = take(uniqueString(resourceGroup().id), 6)
var dataStorageName = 'st${projectName}data${suffix}'
var funcStorageName = 'st${projectName}fn${suffix}'

// Well-known built-in role definition IDs. Verify against the current role
// reference before deploying; assigning the wrong one fails open, quietly.
var storageBlobDataContributor = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'
var storageBlobDataOwner = 'b7e6dc6d-f1e8-4753-8033-0f276bb0955b'
var storageTableDataContributor = '0a9a7e1f-b9d0-4cc4-a60d-0319b160aaa3'

// Player data. Shared-key access is disabled outright: with it off, a
// connection string is not merely discouraged, it does not work.
resource dataStorage 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: dataStorageName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    allowBlobPublicAccess: false
    allowSharedKeyAccess: false
    publicNetworkAccess: 'Enabled'
  }
}

resource tableService 'Microsoft.Storage/storageAccounts/tableServices@2023-05-01' = {
  parent: dataStorage
  name: 'default'
}

resource playerStateTable 'Microsoft.Storage/storageAccounts/tableServices/tables@2023-05-01' = {
  parent: tableService
  name: 'playerstate'
}

resource dataBlobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: dataStorage
  name: 'default'
}

// Sprites, audio, video. These do NOT belong in the site bundle: static
// hosting has a per-app size cap and a monthly egress allowance, and a game
// is the workload that finds both.
resource assetsContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: dataBlobService
  name: 'assets'
  properties: {
    publicAccess: 'None'
  }
}

// Runtime storage for the function app, kept separate from player data so a
// data-plane role grant can never reach runtime state.
//
// allowSharedKeyAccess is left enabled here and disabled on the data account.
// Identity-based runtime connections are supported on this plan; this is the
// one place that has historically still wanted a key. Try flipping it to
// false and redeploying — if the app still starts, leave it off.
resource funcStorage 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: funcStorageName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    allowBlobPublicAccess: false
    allowSharedKeyAccess: true
    publicNetworkAccess: 'Enabled'
  }
}

resource funcBlobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: funcStorage
  name: 'default'
}

resource deploymentContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: funcBlobService
  name: 'app-package'
  properties: {
    publicAccess: 'None'
  }
}

resource workspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: 'log-${projectName}-${environment}'
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
    // The guardrail that matters most here. Uncapped ingestion produces a
    // bill unrelated to how many people played.
    workspaceCapping: {
      dailyQuotaGb: json(telemetryDailyCapGb)
    }
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: 'appi-${projectName}-${environment}'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: workspace.id
  }
}

resource plan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: 'asp-${projectName}-${environment}'
  location: location
  kind: 'functionapp'
  sku: {
    name: 'FC1'
    tier: 'FlexConsumption'
  }
  properties: {
    reserved: true
  }
}

resource functionApp 'Microsoft.Web/sites@2023-12-01' = {
  name: 'func-${projectName}-api-${environment}'
  location: location
  kind: 'functionapp,linux'
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: plan.id
    httpsOnly: true
    functionAppConfig: {
      deployment: {
        storage: {
          type: 'blobContainer'
          value: '${funcStorage.properties.primaryEndpoints.blob}${deploymentContainer.name}'
          authentication: {
            type: 'SystemAssignedIdentity'
          }
        }
      }
      scaleAndConcurrency: {
        // Deliberately the floor, not a performance setting: it bounds how
        // much a runaway loop can cost before anyone notices.
        maximumInstanceCount: 40
        instanceMemoryMB: 2048
      }
      runtime: {
        name: 'node'
        version: '20'
      }
    }
    siteConfig: {
      minTlsVersion: '1.2'
      cors: {
        allowedOrigins: allowedOrigins
        supportCredentials: false
      }
      appSettings: [
        {
          // Account name, not a connection string. The identity does the rest.
          name: 'AzureWebJobsStorage__accountName'
          value: funcStorage.name
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
        {
          name: 'DATA_STORAGE_ACCOUNT'
          value: dataStorage.name
        }
        {
          name: 'DATA_TABLE_NAME'
          value: playerStateTable.name
        }
        {
          // Token validation inputs. The API rejects anything not issued by
          // this tenant for this audience.
          name: 'ENTRA_TENANT_ID'
          value: ciamTenantId
        }
        {
          name: 'ENTRA_AUDIENCE'
          value: apiAudience
        }
      ]
    }
  }
}

// Least privilege, named explicitly (infrastructure rule 3): data-plane
// roles on the data account only, scoped to that account and nothing wider.
resource tableRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(dataStorage.id, functionApp.id, storageTableDataContributor)
  scope: dataStorage
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', storageTableDataContributor)
    principalId: functionApp.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

resource blobRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(dataStorage.id, functionApp.id, storageBlobDataContributor)
  scope: dataStorage
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', storageBlobDataContributor)
    principalId: functionApp.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

// Owner rather than Contributor on the runtime account: the platform manages
// the deployment package container itself and needs to create blobs in it.
resource runtimeStorageRole 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(funcStorage.id, functionApp.id, storageBlobDataOwner)
  scope: funcStorage
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', storageBlobDataOwner)
    principalId: functionApp.identity.principalId
    principalType: 'ServicePrincipal'
  }
}

output functionAppName string = functionApp.name
output functionAppUrl string = 'https://${functionApp.properties.defaultHostName}'
output functionAppPrincipalId string = functionApp.identity.principalId
output dataStorageAccountName string = dataStorage.name
output assetsContainerName string = assetsContainer.name
