GENERAL:

    git status                              //type this to see what's going on right now
    git log                                 //view changes (exit with 'q', 'space' to move down a whole page)
    git log --summary
    git diff sourcebranch targetbranch      //review changes before merging

START NEW LOCAL REPO:

    git init                                //Initialize local repo (better to create on GitHub and clone it locally)

CLONE AN EXISTING GITHUB REPO:

    git clone "SSH Code from GitHub"        //Clone an existing Repo from github to your PC

UPDATE TO THE LATEST UPDATES IF REPO WAS ALREADY CLONED:

    git pull                                //If already cloned and open, you can use this command to update the files to the latest GitHub version

WORKING PROCESS AFTER PULL/CLONE:

    git add filename                        //Add file or all files to staging area
    git add --all
    git add -A
    git add .
    
    git restore --staged <file>             //Use this to unstage a file
    git restore <file>                      //Use this to revert to last pull

    git commit -m "Commit message"          //Commit all staged files and add message

    git push                                //Send to GitHub

STASHING:

    git stash                               //Revert to last commit by creating a temporary save from your current progress
    git stash pop                           //Get back your stash

WORKING WITH BRANCHES:

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

OTHER USEFUL COMMANDS:

    git rm -r filename.ext                  //remove file or folder

    git stash                               //move all changes into a temporary folder
    git stash clear                         //remove all stashed entries
    git stash list                          //list all stashed entries
    git stash pop stash@{index}             //restores changes to stashed data at the chosen index, and deletes stash data

GIT INIT METHOD / Not recommended as the repo still needs to be created on GitHub (Better to create the repo first on GitHub, and then clone it!)

    1 Create a folder on your PC, and open it in VS
    2 Open Terminal
    3 git init                                      //initializes a Git local repo
    4 code filename.js                              //create your files and add some content
    5 add & commit as before
    6 Create repo on GitHub & get SSH
    7 git remote add origin git@branchLocation.git  //add GitHub repo to your initialized folder as remote
    8 git push -u origin master (or main?)          //push changes; -u means it creates upstream branch, so now the GitHub will be the source (?)

