# Provider configuration:
provider "aws" {
  region = "eu-west-2"
}

# Define IAM policy:
resource "aws_iam_policy" "example_policy" {
  name        = "example_policy"
  description = "A test policy"
  policy      = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:ListAllMyBuckets"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
      {
        Action = [
          "s3:GetObject",
          "s3:GetObjectVersion"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:s3:::20240530-my-unique-bucket-19861004/*"
      }
    ]
  })
}

# Other example policies:
resource "aws_iam_policy" "admin_access" {
  name        = "FullAdminAccess"
  description = "Provides full administrative access to AWS services and resources."

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action   = "*",
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })
}

# Define IAM user:
resource "aws_iam_user" "example_user" {
  name = "example_user"
  tags = {
    tag_key = "tag_value"
  }
}

# Attach policy to user:
resource "aws_iam_user_policy_attachment" "example_attach" {
  user       = aws_iam_user.example_user.name
  policy_arn = aws_iam_policy.example_policy.arn
}

# Define IAM role:
resource "aws_iam_role" "example_role" {
  name = "example_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action    = "sts:AssumeRole"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Effect = "Allow"
        Sid    = ""
      }
    ]
  })
}

# Attach policy to role:
resource "aws_iam_role_policy_attachment" "role_policy_attach" {
  role       = aws_iam_role.example_role.name
  policy_arn = aws_iam_policy.example_policy.arn
}
