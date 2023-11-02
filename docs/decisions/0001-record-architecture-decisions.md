# 1. Record architecture decisions

Date: 2023-07

## Status

Accepted

## Context

We need to record the architectural decisions made on this project.

## Decision

We will follow the decisions recorded in the central organizational 
repository ([.github](https://github.com/openscd/.github)), 
and record new repo-specific decisions in this repository.


We write ADRs in the `docs/decisions` folder instead of a standard `doc/adr`:
- `docs` instead of `doc` because `doc` is used for the generated documentation.
- `decisions` instead of `adrs` because it is more explicit and a followed practice:
  [↗ Markdown Any Decision Records - Applying MADR to your project ](https://adr.github.io/madr/#applying-madr-to-your-project)

## Consequences

- It will be harder to track which decisions have to be taken into consideration
- Local decisions will be easier to find
