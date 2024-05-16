# `OpenSCD`

[![Build Status](https://travis-ci.org/openscd/open-scd.svg?branch=main)](https://travis-ci.org/openscd/open-scd)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fopenscd%2Fopen-scd.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fopenscd%2Fopen-scd?ref=badge_shield)
[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)
[![Slack LF Energy](https://img.shields.io/badge/LF%20Energy%20Slack-%20%23OpenSCD%20chat-purple?logo=slack&color=2aa198&labelColor=6c71c4)](https://lfenergy.slack.com/archives/C03LH7EUP34)

Open Substation Communication Designer is an editor for SCL files as described in `IEC 61850-6`.

> Try it out at [openscd.github.io](https://openscd.github.io)!

Make sure your web browser has enough free memory! If needed, disable plug-ins and close unused browser tabs.

## Installation

In order to install OpenSCD on your local device (only for you), simply visit [openscd.github.io](https://openscd.github.io), click the "Install OpenSCD" button in your address bar (Chrome or Edge on desktop) or click the "Add OpenSCD to home screen" notification in any mobile browser.

In order to install your own instance of OpenSCD on your own webserver (e.g. on your company intranet), simply download [our latest release](https://github.com/openscd/open-scd/releases/latest) (`open-scd.zip` or `open-scd.tar.gz`) and extract the archive contents into the "webroot" directory of your web server.

If you don't have your own webserver but still want your own version of OpenSCD hosted locally (e.g. on a system without an internet connection), you can [use a browser plugin that acts as a local webserver](https://github.com/openscd/open-scd/wiki/Install-OpenSCD#offline) (only for you) instead.

## Plug-ins

We gather the available plug-ins from the community in the [plug-ins](docs/plug-ins.md) file.  
If you would like to list your plug-in here, please open a pull request.

## Development

This repository is a [↗ monorepo](https://en.wikipedia.org/wiki/Monorepo), made up of several packages.
To find out more about the development of each packages, such as the base distribution or the plugins, please refer to their respective READMEs:
- [open-scd](packages/openscd/README.md): provides the base distribution available on [openscd.github.io](https://openscd.github.io)
- [core](packages/core/README.md): provides the agreed api of OpenSCD Core

## Contributing

The easiest way to get in touch is to join the `#open-scd` channel kindly hosted on [the LF Energy Slack server](https://lfenergy.slack.com/archives/C03LH7EUP34). 
If you say "hi" there we will be more than happy to help you find your way around this project.

## Documentation

How the documentation is organized.

A high-level overview of how it’s organized will help you know where to look for certain things:

- [⚖️ Decisions](docs/decisions/README.md) documents the decisions we made and why we made them.
