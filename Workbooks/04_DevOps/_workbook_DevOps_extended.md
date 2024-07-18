## GIT
### What is Version Control?
- Version control involves the use of a central repository where teammates can commit changes to files and sets of files. The purpose of version control is to track every line of code, and to share, review, and synchronize changes between team members. 

### Explain Git.
- It is a distributed version control system that keeps track of changes to code repositories. As projects progress, Git uses a branch-based workflow to streamline team collaboration. Learn More.

### What do you mean by Git Repository?
- As part of the software development process, software projects are organized through Git repositories. In the repository, developers can keep track of all the files and changes in the project, so that they can navigate to any point in its history at any time.

### Can you explain the Git branch?
- The Git branch is essentially a separate line of development that can be used for working on a particular feature, usually during development. The use of branches allows developers to code without interfering with the work of other team members.

### What is merging?
- Merging consists of joining branches. For example, when developers incorporate their peer-reviewed changes from a feature branch into the main branch.

### Discuss the advantages of using a version control system.
- A distributed version control system (DVCS) is a system that helps developers track changes of their code.
- **Advantages:**
    1. **Storage and backup:**
        - Create `repositories` (=folders for projects)
        - A decentralized online `backup` storage system, to make your code available from anwhere
    2. **Collaboration:**
        - Availability to work on separate `branches` (all members on the team can work in collaboration)
        - Availability to `merge` separate pieces of work (prevent conflicts)
        - Each other's codes can be `reviewed`
    3. **Version control:**
        - One of the main purposes is `trackability` of the modifications (track versions)
        - Commit messages for `documentation`
        - Branches make availability for `experimentation` with unreleased code
    4. **Open Source and Integration:**
        - Vast `ecosystem of tools and services` built around it (GitHub, GitLab)

### Clarify the differences between Git and GitHub.
- **GIT**
    - It's a `distributed version control system` (DVCS), that helps developers track changes of their code.
    - It's a `command line tool` that you install on your computer (available offline!)
- **GitHub**
    - `Online platofrm` that hosts repositories for GIT system
    - It's a `service` for collaboration and online storage
    - `Social network` for sharing `open-source` content for programmers/developers
    - Provies `additional web interface` for those who don't/can't interact through a command line

### What is the purpose of remote repositories in Git?
- Make your code available from anwhere / code sharing
- Backup of your code
- Available for team members / Access control
- Availability to work in isolation, then only push changes that are ready
- Version control / track progress
- Contributing (open-source)

### When does a merge conflict occur in Git?
- It happens if the automated merge can't happen:
- Possible **reasons**:
    - **Paralel development (woking on the same branch in 2 different locations):** 
        - When the same code is changed on the same branch. One pushes changes, but the other person started working on it before the push was made (resolve with manual merge)
    - **Merging branches (wokring on different branches):** 
        - When there is some part of the code that was developed on a new branch, but the original branch also had some changes (resolve manual merge)
    - **Rebasing:** 
        - means putting "your code" above the "existing code" -> this will likely cause a merging issue (manual merge)
    - **Cherry-picking:**
        - when you manually select commits to be moved to a separate branch, and there is a conflict between them

- To **resolve a merge conflict**, you typically need to:

    1. Examine the conflicting code in your text editor or integrated development environment (IDE).
        - Conflict markers (e.g., <<<<<<<, =======, >>>>>>>) are added to the code to indicate the conflicting sections
    2. Edit the code to remove the conflict markers and choose which changes to keep.
    3. Save the resolved code.
    4. Add the resolved files to the staging area using git add.
    5. Commit the changes to finalize the merge resolution.

### Which other version control tools do you know of?
- Version Control Tools:
    - Mercurial
    - Subversion (SVN)
    - Concurrent Version Systems (CVS)
    - Perforce
    - Bazaar
    - Bitkeeper
    - Fossil

### What is trunk-based development?
- Trunk-based development is a branching model where most of the work takes place in a single trunk, usually called trunk, master, or main. The trunk receives daily merges from all developers in the team.
- Trunk-based development is a popular development model because it simplifies version control. Since the trunk is a single source of truth, this model minimizes the chances of merge conflict.

### What is Gitflow, and how does it compare to trunk-based development?
- Gitflow is a workflow for Git that makes heavy use of branches. In Gitflow, all the code is merged into the develop branch instead of the main branch, which serves as an abridged version of the project’s history.
- Features are worked on specific “feature branches” (typically prefixed with feature/). In the same fashion, releases also create a dedicated release/ branch.
- Compared with trunk-based development, Gitflow is more complex and has a higher chance of inducing merge conflicts, which is why it has fallen out of favor among the development community.

### How long should a branch live?
- In the context of continuous integration, branches should follow trunk-based development practices and thus be short-lived. Ideally, a branch should last for a few hours or, at most, a day.

## DevOps
### What is the importance of DevOps?
- A robust and flexible product deployment system is essential for organizations to remain competitive in today's digitized world. It is here that the DevOps concept comes into play. 

    - The DevOps approach plays a crucial role in generating agility and mobility across all aspects of software development, from conception to deployment.
    - Continuously updating and improving products is more streamlined and efficient with DevOps.
    - By implementing DevOps, developers increase their focus on building only code, while automating and consolidating the remaining tasks.
    - In addition to creating better communication and collaboration, combining the engineering and operations teams increase transparency and accessibility.
    - Increasing efficiency speeds up development and reduces coding errors.
    - Programming defects are the most common cause of development failures. DevOps teams will facilitate more releases in a shorter time frame.

### How do CI and version control relate to one another?
- Every change in the code must trigger a continuous integration process. This means that a CI system must be connected with a Git repository to detect when changes are pushed, so tests can be run on the latest revision

## CI / CD
### What is CI/CD pipeline?
- CI/CD is a combination of continuous integration (CI) and continuous delivery (usually) or continuous deployment (rarely) in software engineering. Modern DevOps operations are built on the foundation of continuous integration and continuous delivery, or the CI/CD pipeline. You can automate your software delivery process with a CI/CD pipeline. As part of the pipeline, code is built, tests are run (CI), and a new version of the application is safely deployed (CD). By automating pipelines, manual errors are eliminated, developers are provided with standardized feedback loops, and iterating on products is made more efficient. In DevOps, continuous integration and continuous delivery (CI/CD) are best practices that ensure that code changes are delivered regularly and reliably.

