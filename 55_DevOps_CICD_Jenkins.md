# CI/CD

## CONTINUOUS INTEGRATION:
- **Definition:**
    - Continuous Integration (CI) is a software development practice where members of a team integrate (=merge to master in a Git workflow) their work frequently
    - Usually each person integrates at least daily, leading to multiple integrations per day.
    - Each integration is verified by an automated build (including test) to detect integration errors as quickly as possible.

- Old method:
    - Working on feature branches, huge merges, because they happen after weeks/months
    - "Integration hell": huge data is being merged -> new bugs, re-test required -> merge nighmares
    - SOLUTION: 
        - do it more often, so that the merges are more easy-to-resolve
        - Features are hidden behind **feature flags** (a bool variable, that turns features on/off, eg. `DEV`)

- A nicely working CI process needs the following, to control the huge amount of merges:
    - Good unit testing coverage
    - Automation: tests need to run with every commit/merge automatically.
    - Ideally many kinds of tests: integration testing, UI testing, acceptance testing.

- The most popular CI/CD tools/sercices:
    - Jenkins: An open-source automation server that provides hundreds of plugins to support building, deploying, and automating any project. Uses Java
    - GitHub Actions: A CI/CD service directly integrated with GitHub, allowing you to automate workflows, including build, test, and deployment processes.
    - GitLab CI/CD: Integrated into the GitLab platform, this service offers robust CI/CD capabilities with comprehensive features for testing and deployment.
    - Azure DevOps: Microsoft's suite of development tools includes Azure Pipelines, which supports CI/CD for various platforms and integrates well with other Azure services.
    - Travis CI (open source): popular among open source projects.
    - Lots of hosted CI services: Gitlab CI, AWS CI, Microsoft VSTS CI

## CONTINUOUS DELIVERY
- **Definition:** 
    - It is the ability to get changes into production, or into the hands of users, safely and quickly in a sustainable way
        - Changes can be of all types (eg. new features, configuration changes, bug fixes and experiments)
    - The GOAL is to make deployments predictable, easy-to-perform, low-risk events that can be performed at any time, on demand:
        - Achieve all this by ensuring our code is always in a deployable state

- **Benefits:**
    - Low risk releases:
        - We can achieve zero-downtime deployments with patterns like **blue-green deployments**
    - Faster time to market:
        - When teams work together to automate the build and deployment, environment provisioning, and regression testing processes, developers can incorporate integration and regression testing into their daily work and completely remove these phases
    - Higher quality:
        - When developers have automated tools that discover regressions within minutes, teams are freed to focus their effort on user research and higher level testing activities such as exploratory testing, usability testing, and performance and security testing
        - By building a deployment pipeline, these activities can be performed continuously throughout the delivery process, ensuring quality is built in to products and services from the beginning
    - Lower costs:
        - By investing in build, test, deployment and environment automation, we substantially reduce the cost of making and delivering incremental changes to software by eliminating many of the fixed costs associated with the release process.
    - Better products:
        - Continuous delivery makes it economic to work in small batches, which means we can get feedback from users throughout the delivery lifecycle
        - Techniques such as A/B testing enable us to take a hypothesis-driven approach to product development (we can test ideas with users before building out whole features, which means avoiding to work on unnecessary features)
    - Happier teams:
        - continuous delivery makes releases less painful and reduces team burnout

- **Continuous integration vs. delivery vs. deployment:** (more details here: https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)
    - **Continuous integration**
        - Developers practicing continuous integration merge their changes back to the main branch as often as possible. The developer's changes are validated by creating a build and running automated tests against the build. By doing so, you avoid integration challenges that can happen when waiting for release day to merge changes into the release branch.
        - Continuous integration puts a great emphasis on testing automation to check that the application is not broken whenever new commits are integrated into the main branch.

    - **Continuous delivery**
        - Continuous delivery is an extension of continuous integration since it automatically deploys all code changes to a testing and/or production environment after the build stage. 
        - This means that on top of automated testing, you have an automated release process and you can deploy your application any time by clicking a button.
        - In theory, with continuous delivery, you can decide to release daily, weekly, fortnightly, or whatever suits your business requirements. However, if you truly want to get the benefits of continuous delivery, you should deploy to production as early as possible to make sure that you release small batches that are easy to troubleshoot in case of a problem.

    - **Continuous deployment**
        - Continuous deployment goes one step further than continuous delivery. With this practice, every change that passes all stages of your production pipeline is released to your customers. There's no human intervention, and only a failed test will prevent a new change to be deployed to production.
        - Continuous deployment is an excellent way to accelerate the feedback loop with your customers and take pressure off the team as there isn't a "release day" anymore. Developers can focus on building software, and they see their work go live minutes after they've finished working on it.
    
    - **Comparison image:**
        ![civscdvscd](<./assets/ci cd asset updates .007.png>)</br>

