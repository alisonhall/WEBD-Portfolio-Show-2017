# WEBD-Portfolio-Show-2017
Humber WEBD 2017 class' Portfolio Show!

# SHIFT 2017

##
## Getting Started


1) Open Terminal on your computer (or Terminal equivalent).

2) Navigate to the directory where you want this repository code to be on your local computer using the `cd foldername` command.

3) Enter the following 4 lines in Terminal:

```bash
git clone https://github.com/alisonhall/WEBD-Portfolio-Show-2017.git
cd WEBD-Portfolio-Show-2017
```

Make sure that you have the remote set up to connect your local files with the server repository. Do this by typing `git remote -v`. If a remote doesn't show up, you will need to use the following command (where 'origin' is the new remote name):
```bash
git remote add origin https://github.com/alisonhall/WEBD-Portfolio-Show-2017.git
```


##
## Saving Changes Locally
It is recommended that you don't make changes directly to the 'master' branch. Instead, use or create a separate branch.

To see all of the branches, use the following command:
```bash
git branch
```

To use an already created branch, use the following command (where 'branchname' is the name of the existing branch):
```bash
git checkout branchname
```

To create and go to a separate branch, use the following command (where 'branchname' is the name of the new branch):
```bash
git checkout -b branchname
```

Once you have made changes and are ready to save your changes in your branch, use the following commands:
```bash
git add -A
git commit -m "Enter a meaningful message describing the changes you made"

```

##
## Pushing Local Changes to the Remote Repository

Assuming that the current local branch is checked out and has a corresponding remote branch, you can push all of the commits you have made on your local computer to the remote repository by using the following command:
```bash
git push
```
If either you haven't checked out the local branch, or there isn't a corresponding remote branch, you will need to run the following command (where 'origin' represents your remote name, and 'branchname' is the name of the branch of the remote you are pushing your changes to):
```bash
git push origin branchname
```

If you want your changes to be merged to the 'master' branch, you will need to create a 'Pull Request' from the repository website.


##
## Retrieving Changes from the Remote Repository

If a change has been made on the server's repository and you need to bring in the changes, first use the `git checkout branchname` command to checkout that branch. Then use the following command:
```bash
git pull
```

##
## Merging Changes Locally

If you need to merge the changes made to a different branch (such as 'master') into the branch you are working on, use the following command (where 'branchname' is the branch you want to merge into the current branch you are on):
```bash
git merge branchname
```
If it asks you for a commit message by opening up a text editor in the Terminal window, you can use the default message by typing 'Ctrl C' and then typing ':quit' when prompted.
