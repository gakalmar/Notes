# Provider configuration:
provider "aws" {
  region = "eu-west-2"
}

# Create VPC:
resource "aws_vpc" "this" {
  cidr_block       = "10.10.0.0/16"
  instance_tenancy = "default"

  tags = {
    Name = "my-vpc"
  }
}

# Create public subnet:
resource "aws_subnet" "public_subnet" {
  vpc_id     = aws_vpc.this.id
  cidr_block = "10.10.0.0/24"
  map_public_ip_on_launch = true # Ensures instances receive a public IP

  tags = {
    Name = "public_subnet"
  }
}

# Create private subnet:
resource "aws_subnet" "private_subnet" {
  vpc_id     = aws_vpc.this.id
  cidr_block = "10.10.1.0/24"
  map_public_ip_on_launch = false

  tags = {
    Name = "private_subnet"
  }
}

# Create IGW:
resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id

  tags = {
    Name = "InternetGateway"
  }
}

# Create an Elastic IP for the NATGW:
resource "aws_eip" "this" {
  domain = "vpc"
}

# Create NATGW:
resource "aws_nat_gateway" "this" {
  allocation_id = aws_eip.this.id
  subnet_id     = aws_subnet.public_subnet.id

  tags = {
    Name = "NATGateway"
  }
}

# Public Route Table:
resource "aws_route_table" "public-rt" {
  vpc_id = aws_vpc.this.id

  route {                                           # Route traffic to IGW
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.this.id
  }

  tags = {
    Name = "PublicRouteTable"
  }
}

resource "aws_route_table_association" "public-rta" {   # associate the route table with the public subnet
  subnet_id      = aws_subnet.public_subnet.id
  route_table_id = aws_route_table.public-rt.id
}

# Private Route Table:
resource "aws_route_table" "private-rt" {
  vpc_id = aws_vpc.this.id

  route {                                           # Route traffic to NAT GW
    cidr_block    = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.this.id
  }

  tags = {
    Name = "PrivateRouteTable"
  }
}

resource "aws_route_table_association" "private-rta" {  # associate the route table with the private subnet
  subnet_id      = aws_subnet.private_subnet.id
  route_table_id = aws_route_table.private-rt.id
}

# Set Security Group rules:
resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh"
  description = "Allow SSH inbound traffic"
  vpc_id      = aws_vpc.this.id

  ingress {                         # allow connections FROM this destiantion (port 22, which is SSH)
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]     # replace this with your IP to only allow from that IP
  }

#   # OPTIONAL: New ICMP rule for ping from a specific IP
#   ingress {
#     from_port   = -1   # ICMP type number for Echo Request. Use -1 for all types if specific type isn't required
#     to_port     = -1   # ICMP code. Use -1 for all codes if specific code isn't required
#     protocol    = "icmp"
#     cidr_blocks = ["your-ip-address/32"]  # Replace 'your-ip-address' with your actual IP address
#   }

  egress {                          # allow connections TO any destination
    from_port   = 0
    to_port     = 0
    protocol    = "-1"              # means all protocols
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "SecurityGroupForSSH"
  }
}