## JENKINS
- Installing Jenkins (as docker image):
    - General guide: https://www.jenkins.io/doc/book/installing/docker/
    - Install video: https://www.youtube.com/watch?v=UQMAKQPxnHs&ab_channel=TravelsCode
    - Troubleshooting doc: https://docs.google.com/document/d/1g15mOqGiMcdQhvkEg-75_WkE-m5NJA-__uk0gIA3WUE/edit

    - Summary:
        1. Get latest Jenkins (Docker) image:
            - `docker pull jenkins/jenkins`
        
        2. Create network for jenkins:
            - `docker network create jenkins`

        3. Run Jenkins:

                docker run --name my-jenkins --restart=on-failure --detach \
                  --network jenkins --env DOCKER_HOST=tcp://docker:2376 \
                  --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 \
                  --publish 8080:8080 --publish 50000:50000 \
                  --volume jenkins-data:/var/jenkins_home \
                  --volume jenkins-docker-certs:/certs/client:ro \
                  jenkins/jenkins
                
                # Or use with blueocean: jenkinsci/blueocean

        4. Get password:
            - `docker exec my-jenkins cat /var/jenkins_home/secrets/initialAdminPassword`

        5. Open in browser
            - `localhost:8080` (use PW from previous output)
        
        6. Install with "suggested": 
            - create your user
            - Instance config: leave default

- Install on WSL:
    1. Update & upgrade apt:
        - `sudo apt-get update`
        - `sudo apt-get upgrade`
    2. Install java:
        - `sudo apt update`
        - `sudo apt install fontconfig openjdk-17-jre -y` (verify with: `java --version`)
    3. Add jenkins repo:
        - `sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian/jenkins.io-2023.key`
        - `echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" https://pkg.jenkins.io/debian binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null`
        - `sudo apt-get update`
        - `sudo apt-get install jenkins`
    4. Add `jenkins` user to `docker` group:
        - `sudo usermod -aG docker jenkins` (do this before starting it!)
    5. Start Jenkins:
        - `sudo systemctl start jenkins`
        - Or enable to start on boot:
            - `sudo systemctl enable jenkins`
        - Allow through firewall if necessary:
            - `sudo ufw allow 8080`
    6. Access jenkins:
        - Type in browser:
            - `http://localhost:8080`
        - Retrieve password at initial install:
            - `sudo cat /var/lib/jenkins/secrets/initialAdminPassword`

- What is Jenkins?
    - It's an **automation platform**, that allows you to **Build, Test and Deploy** software using **Pipelines**
    
