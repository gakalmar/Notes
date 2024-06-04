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

# Add bucket policy to make it private:
resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.this.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "s3:GetObject"
        Effect    = "Deny"
        Resource  = "20240530-my-unique-bucket-19861004/*"
        Principal = "*" # means all users - Aleternatively use a specific user: "Principal": {"AWS": "arn:aws:iam::123456789012:user/UserName"}
        Condition = {
          Bool = {
            "aws:SecureTransport" = "false"
          }
        }
      }
    ]
  })
}