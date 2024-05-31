# Provider configuration:
provider "aws" {
  region = "eu-west-2"
}

# Add S3 bucket for backend:
resource "aws_s3_bucket" "backend_bucket" {
  bucket = "20240531-my-unique-backend-bucket-19861004"  # Ensure this name is unique globally

  tags = {
    Name        = "My Terraform Backend Bucket"
    Environment = "Dev"
  }
}

# Block backend bucket's public access (still the same resource!):
resource "aws_s3_bucket_public_access_block" "backend_bucket-pa" {
  bucket = aws_s3_bucket.backend_bucket.id

  block_public_acls   = true
  ignore_public_acls  = true
  block_public_policy = true
  restrict_public_buckets = true
}

# Add another DynamoDB Table for Terraform State Locking:
resource "aws_dynamodb_table" "terraform_state_lock" {
  name           = "TerraformStateLock"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name        = "Terraform State Lock Table"
    Environment = "Dev"
  }
}

