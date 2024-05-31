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