### Explain Continuous Integration, Continuous Delivery, and Continuous Deployment.
- **Continuous Integration (CI):** 
    - Continuous integration (CI) is the practice of developers regularly integrating their code changes into a repository. Integration may take place several times a day and is verified by automated tests and a build process. As a result, integration challenges can be avoided, bugs can be found early in the development cycle, fixed, and tested iteratively. Every time new commits are integrated into the main branch, continuous integration emphasizes testing automation to make sure the application is not broken.
    - **In short:** Continuous integration (CI) executes the sequence of steps required to build and test the project. CI runs automatically on every change committed to a shared repository, offering developers quick feedback about the project’s state.
- **Continuous Delivery (CD):** 
    - In continuous delivery, all code changes are automatically deployed to the test and/or production environments after the build is complete. Feature additions, configuration changes, and error fixes are some examples of changes. By automating the delivery of new code to users, CD ensures a safe, quick, sustainable process. The CD process also involves some additional checks, like performance tests in production. With Continuous Delivery, deployments are predictable and scheduled regularly.
    - **In short:** Continuous delivery is an extension of CI. Its goal is to automate every step required to package and release a piece of software. The output of a continuous delivery pipeline takes the form of a deployable binary, package, or container.
- **Continuous Deployment (CD):** 
    - The most critical stage of the pipeline is continuous deployment. By following this practice, you will be able to release all changes that have passed all stages of the production pipeline to your customers on time. Code changes can be made live much more quickly at this stage because there is little human interaction. In addition, continuous deployment allows you to accelerate your feedback loop with your customers and relieve pressure on your team since "release days" are no longer needed. Minutes after finishing their work, developers see their work go live.
    - **In short:** Continuous deployment is an optional step-up from continuous delivery. It is a process that takes the output from the delivery pipeline and deploys it to the production system in a safe and automated way.

### Name some benefits of CI/CD
- **Less risk:** 
    - automated tests reduce the chance of introducing bugs, creating a safety net that increases the developer’s confidence in their code.
    - With CI/CD setup, fault isolation is easier and faster. In fault isolation, the system is monitored, the fault occurrence time is determined, and the fault location is determined.
    - CI improves transparency by detecting early-stage failures like build failures, merge issues, integration test failures, etc.
- **More frequent releases:** 
    - the automation provided by continuous delivery and continuous deployment allows developers to release and deploy software safely many times per day. 
    - CI/CD makes it possible to quickly integrate small code changes and test the changes easily.
- **Improved productivity:** 
    - freed from the manual labor of building and testing the code, developers can focus on the creative aspects of coding.
- **Elevated quality:** 
    - CI acts as a quality gate, preventing code that is not up to standards from getting released.
- **Better design:** 
    - the iterative nature of continuous integration lets developers work in small increments, allowing a higher degree of experimentation, which leads to more innovative ideas.
- **Reliability:** 
    - With CI/CD, MTTR (mean time to resolution) is reduced since changes are smaller and easier to implement. CI/CD setup increases the reliability of the unit and integration testing.
- **Fast:**
    - When CI/CD is set up, small code changes are merged very quickly and the code is ready for production very soon.

### What are the most important characteristics in a CI/CD platform?
- **Reliability:** the team depends on the CI server for testing and deployment, so it must be reliable. An unreliable CI/CD platform can block all development work.
- **Speed:** the platform should be fast and scalable to obtain results in a few minutes.
- **Reproducibility:** the same code should always yield the same results.
- **Ease of use:** easy to configure, operate, and troubleshoot.

### What is a CI/CD Engineer?
- CI/CD engineers can improve the integration and operation of CI/CD tools as well as ensure quality end-to-end integration systems. CI/CD Engineers would keep teams motivated and lead the charge on CI/CD. It is the CI/CD engineer's responsibility to ensure that CI/CD tools and platforms are functioning correctly within an organization. CI/CD engineers understand how to optimize their teams' development and release processes.

### State difference between CI/CD vs DevOps:
- **CI/CD**
    - An important feature of CI/CD is its ability to automate and deliver code changes quickly and reliably. 
    - CI/CD involves continuous automation and monitoring of the entire application lifecycle, starting with integration and testing and ending with delivery and deployment. As a result of CI/CD pipelines, organizations are able to minimize bottlenecks during software development and deployment.
    - A continuous integration process optimizes the process of building, integrating, and testing code in a development environment. Continuous delivery is concerned with deploying code effectively in production.

- **DevOps**
    - The DevOps methodology is an approach to streamlining the development of products by integrating ideas, practices, processes, and technology.
    - Organizations can implement DevOps methodologies to encourage rapid, continuous deployment of software by setting up their production teams and processes.
    - DevOps promotes minimizing waste and creating scalable, enduring systems.

### What are some popular CI/CD tools?
- Some popular CI/CD tools are as follows:
    - Jenkins
    - CircleCI
    - Bamboo
    - Team City
    - Codefresh

### Does CI/CD require any programming knowledge?
- As far as CI/CD goes, it does not require any programming language or scripting language to be used. It is not necessary to use any programming or scripting language when you use a GUI-based tool like Azure DevOps (ADO). The use of ARM templates in Azure DevOps requires scripting knowledge. Therefore, it depends on the tools and different ways of setting up CI/CD.

### Describe the build stage
- The build stage is the first phase of the CI/CD pipeline, and it automates a lot of the steps that a typical developer goes through, such as installing tools, downloading dependencies, and compiling a project. Aside from building code, build automation involves the use of tools to verify that the code is safe and compliant with best practices. In this stage, the buildability and testability of the application are validated

- The build stage is responsible for building the binary, container, or executable program for the project. This stage validates that the application is buildable and provides a testable artifact.

### How long should a build take?
- Developers should get results from their CI pipeline in less than 10 minutes. That’s the longest time that’s practical to wait for results.

