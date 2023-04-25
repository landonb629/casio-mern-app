
resource "azurerm_resource_group" "rg" {
  name = var.rg_name
  location = var.location
}

## managed identity ## 

resource "azurerm_user_assigned_identity" "application-identity" {
  location = var.location 
  name = var.managed_identity_name
  resource_group_name = var.rg_name
}

resource "azurerm_role_assignment" "role-assignment" {
  scope = azurerm_resource_group.rg.id
  role_definition_name = "ACRPull"
  principal_id = azurerm_user_assigned_identity.application-identity.principal_id
}

## virtual network ##
resource "azurerm_virtual_network" "vnet" {
  name = "${var.rg_name}-vnet"
  location = var.location
  resource_group_name = azurerm_resource_group.rg.name
  address_space = [var.vnet_cidr]
}

## subnets ##

resource "azurerm_subnet" "subnets" {
  for_each = var.subnets

  name = each.key 
  resource_group_name = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes = [each.value]
  service_endpoints = each.key == "app" ? ["Microsoft.AzureCosmosDB"] : []
  
} 

## application security group ##
resource "azurerm_application_security_group" "asg" {
  name = var.asg-name
  location = var.location
  resource_group_name = azurerm_resource_group.rg.name
}

## security  groups 
resource "azurerm_network_security_group" "web" {
  name = var.web-nsg
  location = var.location
  resource_group_name = azurerm_resource_group.rg.name

  security_rule {
      name = "allowAllHTTP"
      priority = 100
      direction = "Inbound"
      access = "Allow"
      protocol = "Tcp"
      source_port_range = "*"
      destination_port_range = "80"
      source_address_prefix = "*"
      destination_address_prefix = "*"
  }
}


resource "azurerm_network_security_group" "app" {
  name = var.app-nsg
  location = var.location
  resource_group_name = azurerm_resource_group.rg.name

  security_rule { 
    name = "allowFromToAPI"
    priority = 100
    direction = "Inbound"
    access = "Allow"
    protocol = "Tcp"
    source_port_range = "*"
    destination_port_range = "3032"
    source_address_prefix = "*"
    destination_address_prefix = "*"

  }
}

## security group associations ##

resource "azurerm_subnet_network_security_group_association" "web" {
  subnet_id = azurerm_subnet.subnets["web"].id
  network_security_group_id = azurerm_network_security_group.web.id
}

resource "azurerm_subnet_network_security_group_association" "app" {
  subnet_id = azurerm_subnet.subnets["app"].id
  network_security_group_id = azurerm_network_security_group.app.id
}

## azure container registry

resource "azurerm_container_registry" "registry" {
  name = var.container_registry
  resource_group_name = var.rg_name
  location = var.location
  admin_enabled = true 
  sku = "Standard"
}


## azure cosmosDB ##

resource "azurerm_cosmosdb_account" "db-account" {
name =   var.cosmos_db_account
resource_group_name = azurerm_resource_group.rg.name
location = var.location
offer_type = "Standard"
kind = "MongoDB"

consistency_policy {
  consistency_level = "BoundedStaleness"
}

geo_location {
  location = "eastus"
  failover_priority = 0
}

enable_automatic_failover = false
public_network_access_enabled = true

is_virtual_network_filter_enabled = true

virtual_network_rule {
  id = azurerm_subnet.subnets["app"].id
  ignore_missing_vnet_service_endpoint = true
}


depends_on = [
  azurerm_virtual_network.vnet
]
}

resource "azurerm_cosmosdb_mongo_database" "login-db" {
  name = var.cosmos_db
  resource_group_name = azurerm_resource_group.rg.name
  account_name = azurerm_cosmosdb_account.db-account.name

  
  depends_on = [
    azurerm_cosmosdb_account.db-account
  ]
}

## private dns zone 

resource "azurerm_private_dns_zone" "priv_dns_zone" {
  name = "lbabay.com"
  resource_group_name = var.rg_name
}

resource "azurerm_private_dns_zone_virtual_network_link" "priv_dns_zone_link" {
  name = "lbabay-priv-dns-zone"
  resource_group_name = azurerm_resource_group.rg.name
  private_dns_zone_name = azurerm_private_dns_zone.priv_dns_zone.name
  virtual_network_id = azurerm_virtual_network.vnet.id
}

