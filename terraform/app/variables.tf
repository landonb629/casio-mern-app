variable "webapp_plan_name" {
  default = "casino-mern-plan"
}

variable "location" {
  default = "eastus"
}

variable "rg_name" {
  default = "casino-mern-app"
}

variable "sku_name" {
  default = "B3"
}

variable "managed_identity_name" {
  default = "casino-mern-identity"
}

variable "backend-name" { 
  default = "casinoapi"
}

variable "container_port" { 
  default = 80
}

variable "app_env" { 
  default = "casino-app-env"
}

variable "log-analytics-name" { 
  default = "casino-law"
}

variable "backend_image" { 
  default = "casinomernregistry.azurecr.io/backend:postfix"
}

variable "frontend_name" { 
  default = "casino-frontend"
}

variable "frontend_image" { 
  default = "casinomernregistry.azurecr.io/frontend:finaltest"
}
