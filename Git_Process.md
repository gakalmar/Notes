GENERAL:

    git status                              //type this to see what's going on right now
    git log                                 //view changes
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

    git commit -m "Commit message"          //Commit all staged files and add message

    git push                                //Send to GitHub

WORKING WITH BRANCHES:

    git branch -a                           //list branches
    git branch -d branchname                //delete branch
    git branch newbranchname                //create new branch
    git checkout branchname                 //switch to an existing branch
    git checkout -b branchname              //create new branch and switch to it

    git merge branchname                    //merge a branch into the active branch
    git merge sourcebranch targetbranch     //merge a branch into the target branch

    MERGE INTO MASTER PROCESS:

        1 git checkout master
        2 git pull origin master                  //not necessary
        3 git merge development                   //merge development into active (master)
        4 git commit -m "Merge into master"       
        5 git push origin master                  //push changes into remote master branch

OTHER USEFUL COMMANDS:

    git rm -r filename.ext                  //remove file or folder

    git stash                               //move all changes into a temporary folder
    git stash clear                         //remove all stashed entries
    git stash list                          //list all stashed entries
    git stash pop stach@{index}             //restores changes to stashed data at the chosen index, and deletes stash data