- **Jenkins Infrastructure:**
    - **Master server:**
        - Controls pipelines
        - Schdules builds
    - **Agents/Minions:**
        - Perform the build
        - 2 types:
            - **Permanent Agents:**
                - dedicated servers for running jobs (Java and SSH are requirements!)
            - **Cloud Agents:**
                - this is more common to use
                - examples:
                    - Docker
                    - Kubernetes
                    - AWS fleet manager
    
    - Process:
        1. A `code commit` triggers the pipeline
        2. The master server distributes the build to one of the agents to run it
            - The selection of the agent is done using `labels`, similar to Kubernetes
        3. Agent runs the build (a set of commands, like the Dockerfile)
    
    - Build types:
        - **Freestyle build:**
            - This is very basic, it's just Shell scripting, that's tied to specific events, to run when they are triggered 
        - **Pipelines:**
            - These use a `Jenkinsfile` with code written in the `Groocy Syntax` to describe the build
            - They are broken down into stages/components of the build (`stage` keyword in the file). These are typically:
                - Clone: 
                    - clone from a git repo
                - Build
                    - shell script, that for example uses docker to build the app
                - Test
                    - Runs the tests (by using `curl localhost:5000` to where the testing software is connected to)
                - Package
                    - Involves building the Docker image and then pushing it to a Docker repository (like DockerHub) using the `docker push` command. 
                    - This step makes the image available in the repository but doesn't deploy it to any environment
                - Deploy
                    - Send out `artifacts` to the registry (eg. sending out a newly built `docker image` to `DockerHub`)
                    - involves taking the `Docker image` that was pushed to the repository during the Package stage and deploying it to a specific environment (like development, staging, or production). 
                    - This might involve pulling the image from the repository and running it on servers or Kubernetes clusters
            
            - What is a pipeline?
                - In the context of Continuous Integration and Continuous Deployment (CI/CD), a pipeline is a defined **sequence of automated steps** that software undergoes from code integration to deployment. It is designed to facilitate the efficient and reliable delivery of software by automating tasks that would otherwise be manual and error-prone.

                    - **Detailed Explanation:**
                        - A CI/CD pipeline typically comprises several stages, each representing a distinct phase in the software development lifecycle. These stages include:

                            1. **Source:** This is where the pipeline begins. It is triggered by a change in the source code repository, such as a commit or a merge request.
                            2. **Build:** During this stage, the source code is compiled and assembled into a deployable artifact. This can involve compiling code, packaging binaries, or generating documentation.
                            3. **Test:** Automated tests are executed to verify that the code behaves as expected. This can include unit tests, integration tests, and other forms of automated testing to ensure code quality and functionality.
                            4. **Deploy:** The software is deployed to a staging or production environment. This stage can involve various deployment strategies, such as rolling updates or blue-green deployments.
                            5. **Monitor:** Post-deployment, the application is monitored to ensure it is performing as expected. This includes checking for errors, performance issues, and other anomalies.

- Benefits vs. disadvantages:
    - pozitívum: open source
    - negatívum: self hosted -> nekünk kell hostolni/futtatni a szervert és rajta a Node-okat
        - vs GitHub Actions which is hosted

## TESTING
- Testing pyramid:
    - Unit test a legtöbb, majd integration tesztek, majd UI a legkevesebb a tetején

## OTHER NOTES:
- Environment types:
    - Development
    - Testing
    - Staging
    - Production (live, used by clients)

- Deployment strategies:
    - Details: https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts/

    - Blue / Green deployment
    - Rolling deployment
    - Canary Deployment

# GUIDES
## Basics
- **Install all required plugins:**
    - `docker`
    - `AWS Credentials Plugin`