### Explain trunk-based development (see also at branches!)
- The trunk-based development approach ensures software remains up-to-date by integrating small, frequent updates into the main branch or a core "trunk". As a result of its ability to streamline merging and integration phases, it can be used to achieve CI/CD and to increase the speed and efficiency of the delivery of software and the efficiency of organizations. It is a branching model that consists of most of the work happening in a single trunk (also known as the trunk, master, or main). Each developer in the team merges their changes into the trunk on a daily basis. The reason why trunk-based development is popular is that it simplifies version control. This model minimizes merge conflicts due to the trunk's single source of truth.

### Can a branch live for a long time?
- Continuous integration follows trunk-based development practices, which means branches should be short-lived. Branch durations should be kept to a minimum of a few hours and a maximum of a day.

### What is the difference between a hosted and a cloud-based CI/CD platform?
- Hosted and Cloud-based CI/CD platforms differ in the following ways:
    - **Hosted CI/CD platform:**
        - It is necessary to manage a hosted CI server in the same way as any other server. Installation, configuration, and maintenance are all required before they can be used.
        - Keeping the server secure requires updates and patches. 
        - Additionally, failures in the CI server can halt development and deployment.
    - **Cloud-based CI/CD platform:**
        - Cloud-based CI platforms, however, do not require maintenance. An organization can immediately start using CI/CD platforms in the cloud without installing or configuring anything. 
        - As the cloud is capable of providing all the machine power necessary, scalability is not an issue.
        - The cloud SLA (service-level agreement) guarantees the reliability of the platform.

### Explain some common practices of CI/CD.
- To help you establish an efficient pipeline for CI/CD, here are some best practices:
    - Embrace the DevOps culture.
    - Ensure continuous integration is implemented and utilized.
    - Ensure the same deployment process is followed for every environment.
    - In the event that your pipeline fails, restart it.
    - Version control should be applied.
    - Incorporate the database into the pipeline.
    - Keep an eye on your continuous delivery pipeline.
    - Get your CD pipeline up and running

### Is security important in CI/CD? What mechanisms are there to secure it?
- Yes. CI/CD platforms have access to all kinds of sensitive data such as API keys, private repositories, databases, and server passwords. An improperly secured CI/CD system is a prime target for attacks and can be exploited to release compromised software or to get unauthorized access. A CI/CD platform must support mechanisms to securely manage secrets, and control access to logs and private repositories.

### How do DevOps tools work together?
- A generic logical flow is shown below that automates it to ensure smooth delivery. Organizations may follow different flows depending on their needs.

    - Developers create code, and a version control system, such as `Git`, manages the source code.
    - Any modifications made to this code are committed to the Git repository by developers.
    - `Jenkins` extracts the code from the repository and builds it using software such as Ant or Maven using the Git plugin.
    - `Puppet` is used to deploy and configure test environments, and Jenkins releases this code to the test environment so that testing can be conducted using Selenium tools.
    - `Jenkins` deploys the code once it has been tested on the production server (even the production servers are managed by resources like a puppet).
    - `Nagios`, for example, continuously monitors it after deployment.
    - Using `Docker` containers, we can test the build features in a controlled environment

###  What are some of the deployment strategies?
- **Regular release/deployment:** Through a single release, the software is made available to the public.
- **Canary releases:** These releases are intended to reduce the risk of failure by exposing a small fraction of the user base (around 1%) to the release. As part of a canary release, developers gradually transition users to the new release in a controlled manner.
- **Blue-green releases:** Essentially, it involves running two instances of an application simultaneously; one is the current stable version, and the other is the most recent version. An immediate switch is made from the old version to the new one. If there is a problem, users can immediately revert to the previous version, which is safer than regular or big-bang releases.

- OR 

- **Regular release/deployment:** releases software to everyone at once, making it available to the general public.
- **Canary releases:** this is a method that reduces the chance of failure by exposing a small portion of the userbase (around 1%) to the release. With a canary release, developers gradually switch users to the latest release in a controlled way.
- **Blue-green releases:** consists of running two simultaneous instances of an application; one is the stable version currently serving users and the other the latest release. Users are switched from the former to the latter all at once. This method is safer than the regular or big bang releases because users can instantly be routed back to the previous version if there is a problem.
- **Dark launches:** are deployments where new features are released without being announced. Features can be enabled in a very fine-grained way with feature flags.

### Can you tell me about the serverless model?
- There is a cloud-native approach to development known as serverless development, which allows developers to develop and run applications without requiring the management of servers. The server still exists serverless, but it is abstracted from application development.

### What do you mean by Rolling Strategy?
- Rolling deployments update running instances of an application with new releases as they are released. The process involves replacing old versions of an application over time with new versions of the application by replacing the entire infrastructure on which the application is run.

### Describe Chef?
- Chef is essentially an automation platform for turning infrastructure into code. A chef is a tool used to automate processes with scripts. There are three main components of Chef that can be categorized as follows:

    - **Chef Workstation:** The workstation is the computer system on which the administrator sits. This system generates code for configuring and managing infrastructure, known as recipes (written in Ruby). A cookbook consists of multiple recipes. In order to upload cookbooks to the server, the Knife command line tool is used.
    - **Chef Server:** Second, a server resides between a workstation and its nodes, which stores the cookbooks. Servers provide the tools necessary to enable node configurations, and they may be locally or remotely hosted.
    - **Chef Node:** The final component is the node, which requires configuration. You can have a number of Chef nodes that collect information about the current state of a node. The server then compares this information with the configuration files to determine if any new configuration is needed.

## CI/CD TESTING:
### In what way does testing fit into continuous integration? Is automated testing always a good idea?
- Testing is integral to and inseparable from CI. The main benefit teams get from CI is continuous feedback. Developers set up tests in the CI to check that their code behaves according to expectations. There would be no feedback loop to determine if the application is in a releasable state without testing.

### Why is Automated Testing essential for CI/CD?
- In order to ensure code quality, automation is an important characteristic of the CI/CD pipeline. The test automation process is used throughout the software development pipeline to identify dependencies and other issues, push changes to the different environments, and deploy applications into production. As part of its quality control role, the automation will assess everything from API usage and performance to security. In this manner, all changes made by team members are integrated comprehensively and implemented correctly.

    - With automated testing, we can run tests simultaneously across multiple servers/containers, resulting in a faster testing process.
    - Automated testing provides more consistency. Software automation eliminates human errors, and bias, and assures that it behaves as expected.
    - To meet changing demands, tools and frameworks in a CI/CD pipeline need to be adjusted quickly. Keeping up with updates and being agile is difficult with manual testing. However, most configurations are done automatically when you have automated tests. This allows you to migrate quickly to new environments.
    - Maximizing the workforce is crucial to a successful development project. Test automation frees engineers to work on other high-value tasks.
    - CI/CD pipelines require all the testing effort when small changes are made. Validating minor changes continuously is easier with automated testing.

