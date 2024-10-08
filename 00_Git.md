# GENERAL COMMANDS AND WORKFLOWS:

### GENERAL:

    git status                              //type this to see what's going on right now
    git log                                 //view changes (exit with 'q', 'space' to move down a whole page)
    git log --summary
    git diff sourcebranch targetbranch      //review changes before merging

### START NEW LOCAL REPO:

    git init                                //Initialize local repo (better to create on GitHub and clone it locally)

### CLONE AN EXISTING GITHUB REPO:

    git clone "SSH Code from GitHub"        //Clone an existing Repo from github to your PC

### UPDATE TO THE LATEST UPDATES IF REPO WAS ALREADY CLONED:

    git pull                                //If already cloned and open, you can use this command to update the files to the latest GitHub version

### WORKING PROCESS AFTER PULL/CLONE:

    git add filename                        //Add file or all files to staging area
    git add --all
    git add -A
    git add .
    
    git restore --staged <file>             //Use this to unstage a file
    git restore <file>                      //Use this to revert to last pull

    git commit -m "Commit message"          //Commit all staged files and add message

    git push                                //Send to GitHub

### STASHING:

    git stash                               //Revert to last commit by creating a temporary save from your current progress
    git stash pop                           //Get back your stash

### WORKING WITH BRANCHES:

    git branch -a                           //list branches
    git branch -d branchname                //delete branch
    git branch newbranchname                //create new branch

    git checkout branchname                 //switch to an existing branch
    git checkout -b branchname              //create new branch and switch to it

    git merge branchname                    //merge a branch into the active branch
    git merge sourcebranch targetbranch     //merge a branch into the target branch

    CREATE NEW BRANCH AND PUSH IT INSTANTLY TO BE A REMOTE BRANCH ON GITHUB:
        
        1 git checkout -b newbranch         //create new branch locally
        2 git push -u origin newbranch      //push it to GitHub (-u means upstream)

    WORK ON YOUR OWN BRANCH PROCESS:

        1 git checkout -b newbranch         //create new branch and switch to it
        2 git push -u origin newbranch      //push it to GitHub (-u means upstream)
        ...
        3 git add & commmit & push          //push new branch content
        // AT THIS POINT WE CAN CREATE A PULL REQUEST ON GITHUB TO MERGE INTO AN EXISTING BRANCH
        ...
        5 git checkout development          //switch back to development
        6 git pull                          //pull latest changes

        MERGE LOCALLY:
        7 git merge newbranch               //merge your branch into development
        8 git add & commmit & push          //push merged changes to development branch

        9 git branch -d newbranch           //delete newbrach branch
        +1 git push origin --delete branch_name     // If you pushed your branch to GitHub, you can delete it from GitHub with this command
    
    INITIALIZE PULL REQUEST: Ask someone else to merge your new branch into the project's branch (eg into main) = "request someone else to pull your branch"

        1 git checkout -b <new-branch>                  //create new local branch and switch to it
        2 git push --set-upstream origin <new-branch>   //add brach to remote git repo, and create pull request
        3 complete pull request on GitHub

### OTHER USEFUL COMMANDS:

    git rm -r filename.ext                  //remove file or folder

    git stash                               //move all changes into a temporary folder
    git stash clear                         //remove all stashed entries
    git stash list                          //list all stashed entries
    git stash pop stash@{index}             //restores changes to stashed data at the chosen index, and deletes stash data

### GIT INIT METHOD / Not recommended as the repo still needs to be created on GitHub (Better to create the repo first on GitHub, and then clone it!)

1. Create a folder on your PC, and open it in VS
2. Open Terminal
3. git init                                      //initializes a Git local repo
4. code filename.js                              //create your files and add some content
5. add & commit as before
6. Create repo on GitHub & get SSH
7. git remote add origin git@branchLocation.git  //add GitHub repo to your initialized folder as remote
8. git push -u origin master (or main?)          //push changes; -u means it creates upstream branch, so now the GitHub will be the source (?)

# GIT HARD RESET (eg. go back to a specific commit and delete everything after that)
- Clone the repo (if not already done)
- `git reset --hard <COMMIT ID>`
- `git push --force origin main`

# GIT PRINCIPLES
- Branching: https://www.atlassian.com/git/tutorials/using-branches
- Merging, Rebasing, Fast-forwarding in detail: https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell (Read chapters 3.1 - 3.7!)
- Workflows, Feature Branch Workflow: https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow
- Pull requests: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests
- Optional:
    - More on workflows: https://www.atlassian.com/git/tutorials/comparing-workflows
    - Distributed workflows: https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows
    - Contributing to a Project: https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project
    - Tagging (versions): https://git-scm.com/book/en/v2/Git-Basics-Tagging

# PRACTICE
- Interactive Turorial: https://learngitbranching.js.org/

# GIT WORKFLOW
https://docs.google.com/presentation/d/1N4vRxd9Rg_rIs__vhUJzz3wVxnJN9wYTa9vM89EEx_k/edit#slide=id.p

- a `commit` is a pointer to a snapshot in reality
    - generates a HASH code (`SHA`), which is unique to the commit
    - commits are immutable
- `branches` are tags
    - they are mutable
    - they point to a specific commit
- `HEAD` points to the branch, and the branch points to the commit that is the latest

- `Pull requests` exist in GitHub, not Git specifically

- Usefule basic commands:
    - `git log`
    - `git status`
    - `git branch`

- Workflow:
    1. Clone repo
    2. Create feature-branchname:
        - `git checkout -b gakalmar-feature-name`
    3. `git push --set-upstream origin <branch-name>`
    4. Create pull request on GitHub:  
        - Use annotations like `Fixes #<number>` to link an issue to the pull request (so it's not linked from the issue, but the other way around)
