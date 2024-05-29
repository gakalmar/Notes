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