### Name a few types of tests used in software development
- There are more types of tests than we can count with both hands, but the most common ones are:

    - **Unit tests:** validate that functions or classes behave as expected.
    - **Integration tests:** are used to verify that the different components of an application work well together.
    - **End-to-end tests:** check an application by simulating user interaction.
    - **Static tests:** finds defects in code without actually executing it.
    - **Security tests:** scans the application’s dependencies for known security issues.
    - **Smoke tests:** fast tests that check if the application can start and that the infrastructure is ready to accept deployments.

### What are the top testing tools in continuous testing?
- An essential part of the CI/CD pipeline is continuous testing (CT). The developers are buffered by it, as it squashes bugs in a timely manner. This ensures that no matter how many releases take place, the end-user experience remains uncompromised. Despite accelerated processes, CT serves as a safety net that preserves the end-user experience. It must be seamlessly integrated into the software delivery pipeline since it is a continuous process. The following are the top testing tools used in continuous testing:

    - Testsigma
    - Selenium
    - IBM Rational Functional Tester
    - Tricentis Tosca
    - UFT (Unified Functional Testing)

### How many tests should a project have?
- It varies, but in principles it follows the testing pyramid:  
    - The majority of tests consist of `Unit tests`
    - Then slightly less `Integration tests`
    - Then on top (the least amount) are the `End-to-end tests`

### What is a flaky test?
- A test that intermittently fails for no apparent reason is called a flaky test. Flaky tests usually work correctly on the developer’s machine but fail on the CI server. Flaky tests are difficult to debug and are a major source of frustration.

- Common sources of flakiness are:

    - Improperly handled concurrency.
    - Dependency on test order within the test suite.
    - Side effects in tests.
    - Use of non-deterministic code.
    - Non-identical test environments.

### What is TDD?
- `Test-Driven Development` (`TDD`) is a software design practice in which a developer writes tests before code. By inverting the usual order in which software is written, a developer can think of a problem in terms of inputs and outputs and write more testable (and thus more modular) code.

- The TDD cycle consists of three steps:
    - Red: write a test that fails.
    - Green: write the minimal code that passes the test.
    - Refactor: improve the code, and make it more abstract, readable, and optimized.

### What is the main difference between BDD and TDD?
- If `TDD` is about designing a thing right, `Behavior-Driven Development` (`BDD`) is about designing the right thing. Like TDD, BDD starts with a test, but the key difference is that tests in BDD are scenarios describing how a system responds to user interaction.

- While writing a BDD test, developers and testers are not interested in the technical details (how a feature works), rather in behavior (what the feature does). BDD tests are used to test and discover the features that bring the most value to users.

### What is test coverage?
- Test coverage is a metric that measures how much of the codebase is covered by tests. A 100% coverage means that every line of the code is tested at least by one test case.
- There’s a myth that 100% coverage means that the code is bug-free. This is false; no amount of testing can guarantee that. Attempting to reach full test coverage is considered bad practice because it leads to a false sense of security and extra work when code needs to be refactored.
- Typicallu an `overall coverage` of 70-90% is considered acceptable, but it depends on many factors (industry, type of app, standards)

### How can you optimize tests in CI?
- First, we need to identify which tests are the slowest and prioritize accordingly. Once we have a plan, there are several methods for making tests faster. Some of them are:

    - Breaking large tests into smaller units.
    - Removing obsolete tests.
    - Refactoring tests to have fewer dependencies.
    - Parallelizing tests.

### What’s the difference between end-to-end testing and acceptance testing?
- End-to-end usually involves testing the application by using the UI to simulate user interaction. Since this requires the application to run in a complete production-like environment, end-to-end testing provides the most confidence to developers that the system is working correctly.

- Acceptance testing is the practice of verifying acceptance criteria. Acceptance criteria is a document with the rules and behaviors that the application must follow to fulfill the users’ needs. An application that fulfills all acceptance criteria meets the users’ business needs by definition.

- The confusion stems from the fact that acceptance testing implements the acceptance criteria verification with end-to-end testing. That is, an acceptance test consists of a series of end-to-end testing scenarios that replicate the conditions and behaviors expressed in the acceptance criteria.

## CLOUD COMPUTING - IAAS, SAAS, PAAS
### What is Cloud Computing?
- Cloud computing is the delivery of various computing services over the internet ("the cloud"), enabling on-demand access to shared resources and services

- Cloud computing is on-demand access to services, via the Internet:
    - **Services** can be computing resources, servers (physical or virtual ones), data storage, development tools, networking capabilities, and more
    - These services are all hosted at a remote data center managed by a **cloud services provider** (or **CSP**)
    - The **CSP** makes these resources available for a monthly subscription fee or bills them according to usage.
