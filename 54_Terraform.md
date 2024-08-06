# TERRAFORM

- **Infrastructure as Code:**
    - Infrastructure-as-Code (`IaC`) is **the practice of managing infrastructure in a file** or files rather than manually configuring it via a user interface. 
    - Infrastructure resource types managed with `IaC` can include virtual machines, security groups, network interfaces, and many others.

- **Terraform basics:**
    - Terraform is a **tool** for *building, changing, and versioning infrastructure* safely and efficiently:
        - It can manage existing and popular service providers as well as custom in-house solutions
    
    - We use `configuration files` to describe to Terraform the components needed to run a single application or your entire datacenter:
        - It generates an execution plan describing what it will do to reach the desired state, and then executes it to build the described infrastructure. 
        - As the configuration changes, Terraform is able to determine what changed and create incremental execution plans which can be applied.

    - The **infrastructure** Terraform can manage includes low-level components such as compute `instances`, `storage`, and `networking`, as well as high-level components such as `DNS entries`, `SaaS features`, etc.
        - **Infrastructure** is described using a high-level configuration syntax. 
        - This allows a blueprint of your datacenter to be versioned and treated as you would any other code. Additionally, infrastructure can be shared and re-used
    
    - Terraform has a **planning** step where it generates an execution plan. The execution plan shows what Terraform will do when you call apply. This lets you avoid any surprises when Terraform manipulates infrastructure

    - Terraform builds a **graph of all your resources**, and parallelizes the creation and modification of any non-dependent resources. Because of this, Terraform builds infrastructure as efficiently as possible, and operators get insight into dependencies in their infrastructure.

    - Complex **changesets** can be applied to your infrastructure with minimal human interaction. With the previously mentioned execution plan and resource graph, you know exactly what Terraform will change and in what order, avoiding many possible human errors

# TERMINOLOGY:
- **HashiCorp Configuration Language (HCL):**
    - The structured **configuration syntax** that serves as the basis for Terraform's configuration language, as well as the configuration layer for several other HashiCorp products.
    - `HCL` establishes the syntax Terraform uses for things like arguments, blocks, literal values, and expressions. But what most people think of as the Terraform language extends beyond just the syntax; the built-in functions, Terraform-specific block types (like resource and variable), and Terraform-specific named values available in expressions are all implementation details of Terraform itself.
    - **Interpolation:**
        - Using a special placeholder to insert a computed value into a string.
        - Terraform's configuration language supports interpolation in strings using `${<EXPRESSION>}` placeholders. For example: `"Hello, ${var.name}!"`
        - Prior to Terraform 0.12, interpolation was the only way to use non-literal expressions in Terraform configurations; in 0.12 and later, expressions can be used independently.
        - Interpolation is a very common feature in programming languages; for example, Ruby uses `#{}` placeholders in double-quoted strings, and JavaScript (ES6 and up) uses `${<EXPRESSION>}` placeholders in backtick-quoted strings.
    - **Argument:**
        - A syntax construct that assigns a value to a name. Arguments have the form `<IDENTIFIER> = <EXPRESSION>`, and they appear within blocks.
        - Most of a Terraform configuration consists of using arguments to configure Terraform resources:
            - Each resource type defines the arguments its resources can use, the allowed values for each argument, and which arguments are required or optional. 
            - Information about a given resource type can be found in the docs for that resource's provider.
    - **Meta-arguments:**
        - Arguments that we can use within blocks, to configure Terraform behaviour:
            - `depends_on`: explicitly define dependencies
            - `count` and `for_each`
            - `provider`: to define a separate provider from the default (used with an alias)
            - `lifecycle`
                - `create_before_destroy`: by default it's destroying first, then creating a new resource
                - `prevent destroy`: exit with an error if the planned change would lead to the resource being destroyed (eg. for a critical resource)
                - `replace_triggered_by`: replaces the resource when any of the referenced items change
                - `ignore_changes`: provide a list of attributes that don't trigger an update (for external manual changes for example, revert won't happen)
            - `connection`: eg connect with SSH
            - `timeouts`: eg. for create, update, delete operations

    - **Attribute:**
        - A named **piece of data** that belongs to some kind of object. The value of an attribute can be referenced in expressions using a dot-separated notation, like `aws_instance.example.id`.
        - Terraform resources and data sources make all of their arguments available as readable attributes.

