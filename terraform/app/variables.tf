## supply variables here
variable "backend-tag" { 
  default = "v1.0"
}

variable "db_password" { 
  default = "YnpUc6cttiHTyuA9NwFCy3D5cU5hBfTWnB7SMk4O6HscVtcQdf4fCz6voMv78mHmdCbB4ChJRSqjACDbO9Mo3w=="
}

variable "frontend-tag" { 
  default = "v1.0"
}

variable "acr-password" { 
  default = "BLFgbRjjl9HmmJQGFRhyiiYABiAUVuAmbnjdGHXb1i+ACRAMzJwW"
}


variable "cors_domain" { 
  default = "ambitiouswave-33cc1b34.eastus.azurecontainerapps.io"
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




