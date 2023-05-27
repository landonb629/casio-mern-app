
// log analytics workspace 
resource "azurerm_log_analytics_workspace" "casino-monitoring" { 
  name = var.log-analytics-name 
  location = var.location 
  resource_group_name = data.azurerm_resource_group.rg.name 
  sku = "PerGB2018"
  retention_in_days = 30
}
// container app environment
/*
resource "azurerm_container_app_environment" "casino-app-env" { 
  name = var.app_env 
  location = "eastus"
  log_analytics_workspace_id = azurerm_log_analytics_workspace.casino-monitoring.id 
  resource_group_name = data.azurerm_resource_group.rg.name 
  infrastructure_subnet_id = data.azurerm_subnet.app.id
  internal_load_balancer_enabled = false 
}
*/

// frontend container app
resource "azapi_resource" "frontend-container-app" { 
  type = "Microsoft.App/containerApps@2022-03-01"
  parent_id = data.azurerm_resource_group.rg.id 
  location = data.azurerm_resource_group.rg.location 
  name = var.frontend_name
  
  body = jsonencode({
    properties = {
      managedEnvironmentId = "/subscriptions/f80dea2d-81bb-442f-a102-d86eb72cb7d6/resourceGroups/casino-mern-app/providers/Microsoft.App/managedEnvironments/casino-app-env"//azurerm_container_app_environment.casino-app-env.id
      configuration = {
        ingress = {
          allowInsecure = true
          external = true
          targetPort = var.container_port  
        },
        secrets = [ 
          { name = "acr-password", value = "anDls35eho1YtNKUA6lpAZmil4IFWg404lLyEpM/Si+ACRBGIXTV"}
        ]
        registries = [ 
          {
            server = "casinomernregistry.azurecr.io",
            username = "casinoMernRegistry",
            passwordSecretRef = "acr-password"
          }
        ]
      }
      template = {
        containers = [
          {
            name = var.frontend_name
            image = var.frontend_image
            resources = {
              cpu = 1 
              memory = "2.0Gi"
            }
          }
        ]
      }
    }
  })
 # depends_on = [ 
  #  azurerm_container_app_environment.casino-app-env
 # ]
}
// backend container app 
resource "azapi_resource" "backed-container-app" { 
  type = "Microsoft.App/containerApps@2022-03-01"
  parent_id = data.azurerm_resource_group.rg.id 
  location = data.azurerm_resource_group.rg.location 
  name = var.backend-name 

  body = jsonencode({
    properties = {
      managedEnvironmentId = "/subscriptions/f80dea2d-81bb-442f-a102-d86eb72cb7d6/resourceGroups/casino-mern-app/providers/Microsoft.App/managedEnvironments/casino-app-env"//azurerm_container_app_environment.casino-app-env.id
      configuration = {
        ingress = {
          external = false 
          allowInsecure = true 
          targetPort = var.container_port
        },
        secrets = [ 
          { name = "acr-password", value = "anDls35eho1YtNKUA6lpAZmil4IFWg404lLyEpM/Si+ACRBGIXTV"}
        ],
        registries = [ 
          {
            server = "casinomernregistry.azurecr.io",
            username = "casinoMernRegistry",
            passwordSecretRef = "acr-password"
          }
        ]
      }
      template = {
        containers = [
          { 
            name = "casinoapi"
            image = var.backend_image
            resources = {
              cpu = 1 
              memory = "2.0Gi"
            }
            env = [
              { name = "PASSENGER_APP_ENV",value=  "production"},
              { name = "DB_NAME", value = "casino"},
              { name = "DB_HOST", value = "casino-db.mongo.cosmos.azure.com"},
              { name = "DB_USERNAME", value = "casino-db"},
              { name = "DB_PASSWORD", value = "TWlhRpPIlgHQiJdgSywT766DCJAedLff2VdcSav2PyVFCMYgGdEGJ8N7Jor33VndQcH947dxrjoQACDbJoyqbQ=="},
              { name = "DB_PORT", value = "10255"}
            ] 
          }
        ]
      }
    }
  })
 # depends_on = [
  #  azurerm_container_app_environment.casino-app-env
 # ]
}

// data sources 
data "azurerm_resource_group" "rg" {
  name = var.rg_name
}

data "azurerm_user_assigned_identity" "casino-mern" {
  name = "casino-mern-identity"
  resource_group_name = var.rg_name
}

data "azurerm_subnet" "app" { 
  name = "app"
  virtual_network_name = "casino-mern-app-vnet"
  resource_group_name = "casino-mern-app"
}

// https://github.com/DFE-Digital/terraform-azurerm-container-apps-hosting/blob/main/container-app.tf