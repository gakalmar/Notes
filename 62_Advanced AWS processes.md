## Advanced processes:

### Create a Cloudformation stack and deploy an app using CodeDeploy:
- Sample repo [here](https://github.com/kobbikobb/cloud-formation-code-deploy)
- Videos:
    - [Create the infrastructure](https://youtu.be/jWZBDZQmywU?si=RERIXDifmZD0th1U)
    - [Implement into a pipeline](https://youtu.be/C0G4i3eDaDE?si=L-Ts7Sr6TiSKalPG)

1. Create the infrastructure:
    - includes an EC2 instance with Docker and Docker-compose pre-installed (and all the resources it needs to run)
    - This is the command to run:
        - `aws cloudformation create-stack --stack-name <my_stack>-ec2 --capabilities CAPABILITY_NAMED_IAM --template-body file://cloud-formation/ec2/ec2-stack.yaml --region us-east-1`
        - [Link to the template file](https://github.com/kobbikobb/cloud-formation-code-deploy/blob/main/cloud-formation/ec2/ec2-stack.yaml)

2. Create the codedeploy stack:
    - includes a role, the app and the deployment group of the app
    - This is the command to run:
        - `aws cloudformation create-stack --stack-name <my-stack>-deploy --template-body file://cloud-formation/deploy/deploy-stack.yaml --capabilities CAPABILITY_NAMED_IAM --region us-east-1`
        - [Link to the template file](https://github.com/kobbikobb/cloud-formation-code-deploy/blob/main/cloud-formation/deploy/deploy-stack.yaml)

3. Create an S3 bucket:
    - use a [script](https://github.com/kobbikobb/cloud-formation-code-deploy/blob/main/scripts/create-s3.sh) to create the encrypted bucket

4. Copy the deployment to the bucket:
    - The deployment itself (=the APP) is an `appspec.yml` file:
        - uses a `docker-compose.yml` file and an `nginx.conf` file
        - has an `AfterInstall` hook as well (that points to another script, that basically initializes docker-compose)
    - To copy the deployment, it uses [this](https://github.com/kobbikobb/cloud-formation-code-deploy/blob/main/scripts/copy-deployment-to-s3.sh) script

5. Create the `CodeDeploy` deployment:
    - Uses a [script](https://github.com/kobbikobb/cloud-formation-code-deploy/blob/main/scripts/create-code-deploy-deployment.sh), that just specifies the app's name, the deployment group name and the s3 bucket location, where the app is

6. Once the deployment is ready, we can load the app in the browser using the `Elastic IP` that was generated in step 1:
    - `http://<Elastic-IP>` (make sure to use http, and not https! https needs to be set up in further steps)

7. Integrate it into a CI/CD pipeline:
    - We need to provide the infrastructure stack, the deployment stack and the S3 bucket (already done above!)
    - [This](https://github.com/kobbikobb/guessthename/blob/main/.github/workflows/on-push-to-main.yml) is the workflow that is used to build the app images and then deploy to AWS

8. Clean-up:
    - Delete the 2 stacks created using these scripts:
        - Delete deployment stack: `aws cloudformation delete-stack --stack-name <my-stack>-deploy --region us-east-1`
        - Delete infrastructure: `aws cloudformation delete-stack --stack-name <my-stack>-ec2 --region us-east-1`