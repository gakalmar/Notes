# Advanced DevOps module

## System engineering

### What kind of virtualization technologies are you familiar with?

### What level of virtualization implementations are you familiar with?

### What command line text manipulation tools are you familiar with?

### How would you create scheduled command command to run every sunday at midnight?

### How would you check the available free memories?

### How would you check the available free disk space on the computer?

### What are hard links and symbolic links?

### How would you make a service auto-start and machine boot-up

---

## Network engineering

### What is a MAC address?

### What is the difference between binding to 127.0.0.1 or 0.0.0.0?

### What are the Layers of the OSI model?

### What is the difference between a router and switch?

### What is the difference between TCP and UDP?

### What is a VPN?

### What is DNS?

### WHat is DHCP?

### What is a VPC

---

## Security engineering

### In what AWS service can you store sensitive data?

### What network topology is good for hiding EC2?

### How those EC2 called which are serving as a single entry point for accessing protected resource on a restricted network?

### What AWS service is responsible for monitoring and log collection?

### What AWS service is responsible for tracking activites on the account?

### What is the difference between SG and NACL?

### What is the difference between KMS and HSM?

---

## Application

### What is the difference between Docker and Virtual Machine?

### What is the keyworld for defining the base image of a Dockerfile?

### What is the difference between CMD and ENTRYPOINT?

### What is the layout of a minimal Kubernetes deployment?

### What is the difference between Deployment and StatefulSet kubernetes object?

### What is a Service kubernetes object responsible for?

### How can be a kubernetes pod reached from the public internet?

### What is the difference between LivenessProbe and ReadinessProbe?

### What is the difference between resource Limit and Request?

---

## Infrastructure as Code

### What are the basic commands of the terraform cli?

### What is the difference between resource and data in terraform?

### What is state in the context of terraform?

---

# CHECKLIST

### bash
- write and execute bash scripts
- sed, jq, curl, ...
- subshell [$()], arithemtic expression [$(())], piping [|], input/output redirection [>,>>,<<]
- if, for
- functions
- arguments
- expected output: sh file, successful execution

### Docker
- Dockerfile
- expected output: Dockerfile, successful build

### docker-compose
- Review: nginx-flask (docker-compose solution)
- app (given), nginx, database
- expected output: docker-compose, successful run

### Kubernetes
- Basic types: namespace, deployment, service, configmap, secret
- expected output: manifest file(s)

### Terraform (AWS)
- Create AWS infrastructure (S3, dynamodb, IAM, networking, ...)
- terraform documentation
- expected output: tf files, successful apply

# QUESTION GENERATOR:
- `docker run --rm csuvikg/generate-tti`