- **State:**
    - It's Terraform's cached information about your managed infrastructure and configuration. 
    - This state is used to persistently map the same real world resources to your configuration from run-to-run, keep track of metadata, and improve performance for large infrastructures.
    - Without state, Terraform has no way to identify the real resources it created during previous runs. Thus, when multiple people are collaborating on shared infrastructure, it's important to store state in a shared location, like a free Terraform Cloud organization.
    - A `tfstate` file gets created after the first apply
        - It is created locally if no remote backend (S3 or Terraform Cloud) is specified in the `terraform` config block
    - Contents of the `terraform.tfstate` state file:
        - Primary
            - Resource configuration
            - Binding to real-world object
            - metadata
        - Secondary:
            - Backend configuration
            - Outputs
            - Sensitive values
    - `Configuration drift`: means that if someone manually changes the infrastructure, Terraform will automatically detect the change when comparing to the desired state, and revert it before any further changes

    - **Locking:**
        - When working in a team, if developer A is making changes, the state will be locked, so Developer B can only make changes, once the state is unlocked
        - The ability to prevent new runs from starting in a given workspace. Workspaces are automatically locked while a run is in progress, and can also be manually locked.
        - The remote backend respects the lock status in Terraform Cloud workspaces. Some other Terraform backends can also lock state during runs.
        - In reality, a `tfstate.lock.info` file gets created during the `destroy`:
            - If we type `yes`, the lock file is removed, and a `backup` file gets created
    
- **Backend:**
    - The part of Terraform's core that determines how Terraform stores state and performs operations (like plan, apply, import, etc.). 
    - Terraform has multiple backends to choose from, which can be configured in a variety of ways. **Backends are not plugins**, so it is not possible to install additional backends.
    - In a general computer science sense, a backend is any lower-level implementation that enables a higher-level feature. But in the context of Terraform, "backend" always means **the built-in code that handles state and operations**.
    - The `backend` block needs to be added to the `terraform` config, such as:

            terraform {
                required_version = "~> 1.7"
                required_providers {
                    aws = {
                    source  = "hashicorp/aws"
                    version = "~> 5.0"
                    }
                }

                backend "s3" {
                    bucket = "tf-backend-gaborkalmar"
                    key = "state.tfstate"
                    region = "eu-west-2"
                }
            }

    - **Backend types:**
        - **Local Backend:**
            - if nothing else is specified in the terraform config block

        - **Remote Backend - Terraform Cloud:**
            - the `tfstate` file is stored in the `Terraform Cloud`, so it's available for team-work
            - A `Terraform CLI feature` that lets Terraform connect to `Terraform Cloud`, by specifying in the Terraform configuration which organization and workspace(s) to use. Used for remote operations in `Terraform Cloud` workspaces, and used for state storage in `Terraform Cloud`'s free tier.
        
        - **Remote Backend - 3rd party provider (S3 bucket):**
            - the `tfstate` file is stored in a 3rd party location, most commonly an `S3` bucket, so it's available for team-work
            - Older documentation sometimes refers to backends like `s3` or consul as "remote backends," since they store Terraform's state in a remote service instead of the local filesystem
            - requires authentication credentials and read/write permissions    


- **Terraform phases:**
    - **Plan:**
        - One of the stages of a `run`, in which Terraform compares the managed infrastructure's real state to the configuration and variables, determines which changes are necessary to make the real state match the desired state, and presents a human-readable summary to the user. The counterpart of an `apply`.

        - In Terraform's CLI, plans are performed by all of the following commands:
            - `terraform plan`, which only assembles a plan. It can optionally output a plan file, which terraform apply can use to perform that exact set of planned changes.
            - `terraform apply`, which assembles a plan and then, if a user approves, immediately applies it.
            - `terraform destroy`, which is similar to terraform apply but uses a desired state in which none of the managed resources exist; if the plan is approved, those resources are destroyed.
        
        - In `Terraform Cloud`, plans are performed by committing changes to a workspace's configuration, running terraform plan or terraform apply with the remote backend enabled, manually queueing a plan, or uploading a configuration via the API.

        Terraform Cloud's workflow always creates a plan file, which can be auto-applied or can wait for a user's approval. Terraform Cloud also supports speculative plans, which are for informational purposes only and cannot be applied.

    - **Apply:**
        - To make changes to real infrastructure in order to make it match the desired state (as specified by a Terraform config and set of variables).
        - In conversation, it's common to refer to "applying a plan" (usually in the context of Terraform Cloud's workflow) or "applying a configuration" (usually in the context of the Terraform CLI workflow).
    
    - **Destroy:**
        - The infrastructure gets removed
        - We can also save the plan for this