- Cloud computing benefits: *( https://www.youtube.com/watch?v=M988_fsOSWo&ab_channel=Simplilearn )*
    - **Lower IT costs:**
        - Cloud lets you offload some or most of the costs and effort of purchasing, installing, configuring, and managing your own on-premises infrastructure.
    - **Improve agility and time-to-value:** 
        - With cloud, your organization can start using enterprise applications in minutes, instead of waiting weeks or months for IT to respond to a request, purchase and configure supporting hardware, and install software.
        - Cloud also lets you empower certain users—specifically developers and data scientists—to help themselves to software and support infrastructure.
    - **Scale more easily and cost-effectively:**
        - Cloud provides elasticity — instead of purchasing excess capacity that sits unused during slow periods, you can scale capacity up and down in response to spikes and dips in traffic.
        - You can also take advantage of your cloud provider's global network to spread your applications closer to users around the world.

## What is the Cloud?
- Cloud is essentially a series of servers that might be accessed through the web, and all one piece of information is stored on physical servers in information centers. Intrinsically by cloud computing, we can access the physical servers and run computer code applications on their machines.

## What service models/layers are you familiar with in cloud computing?:
- **Service model:**
    - **On-premises service:** (all managed by your organization (this is not cloud!))
        - This is the original, FULL service, that includes:
            - Applications
            - Data
            - Runtime
            - Middleware
            - o/s
            - Virtualization
            - Servers
            - Storage
            - Networking

    - **IAAS:** *Infrastrucutre as a service*
        - Provides virtualized computing resources over the internet.
        - You manage:
            - Applications, Data, Runtime, Middleware, o/s
        - The provider manages:
            - Virtualization, Servers, Storage, Networking
    - **PAAS:** *Platform as a service*
        - Offers hardware and software tools over the internet, typically used for application development.
        - You manage:
            - Applications, Data
        - The provider manages:
            - Runtime, Middleware, o/s, Virtualization, Servers, Storage, Networking
    - **SAAS:** *Software as a service*
        - Delivers software applications over the internet, on a subscription basis.
        - Everything is managed by the provider!!

    + **FAAS:** *Function as a service*
    + **CAAS:** *Communication as a service* (eg. call & messaging service)
    + **XaaS:** *Everything as a service*

- Comparion Chart: [alt text](../../assets/iaas-paas-saas.jpg)

### What are the benefits of Cloud Computing?
- **Main advantages:**
    - **Efficiency;** Efficiency in business operations is achieved in the following ways through the utilization of cloud computing: 

    - **Accessibility;** Cloud computing facilitates the access of applications and data from any location worldwide and any device with an online connection. 

    - **Cost savings;** Cloud computing over businesses with scalable computing resources, saving them on the worth of acquiring and maintaining them. These resources are purchased on a pay-as-you-go basis, suggesting businesses pay just for the resources they use. This has proven to be less expensive than acquiring the resources independently. 

    - **Security;** Cloud providers, especially those private cloud services, have strived to implement the most straightforward security standards and procedures to guard clients’ data saved within the cloud. 

    - **Disaster recovery;** Cloud computing is the only efficient means for small, medium, and even large enterprises to back up and restore their data and applications quickly and safely. 

    - **Flexibility and Increased collaboration;** with cloud computing capabilities, individuals from different places can collaborate on business projects without necessarily having to satisfy them.

    - **Scalable and Robust:** It helps in developing scalable and robust applications. Previously, the scaling took months, but now, scaling takes less time.
    
    - **Time-saving:** It helps in saving time regarding deployment and maintenance.

### What are the disadvantages of Cloud Computing?
- **Main disadvantages:**
    - **Vulnerability to attacks:** Storing information within the cloud might cause serious challenges {of information of knowledge} thievery since, within the cloud, each data of a corporation is online. A security breach is something that even the only organizations have suffered from, and it’s a potential risk inside the cloud conjointly .though advanced security measures are deployed on the cloud, still storing confidential information inside the cloud is usually a risky affair.

    - **Network property dependency:** Cloud Computing is entirely enthusiastic about the net. This direct tie-up with the net means that an organization should have reliable and consistent web service conjointly as a fast affiliation and information measure to reap the advantages.

    - **Downtime:** Time is considered the only vital potential downside of exploiting Cloud Computing. The cloud suppliers might typically face technical outages, which might owe varied reasons, like loss of power, low web property, information centers going out of service for maintenance, etc., which could cause a brief time inside the cloud service.

    - **Vendor lock-in:** Once needed to migrate from one cloud platform to a distinct one, an organization would possibly face some serious challenges thanks to the variations between seller platforms. Hosting and running the applications of this cloud platform on another platform might cause support problems, configuration complexities, and additional expenses.

        - The corporate information might boot be left liable to security attacks due to compromises created throughout migrations.

    - **Limited management:** Cloud customers might face restricted control over their deployments. Cloud services run on remote servers that are closely held and managed by service suppliers, making it arduous for businesses to possess the extent of management.

### Give the best example of open source Cloud Computing:
- **Example:** `OpenStack`
    - `OpenStack` is an open-source cloud computing platform that enables users to create and manage both public and private clouds. It provides a set of software tools for building and managing cloud computing platforms for IaaS.

- **Benefits:**
    - Flexibility: Users can tailor the cloud to their specific needs.
    - Cost-Effective: No licensing fees, reducing overall costs.
    - 24/7 Availability
    - Easily scalable
    - Security manage
    - Community Support: Large, active community contributing to continuous improvement and innovation.

- **Use Case:**
    - A company can use `OpenStack` to set up a private cloud infrastructure, allowing it to leverage cloud benefits like scalability and flexibility while maintaining control over its data and resources.

### What types of deployments are used in cloud computing?
- **Deployment model:**
    - Public Cloud: like a bus, available to the crowd over the internet (owned by CSPs like AWS, Azure or Google Cloud)
    - Private Cloud: like a car, exclusively owned and managed by an organization
    - Hybrid Cloud: like a taxi, combination of the 2
    - Community Cloud

### What is SaaS?
- **SAAS:** *Software as a service*
    - Delivers software applications over the internet, on a subscription basis:
        - a software distribution model in which a third-party provider hosts applications and makes them available to their customers over the Internet
    - Everything is managed by the provider

### What is IaaS?
- **IAAS** *Infrastructure as a Service*
    - also known as Hardware as a Service. Organizations usually give their IT infrastructures such as servers, processing, storage, virtual machines, and other resources in this model type. Customers can access the resources very quickly on the internet using the on-demand pay model.

    - Take up IaaS for cloud computing course and understand more about these clouds and their specifications.

    - The Iaas platform eliminates the need for every organization to maintain its IT infrastructure.

    - IaaS is divided into three aspects: public, private, and hybrid. The private cloud can offer that infrastructure that resides at the customer end. In contrast, the public cloud is located at the cloud computing data Centre end, and the hybrid cloud is a combination of both public and private clouds.

- IaaS provides us with various services, which are listed below:
    - Compute: Computing various services, including virtual CPUs, Virtual main memory for virtual machines at the user end.
    - Storage: IaaS provider provides back-end support for storage for storing files.
    - Network: Network as a Service provides networking components such as routers, switches, and bridges for virtual machines.
    - Load Balancers: It gives load balancing at the infrastructure layer.

- Advantages of IaaS in Cloud Computing:
    - Shared Infrastructure
    - IaaS gives shared users to share the same physical infrastructure.
    - Web Access to the resources
    - IaaS allows IT users to access resources over the internet.
    - On-demand as per usage model
    - Iaas providers provide services only as a clients pay-as-you-go model.
    - Business model focus
    - Iaas Providers give business core organization focus rather than IT infra.
    - Update versions of the Software
    - There is the scalability of services provided as there is no problem with software upgrades and troubleshooting issues related to IT infrastructure.

- Disadvantages of IaaS in Cloud Computing
    - Security
    - Security is the main concern in IaaS as it is not 100percent sure.
    - Maintenance and up gradation
    - Although IaaS providers maintain the software but not for all.
    - Interoperability issues
    - It is difficult to migrate Virtual Machine form one IaaS provider to another, so customers experience problem related to vendor lock.
    - Main Iaas Cloud Service providers are Amazon Web Services, Microsoft Azure, and Google Cloud Platform etc.

### What is PaaS in Cloud Computing?
- **PAAS** *Platform as Service*
    - It's the runtime environment for developers to create, test, run and debug web applications. We can easily buy these web applications from the cloud service provider on a pay-as-you-go basis and access them easily using the internet. There is back scalability that the cloud service provider manages, so end users do not need to worry about managing the infrastructure.

    - PaaS includes infrastructure, servers, storage and networking, platform-middleware, development tools, database management systems, and business intelligence to support the web application life cycle.

    - PaaS providers support programming languages, Application frameworks, Databases, and other tools.

- Advantages of PaaS in cloud computing:
    - Simple Development: Paas allows developers to focus on development and innovation without worrying about infrastructure management.
    - Lower Risk: No need for investment in hardware equipment and software.
    - Prebuilt business functionality: Some Paas Providers have a prebuilt framework so that users do not need to build everything from scratch and can directly start projects.
    - Instant Community: PaaS vendors have a community where developers can share experiences.
    - Scalability: Applications deployed can scale with one user

- Disadvantages of PaaS in Cloud Computing:
    - Vendor lock-in: Development according to the particular vendor can be easy, but migration to another cloud provider can be a problem.
    - Data privacy: Corporate data, whether can be essential or not, will always be private, and it should always be an insecure environment.
    - Synchronization of system applications: We have integrated many applications with local and on the cloud, so there is the problem of increased complexity when mixing local data with cloud data.
    - Most PaaS cloud providers are Salesforce, Windows Azure, Google App Engine, etc.
    - This is one of the most frequently asked cloud computing interview questions.

### What is a Private Cloud?
- A private cloud delivers similar advantages to public cloud-like scalability and self-service. In the private cloud, this is done using a proprietary architecture, and private clouds focus on the needs and demands of a single organization.
- As a result, the private cloud is best for businesses with dynamic or unpredictable computing needs that require direct control over their environments. Security, governance, and regulation are best suited for private cloud services.
- Private clouds are used to keep strategic operations and others secure. It is a complete platform that is fully functional and can be owned, operated, and restricted to only an organization or an industry. Nowadays, most organizations have moved to private clouds due to security concerns, and a hosting company is using a virtual private cloud.
- This is one of the most frequently asked cloud computing interview questions.

### What is the Public Cloud?
- The primary objective is to deliver internet services in a public or private cloud. Unlike a private cloud, public cloud services are third-party applications that can be used by anybody who wants to access them. The service may be free or sold on demand.
- Public clouds are open to people for use and deployment. For example, Google and Amazon, etc. The public clouds focus on a few layers like cloud application, providing infrastructure, and providing platform markets.

### What are Hybrid Clouds?
- A hybrid cloud is a cloud computing environment where we can use the services available locally and use third-party private and public services to meet the demand. By allowing workloads to move between private and public clouds as computing needs and costs change, a hybrid cloud gives businesses greater flexibility and more data deployment options.
- Hybrid clouds are a combination of public clouds and private clouds. It is preferred over both clouds because it applies the most robust approach to implementing cloud architecture. It includes the functionalities and features of both worlds. It allows organizations to create their cloud and give control over someone else as well.

### What is the difference between Scalability and Elasticity?
- `Scalability` is a characteristic of cloud computing that is used to handle the increasing workload by increasing the proportion of resource capacity. Using scalability, the architecture provides on-demand resources if the traffic raises the requirement.

- `Elasticity` is a characteristic that dynamically provides the concept of commissioning and decommissioning a large amount of resource capacity. It is measured by the speed at which the resources are on demand and the usage of the resources.

### What are the security benefits of cloud computing?
- **Complete protection against DDoS:** Distributed Denial of Service attacks have become very common and are attacking the cloud data of companies. So cloud computing security ensures restricting traffic to the server, and traffic that can threaten the company and its data is thus averted.
- **Data security:** As data develops, data breaching becomes a significant issue, and the servers become soft targets. The security solution of cloud data helps protect sensitive information and helps the data stay secure against a third party.
- **Flexibility feature:** Cloud offers flexibility, and this makes it popular. The user has the flexibility to avoid server crashing in case of excess traffic. When the high traffic is over, the user can scale back to reduce the cost.
Cloud computing authorizes the application server, which is used in identity management. It provides permissions to the users to control the access of another user who is entering the cloud environment.

### What is the usage of utility computing?
- Utility computing, or The Computer Utility, is a service provisioning model. A service provider makes computing resources and infrastructure management available to the customer and charges them for specific usage rather than a flat rate.
- Utility computing is a plug-in managed by an organization that decides what type of cloud service has to be deployed. It facilitates users to pay only for what they use.

### Explain security management regarding Cloud Computing.
- Identity management access provides the authorization of application services.
- Access control permission is given to the users to have complete controlling access to another user who is entering into the cloud environment.
- Authentication and Authorization provide access to authorized and authenticated users only to access the data and applications.

### How would you secure data for transport in the cloud?
- When transporting data in a cloud computing environment, keep two things in mind: 
    - Make sure that no one can intercept your data as it moves from point A to point B in the cloud, 
    - and make sure that no data leaks (malicious or otherwise) from any storage in the cloud.

- A virtual private network (VPN) is one way to secure data while transported in a cloud. A VPN converts the public network to a private network instead. A well-designed VPN will incorporate two things:

    - A `firewall` will be a barrier between the public and any private network.
    - `Encryption` protects your sensitive data from hackers; only the computer you send it to should have the key to decode the data.
    - Check that there is no data leak with the encryption key implemented with the data you send while moving from point A to point B in a cloud.

### Explain the full form and usage of “EUCALYPTUS” in cloud computing.
- `EUCALYPTUS` stands for Elastic Utility Computing Architecture for Linking Your Programs to Useful Systems.

- `Eucalyptus` is an open-source software infrastructure in cloud computing, enabling us to implement clusters in the cloud computing platform. The main application of `eucalyptus` is to build public, hybrid, and private clouds. Using this, you can produce your personalized data center into a private cloud and leverage it for various other organizations to make the most out of it and use the functionalities offered by `eucalyptus`.

### Explain the Public, Static, and Void classes.
- `Public`: This is an access modifier, and it is used to specify who can access a particular method. When you say public, the method is accessible to any given class.
- `Static`: This keyword in Java tells us that it is class-based, which means it can be accessed without creating the instance of any particular class.
- `Void`: Void defines a method that does not return any value. So this is the return-related method.

### Before going for a cloud computing platform, what are the essential things to be taken into concern by users?
- Compliance
- Loss of data
- Data storage
- Business continuity
- Uptime
- Data integrity in cloud computing

### What is a hypervisor in Cloud Computing?
- It is a virtual machine screen that can logically manage resources for virtual machines. It allocates, partitions, isolates, or changes the program given as a virtualization hypervisor. Hardware hypervisor allows having multiple guest Operating Systems running on a single host system simultaneously.

- It is also known as Virtual Machine Manager. There are two types of hypervisors as defined below:

    - `Type 1` / `Bare Metal hypervisor`: 
        - The guest Vm runs directly over the host hardware:
            - HARDWARE -> HYPERVISOR -> VM
        - Most frequently used and most secure
        - Eg.: VMware ESXi / Microsoft Hyper-V / Xen / Opensource KBM / Oracle VM Server for x86
    - `Type 2` / `Hosted`: 
        - The guest Vm runs over hardware through a host OS, so there's an additional layer of Host OS between the Host and the Hypervisor:
            - HARDWARE -> **HOST OS** -> HYPERVISOR -> VM
        - Less frequent, mostly used for end-user virtualization
        - Eg.: Oracle VM VirtualBox / VMware Workstation (Pro) & VMware Fusion (for Mac) / Paralells Desktop / QEMU

- `Type 1 Hypervisor` works much better than Type 2 because there is no underlying middleware and thus making the best environment for critical applications and workloads. To compare the performance metrics, we need to determine the CPU overhead, the amount of maximum host and guest memory, and support for virtual processors.

### Why is cloud computing the future?
- Considering the various benefits of cloud computing to organizations, a good case is that cloud computing is increasingly becoming the new normal. Cloud computing helps society deal with future problems like managing big data, cyber security, and internal control.

- In addition to the present, emerging technologies like AI, distributed ledger technology, and many other capabilities are getting available through cloud computing. Consequently, these technologies adapt to varied platforms like mobile devices, increasing their use.

- Innovations supported cloud computing, like cloud automation. Therefore, the Industry cloud is also being developed to integrate cloud computing into specific industrial activities, making various operations even more streamlined. The verdict for cloud computing is that it’s a transitional technology that has helped organizations in several jurisdictions deliver their products and services better than before.

### What is big data in cloud computing?
- Big data in cloud computing refers to the practice of storing, processing, and analyzing large volumes of data using cloud-based services. 
- The cloud provides scalable and flexible resources that can handle the vast amounts of structured and unstructured data typical of big data projects. 
- This enables businesses to gain insights, make data-driven decisions, and leverage advanced analytics without the need for significant on-premises infrastructure. 
- Key cloud services for big data include data storage, data processing frameworks like Hadoop and Spark, and data analytics tools.

### What is Load Balancing in Cloud Computing?
- It’s the distribution of workloads across multiple computing resources. It reduces prices related to management systems and will increase the handiness of resources. It has an advantage over different load equalization in that it will transfer masses to servers globally as hostile distributing it across native servers. In the event of an area server outage, cloud equalization delivers users to the nearest regional server.

### Can you name some of the most critical cloud platform databases? 
- MongoDB, CouchDB, and LucidDB

### Why should a company opt for utility computing?
- This complex question requires a complex answer: thanks to utility computing, the end-user will only have to pay for the service on a per-use basis. The user will be able to increase the number of services he uses to satisfy his needs. This approach to cloud computing can be very remunerative for those businesses that plan to scale and grow their product.

### What are cloud storage levels?
- The most commonly seen cloud storage levels are:
    - **Object storage:** Data and its metadata are stored in object format. It is the most flexible form of storage and can also be used with web applications.
    - **File storage:** Data is stored in the form of files and often clubbed together as folders.
    - **Block storage:** data is stored in the form of blocks. It is the lowest level of storage and closest to the hardware.
    - **Dataset storage:** data is organized into a structured form like tables, record format, or delimited format

### What do you mean by cloud usage monitor?
- A cloud usage monitor is a lightweight, autonomous program situated on a cloud that aids in monitoring resources and collecting and processing resource usage data.
- There are three standard agent-based implementations of the usage monitor as follows.
    - **Monitoring agent:** responsible for transparent monitoring and analysis of the data flow. It is an event-driven program that resides on the existing communication paths. It aids in measuring network traffic and metrics.
    - **Polling agent:** responsible for gathering cloud service usage data by polling The resources. It also monitors the resource status and forwards usage data to log databases for reporting and post-processing purposes.
    - **Resource agent:** processing models that collect data using event-driven interactions with resources. It aids in checking the usage metrics based on pre-defined, tangible events, like initiation, suspension, resumption, and scaling of resources.

### What is edge computing?
- Edge computing is complementary to cloud computation. It is a distributed computing paradigm that combines cloud computing and data storage to solve the latency issues that plague the infrastructure. It is a prevalent paradigm in the IoT scenario. Edge computing aims to manipulate the edge on the edge devices, such as tabs, mobile phones, laptops, gateways, etc., to take on some of the provisioning and management responsibilities of the cloud.

### What is an API gateway?
- An API gateway is a management service between the client and the backend services and processes. It aids in easier management of the API services available such as user authentication, rate limiting, and statistical analysis.

### What is rate-limiting?
- Rate limiting is a technique by which a network’s traffic can be limited by putting a cap on the frequency of a particular action in a given timeframe. It can help eliminate suspicious activities, especially those caused by bots on any network, by tracking the IP address where the request originated. It also protects against instances of API overuse.!


### Describe the Cloud Computing Architecture.
- The cloud computing architecture is all the components of a cloud model that fit together from an architectural perspective. The figure below depicts how the various cloud services are related to support the needs of businesses. On the left side, the cloud service consumer represents the types of uses of cloud services. No matter what the requirements of the particular constituent are, it is important to bring the right type of services together that can support both internal and external users. Management of the consumers should be able to make services readily available to support the changing business needs. The applications, middleware, infrastructure, and services that are built based on on-premises computing models are within this category. In addition to this, the model depicts the role of a cloud auditor. This organization provides an oversight either by an internal or external group which makes sure that the consumer group meets its obligations.

- [cloudarchitecture](../../assets/cloudarchitecture.png)

### What are the different phases associated with cloud architecture?
- There are four primary phases associated with cloud architecture. They are as follows:
    - **Launch Phase:** Here, the essential services are initiated to get the system ready for communication or app-building.
    - **Monitoring Phase:** This is the next phase, where the launched services are monitored and subsequently managed on user demand.
    - **Shutdown Phase:** In this phase, the services shut down in the order of least recently used to most recently used, and all the system services are closed.
    - **Cleanup Phase:** Here, all the services and processes left from the shutdown phase due to incorrect or faulty shutdown are cleaned up.

### What are Microservices?
- Microservices is a process of developing applications that consist of code that is independent of each other and of the underlying developing platform. Each microservice runs a unique process and communicates through well-defined and standardized APIs, once created. These services are defined in the form of a catalog so that developers can easily locate the right service and also understand the governance rules for usage.

### Why are microservices important for a true cloud environment?
- The reason why microservices are so important for a true cloud environment is because of these four key benefits:

    - Each microservice is built to serve a specific and limited purpose, and hence application development is simplified. Small development teams can then focus on writing code for some of the narrowly defined and easily understood functions.
    - Code changes will be smaller and less complex than with a complex integrated application, making it easier and faster to make changes, whether to fix a problem or to upgrade service with new requirements.
    - Scalability — Scalability makes it easier to deploy an additional instance of a service or change that service as needs evolve.
    - Microservices are fully tested and validated. When new applications leverage existing microservices, developers can assume the integrity of the new application without the need for continual testing.

## AWS vs. AZURE
### Give A Brief Introduction To Windows Azure Operating System.
- The Windows Azure operating system is used for cloud services to be run on the Windows Azure Platform. Azure is preferred as it includes the essential features for hosting all the services in the cloud. You also get a runtime environment consisting of a Web Server, Primary Storage, Management services, and load balancers. The Windows Azure system provides the fabric for developing and testing services before their deployment on the Windows Azure in the cloud.

### What is the advantage of using Azure Content Delivery Network?
- Azure Content Delivery Network, or Azure CDN, is a remote server cluster. It aids in delivering content at geographically distinct locations to users with minimal transactions and networks for fast content delivery. Some of the salient advantages of the Azure CDN are as below:
    - Faster performance results in a better user experience.
    - No requirements for added hardware or/and software resources. Requires only configuration to set up the CDN features.
    - Decreased load on the actual servers since data is sent via the edge servers.
    - It is a robust delivery system requiring minimal maintenance
    - Extremely easy to configure with no additional resource requirements.

### What are the benefits of using Traffic Manager in Azure? 
- Microsoft Azure Traffic Manager is a component of the Azure cloud that aids the system by managing the distribution of user traffic for various service endpoints in the system. These service endpoints may be a web app, an Azure VM, or even an incorporated cloud. It utilizes the DNS to apply traffic routing methods to incoming client request traffic to facilitate its traversal to the most suitable endpoints.

### What are the roles implemented in Microsoft Azure?
- The three roles that Microsoft Azure has implemented are the Web Role, Worker Role, and Virtual Machine Role.
    - **Web Role:** It provides a front-end web solution. Similar to an ASP.NET application. While facilitating, Azure provides IIS, a web server, with all necessary functions.
    - **Worker Role:** If you want to observe log activity, you may use a worker role because it offers solutions for background services and can execute any lengthy tasks.
    - **Virtual Machine Role:** Web and worker roles can both be run or executed in the virtual machine role.

### What are the different types of storage available in Azure?
- There are several types of storage available in Azure, they are mentioned here:
    - `Blobs`- Large amounts of unstructured and massive data are stored in this approach.
    - `Queues`- Messages used for interaction between application components are stored in queues.
    - `Files`- Files are utilized to store files and share them as common disk storage between virtual machines.
    - `Tables`- NoSQL tables are used to store structured data and are ideal for small databases.
    - `Disks`- Used to create virtual machine drives for high-input/high-output or random read/write activities.

### What is ARM in Azure?
- `ARM` defines `Azure Resource Manager`, it was inducted in 2014 which added the concept of a resource group. ARM is Microsoft’s deployment and management service for Azure. It also enables you to centralize the deployment, security, and management of Azure resources. The resource manager deployment model provides several benefits over the classic deployment model.

### What are the main components of Azure Platform?
- Windows Azure has three main components in Azure: Compute, storage, and fabric

    - **Windows Azure Compute** Azure compute offers a hosting environment for managed code and a computing service via web roles, workers roles, and virtual machine roles.
    - **Windows Azure Storage** There are four main types of storage services offered by Windows Azure, including queues, tables, binary large objects, windows azure disks, etc.
    - **Windows Azure Fabric** The open-source distributed systems platform known as Azure Service Fabric is a Platform as a Service that gives users access to the same powerful tools that Microsoft regularly employs to create, maintain, and operate many of its services.

