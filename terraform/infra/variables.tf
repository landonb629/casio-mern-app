variable "rg_name" {
  default = "casino-mern-app"
}

variable "managed_identity_name" {
  default = "casino-mern-identity"
}

variable "location" {
  default = "eastus"
}

variable "vnet_cidr" {
  default = "10.0.0.0/16"
}

variable "subnets" {
  type = map(string)
  default = { 
      "web" = "10.0.0.0/24"
      "app" = "10.0.4.0/23",
      "db" = "10.0.6.0/24"
  }
}

variable "web-nsg" {
  default = "web-nsg"
}
variable "app-nsg" {
  default = "app-nsg"
}
variable "db-nsg" {
  default = "db-nsg"
}
variable "asg-name" {
  default = "api-asg"
}

variable "container_registry" {
  default = "casinoMernRegistry"
}


variable "starter-image" {
  default = "casinomernregistry.azurecr.io/casino-frontend"
}

variable "start-image-tag" {
  default = "v1.0"
}

variable "docker-registry-server-password" {
 default = "" 
}

variable "docker-registry-server-url" {
  default = ""
}

variable "docker-registry-server-username" {
  default = ""
}

variable "cosmos_db" {
  default = "casino-db"
}

variable "cosmos_db_account" {
  default = "casino-db"
}

