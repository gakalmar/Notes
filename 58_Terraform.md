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

# LINKS:
- AWS getting started link: https://developer.hashicorp.com/terraform/tutorials/aws-get-started?utm_source=WEBSITE&utm_medium=WEB_IO&utm_offer=ARTICLE_PAGE&utm_content=DOCS
- Terraform-AWS documentation: https://registry.terraform.io/providers/hashicorp/aws/latest/docs
- Terraform workflow: https://developer.hashicorp.com/terraform/intro/core-workflow
- Terraform full terminology: https://developer.hashicorp.com/terraform/docs/glossary

- Terraform comparison:
    - https://developer.hashicorp.com/terraform/intro/vs/cloudformation
    - https://developer.hashicorp.com/terraform/intro/vs/chef-puppet
    - https://developer.hashicorp.com/terraform/intro/vs/custom