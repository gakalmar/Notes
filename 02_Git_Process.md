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
    
    git restore --staged <file>             //Use this to unstage a file
    git restore <file>                      //Use this to revert to last pull

    git commit -m "Commit message"          //Commit all staged files and add message

    git push                                //Send to GitHub

WORKING WITH BRANCHES:

    git branch -a                           //list branches
    git branch -d branchname                //delete branch
    git branch newbranchname                //create new branch
    git checkout branchname                 //switch to an existing branch
    git checkout -b branchname              //create new branch and switch to it
gk  
    git merge branchname                    //merge a branch into the active branch
    git merge sourcebranch targetbranch     //merge a branch into the target branch

    MERGE INTO MASTER PROCESS:

        1 git checkout master
        2 git pull origin master                  //not necessary
        3 git merge development                   //merge development into active (master)
        4 git commit -m "Merge into master"       
        5 git push origin master                  //push changes into remote master branch
    
    WORK ON YOUR OWN BRANCH PROCESS:

        1 git checkout -b newbranch         //create new branch and switch to it
        2 do the work
        3 git checkout development          //switch back to development
        4 git pull                          //maybe it would be a good idea to pull at this stage?
        5 git merge newbranch               //merge your branch into development
        6 git branch -d newbranch           //delete newbrach branch
        7 git add- & commmit & push

        +1 git push origin --delete branch_name     // If you pushed your branch to GitHub, you can delete it from GitHub with this command

OTHER USEFUL COMMANDS:

    git rm -r filename.ext                  //remove file or folder

    git stash                               //move all changes into a temporary folder
    git stash clear                         //remove all stashed entries
    git stash list                          //list all stashed entries
    git stash pop stach@{index}             //restores changes to stashed data at the chosen index, and deletes stash data

GIT INIT METHOD / Not recommended as the repo still needs to be created on GitHub

    1 Create a folder on your PC, and open it in VS
    2 Open Terminal
    3 git init                                      //initializes a Git local repo
    4 code filename.js                              //create your files and add some content
    5 add & commit as before
    6 Create repo on GitHub & get SSH
    7 git remote add origin git@branchLocation.git  //add GitHub repo to your initialized folder as remote
    8 git push -u origin master (or main?)          //push changes; -u means it creates upstream branch, so now the GitHub will be the source (?)

INITIALIZE PULL REQUEST: Ask someone else to merge your new branch into the project's branch (eg into main) = "request someone else to pull your branch"

    1 git checkout -b <new-branch>                  //create new local branch and switch to it
    2 git push --set-upstream origin <new-branch>   //add brach to remote git repo, and create pull request
    3 complete pull request on GitHub