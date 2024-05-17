# TERRAFORM
- **Introduction:**
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

- **Terminology:**
    - **Infrastructure as Code:**
        - Infrastructure-as-Code (`IaC`) is **the practice of managing infrastructure in a file** or files rather than manually configuring it via a user interface. 
        - Infrastructure resource types managed with `IaC` can include virtual machines, security groups, network interfaces, and many others.

    - **HashiCorp Configuration Language (HCL):**
        - The structured **configuration syntax** that serves as the basis for Terraform's configuration language, as well as the configuration layer for several other HashiCorp products.
        - `HCL` establishes the syntax Terraform uses for things like arguments, blocks, literal values, and expressions. But what most people think of as the Terraform language extends beyond just the syntax; the built-in functions, Terraform-specific block types (like resource and variable), and Terraform-specific named values available in expressions are all implementation details of Terraform itself.

    - **Interpolation:**
        - Using a special placeholder to insert a computed value into a string.
        - Terraform's configuration language supports interpolation in strings using `${<EXPRESSION>}` placeholders. For example: `"Hello, ${var.name}!"`
        - Prior to Terraform 0.12, interpolation was the only way to use non-literal expressions in Terraform configurations; in 0.12 and later, expressions can be used independently.
        - Interpolation is a very common feature in programming languages; for example, Ruby uses `#{}` placeholders in double-quoted strings, and JavaScript (ES6 and up) uses `${<EXPRESSION>}` placeholders in backtick-quoted strings.

    - **Resource:**
        - Also-known-as "infrastructure resource":
            - **A block that describes one or more infrastructure objects**. Resources can be things like `virtual networks`, `compute instances`, or `higher-level components` such as `DNS records`.
            - An infrastructure object of a type that could be managed by Terraform.
        - A `resource block` in a configuration instructs Terraform to manage the described resource: 
            - during a run, Terraform will create a matching real infrastructure object — if one doesn't already exist —, and will modify the existing object if it doesn't match the desired configuration. 
            - Terraform uses `state` to keep track of which real infrastructure objects correspond to resources in a configuration.
        - Terraform uses cloud provider `APIs` to create, edit, and destroy resources:
            - Terraform providers are responsible for defining resource types and mapping transitions in a resource's state to a specific series of API calls that will carry out the necessary changes.

    - **Data Source:**
        - A **resource-like object** that can be configured in Terraform's configuration language.
        - Unlike resources, data sources *do not create or manage infrastructure*. Instead, they return information about some kind of external object in the form of readable attributes. 
            - This allows a Terraform configuration to make use of information defined outside of Terraform, or defined by another separate Terraform configuration.
    
    - **Argument:**
        - A syntax construct that assigns a value to a name. Arguments have the form `<IDENTIFIER> = <EXPRESSION>`, and they appear within blocks.
        - Most of a Terraform configuration consists of using arguments to configure Terraform resources:
            - Each resource type defines the arguments its resources can use, the allowed values for each argument, and which arguments are required or optional. 
            - Information about a given resource type can be found in the docs for that resource's provider.
    
    - **Attribute:**
        - A named **piece of data** that belongs to some kind of object. The value of an attribute can be referenced in expressions using a dot-separated notation, like `aws_instance.example.id`.
        - Terraform resources and data sources make all of their arguments available as readable attributes.
    
    - **(Terraform) Provider:**
        - A **plugin for Terraform** that makes a collection of related resources available. A provider plugin is responsible for understanding API interactions with some kind of service and exposing resources based on that API.
        - `Terraform providers` are generally tied to a specific infrastructure provider, which might be an infrastructure as a service (IaaS) provider (like `AWS`, `GCP`, `Microsoft Azure`, `OpenStack`), a platform as a service (PaaS) provider (like `Heroku`), or a software as a service (SaaS) provider (like `Terraform Cloud`, `DNSimple`, `Cloudflare`).
        - There are many existing providers available, but providers can also be custom-built to work with any API.

    - **State:**
        - It's Terraform's cached information about your managed infrastructure and configuration. 
        - This state is used to persistently map the same real world resources to your configuration from run-to-run, keep track of metadata, and improve performance for large infrastructures.
        - Without state, Terraform has no way to identify the real resources it created during previous runs. Thus, when multiple people are collaborating on shared infrastructure, it's important to store state in a shared location, like a free Terraform Cloud organization.
    
    - **Backend:**
        - The part of Terraform's core that determines how Terraform stores state and performs operations (like plan, apply, import, etc.). 
        - Terraform has multiple backends to choose from, which can be configured in a variety of ways. **Backends are not plugins**, so it is not possible to install additional backends.
        - In a general computer science sense, a backend is any lower-level implementation that enables a higher-level feature. But in the context of Terraform, "backend" always means the built-in code that handles state and operations.
    
    - **Remote Backend:**
        - A `Terraform CLI feature` that lets Terraform connect to `Terraform Cloud`, by specifying in the Terraform configuration which organization and workspace(s) to use. Used for remote operations in `Terraform Cloud` workspaces, and used for state storage in `Terraform Cloud`'s free tier.
        - See also backend. Older documentation sometimes refers to backends like `s3` or consul as "remote backends," since they store Terraform's state in a remote service instead of the local filesystem, but today this term usually means the specific backend whose name is remote.
    
    - **Locking:**
        - The ability to prevent new runs from starting in a given workspace. Workspaces are automatically locked while a run is in progress, and can also be manually locked.
        - The remote backend respects the lock status in Terraform Cloud workspaces. Some other Terraform backends can also lock state during runs.
    
    - **Variables:**
        - Also-known-as "input variables".
        - In Terraform, "variables" almost always refers to **input variables**, which are key/value pairs used in a run. 
        - Terraform modules can declare variables to allow customization:
            - for child modules, the parent module provides a value when calling the module
            - for the root module, values are provided at run time.
        - `Terraform Cloud` lets you set values for root input variables in a workspace, so all collaborators can use the same values. Variable values marked as "sensitive" become unreadable in the UI and API, and all variable values are protected by Vault.
    
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
    
    - **Output Values / Outputs:**
        - Data exported by a Terraform module, which can be displayed to a user and/or programmatically used by other Terraform code.
    
    - **Log:**
        - The text-based output of actions taken within a `run`
        - For example, the output of running terraform plan.

    - **Module:**
        - A self-contained collection of Terraform configurations that manages a collection of related infrastructure resources.
        - Other Terraform configurations can call a module, which tells Terraform to manage any resources described by that module.
        - Modules define `input variables` (which the calling module can set values for) and `output values` (which the calling module can reference in expressions).

# GUIDES:

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

- **Getting started tutorial workflow:** *( https://developer.hashicorp.com/terraform/tutorials/aws-get-started?utm_source=WEBSITE&utm_medium=WEB_IO&utm_offer=ARTICLE_PAGE&utm_content=DOCS )*
    1. 

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

    + Zalan: Az volt a gond, hogy minden resource -t magamnak csináltam és nem a defaultokat használtam és még pluszban kellett route table és route table association is ami össze van kapcsolva az igw -vel és a subnet -el.

- **EKS persistency with EBS:** (this is not the original way to solve it, but it's better!)
    1. 

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