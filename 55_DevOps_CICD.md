# CI/CD

## NOTES:
### The most popular CI/CD tools/sercices:
- Jenkins: An open-source automation server that provides hundreds of plugins to support building, deploying, and automating any project.
- GitHub Actions: A CI/CD service directly integrated with GitHub, allowing you to automate workflows, including build, test, and deployment processes.
- GitLab CI/CD: Integrated into the GitLab platform, this service offers robust CI/CD capabilities with comprehensive features for testing and deployment.
- Azure DevOps: Microsoft's suite of development tools includes Azure Pipelines, which supports CI/CD for various platforms and integrates well with other Azure services.

### What is a pipeline?
- In the context of Continuous Integration and Continuous Deployment (CI/CD), a pipeline is a defined **sequence of automated steps** that software undergoes from code integration to deployment. It is designed to facilitate the efficient and reliable delivery of software by automating tasks that would otherwise be manual and error-prone.

    - **Detailed Explanation:**
        - A CI/CD pipeline typically comprises several stages, each representing a distinct phase in the software development lifecycle. These stages include:

            1. **Source:** This is where the pipeline begins. It is triggered by a change in the source code repository, such as a commit or a merge request.
            2. **Build:** During this stage, the source code is compiled and assembled into a deployable artifact. This can involve compiling code, packaging binaries, or generating documentation.
            3. **Test:** Automated tests are executed to verify that the code behaves as expected. This can include unit tests, integration tests, and other forms of automated testing to ensure code quality and functionality.
            4. **Deploy:** The software is deployed to a staging or production environment. This stage can involve various deployment strategies, such as rolling updates or blue-green deployments.
            5. **Monitor:** Post-deployment, the application is monitored to ensure it is performing as expected. This includes checking for errors, performance issues, and other anomalies.

### Testing pyramid:
- Unit test a legtöbb, majd integration tesztek, majd UI a legkevesebb a tetején

### Environment types:
- Development
- Testing
- Staging
- Production (live, used by clients)

### Deployment strategies:
- Details: https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-concepts/

- Blue / Green deployment
- Rolling deployment
- Canary Deployment

### Jenkins
- pozitívum: open source
- negatívum: self hosted -> nekünk kell hostolni/futtatni a szervert és rajta a Node-okat
    - vs GitHub Actions which is hosted