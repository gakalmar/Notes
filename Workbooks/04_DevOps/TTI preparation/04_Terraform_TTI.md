# TERRAFORM
- **Docs:**
    - Full documentation: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket
    - Policy samples: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html

# PROCESS
1. Getting started:
    - Create a project folder
    - Create a `main.tf` file inside, and add the provider (`main-base-step-1.tf`):

            provider "aws" {
              region = "eu-west-2"
            }
    
2. Add resources:
    - `S3 bucket` (`main-base-step-2_add S3.tf`)
        - 2 resources (S3 bucket base + public_access_block)
    - `DynamoDB table` (`main-base-step-3_add DynamoDB.tf`) # Fully managed NoSQL table
        - 1 resource
    - Add `S3` backend with state locking in a DynamoDB table (`main-base-step-4_add backend.tf`)
        - For this, we need to create the backend resources first, so we can:
            - Do this in AWS console separately, then update the `main.tf` file with the config section as in `main-base-step-4b_update frontend` file
            - Or keep it in code:
                - do a `backend` folder create another `backend.tf` file, where we add the contents of `main-base-step-4a_add backend` file, and initialize that first + apply.
                - then go back to the parent folder, where the `main.tf` file is (add terraform config as in `main-base-step-4b_update frontend` file), and initialize + apply that one as well
    - `RDS` (`main-base-step-5_add RDS.tf`) - TAKES 5 min!
        - file for this created separately (`main-base-step-5_add RDS`)
    - `IAM` steps (`main-base-step-6_IAM.tf`):
        - Create `IAM policy`
        - Create `IAM user`
        - Attach policy `IAM user` (samples: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_examples.html )
        - Create `IAM role`
        - Attach policy `IAM role`
    - `Networking` :
        - Includes a full bastion-host setup: (`main-base-step-7_networking.tf`)
        - Adds 1 EC2 per subnet as well: (`main-base-step-8_add EC2.tf`)

3. (OPTIONAL) Add S3 backend and DynamoDB table:
    - Create `S3` bucket from the AWS console:
        - add a unique name and leave everything else as default
    - Create a `DynamoDB Table`:
        - go to the `Dynamo DB` service to create one
        - as name, add `terraform-lock` (common naming)
        - primary key / partition key: `LockID`, type: `string`
    - Create `main.tf` file (use contents of `main-terraforming-mars-step-1.tf` file):
        - S3 added (replace name)
        - DynamoDB added (replace name)

3. Initialize and apply:
    - Step into the folder where the `main.tf` file is, then:
        - `alias t=terraform`
        - `t init`
        - `t plan`
        - `t apply` # only use this after each step, or plan and the this
