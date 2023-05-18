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
