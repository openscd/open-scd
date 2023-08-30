# Quick guide on how to release a new version of CoMPAS OpenSCD

### Generally we follow these steps for releasing a new version:

1. First make sure you have the correct upstream URL configured in your local **compas-open-scd** repo by running `git remote -v`.
    
    You should see something like this:
    
    ```bash
    juan@Juans-MBP compas-open-scd % git remote -v             
    origin  git@github.com:com-pas/compas-open-scd.git (fetch)
    origin  git@github.com:com-pas/compas-open-scd.git (push)
    upstream        git@github.com:openscd/open-scd.git (fetch)
    upstream        git@github.com:openscd/open-scd.git (push)
    ```
    
    If you don’t see the second set of upstream URLs then you need to add **open-scd** as your upstream repo by running: 
    
    `git remote add upstream https://github.com/openscd/open-scd.git`  
    
2. Sync the changes from **open-scd**
    
    `git fetch upstream`
    
3. Create a new release branch from the latest release of open-scd (this could be *upstream/main* if it was just released or the specific commit hash of the release), using a branch name relative to the desired release tag, example: *release_v0_33_0_1*
4. Merge changes from *origin/main* into your release branch like this:
    
    `git merge main --strategy recursive`
    
5. Make sure tests are passing, add fixes for breaking changes from **open-scd**
6. Update the version number in your project's `package.json` file.
7. Create a PR from your release branch into *main* 
8. Create a new release on GitHub and tag it with the new version number.
9. Include automatic release notes summarizing the changes in this release.
10. Publish the release and update all the CoMPAS projects with a dependency on this repo to the newly released version.