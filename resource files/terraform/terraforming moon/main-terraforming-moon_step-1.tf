# Provider configuration:
provider "aws" {
  region  = "eu-west-2"
}

# Security Group:
resource "aws_security_group" "moon_sg" {
  name        = "moon_security_group"
  description = "Security group for Moonet EC2 instance"

  # Default rule: deny all incoming traffic
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

  # Attach the security group to the EC2 instance
  vpc_security_group_ids = [aws_security_group.moon_sg.id]

  tags = {
    Name = "MoonetInstance"
  }
}
