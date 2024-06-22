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

## Jenkins
- Installing Jenkins (as docker image):
    - General guide: https://www.jenkins.io/doc/book/installing/docker/
    - Install video: https://www.youtube.com/watch?v=UQMAKQPxnHs&ab_channel=TravelsCode
    - Troubleshooting doc: https://docs.google.com/document/d/1g15mOqGiMcdQhvkEg-75_WkE-m5NJA-__uk0gIA3WUE/edit

    - Summary:
        1. Get latest Jenkins (Docker) image:
            - `dokcer pull jenkins/jenkins`
        
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
- Install all required plugins:
    - `docker`
    - `AWS Credentials Plugin`

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

- **Deploy a simple app and push it to the ECR using a `Jenkins Pipeline`:**
    1. Open Jenkins and create a new `Pipeline`
    2. Pipeline section:
        - Choose `Pipeline script from SCM` and set it to `Git`
            - Add Git repo and set branch
            - Use Jenkinsfile from resources (`Jenkinsfile-nodejs-helloworld`) - this also includes AWS credentials block
    3. Add trigger to build on every commit:
        - enable `GitHub hook trigger for GITScm polling`

- **Add webhook:**
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

- **Set Up AWS EKS Cluster using Terraform:**
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

- **AWS EKS with Terraform (using modules):** (the simplest guide youtube video: https://www.youtube.com/watch?v=7wRqtBMS6E0&ab_channel=ASCODE )
    - https://github.com/ascode-com/wiki/blob/main/terraform-eks/complete-example.tf

# LINKS:
- Introduction video: https://www.youtube.com/watch?v=AlrImm1T8Wg&ab_channel=KodeKloud
- CI/CD in 100 seconds: https://www.youtube.com/watch?v=scEDHsr3APg&ab_channel=Fireship
- Continuous integration vs. delivery vs. deployment: https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment
- 

- Articles:
    - Meta/Facebook: https://engineering.fb.com/2017/08/31/web/rapid-release-at-massive-scale/
    - Github: https://github.blog/2012-08-29-deploying-at-github/
    - Netflix: https://netflixtechblog.com/how-we-build-code-at-netflix-c5d9bd727f15


Worked on jenkins, first using the freestyle project feature, then with a proper pipeline
I managed to dokcerize my app and push the image to the AWS ECR
Yesterday I also managed to make it work with Web hooks, so now after each code push to the repo triggers a new build
The tricky part was to make this work on localhost, because web hooks don't work with local addresses, just public ones