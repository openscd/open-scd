# 1. Externalize OpenSCD core plugins

Date: 2024-11

## Status

Open

## Context

For a better expandability we would like to extract all plugins in a new plugins repository.

## Participants
 - ... link to github user

## Decision

Following the architectural decision in [OpenSCD Theming](./../0001-ADR-Theming.md) we will extract all OpenSCD Core plugins to an external repository.
Doing so OpenSCD Core will be streamlined and a clean interface and structure for plugins will be provided for custome extensions.
Parallel to the plugins extraction shared UI-Components module will be introduced which provides reusable UI-Components based on Svelte and [NX](https://nx.dev/) for faster development for OpenSCD Core and custom plugins.

Plugins will be moved to repository [OpenSCD official Plugins](https://github.com/openscd/oscd-official-plugins) and the release strategy is defined [here](./0004-openscd-release-and-deploy-strategy.md).
As final task the current documentation will be added with a new section `How to add new and custom OpenSCD plugins` to support developers to follow the concept.

## Consequences

- Clean Code in OpenSCD Core
- Clear architectural structure of plugins

- Building OpenSCD is more then building a simple repository
- Clear path must be defined how to extend OpenSCD with custom plugins (full software cycle till deployment)
- Release process for OpenSCD Core and OpenSCD official plugins
