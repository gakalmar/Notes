# Terraform Backend configuration:
terraform {
  backend "s3" {
    bucket         = "24-05-24-gk-bucket"  # Replace with your bucket name
    key            = "state/terraform.tfstate"
    region         = "eu-west-2"
    dynamodb_table = "terraform-lock"         # Replace with your DynamoDB table name
    encrypt        = true
  }
}

# Provider configuration:
provider "aws" {
  region = "eu-west-2"
}

# Retrieve latest AMI for Ubuntu:
data "aws_ami" "this" {
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  most_recent = true
  owners      = ["099720109477"]  # Canonical
}

# Security Group configuration:
resource "aws_security_group" "mars_sg" {
  name        = "mars_sg"
  description = "Security group for Mars EC2 instance"

  # Allow SSH access from multiple specific IPs
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [
      "45.155.40.180/32",   # Your IP
      "145.236.26.185/32",  # Your IP (old)
      "203.0.113.0/24",     # Additional IP range example
      "192.0.2.0/24"        # Another IP range example
    ]
    description = "Allow SSH access from specific IPs"
  }
  
  # Allow HTTP traffic
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTP traffic"
  }

  # Allow HTTPS traffic
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow HTTPS traffic"
  }

  # Default rule: deny all other incoming traffic
  ingress {
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Deny all ingress traffic"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Mars-SG"
  }
}

# EC2 instance configuration:
resource "aws_instance" "mars_ec2" {
  ami                         = data.aws_ami.this.id
  instance_type               = "t3.medium"
  key_name                    = "my-keypair"
  vpc_security_group_ids      = [aws_security_group.mars_sg.id]
  associate_public_ip_address = true

  tags = {
    Name = "MarsInstance"
  }
}

# RDS instance configuration:
resource "aws_db_instance" "wordpress_db" {
  identifier         = "wordpress-db"
  allocated_storage  = 20  # Adjust the storage size according to your needs
  engine             = "mysql"
  engine_version     = "8.0.34"  # Confirm this is a supported version on RDS at the time of setup
  instance_class     = "db.t3.micro"  # This is suitable for small-scale production environments
  username           = "wp_admin"
  password           = "wp_password"  # Change this to a more secure password!
  db_name            = "wordpress"
  publicly_accessible = true

  # If you have a default VPC, you can use it, otherwise specify your VPC:
  vpc_security_group_ids = [aws_security_group.mars_sg.id]

  tags = {
    Name = "WordPress Database"
  }

  # Best practice: Enable automatic backups
  backup_retention_period = 7
}

# S3 bucket configuration for WordPress Media Files:
resource "aws_s3_bucket" "wordpress_media" {
  bucket = "24-05-24-gk-bucket-wordpress"  # Replace with a unique bucket name

  tags = {
    Name        = "WordPress Media"
    Environment = "Production"
  }
}

# Upgrade 1 to S2 bucket: Lifecycle Configuration
resource "aws_s3_bucket_lifecycle_configuration" "wordpress_media_lifecycle" {
  bucket = aws_s3_bucket.wordpress_media.id

  rule {
    id      = "expire-old-media"
    status  = "Enabled"

    expiration {
      days = 365  # Adjust as necessary; for example, to delete files older than a year
    }
  }
}

# Upgrade 2 to S2 bucket: Enable versioning
resource "aws_s3_bucket_versioning" "wordpress_media_versioning" {
  bucket = aws_s3_bucket.wordpress_media.id

  versioning_configuration {
    status = "Enabled"
  }
}

# # Optional: Add a bucket policy for access control
# resource "aws_s3_bucket_policy" "wordpress_media_policy" {
#   bucket = aws_s3_bucket.wordpress_media.id

#   policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Action    = "s3:*"
#         Effect    = "Allow"
#         Resource  = [
#           "arn:aws:s3:::${aws_s3_bucket.wordpress_media.bucket}",
#           "arn:aws:s3:::${aws_s3_bucket.wordpress_media.bucket}/*"
#         ]
#         Principal = {
#           AWS = ["arn:aws:iam::YOUR_ACCOUNT_ID:root"]
#         }
#       }
#     ]
#   })
# }