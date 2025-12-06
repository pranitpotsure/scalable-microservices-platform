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

module "eks" {
  source          = "./eks"
  project_name    = var.project_name
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets

  # PASS IAM ROLE ARN HERE
  eks_role_arn    = module.iam.eks_role_arn
}
