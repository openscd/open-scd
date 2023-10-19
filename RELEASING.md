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
    
3. Create a new release branch from the latest release of open-scd (this could be *upstream/main* if it was just released or the specific *commit hash* of the release), using a branch name relative to the desired release tag like *release_v0_33_0_1*:

    `git checkout 5aa52454f3e3bb88efef7c8fb466d4d3cc48d20d -b release_v0_33_0_1` (example with commit hash)
    
    or
    
    `git checkout upstream/main -b release_v0_33_0_1`  (example using open-scd's main branch)

4. Merge changes from *origin/main* into your release branch like this:
    
    `git merge main --strategy recursive`
    
5. Make sure tests are passing, add fixes for breaking changes from **open-scd**
6. Update the version number in your project's `package.json` file.
7. Push the changes in your release branch to origin:
    `git push --set-upstream origin release_v0_33_0_1`
8. Create a PR from your release branch into *main* 
9. Create a new release on GitHub and tag it with the new version number.
10. Include automatic release notes summarizing the changes in this release.
11. Publish the release and update all the CoMPAS projects with a dependency on this repo to the newly released version.