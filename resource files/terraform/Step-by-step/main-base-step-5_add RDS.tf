# Provider configuration:
provider "aws" {
  region = "eu-west-2"
}

# RDS instance configuration:
resource "aws_db_instance" "this" {
  allocated_storage    = 10
  db_name              = "wordpressdb"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  username             = "wp_admin"
  password             = "wp_password"
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true
}