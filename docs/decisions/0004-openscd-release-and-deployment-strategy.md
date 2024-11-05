# ADR-0004 - Technical solution for releasing and deployments

Date: 2024-11

## Status

TO_BE_REFINED

## Participants
 - ... link to github user

## Context

Based on the [decision](./0003-extract-plugins.md) to externalize plugins in proper plugins repository a new release and deployment strategy needs to be defined.
This plugins repository is solved as mono repository.

## Decision

### Release process 

Since OpenSCD is based on [NX](https://nx.dev/) the release strategy needs to rely on NX as well and must allow single releases of sub modules within this mono repository.
Such feature is provided by [NX release](https://nx.dev/recipes/nx-release) specially when using the [NX independently release feature](https://nx.dev/recipes/nx-release/release-projects-independently).

A possible release command would look like:
```
  nx release --projects=plugin-1,plugin-3
```

## Consequences

- Process needs to be documented so that all developers can easily follow it
- The building of complete OpenSCD Editor, OpenSCD Core + OpenSCD plugins, depends now on two repositories
- Custom OpenSCD eg. CoMPAS OpenSCD will be cleaner and more code can be reused
- Similar Look & Feel of plugins if shared UI-Components are used
- Faster plugin development and integration into OpenSCD Core
