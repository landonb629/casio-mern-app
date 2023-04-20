resource "azurerm_service_plan" "webapp_plan" {
  name = var.webapp_plan_name
  resource_group_name = var.rg_name 
  location = var.location 
  os_type = "Linux"
  sku_name = var.sku_name 
}

resource "azurerm_user_assigned_identity" "application-identity" {
  location = var.location 
  name = var.managed_identity_name
  resource_group_name = var.rg_name
}

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
    identity_ids = azurerm_user_assigned_identity.application_identity.id
  }

  site_config {
    always_on = true 
    ftps_state = "Disabled"
    vnet_route_all_enabled = true 
    default_documents = []

    application_stack {
      docker_image = var.starter-image
      docker_image_tag = var.start-image-tag
    }
  }

}