// frontend container app
resource "azapi_resource" "frontend-container-app" { 
  type = "Microsoft.App/containerApps@2022-03-01"
  parent_id = data.azurerm_resource_group.rg.id 
  location = data.azurerm_resource_group.rg.location 
  name = var.frontend_name
  
  body = jsonencode({
    properties = {
      managedEnvironmentId = data.azurerm_container_app_environment.casino-app-env.id
      configuration = {
        ingress = {
          allowInsecure = true
          external = true
          targetPort = var.container_port  
        },
        secrets = [ 
          { name = "acr-password", value = "${var.acr-password}"}
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
            image = "casinomernregistry.azurecr.io/frontend:${var.frontend-tag}"
            resources = {
              cpu = 1 
              memory = "2.0Gi"
            }
            env = [
              {name="NODE_ENV", value = "production"}
            ]
          }
        ]
      }
    }
  })
}


// backend container app 
resource "azapi_resource" "backed-container-app" { 
  type = "Microsoft.App/containerApps@2022-03-01"
  parent_id = data.azurerm_resource_group.rg.id 
  location = data.azurerm_resource_group.rg.location 
  name = var.backend-name 

  body = jsonencode({
    properties = {
      managedEnvironmentId = data.azurerm_container_app_environment.casino-app-env.id
      configuration = {
        ingress = {
          external = false 
          allowInsecure = true 
          targetPort = var.container_port
        },
        secrets = [ 
          { name = "acr-password", value = "${var.acr-password}"}
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
            image = "casinomernregistry.azurecr.io/backend:${var.backend-tag}"
            resources = {
              cpu = 1 
              memory = "2.0Gi"
            }
            env = [
              { name = "PASSENGER_APP_ENV",value="${var.passenger_app_env}"},
              { name = "DB_NAME", value = "${var.db_name}"},
              { name = "DB_HOST", value = "${var.db_host}"},
              { name = "DB_USERNAME", value = "${var.db_username}"},
              { name = "DB_PASSWORD", value = "${var.db_password}"},
              { name = "DB_PORT", value = "${var.db_port}"},
              { name="CORS_DOMAIN", value="${var.cors_domain}"}
            ] 
          }
        ]
      }
    }
  })
}

// data sources 
data "azurerm_resource_group" "rg" {
  name = var.rg_name
}
/*
data "azurerm_user_assigned_identity" "casino-mern" {
  name = "casino-mern-identity"
  resource_group_name = var.rg_name
}
*/
data "azurerm_subnet" "app" { 
  name = "app"
  virtual_network_name = "casino-mern-app-vnet"
  resource_group_name = "casino-mern-app"
}

data "azurerm_log_analytics_workspace" "casino-monitoring" { 
  name = "casino-law"
  resource_group_name = "casino-mern-app"
}

data "azurerm_container_app_environment" "casino-app-env" { 
  name = "casino-app-env"
  resource_group_name = "casino-mern-app"
}
// https://github.com/DFE-Digital/terraform-azurerm-container-apps-hosting/blob/main/container-app.tf