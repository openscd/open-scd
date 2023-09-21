# 2. Use Monorepo

Date: 2023-08

## Status

Accepted

## Context

We want:
  - better access management to core functionalities, plugins and ui components
  - easier maintainability and refactorability of critical parts
  - more shareable code


## Decision

We will use a monorepo to manage the codebase for the time being. 

To control access to the codebase we will use CODEOWNERS files.


## Consequences

- it makes the the dependency discovery and management easier between packages
- we can add packages that can be deployed and published independently and still used directly inside the monorepo
- it will allow us to experiment and beta test packages before publishing them
- CI pipeline runs will be faster because changes are more separated
- it will make it harder to bundle and distribute parts of the base distribution
- it moves the complexity of package management into a concentrated place