## Based on Codecool tasks:
- **AWS EKS with Terraform (using modules):**
    - (the simplest guide youtube video: https://www.youtube.com/watch?v=7wRqtBMS6E0&ab_channel=ASCODE )
    - https://github.com/ascode-com/wiki/blob/main/terraform-eks/complete-example.tf

- **Deploy a simple app and push it to the ECR using a `Jenkins Freestyle Project`:**
    1. Open Jenkins and create a new `Freestyle Project`
    2. Add your Git Repo (make it public first!)
        - Don't forget to set the branch to `main`!
        - A `Dockerfile` is needed to build with this method!
    3. Build environment:
        - Toggle `Delete workspace before build starts`
        - Toggle `Use secret text(s) or file(s)` with AWS credentials (add them directly to Jenkins as well under `Manage Jenkins / Credentails`!)
    4. Create an ECR repo! (the steps in the next step are mostly taken from there!)
    5. Add this to the build steps (shell):

            aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 891376988072.dkr.ecr.eu-west-2.amazonaws.com
            docker build -t helloworld-flask-nginx:latest .
            docker tag helloworld-flask-nginx:latest 891376988072.dkr.ecr.eu-west-2.amazonaws.com/helloworld-flask-nginx:latest
            docker push 891376988072.dkr.ecr.eu-west-2.amazonaws.com/helloworld-flask-nginx:latest

- **Deploy a simple app and push it to the ECR using a `Jenkins Pipeline`**
    1. Open Jenkins and create a new `Pipeline`
    2. Pipeline section:
        - Choose `Pipeline script from SCM` and set it to `Git`
            - Add Git repo and set branch
            - Use Jenkinsfile from resources (`Jenkinsfile-nodejs-helloworld`) - this also includes AWS credentials block
    3. Add trigger to build on every commit:
        - enable `GitHub hook trigger for GITScm polling`

    4. Add webhook:
        - In GitHub: Go to main settings / developer settings / personal access token / generate new token
            - as `Note` add eg. `helloworld-node`
            - tick all `repo`
            - Generate token
        - In Jenkins / Manage Jenkins / System / GitHub Server:
            - Add credentials:
                - choose `secret text`
                - `Secret` should be the token
                - `ID` and `description` should be what was under `note`, so `helloworld-node`
                
        - We first need to make our pipeline accessible externally:
            - Install ngrok if using the first time: `curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok`
            - Add auth token from here: https://dashboard.ngrok.com/get-started/your-authtoken
                - eg. `ngrok config add-authtoken $YOUR_AUTHTOKEN`
            - Start ngrok: `ngrok http 8080` (the port should be the same as you set up your Jenkins)
                - **THIS NEEDS TO BE UPDATED EVERY TIME!**:
                    - GitHub webhook: add the new forwarding address to the webhook!
            - Once running, open the address below the web address (the one that's being forwarded!), so you open jenkins throught the new route
        - Go under your GitHub repo's settings / webhooks:
            - Add webhook:
                - Payload URL: Enter your Jenkins environment URL appended with /github-webhook/. For example, http://yourjenkins.url:port/github-webhook/
                    - We should replace yourjenkinsurl.url:port with what we got above from ngrok (but it's currently not working - description here: https://ngrok.com/docs/integrations/github/webhooks/ )
                - Content type: Choose application/json.
                - Which events would you like to trigger this webhook?: Choose "Just the push event."
                - Active: Make sure this checkbox is checked
        - Now you can test it with a new push to the repo

    5. Set Up AWS EKS Cluster using Terraform:
        - You will need to create a `main.tf` file, with the following resources (ref. to `main-deploy-env-01.tf`):
                
                # PROVIDER SETUP
                provider "aws"
                provider "kubernetes" 
                data "aws_availability_zones" "available"

                # VPC / NETWORK CONFIG:
                resource "aws_vpc" "eks_vpc"
                resource "aws_internet_gateway" "igw"
                resource "aws_route_table" "public"
                resource "aws_route" "internet_access"
                resource "aws_eip" "nat"
                resource "aws_nat_gateway" "nat"
                resource "aws_route_table" "private"
                resource "aws_route" "private_nat"
                resource "aws_route_table_association" "private"
                resource "aws_subnet" "eks_subnet"
                resource "aws_route_table_association" "public"
                resource "aws_security_group" "eks_sg"

                # CREATE CLUSTER
                resource "aws_eks_cluster" "eks"
                data "aws_eks_cluster_auth" "eks"

                # CREATE IAM ROLES AND POLICIES
                resource "aws_iam_role" "eks"
                resource "aws_iam_role" "eks_node"
                resource "aws_iam_role_policy_attachment" "eks_AmazonEKSClusterPolicy"
                resource "aws_iam_role_policy_attachment" "eks_AmazonEKSVPCResourceController"
                resource "aws_iam_role_policy_attachment" "eks_node_AmazonEKSWorkerNodePolicy"
                resource "aws_iam_role_policy_attachment" "eks_node_AmazonEKS_CNI_Policy"
                resource "aws_iam_role_policy_attachment" "eks_node_AmazonEC2ContainerRegistryReadOnly"

                # NODE GROUP
                resource "aws_eks_node_group" "eks_nodes"

                # DEBUGGING
                output "cluster_endpoint"
                output "cluster_ca_certificate"
                output "cluster_token"
        
        - Add infrastructure steps to `Jenkisfile` (this is already in the `Jenkinsfile-02-deploy on kubernetes` file)
        
        - Now we also need to make sure that the updated `kubeconfig` file is available on the Jenkins server:
            - Manage Jenkins / Credentials / Step in twice, until you can `Add credentials`
                - Pick `secret file`, then add from this location: `\\wsl.localhost\Ubuntu\home\gakalmar\.kube`
                - In the ID field, add `kubeconfig-for-eks`
                - Create
            - Use it in the `Jenkisfile`:
                - Update Jenkinsfile (this is already in the `Jenkinsfile-02-deploy on kubernetes` file)

        - Update Pipeline with EKS deployment
            - Create 2 more terraform resources for the `deployment` and the `service`, and run the pipeline
        
        - After you succeeded, you can check out the app through the service's external IP:
            - Update context:
                - `aws eks update-kubeconfig --region eu-west-2 --name hello-world-eks-cluster`
                - Test: `kubectl get nodes`
            - Get service:
                - `kubectl get services` -> type in the browser the `EXTERNAL-IP` of the service

## Udemy courses:
- **Full development and production deployment using `Travis`:**
    - **Development deployment guide:**
        - Worker folder (calculate number based on index and connect to redis)
            - package.json
            - keys.js
            - index.js

        - Server folder (connect to postgres and create table, connect to redis, express routes)
            - package.json
            - keys.js
            - index.js

        - React app (`npx create-react-app client`)

        - Create images for Development first (`Dockerfile.dev` in each folder):
            - Copy package.json
            - Run npm install
            - Copy the rest of the files
            - Set up volumes to share files with docker compose

        - Connect these 3 services with `docker-compose`, and add other services:
            - Create **postgres** service (potential issue with image version!)
            - Create **redis** service (potential issue with image version!)
            - Create **server** service:
                - build from Dockerfile
                - add volumes:
                    - tag `/app/node_modules` folder, so that is not overwritten!
                    - reference `./server:/app`, so that the `app` folder in the `server` container is always what is in our machine's `server` folder
                - specify environmental variables:
                    - `variableName=value` (sets variable at runtime) - USE THIS METHOD
                    - `variableName` (in this case the value is taken from my local environment) - it's still set at runtime
                    - potential issue - rename variables from `PGPASSWORD` to postgres documentation format `POSTGRES_PASSWORD`
            - Create **client** service: Identical to server mostly
            - Create **worker** service: Identical to server mostly
            - Add **nginx**:
                - This is to create separate routing for backend and frontend requests
                - We do this by creating a `defult.conf` file in a separate nginx folder:
                    - *upstream* servers will be on port 3000 and port 5000 (`client:3000` and `server:5000` -> these come from their corresponding index.js files!)
                    - listen for incoming calls on port 80
                    - `/` requests should be routed to the react upstream server
                    - `/api` requests should be routed to the express upstream server (on the server the `/api` part is not there anymore, it's just used for the nginx routing!)
                - Add Dockerfile for nginx, to copy the config file accross!

    - **Production deployment guide (AWS Elastic Beanstalk)**
        - Create `Dockerfiles` for each service for **production** instead of the ones created for **development**
            - `worker`: only change CMD command to `npm run start` from `npm run dev`
            - `server`: only change CMD command to `npm run start` from `npm run dev`
            - `nginx`: no changesV
            - `client`:
                - architecutre that needs to be set up:
                    - first a request gets to the `nginx` router, listening on port 80
                    - this is responsible for forwarding the requests to the backends:
                        - React build files for production, which are connected through another `nginx` image, listening on port 3000 
                            - this `nginx` will also need a `default.conf` file inside the client folder!
                        - Express server, listening on port 5000

            - Add memory allocation to each one as well!
                - `"memory": 128`

        - Set up testing phase:
            - For now, we just clean the `App.test.js` file, but we would put the tests in here
            - The test is only set up to run tests for the `client`, but we could also add tests for `worker` and `server` here

        - Connect github repo to Travis:
            - Go to `https://www.travis-ci.com/`, where if you have the connection already set to your github repo, you should see your project
            - Create the `.travis.yml` file, that includes the instructions for the pipeline:
                - Connect to docker
                - `before_install` section:
                    - Create a test image for testing purposes (use the `dev` Dockerfile, because we also need the dependencies!)
                - `scripts`:
                    - We do the testing in this phase. If a script returns with a result other than 0, the pipeline is stopped
                - `afrer_success`:
                    - This section only runs if all tests were successful
                    - We are building all 4 production images here (`client`, `server`, `worker`, `nginx`)
                    - We are also pushing these images to `DockerHub`, for which we need to connect to the `Docker CLI`:
                        - Docker login:
                            - to add the dockerID and password securely, we enter these as secrets in Travis:
                                - click on repo in the Travis UI, then on 'more options' -> 'settings' -> 'environment variables':
                                    - Add name:
                                        - name: `DOCKER_ID`
                                        - value: `gakalmar`
                                    - Add password:
                                        - name: `DOCKER_PASSWORD`
                                        - value: `<your password>`
                            - Now we can add the actual command:
                                - `echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin`
                        - Push the images

        - Deployment to `AWS Elastic Beanstalk`:
            - `Create a Dockerrun.aws.json` file - this will be the instructions file for AWS (similar to docker-compose, but instead of *services*, we will have *container definitions*):
                - We already have the images uploaded to DockerHub, so we are just managing these
                - The documentation we will use is here: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
            - Creating the DB services:
                - The DB storage will be updated in a real production environment:
                    - `Redis` should run inside the `AWS ElastiCache` or `EC`
                    - `Postgres` should run inside the `AWS Relational Database Service` or `RDS`

                    1. Create `RDS`:
                        - Create with simple-create
                        - Select `Postgres`
                        - In `Settings` add a cluster identifier (name), set "self managed" for credentials and set the same password you are using as the env variable
                        - Create new SG
                        - Database name: fibvalues (this wasn't filled anywhere!)

                    2. Create `ElastiCache`: (maybe we need to create a "Global datastore" instead?)
                        - Create Redis OSS
                        - Design your own / Easy Create
                        - Select Demo mode for cheapest version
                        - Add name
                        - Add sybnet name (eg redis group)
                    
                    - To establish connection between these services, we need to create a new `Security Group`, that says "allow any traffic from any other AWS service that has the same SG":
                        - In VPC dashboard create a new SG:
                            - add name
                            - add inbound rule: Custom TCP / TCP / port 5432-6379 / allow from newly created SG
                        - Assign this SH to the EB instance, the RDS and the ED (add as second, don't need to remove the original!)

            - Add environmental variables to Elastic Beanstalk:
                - Click on the environment -> Configuration / Configure updates, monitoring, and logging / Platform software  / Environment properties:
                    - Add `REDIS_HOST` with elasticache's Primary endpoint as a value, without the port! (As I'm using Redis OSS cache, there's no Primary Endpoint, so I'm using the configuration endpoint)
                    - Add `REDIS_PORT` with 6379 (default port)
                    - Add `PGUSER` with "postgres" or what you used
                    - Add `PGPASSWORD` with "postgres_password" or what you used
                    - Add `PGHOST` with RDS / Instances -> click on instance -> under Connectivity & Security you can find the Endpoint to add
                    - Add `PGDATABASE` with DB instance ID as a value (same as the name of the RDS you created)
                    - Add `PGPORT` with 5432 (default port)
                - **Note:** As opposed to docker-compose, where we add the ENV variables to each service, here the ENV variables added to the Elastic Beanstalk will be shared with all containers listed in the Dockerrun file
            
            - Create access with IAM user (for simplicity the admin user can be used):
                - Go to AWS console / IAM:
                    - Create a new user with deploy access to Elastic Beanstalk:
                        - Click on User -> Create User -> add name like "fibonacci-calculator-deployer" (don't need to add console access!)
                        - Attach existing policies -> Add all policies related to "beanstalk" (up to 10 only!)
                        - Probably some S3 bucket access also needs to be added, because it runs into errors otherwise
                    - Add Access keys ("other" type -> Don't forget to download .csv file!)
                
                - Got to `travis.ci` site, select the project, and under Settings / Environmental variables add:
                    - `AWS_ACCESS_KEY` with the user's access key as a value
                    - `AWS_SECRET_KEY` with the user's secret access key as a value
            
            - In `.travis.yml` file:
                - We need to add our AWS credentials (`$AWS_ACCESS_KEY` and `$AWS_SECRET_KEY`)
                - Add `deploy` section:
                    
                        deploy:
                            provider: elasticbeanstalk
                            region: eu-west-2
                            app: fibonacci-calculator (get this from Elastic Beanstalk / your environment / App name)
                            env: Fibonacci-calculator-env (different than the app name!)
                            bucket_name: elasticbeanstalk-eu-west-2-891376988072 (this gets generated automatically!)
                            bucket_path: fibonacci-calculator (can be same as app name)
                            on:
                                branch: main
                            access_key_id: $AWS_ACCESS_KEY
                            secret_access_key: $AWS_SECRET_KEY
            
            - Once the app is deployed, the Elastic Beanstalk status should be updated to `Health: Ok`
                - Then you can access the link to the app, from the `Applications` / Click on your app, then use the link under `Domain`

    - **Deployment with Kubernetes (Production to Google Cloud)**
        - Architecture:
            - Traffic comes into our Node using an `Ingress` (we will be setting this up all as a single node first!)
            - It redirects traffic to the Client and Server (API), which are set up as deployments, that use a `ClusterIP` service.
            - The Server/API is then connected to Redis and Postgres, both being separate deployments, also using a `ClusterIP` service.
            - The worker deployment is connected to the `ClusterIP` of Redis
            - A `PVC` (Persistent Volume Claim) is set up for the Postgres pod

        - Steps:
            1. Create config files for each element/object we will be using:
                - Create main architecure first:
                    - `client-deployment.yaml`
                    - `client-cluster-ip-service.yaml`
                    - `server-deployment.yaml` (we will have to add also the ENV variables for Redis and Postgres!)
                    - `server-cluster-ip-service.yaml`
                    - `worker-deployment.yaml` (we will have to add also the ENV variables for Redis and Postgres! But no service or port setup is needed, because we are only connecting FROM it, not TO it)
                    - `redis-deployment.yaml`
                    - `redis-cluster-ip-service.yaml`
                    - `postgres-deployment.yaml`
                    - `postgres-cluster-ip-service.yaml`

                - Create persistent volumes for databases: 
                    - `database-persistent-volume-claim.yaml`
                        - Update `postgres-deployment.yaml` file with:
                            - `template/spec` section with `volumes`
                            - `containers` section with `volumeMounts` (`subPath` is only required for postgres specifically!)
                
                - Configure environment variables:
                    - `server` needs:
                        - `REDIS_HOST` (constant value, but of URL type - describes how to connect to service - use the name of the service!)
                        - `REDIS_PORT` (constant value)
                        - `PGUSER` (constant value)
                        - `PGHOST` (constant value, but of URL type - describes how to connect to service - use the name of the service!)
                        - `PGDATABASE` (constant value)
                        - `PGPORT` (constant value)
                        - `POSTGRES-PASSWORD` (used with a secret)
                    - `worker` needs:
                        - `REDIS_HOST` (constant value, but of URL type - describes how to connect to service - use the name of the service!)
                        - `REDIS_PORT` (constant value)
                    
                    - `server-deployment.yaml`:
                        - add `env` to `templates/containers` section
                            - `REDIS_HOST` and `PGHOST` values are the names of the services we are connecting to, so:
                                - `redis-cluster-ip-service`
                                - `postgres-cluster-ip-service`
                    - `worker-deployment.yaml`:
                        - add `env` to `templates/containers` section (only redis needs to be added)
                    - For the final variable, we use a secret with an imperative command to create it locally (see below at `Secret` object section)
                        - we need to add this also as an env variable to our `server-deployment.yaml` file (instead of `value`, we use `valueFrom`/`secretKeyRef`)
                        - we also need to add this to our `postgres-deployment.yaml` file!

                - Config files can also be combined (eg. add the service and the deployment in a single file, that work together):
                    - We just need to copy them one after the other in the file, and separate them with a `---` line
                
                - Setting up `ingress` (https://kubernetes.github.io/ingress-nginx/deploy/):
                    - Setup `ingress` locally: 
                        - make sure you have `minikube` running!
                        - `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.1/deploy/static/provider/cloud/deploy.yaml`
                        - `minikube addons enable ingress`
                    - Create config file with these routing rules:
                        - `/` path is forwarded to `client`
                        - `/api` path is forwarded to the `server`

            2. Test the setup locally on minikube:
                - to apply a group of config files:
                    - `kubectl apply -f k8s` (we refer to the folder, and everything inside it will be applied)
                - then connect with:
                    - `minikube tunnel` -> connect to `127.0.0.1` (localhost) in your browser

            3. Create a Github/Travis flow to build images and deploy (this is where production deployment starts):
                - create a git repo out of this project (if wasn't already)
                - open `Travis` and open this project (by default it loads now all projects!)
                    - `.travis.yml` file will be created after the `Google Cloud` project is set up. It will include:
                        - Install Google Cloud SDK CLI
                        - Sonfigure the SDK without Google Cloud auth info
                        - Login to Docker CLI
                        - Build the test version of the app's client
                        - Run tests
                        - If tests were successful, run a script to deploy newest images
                    - the following steps will be from a separate script file (`deploy.sh`):
                        - Build all the images, tag them and push them to DockerHub
                        - Apply all config file in the k8s folder
                        - Imperatively set latest images on each deployment (ideally always work with a specific version tag!)
                            - **Versioning tag:**
                                - Both tags will be used:
                                    - `docker build -t <docker_id>/<image_name>:latest -f ./client/Dockerfile ./client`
                                    - `docker build -t <docker_id>/<image_name>:$GIT_SHA -f ./client/Dockerfile ./client`  
                                        - a `GIT-SHA` is a unique identifier generated after a git push command. It can be printed out with the following command:
                                            - `git rev-parse HEAD`
                                - the travis file already was written using this double tagging
                                - the pushing will have to be done twice, to include both tags!

            4. Deploy the app to a cloud provider (GCP will be used in this project)
                - set up `Google Cloud` project
                - enable `Kubernetes Engine` and create a cluster with a minimal setup
                - create a `service account`:
                    - look for `IAM and admin` -> `Service accounts` -> `Create service account`:
                        - name: "travis-deployer"
                        - project role: "kubernetes engine admin"
                    - then create a new key for it and save it as a JSON file:
                        - to upload this securely, we will be running these commands in our project's root folder:
                            - `docker run -it -v "/$(PWD)":/app ruby:3.0 sh`
                                - Then inside the shell:
                                    - `gem install travis`
                                    - `travis login` (alternatively add `--com` or `--pro` flags)
                                    - Now copy the downloaded json file into the repo's root folder (do this from windows!)
                                        - rename it to `service-account.json`, so it's easier to work with
                                    - Navigate to the `/app` folder again the the shell and run this command:
                                        - `travis encrypt-file service-account.json -r gaklamar/fibonacci-calculator-k8s`
                                            - there will be a command `openssl ...` that should be copied as the first input in the travis file's `before_install` section
                                            - copy the generated `service-accoint.json.enc` file into the repo (it should already be there)
                                                - basically you just need to delete the original file containing the private key
                - In Travis:
                    - Inside project's settings under environmental variables:
                        - Add `DOCKER_USERNAME` with your username
                        - Add `DOCKER_PASSWORD` with your password
                
                - Adding PG password as a secret:
                    - In the Google Cloud, we can open a terminal on our cluster page:
                        - Do configuration:
                            - `gcloud config set project <project-id>`
                            - `gcloud config set compute/zone <project-zone>`
                            - `gcloud container clusters get-credentials <your-cluster-name>`
                        - Create the secret:
                            - `kubectl create secret generic pgpassword --from-literal POSTGRES_PASSWORD=<your-password>`
                                - If it was successfully created, it should be visible under kubernetes configuration in your kubernetes engine page on GC
                
                - Install helm:
                    - Also, in the GC cluster's terminal:
                        - `curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3`
                        - `chmod 700 get_helm.sh`
                        - `./get_helm.sh`
                    - Then install `ingress-nginx`:
                        - `helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx`
                        - `helm install my-release ingress-nginx/ingress-nginx`
                    - In case of an error, `gcloud` will also need to be updated:
                        - `gcloud container clusters upgrade  YOUR_CLUSTER_NAME --master --cluster-version 1.16`
                
                - Assign a `Service Account` to manage Tiller (outdated!):
                    - Type the following commands in the GC command line:
                        - `kubectl create serviceaccount --namespace kube-system tiller`
                        - `kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller`
                    - Assign the `Service Account` to use Tiller:
                        - `helm init --service-account tiller --upgrade`
                
                - Use helm to install `ingress-nginx`:
                    - `helm install stable/nginx-ingress --name my-nginx --set rbac.create=true` (from `ingress-nginx` documentation)
                
                - `HTTPS`-`not-secure` error fix:
                    - Buy a domain (eg. from the Google Domain registrar)
                    - Set 2 routes under DNS/Custom resource records:
                        - Name: @ | Type: A | TTL: 1H | Data: The IP address from your ingress-nginx service (don't add the port!) / This will handle addresses like `google.com` 
                        - Name: www | Type: CNAME | TTL: 1H | Data: You can just add the address from the line above, that already exists / This will handle addresses like `www.google.com`
                    
                    - Use `CertManager` to set up the certification (install `certmanager` with HELM)
                        - Involves the following steps:
                            - Create a `Certificate` object:
                                - describes the details of the certificate that should be obtained
                            - Create an `Issuer` object
                                - tells the `Certification manager` where to get the certificate from
                            - Modify `nginx-ingress` so ituses the certification for HTTPS traffic
                
                - **Deployment:**
                    - Happens automatically after a push happens to the `main` branch

# LINKS:
- Introduction video: https://www.youtube.com/watch?v=AlrImm1T8Wg&ab_channel=KodeKloud
- CI/CD in 100 seconds: https://www.youtube.com/watch?v=scEDHsr3APg&ab_channel=Fireship
- Continuous integration vs. delivery vs. deployment: https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment

- Articles:
    - Meta/Facebook: https://engineering.fb.com/2017/08/31/web/rapid-release-at-massive-scale/
    - Github: https://github.blog/2012-08-29-deploying-at-github/
    - Netflix: https://netflixtechblog.com/how-we-build-code-at-netflix-c5d9bd727f15