- **Terraform objects/blocks:**
    - **Terraform configuration:**
        - Used to modify the default terraform configuration
        
        - **Example:**

                terraform {
                    required_providers {
                        aws = {
                            source  = "hashicorp/aws"
                            version = "~> 5.0"
                        }
                    }
                }

    - **Providers:**
        - A **plugin for Terraform** that makes a collection of related resources available. A provider plugin is responsible for understanding API interactions with some kind of service and exposing resources based on that API.
        - `Terraform providers` are generally tied to a specific infrastructure provider, which might be an infrastructure as a service (IaaS) provider (like `AWS`, `GCP`, `Microsoft Azure`, `OpenStack`), a platform as a service (PaaS) provider (like `Heroku`), or a software as a service (SaaS) provider (like `Terraform Cloud`, `DNSimple`, `Cloudflare`).
        - The purpose of the providers is to be able to communicate to different Remote APIs and platforms
        - The `terraform init` command downloads and sets up the provider for our project
        - There are many existing providers available, but providers can also be custom-built to work with any API.
        - Providers are developed separately from Terraform
        - Providers are "passed down" to child modules, but can be also set to be different
        
        - **Example:**
                
                provider "aws" {
                    region = "eu-west-2"
                }
        
        - We can also add different providers to objects in our project, by using an alias:
                
                terraform {
                    required_version = "~> 1.0"
                    required_providers {
                        aws = {
                            source = "hashicorp/aws"
                            version = "~> 5.0"
                        }
                    }
                }

                provider "aws" {
                    region = "eu-west-1"
                }

                provider "aws" {
                    region = "eu-west-2"
                    alias = "eu-west-2-alias" # We can refer to this in the resource, so it uses this provider instance
                }

                resource "aws_s3_bucket" "eu-west-1-bucket" {
                    bucket = "some-very-random-and-unique-bucket-name-asdin"
                }

                resource "aws_s3_bucket" "eu-west-2-bucket" {
                    bucket = "some-very-random-and-unique-bucket-name-19834"
                    provider = aws.eu-west-2-alias  # This is where we change the default provider, by refering to it with the alias
                }

    - **Resources and Data Sources:**
        - **Resource:**
            - The main building blocks of Terraform
            - Also-known-as "infrastructure resource":
                - **A block that describes one or more infrastructure objects**. Resources can be things like `virtual networks`, `compute instances`, or `higher-level components` such as `DNS records`.
                - An infrastructure object of a type that could be managed by Terraform.
            - A `resource` block in a configuration instructs Terraform to manage the described resource: 
                - during a run, Terraform will create a matching real infrastructure object — if one doesn't already exist —, and will modify the existing object if it doesn't match the desired configuration. 
                - Terraform uses `state` to keep track of which real infrastructure objects correspond to resources in a configuration.
            - Terraform uses cloud provider `APIs` to create, edit, and destroy resources:
                - Terraform providers are responsible for defining resource types and mapping transitions in a resource's state to a specific series of API calls that will carry out the necessary changes.
            - A resource usually consists of a `resource type` and `resource name`, that has to be unique within a project (eg. we can only have 1 EC2 instance called "my-ec2"):
                - Best practice says that if there is only 1 of that type, we call it `this`
            - Resource dependencies:
                - It refers to the order in which the resources need to be created 
                    - parallel creation:
                        - if the resources aren't related, they are created paralelly
                    - sequencial creation
                        - if resources are connected, then they are created sequencially, by setting up a logical order (eg. a VPC is created before a Subnet)
                - We can also define explicitly using the `depends_on` meta-argument
            
            - **Example:**
                    
                    resource "aws_s3_bucket" "my_bucket" {
                        bucket = var.bucket_name
                    }

        - **Data Source:**
            - A **resource-like object** that can be configured in Terraform's configuration language.
            - Unlike resources, data sources *do not create or manage infrastructure*. Instead, they return information about some kind of external object in the form of readable attributes. 
                - This allows a Terraform configuration to make use of information defined outside of Terraform, or defined by another separate Terraform configuration.
                - We can also use these external resources, without recreating them (eg. use an existing VPC with an existing Role)
            - Some example data blocks are `aws_ami`, `aws_caller_identity`, `aws_region`, `aws_vpc`, `aws_availability_zones`, `aws_iam_policy_document`
            
            - **Example:**
                
                data "aws_vpc" "prod_vpc" {
                    tags = {
                        Env = "prod"    # find the vpc in your availability zone that has "prod" value in its "Env" tag
                    }
                }

    - **Module:**
        - A self-contained collection of Terraform configurations that manages a collection of related infrastructure resources.
        - Other Terraform configurations can call a module, which tells Terraform to manage any resources described by that module.
        - Modules define `input variables` (which the calling module can set values for) and `output values` (which the calling module can reference in expressions).
        
        - **Example:**

                module "my_module" {
                    source = "./module-example"
                }

    - **(Input) Variables:**
        - Also-known-as "input variables".
        - In Terraform, "variables" almost always refers to **input variables**, which are key/value pairs used in a run. 
        - Terraform modules can declare variables to allow customization:
            - for child modules, the parent module provides a value when calling the module
            - for the root module, values are provided at run time.
        - `Terraform Cloud` lets you set values for root input variables in a workspace, so all collaborators can use the same values. Variable values marked as "sensitive" become unreadable in the UI and API, and all variable values are protected by Vault.
        - We generally declare these in a separate `variables.tf` file:
            - we can refer to them with `var.<var_name>`
            - we can set the `type`, add `description`, add `defailt_value`, set it to be a `sensitive` variable and provide validation `rules`
            - when running `terraform plan` or `terraform apply`, we will be prompted to add these values, unless they have a `default_value`
                - we can also provide the values directly after the command
            - **Variable precedence:**
                - there are many ways we can provide input variables (in the order from lowest precedence to higher - so the ones in the top get overwritten if the value is provided in an other way as well that lower in the list):
                    1. default values
                    2. environment variables (`TF_VAR_<name>=<value>`)
                    3. files:
                        - `terraform.tfvars`
                        - `terraform.tfvars.json`
                        - `*.auto.tfvars`
                        - `*.auto.tfvars.json`
                    4. using the command line with `-var` or `--var-file`
        
        - *Note*: using variables for `aws_regions` is very risky, because the infrastructure will be created again in a separate region, if you use a different region as the input!

        - **Example:**

                variable "bucket_name" {
                    type        = string
                    description = "Bucket name"
                    default     = "my-default-bucket-name"
                }

                # Then we can refer to its value with "var.bucket_name"
        
        - **Input validation:**
            - You can set the valid values by adding a `validation` attribute to the `variable` block

                    validation {
                        condition = var.ec2_instance_type == "t2.micro" || var.ec2_instance_type == "t3.micro" # add conditions like this
                        error_message = "Only t2.micro or t3.micro supported" # returns error message if condition is false
                    }

                    # or with more advanced syntax:

                    condition = contains(["t2.micro", "t3.micro", var.ec2_instance_type])
        
        - **Map and Object variables:**
            - We can also create a JS-like `object` with kvps, to create a single variable with multiple values (the object can have multiple attributes and a complex structure, with different value types, as opposed to `maps`)
                - `Object` example:

                        variable "ec2_volume_config" {
                            description = "The size and type of the root block volume attached to managed EC2 instances"
                            
                            type = object({
                                size = number
                                type = string
                            })

                            default = {
                                size = 10
                                type = "gp3"
                            }
                        }

            - `Map` is a simplified object (a list of key-value pairs), best used if the values for each element are of the same type in the map (no complex structure!)
                - `Map` example:

                        variable "additional_tags" {
                            type = map(string)
                            default = {}
                        }

                        # Then refer to them like this:

                        resource "aws_instance" "example" {
                            ...
                            tags = merge(var.additional_tags, {
                                ManagedBy = "Terraform"
                            })
                        }
        
        - **Using `terraform.tfvars` file:** (Doesn't work with `hashicorp terraform` extensions `2.28` and above!)
            - Create a file named `terraform.tfvars` in the project root
            - Add the values you would otherwise query here (so instead of default values, we can use this file)
            - It is of higher presedence also, so even if there is a default value, the file's values will be used
            - If we want to create a `dev.terraform.tfvars` file and another called `prod.terraform.tfvars`, we can specify which one to use in the command line (this is not good practice, we use `workspaces` for this!):
                - `terraform plan -var-file="dev.terraform.tfvars"`
                - Any filed named `terraform.tfvars` is automatically read, but if it doesn't match this format, we need to add `<filename>.auto.tfvars` to make its values automatically loadad
                - The precedence of the `.auto` file is higher, so anything in there will overwrite any previously declared value
        
    - **Locals:**
        - Locally decclared variables, only available in the current context
        - A way to define a variable that can be reused within your module without needing to pass it in as an input variable
        - **Example:**

                locals {
                    local_example_1 = "This is a local variable"
                    local_example_2 = "This is another local variable"
                }

                # We can now reference them in the code with "locals.local_example_1"

    - **Output Values / Outputs:**
        - Data exported by a Terraform module, which can be displayed to a user and/or programmatically used by other Terraform code.
        - Sensitive values:
            - within the `output` block, we add a `sensitive = true` attribute
                - we can also add this to a `variable`, but then it will run into an error saying the output also needs a `sensitive = true` attribute
            - we can still retrieve its value using the `terraform output -json` command (it will show up in the "value") or by simply querying the output's name
        - **Example:**

                output "bucket-id" {
                    value = aws_s3_bucket.my_bucket.id
                }
    
    - **Using variables and locals (workflow):**
        - Create a `variable`, to define its type and structure
        - Give them initial (default) values in a `terraform.tfvars` file
        - Use `locals` to create computed values using the `variables`
            - Refer to `variables` with `var.<varname>`
        - Create an `output` for each `local`:
            - Refer to `locals` with `local.<localname>`

# COMMANDS
- `terraform validate`: Checks the syntax of the Terraform files and verifies that they are internally consistent, but does not ensure that the resources exist or that the providers are properly configured.
- `terraform fmt`: Automatically updates Terraform configuration files to a canonical format and style, improving consistency and readability. The command works only for the files in the current working directory, but you can also add a `-recursive` flag to format .tf files in nested directories.
- `terraform plan`: Creates an execution plan, showing what actions Terraform will take to achieve the desired state defined in the Terraform files. This command does not modify the actual resources or state.
- `terraform plan -out <filename>`: Similar to terraform plan, but it also writes the execution plan to a file that can be used by terraform apply, ensuring that exactly the planned actions are taken.
- `terraform apply`: Applies the execution plan, making the necessary changes to reach the desired state of the resources. If you run terraform plan with the `-out` option, you can run `terraform apply <filename>` to provide the execution plan.
    - We can also use `-auto-approve` flag to skip typing "yes" for confirmation (eg. in a pipeline)
- `terraform show`: Provides human-readable output from a state or plan file. It's used to inspect the current state or to see the actions planned by a terraform plan command.
- `terraform state list`: Lists all resources in the state file, useful for managing and manipulating the state.
- `terraform destroy`: Destroys all resources tracked in the state file. This command is the equivalent of passing a `-destroy` flag to the terraform apply command.
- `terraform -help`: Provides help information about Terraform commands. It can be used alone for a general overview, or appended to a specific command for detailed help about that command.
- `terraform output <output_name>`: retrieve the value of an output (if sensitive, it won't display)
    - `terraform output json`: returns the output objects in a json format
    - `terraform output -raw <output_name>`: returns value without double-quotes, useful for reusing the value (eg. with `curl` command)

# GUIDES:
## Basics:
- **Generic workflow:**
    0. set up environment:
        - install: `sudo snap install terraform --classic`
        - create a directory for your project
        - to also use `git`, you can follow the link: https://developer.hashicorp.com/terraform/intro/core-workflow

    1. Set up your configuration:
        - create a `main.tf` file inside it (this will contain the configuration)
            - declare your provider, eg `AWS` (better to use env variables):

                    provider "aws" {
                        region     = "us-west-2"
                        access_key = "your-access-key"
                        secret_key = "your-secret-key"
                    }
                    
            - define resources:
                - eg. `EC2 instances`, `S3 buckets`, or an entire `EKS cluster`:

                        resource "aws_instance" "example" {
                            ami           = "ami-0c55b159cbfafe1f0"
                            instance_type = "t2.micro"
                        }

                - you can also use existing `terraform modules` from the `Terraform Registry` to simplify configs
                - use `variables` to have a more dynamic config and `outputs` to retrieve info about the resorces

    2. Manage state (**write-plan-apply cycle** - write refers to the previous point!):
        - run `terraform init` to initialize the setup (downloads all necessary plugins)
        - run `terraform plan` to see what actions Terraform will take
        - run `terraform apply` to apply the changes

        - use `state` file with remote state management like `AWS S3`, if you are working on a team project

    3. Update:
        - repeat plan-apply cycle after modifications
        - OR
        - run `terraform destroy` to tear down all resources if you don't need them anymore

- **Workshop:**
    - we create a `main.tf` file, but we also create others:
        - `providers.tf` we add the providers here separately, so it's not all int he `main.tf` file
        - `versions.tf`
    - We use the docs, to fill these up:
        - https://registry.terraform.io/providers/hashicorp/aws/latest/docs
        - For example, we add `resource` blocks to the `main.tf` file:
            - if a resource type has only 1 instance, we call it `this`

    - We now initialize it with commands:
        - `terraform init` -> tries to find the `main.tf` file, and initializes our backend: this is where the `state` is handled

## Based on Codecool tasks:
- **Terraforming Moon task:** (WS video: Creating an EC2 with SSH access from 27:20)
    0. Create a `main.tf` file in the root of your project folder (use `main-terraforming-moon_step-1.tf` template in resources!)
    0. How to get an AMI:
        - sgpt --code "Get latest Ubuntu AMI for EC2 in terraform":
            - this should return a `data` block, similar to a resource, that we can add to our `main.tf` file
            - we then reference `data.aws_ami.this.id` into the resource, where we specify the `ami` (`aws_ami` was the `data` type, and `this` was the name given - since there's only 1 in the code, we use `this`)

    1. Create an alias, so you don't have to type `terraform` all the time:
        - `alias tf=terraform`
        - Then run the loop:
            - `terraform init`
            - `terraform plan`
            - `terraform apply` (type `yes` to confirm!)
    2. Modify the `main.tf` file:
        - Add SSH login to SG section (refer to `main-terraforming-moon_step-2.tf`)
        - Update config:
            - `terraform apply` (type `yes` to confirm!)
        - Now we can SSH into our newly created instance:
            - `ssh -i ~/.ssh/AWS-GK-London ec2-user@<EC2 IP>` (add `-v` for verbose - show details)
    3. Add more IPs to the security group (SG) to allow additional machines to connect via SSH:
        - Update Security Group in Terraform (use `main-terraforming-moon_step-3.tf` file)
            - Replace "203.0.113.0/24" and "192.0.2.0/24" with the actual IP ranges or specific IPs that you want to allow. This setup assumes you know the IPs or ranges you wish to permit for SSH access. (what is this part?)
        - Update config:
            - `terraform apply` (type `yes` to confirm!)

    + Zalan: Az volt a gond, hogy minden resource -t magamnak csináltam és nem a defaultokat használtam és még pluszban kellett route table és route table association is ami össze van kapcsolva az `igw`-vel és a `subnet`-el.

- **Terraforming Mars:**
    - Create `S3` bucket from the AWS console:
        - add a unique name and leave everything else as default
    - Create a `DynamoDB Table`:
        - go to the `Dynamo DB` service to create one
        - as name, add `terraform-lock` (common naming)
        - primary key / partition key: `LockID`, type: `string`
    - Create `main.tf` file (use contents of `main-terraforming-mars-step-1.tf` file):
        - S3 added (replace name)
        - DynamoDB added (replace name)
    - Make an `RDS` (Relational Database Service) for the MySQL database of WordPress:
        - Add it through a new `resource` block in the `main.tf` file (refer to `main-terraforming-mars-step-2.tf`)
    - Make a new `S3` bucket for storing the media files of WordPress:
        - Add it as a new resource again (`main-terraforming-mars-step-3.tf` file)
    
    - ### EDDIG MENT, INNEN (WORDPRESS SETUP), MAR NEM MEGY
        - Talan ezzel a Guide-dal? https://aws.amazon.com/tutorials/deploy-wordpress-with-amazon-rds/module-four/
        
    - Now that the AWS infrastructure is comple, we can configure WordPress:
        - Connect to instance:
            - `ssh -i ~/.ssh/my-keypair.pem ubuntu@35.178.29.167`
        - Update package manager and install required elements:
            - `sudo apt update`
            - `sudo apt install nginx php-fpm php-mysql -y`
        - Go to the nginx folder to edit default config:
            - `sudo nano /etc/nginx/sites-available/default`
            - Edit the file, so it looks like this:

                    server {
                        listen 80;
                        server_name your_domain;

                        root /var/www/html;
                        index index.php index.html index.htm index.nginx-debian.html;

                        location / {
                            try_files $uri $uri/ /index.php$is_args$args;
                        }

                        location ~ \.php$ {
                            include snippets/fastcgi-php.conf;
                            fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;  # Ensure this matches your PHP version
                            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
                            include fastcgi_params;
                        }

                        location ~ /\.ht {
                            deny all;
                        }

                        location = /favicon.ico {
                            log_not_found off; access_log off;
                        }

                        location = /robots.txt {
                            log_not_found off; access_log off; allow all;
                        }

                        location ~* \.(css|gif|ico|jpeg|jpg|js|png)$ {
                            expires max;
                            log_not_found off;
                        }
                    }
        - Restart nginx:
            - `sudo nginx -t`
            - `sudo systemctl restart nginx`
        - Download Configure WordPress:
            - `cd /var/www/html`
            - `sudo rm *`  # Caution: This clears the directory!
            - `sudo chown ubuntu:ubuntu /var/www/html`
            - `wget https://wordpress.org/latest.tar.gz`
            - `sudo tar -xzf latest.tar.gz`
            - `sudo mv wordpress/* .`
            - `sudo rm -rf wordpress latest.tar.gz`
            - `sudo chown -R www-data:www-data /var/www/html`
            - `sudo find /var/www/html/ -type d -exec chmod 755 {} \;`
            - `sudo find /var/www/html/ -type f -exec chmod 644 {} \;`
        - Configure WordPress:
            - Create a `wp-config.php` by copying `wp-config-sample.php`:
                - `sudo cp wp-config-sample.php wp-config.php`
            - Edit `wp-config.php` to include your `RDS` credentials and endpoint:
                - `sudo nano wp-config.php` 
                    - Add details from `AWS RDS`:
                        - `DB_NAME`: The name of the database you specified when creating the RDS instance (e.g., wordpress).
                        - `DB_USER`: The username you set for the database access (e.g., wp_admin).
                        - `DB_PASSWORD`: The password you assigned to the above user.
                        - `DB_HOST`: The endpoint of the RDS instance. This is not a URL but a hostname, which typically looks like xxxxx.rds.amazonaws.com.




- **EKS persistency with EBS:** (this is not the original way to solve it, but it's better!)
    1. WATCH WS VIDEO!

## Udemy courses:
- **Creating partial backends:**
    - This process isn't used in a local project, just with CI/CD pipelines! (where we can configure the whole commands)
    - Set up an `S3` remote backend, but don't add the specifics of the backend:

            terraform {
                required_version = "~> 1.7"
                required_providers {
                    aws = {
                    source  = "hashicorp/aws"
                    version = "~> 5.0"
                    }
                }

                backend "s3" {

                }
            } 
    
    - Instead, in a separate file (`dev.tfbackend`), add the lines that you would add to the `backend` configuration:

            bucket         = "tf-backend-gaborkalmar"
            key            = "backend_configs/dev/state.tfstate"
            region         = "eu-west-2"
    
    - Create one also for profuction (`prod.tfbackend`):

            bucket         = "tf-backend-gaborkalmar"
            key            = "backend_configs/prod/state.tfstate"
            region         = "eu-west-2"

    - Now you can initialize it with the following command:
        - `terraform init -backend-config=dev.tfbackend` OR
        - `terraform init -backend-config=dev.tfbackend`
            - In case you already initialized your backend, you can migrate it by adding `-migrate-state` to the end of the command above

- **VPC with Nginx deployment (files in project 45):**
    1. Deploy a VPC and a subnet:
        - Create `providers.tf` file:
            - add `terraform` block with required versions and required provider set to aws
            - add `provider` block with your region
        - Create `networking.tf` file:
            - add `aws_vpc` resource with cidr_block `10.0.0.0/16`
            - add `aws_subnet` resource with cidr_block `10.0.0.0/24` and connect it to the vpc

            - OPTIONAL:
                - add `Tags` section to both with `Name`, `ManagedBy` and `Project`:
                    - use with `locals` block to avoid duplications:
                        - Use `local` block for common tags:

                                locals {
                                    common_tags = {
                                        ManagedBy = "Terraform"
                                        Project   = "45_Nginx-Deployment"
                                    }
                                }
                        
                        - For each resource, add additional tags with `merge`:

                                resource "aws_vpc" "this" {
                                    cidr_block = "10.0.0.0/16"

                                    tags = merge(local.common_tags, {
                                        Name = "45_VPC"
                                    })
                                }

                    - Alternatively we can add all the common tags to the provider block

    2. Deploy an IGW and associate it with the VPC:
        - In `networking.tf` file:
            - add `aws_internet_gateway` resource and connect it to the vpc

    3. Setup a route table with a route to the IGW and associate it with the subnet
        - In `networking.tf` file:
            - add `aws_route_table` resource and connect it to the vpc; add route block with cidr block (`0.0.0.0`) to gateway_id (note: no equal sign after route!)
            - add `aws_route_table_association` to connect the RT with the IGW (`subnet_id` and `route_table_id` attributes)

    4. Deploy an EC2 instance insite of the created subnet and associate a public IP address
        - Link to AMI locator: https://cloud-images.ubuntu.com/locator/ec2/
        - Create `compute.tf` file:
            - Add `aws_instance` resource block:
                - choose an `ami` by filtering for your region, for `amd64` architecture and `Jammy-Jellyfish` (filters are at the bottom of the page!)
                - initial setup should look like this:
                        
                        resource "aws_instance" "web" {
                            ami = "ami-07e0ad8f78f635e60"
                            associate_public_ip_address = true
                            instance_type = "t2.micro"
                            subnet_id = aws_subnet.public.id
                            # root_block_device can also be added, but it's not mandatory!
                        }

    5. Associate a security group that allows public ingress:
        - *Note:* 
            - A SG gets created by default with a VPC, and an instance by default gets this SG attached
            - This SG allows connections from any resource that also has this SG attached (so this means basically, that everyone on the VPC will be allowed to connect by default)
        - In `compute.tf` file:
            - Add `aws_security_group` resource with description, name, vpc_id 
            - Add 2 no. `aws_vpc_security_group_ingress_rule` resources for `http` and `https` with security_group_id, cidr_ipv4, from_port, to_port, ip_protocol
            - Add `vpc_security_group_ids` attribute to `aws_instance` to attach it to the instance

    6. Change EC2 instance to use a publicly available Nginx AMI:
        - To find out the `ami`, we will have to click on launch instances, and then `Browse more AMIs`:
            - Click on the `AWS Marketplace AMIs` tab:
                - Search for `nginx`, then filter for: "free"
                - Select the `Bitnami package for NGINX Open Source` -> subscibe on instance launch (don't launch the instance, we only need this to get the `ami`!)
                - Make sure you're in the correct zone!
        - Copy the new `ami-id` to the instance's `ami` instead of the initial one
        - Add `lifecycle` meta-arguments block to EC2 with `create_before_destroy = true`, so that the instance updates don't need waiting for the destruction of the instance first

    7. Destroy infrastructure
        - Double check with `terraform state list` command, that nothing is left!

- **Deploying a static website using an S3 bucket (files in project 54):**
    1. Create `providers.tf` file:
        - Add `terraform` config block with `aws` and `random` providers
        - Add `provider` block for `aws`
    2. Create `s3.tf` file:
        - Add `random_id` resource for bucket suffix
        - Add `aws_s3_bucker` resource
    3. Enable public access to the bucket:
        - Add `aws_s3_bucket_public_access_block` resource, connect the bucket 
            - set all these to `false` in the resource (this is what's in the "Public Access Block" basically):
                - `block_public_acls`
                - `block_public_policy`
                - `ignore_public_acls`
                - `restrict_public_buckets`
    4. Add policy that allows others to only read from this bucket:
        - Add `aws_s3_bucket_policy` resource and connect the bucket
            - create policy attribute with `jsonenconde({ <add_policy_here> })`
            - generate an s3 bucket policy with principal `*`, action `GetObject`, effect `allow`, sid `PublicReadGetObject` and the bucket's arn
            - *Note*:
                - After using `terraform apply`, it will fail first, so it needs to be applied again to succeed (it might be because the resources are created at the same time, and needs a `depends_on` meta-argument to work properly, so we could add it)
    5. Make it work as a static website:
        - Add `aws_s3_bucket_website_configuration` resource, connect to bucket and add `index.html` and `error.html` documents
    6. Create new folder called `build`:
        - Create 2 files inside:
            - `index.html`
            - `error.html`
    7. Upload files and expose public address:
        - In `s3.tf` file:
            - Add 2 no. `aws_s3_object` resources, connect to bucket and add these:
                - `key` with `index.html`
                - `source` with `build/index.html`
                - `etag` with `filemd5("build/index.html")`
                - `content_type` with `text/html`
            - Do the same with the `error.html`
        - Create new `outputs.tf` file:
            - add `output` block with `value = aws_s3_bucket_website_configuration.static_website.website_endpoint`

# LINKS:
- AWS getting started link: https://developer.hashicorp.com/terraform/tutorials/aws-get-started?utm_source=WEBSITE&utm_medium=WEB_IO&utm_offer=ARTICLE_PAGE&utm_content=DOCS
- Terraform-AWS documentation: https://registry.terraform.io/providers/hashicorp/aws/latest/docs
- Terraform workflow: https://developer.hashicorp.com/terraform/intro/core-workflow
- Terraform full terminology: https://developer.hashicorp.com/terraform/docs/glossary

- Terraform comparison:
    - https://developer.hashicorp.com/terraform/intro/vs/cloudformation
    - https://developer.hashicorp.com/terraform/intro/vs/chef-puppet
    - https://developer.hashicorp.com/terraform/intro/vs/custom

- Sample TF files:
    - EC2 instance: https://registry.terraform.io/modules/terraform-aws-modules/ec2-instance/aws/latest
    - Security group: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/security_group
    - AWS provider: https://registry.terraform.io/providers/hashicorp/aws/latest/docs