# 1. Externalize OpenSCD core plugins

Date: 2024-11

## Status

Open

## Context

For a better expandability we would like to extract all plugins in a new plugins repository.

## Decision

Participants:
 - ... link to github user

Following the architectural decision in [OpenSCD Theming](./../0001-ADR-Theming.md) we would like to extract all OpenSCD Core plugins to an external repository.
Doing so we are going to streamline the OpenSCD Core and provide a clean interface and structure for plugins.
Further extracting the plugins we would introduce a shared UI-Component module which provides reusable UI-Components based on Svelte.

Plugins would be in the repository [OpenSCD official Plugins](https://github.com/openscd/oscd-official-plugins) and the release strategy is defined [here](./0004-openscd-release-and-deploy-strategy.md).

## Consequences

- Clean Code in OpenSCD Core
- Clear architectural structure of plugins
- Building OpenSCD is more then building a simple repository
- Clear path must be defined how to extend OpenSCD with custom plugins (full software cycle till deployment)
- Release process for OpenSCD Core and OpenSCD official plugins
