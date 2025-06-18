# Release Process

This document outlines the steps involved in the release process for the OpenSCD project.

## Automated Release Workflow

The release process is automated using GitHub Actions and the `release-please` workflow. Below is an overview of the steps:

1. **Triggering the Workflow**:
   - The workflow is triggered on a push to the `main` branch.

2. **Release Creation**:
   - The `googleapis/release-please-action` is used to create a new release. It determines the version bump (major, minor, or patch) based on conventional commits.

3. **NPM Publication**:
   - When a release is created, the `packages/core` package is published to the NPM registry.

4. **Build Assets**:
   - The workflow creates zipped and tarred build assets from the `packages/distribution/build/`, that are attached to the GitHub release.

## Manual Steps - Verify the Release
   - After the workflow completes, a pull request (PR) is automatically opened with the relevant changes.
   - Review the PR to ensure the correct version and assets are included.
   - Once verified, merge the PR to finalise the release.

## Notes

- The release process relies on conventional commits to determine versioning. Ensure commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification or read more [here](./commiting.md).

## Versioning Strategy

- The version in the root `package.json` represents the official release version of the distribution. This version is also reflected in `packages/distribution/manifest.json`.
- The version in `packages/core/package.json` is used to publish the `core` package to the NPM registry.
- The version in `packages/openscd/package.json` is used to manage the versioning of the `openscd` package.
- These versions are updated automatically by the `release-please` action during the release process. Version numbers are updated automatically based on conventional commits.

