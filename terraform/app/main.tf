

data "azurerm_resource_group" "rg" {
  name = var.rg_name
}

data "azurerm_user_assigned_identity" "casino-mern" {
  name = "casino-mern-identity"
  resource_group_name = var.rg_name
}

data "azurerm_subnet" "app" { 
  name = "app"
  virtual_network_name = "casion-mern-app-vnet"
  resource_group_name = var.rg_name
}


resource "azurerm_container_app_environment" "casino-app-env" { 
  name = var.app_env 
  location = "eastus"
  resource_group_name = data.azurerm_resource_group.rg.name 
  infrastructure_subnet_id = data.azurerm_subnet.app.id
  internal_load_balancer_enabled = false 
}