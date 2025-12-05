terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source       = "./vpc"
  project_name = var.project_name
}


module "iam" {
  source       = "./iam"
  project_name = var.project_name
}
