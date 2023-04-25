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

variable "starter_image" {
  default = "casinomernregistry.azurecr.io/casino-frontend"
}

variable "starter_image_tag" {
  default = "v1.4"
}



