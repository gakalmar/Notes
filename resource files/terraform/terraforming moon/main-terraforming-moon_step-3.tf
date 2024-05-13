# Provider configuration:
provider "aws" {
  region  = "eu-west-2"
}

# Security Group:
resource "aws_security_group" "moon_sg" {
  name        = "moon_security_group"
  description = "Security group for Moonet EC2 instance"

  # Allow SSH access from multiple specific IPs
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [
      "145.236.26.185/32",  # Your IP
      "203.0.113.0/24",     # Additional IP range example
      "192.0.2.0/24"        # Another IP range example
    ]
    description = "Allow SSH access from specific IPs"
  }

  # Default rule: deny all other incoming traffic
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
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
    Name = "MoonetSecurityGroup"
  }
}

# EC2 instance configuration:
resource "aws_instance" "moon_ec2" {
  ami           = "ami-09627c82937ccdd6d"
  instance_type = "t2.micro"
  key_name      = "my-keypair"

  # Attach the security group to the EC2 instance
  vpc_security_group_ids = [aws_security_group.moon_sg.id]

  tags = {
    Name = "MoonetInstance"
  }
}

