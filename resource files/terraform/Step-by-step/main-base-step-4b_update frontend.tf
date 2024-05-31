# Configure Terraform to Use the S3 Backend
terraform {
  backend "s3" {
    bucket         = "20240531-my-unique-backend-bucket-19861004"
    key            = "path/to/my/terraform/state"
    region         = "eu-west-2"
    dynamodb_table = "TerraformStateLock"
    encrypt        = true
  }
}

# Provider configuration:
provider "aws" {
  region = "eu-west-2"
}

# Add S3 bucket:
resource "aws_s3_bucket" "this" {
  bucket = "20240530-my-unique-bucket-19861004"     # Ensure this name is unique globally

  tags = {
    Name        = "My S3 Bucket"
    Environment = "Dev"
  }
}

# Block S3 bucket's public access (still the same resource!):
resource "aws_s3_bucket_public_access_block" "this" {
  bucket = aws_s3_bucket.this.id

  block_public_acls   = true
  ignore_public_acls  = true
  block_public_policy = true
  restrict_public_buckets = true
}

# Add DynamoDB NoSQL table:
resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "GameScores"                  # The name of the DynamoDB table
  billing_mode   = "PROVISIONED"                 # Billing mode: PROVISIONED means you specify read/write capacity units
  read_capacity  = 20                            # Refers to reading speed
  write_capacity = 20                            # Refers to writing speed
  hash_key       = "UserId"                      # The attribute to use as the hash key for the table (unique)
  range_key      = "GameTitle"                   # The attribute to use as the range key for the table, forming a composite primary key with the hash key

  attribute {
    name = "UserId"                              # Definition of the UserId attribute as a String type
    type = "S"
  }

  attribute {
    name = "GameTitle"                           # Definition of the GameTitle attribute as a String type
    type = "S"
  }

  attribute {
    name = "TopScore"                            # Definition of the TopScore attribute as a Number type
    type = "N"
  }

  ttl {
    attribute_name = "TimeToExist"               # Defines the TTL (Time To Live) attribute for items in the table
    enabled        = false                       # Disables TTL, meaning items won't automatically expire
  }

  global_secondary_index {
    name               = "GameTitleIndex"        # Name of the Global Secondary Index
    hash_key           = "GameTitle"             # Hash key for the GSI, allowing for querying by GameTitle
    range_key          = "TopScore"              # Range key for the GSI, allowing for additional querying by TopScore
    write_capacity     = 10                      # Write capacity for the GSI
    read_capacity      = 10                      # Read capacity for the GSI
    projection_type    = "INCLUDE"               # Specifies that only certain attributes are projected into the index
    non_key_attributes = ["UserId"]              # Specifies which attributes to include in the projection for the GSI
  }

  tags = {
    Name        = "dynamodb-table-1"             # Adds metadata tags to the DynamoDB table for identification and management
    Environment = "production"                   # Additional metadata tag indicating the environment setting
  }
}
