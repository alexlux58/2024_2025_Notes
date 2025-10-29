# HCL Basics

mkdir ~/terraform-projects && cd ~/terraform-projects

<block> <parameters> {
key1 = value1
key2 = value2
}

local.tf

resource "local_file" "pet" {
filename = "/root/pets.txt"
content = "We love pets!"
}

aws-ec2.tf

resource "aws_instance" "webserver" {
ami = "ami-0c55b159cbfafe1f0"
instance_type = "t2.micro"
}

aws-s3.tf

resource "aws_s3_bucket" "data" {
bucket = "webserver-bucket-org-12345"
acl = "private"
}

# Initialize Terraform

terraform init

# Show Configuration

terraform show

# Validate Configuration

terraform validate

# Plan Deployment

terraform plan -out=tfplan

# Apply Deployment

terraform apply tfplan

# Verify Resources

aws ec2 describe-instances --instance-ids $(terraform output -raw instance_id)

# update and destroy infrastructure

terraform apply -auto-approve

terraform destroy -auto-approve

rm -rf ~/terraform-projects

# Variables

variable "region" {
description = "The AWS region to deploy resources in"
type = string
default = "us-east-1"
}

provider "aws" {
region = var.region
}

# Outputs

output "instance_id" {
description = "The ID of the EC2 instance"
value = aws_instance.webserver.id
}

# Variable definitions (Automatically loaded)

terraform.tfvars
terraform.tfvars.json
_.auto.tfvars
_.auto.tfvars.json

"terrform.tfvars"

filename = "/root/pets.txt"
content = "We love pets!"
region = "us-west-2"
prefix = "prod-"
instance_type = "t3.micro"
