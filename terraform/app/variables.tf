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

variable "frontend_name" { 
  default = "casino-frontend"
}


## supply variables here
variable "backend_image" { 
  default = "casinomernregistry.azurecr.io/backend:v2.1"
}

variable "passenger_app_env" { 
  default = "production"
}

variable "db_name" { 
  default = "casino-db"
}

variable "db_host" { 
  default = "casino-db.mongo.cosmos.azure.com"
}

variable "db_username" { 
  default = "casino-db"
}

variable "db_password" { 
  default = "qgTh6mdovthOYg4sugmvAxxKvGnjv0iktmiYqufuW1Rf4igGjaIwrAPOfTL9hckRRMr1nOmiq1ZHACDbBnpOXQ=="
}

variable "db_port" { 
  default = "10255"
}

variable "frontend_image" { 
  default = "casinomernregistry.azurecr.io/frontend:v2.1"
}

variable "acr-password" { 
  default = "135Rqa0Pupb4s0hQ+LWZAAN8zQyarPq5MbXyLDOFGu+ACRCKoyYe"
}

variable "cors_domain" { 
  default = "redsky-4c0d990d.eastus.azurecontainerapps.io"
}
