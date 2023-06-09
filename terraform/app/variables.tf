## supply variables here
variable "backend-tag" { 
  default = "v1.0"
}

variable "db_password" { 
  default = "dbsrZUpEPttaGT3KbhuAm12l4IVP1gKp9mB05xxRl17Zw9gRFVWeGG24AZaFAFYSYDW1uUa9A7GnACDb3B78Ng=="
}

variable "frontend-tag" { 
  default = "v1.0"
}

variable "acr-password" { 
  default = "NmRk5sTqSjmWOJPhYqNhbOzTSWVY7SXmC2xBoMOnc5+ACRC9wSA5"
}


variable "cors_domain" { 
  default = "purplebay-941eeacb.eastus.azurecontainerapps.io"
}




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



variable "db_port" { 
  default = "10255"
}




