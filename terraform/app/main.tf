## app service plan ##
resource "azurerm_service_plan" "webapp_plan" {
  name = var.webapp_plan_name
  resource_group_name = var.rg_name 
  location = var.location 
  os_type = "Linux"
  sku_name = var.sku_name 
}

data "azurerm_resource_group" "rg" {
  name = "casino-mern-app"
}

data "azurerm_user_assigned_identity" "casino-mern" {
  name = "casino-mern-identity"
  resource_group_name = var.rg_name
}

## web app ## 
resource "azurerm_linux_web_app" "casino-frontend" {
  name = "casino-frontend"
  resource_group_name = var.rg_name 
  location = var.location 
  service_plan_id = azurerm_service_plan.webapp_plan.id 

  app_settings = { 
      "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
  }

  identity {
    type = "UserAssigned"
    identity_ids = [data.azurerm_user_assigned_identity.casino-mern.id]
  }

  site_config {
    always_on = true 
    ftps_state = "Disabled"
    vnet_route_all_enabled = true 
    default_documents = []

    application_stack {
      docker_image = var.starter_image
      docker_image_tag = var.starter_image_tag
    }
  }

}
