# `OpenSCD CoMPAS Edition`

[![NodeJS Build Github Action Status](https://img.shields.io/github/workflow/status/com-pas/compas-open-scd/NodeJS%20Build?logo=GitHub)](https://github.com/com-pas/compas-open-scd/actions?query=workflow%3A%22NodeJS+Build%22)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/5925/badge)](https://bestpractices.coreinfrastructure.org/projects/5925)
[![Slack](https://raw.githubusercontent.com/com-pas/compas-architecture/master/public/LFEnergy-slack.svg)](http://lfenergy.slack.com/)

Open Substation Communication Designer is an editor for SCL files as described in `IEC 61850-6`.

> Try it out at [demo.compas.energy](https://demo.compas.energy/)!

Make sure your web browser has enough free memory! If needed, disable plug-ins and close unused browser tabs.

## Installation

CoMPAS Open Substation Communication Designer is an editor for SCL files as described in `IEC 61850-6`.

CoMPAS OpenSCD is a fork of the [OpenSCD](https://github.com/openscd/open-scd) project. The idea is to add functionality
to use the CoMPAS Backend Service to open and save SCL Files and more.

## Development

This repository is a [↗ monorepo](https://en.wikipedia.org/wiki/Monorepo), made up of several packages.
To find out more about the development of each packages, such as the base distribution or the plugins, please refer to their respective READMEs:
- [open-scd](packages/open-scd/README.md): provides the (upstream) base distribution available on [openscd.github.io](https://openscd.github.io)
- [compas-open-scd](packages/compas-open-scd/README.md): provides the base distribution available on [demo.compas.energy](https://demo.compas.energy)

## Contributing

A recommended read for every newcomer to the CoMPAS project is [the CoMPAS Contributing guide](https://com-pas.github.io/contributing/).

You can also get in touch by joining the `#compas` channel hosted on [the LF Energy Slack server](https://lfenergy.slack.com/archives/C01926K9D39). 

## Documentation

How the documentation is organized.

A high-level overview of how it’s organized will help you know where to look for certain things:

- [⚖️ Decisions](docs/decisions/README.md) documents the decisions we made and why we made them.
