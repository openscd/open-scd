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

### Building

If you want to build OpenSCD yourself in order to make some changes to your local installation or to contribute to the project, you may first want to install [Node.js](https://nodejs.org/) in order to be able to use our local development setup. It is recommended to use Node.js 18.x. it is is the version used to build and test on GitHub Actions.

Once Node.js is installed on your system, you may get started by entering the following lines in your command prompt:

```
git clone https://github.com/openscd/open-scd.git
cd open-scd
npm install
npm start
```

This will start a local development server and open a browser window which will automatically be reloaded as soon as you save any changes to your local source code files.

### TypeDoc

This project uses [TypeDoc](https://typedoc.org/) to transform documentation comments in the source code into a rendered HTML document that can be queried and navigated through. If you want to consult the generated documentation for the TypeScript components, mixins, modules and other relevant artifacts of this project, you can [do it here](https://openscd.github.io/doc/). Documentation for OpenSCD Core [can be found here](https://openscd.github.io/core-doc).

### Linting & Formatting

If you use VSCode to develop, we recommend you install and use the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions in order to automatically lint and format your code as you edit it. There are similar plugins available for using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) from within other IDEs and text editors.

### Scripts

We provide the following `npm` scripts for your convenience:

- `npm start` runs `OpenSCD` for development, reloading on file changes
- `npm test` runs the test suite with Karma
- `npm run lint` runs the linter (fixes problems in your code)
- `npm run format` runs the formatter (formats your code in a unified way)
- `npm run doc` builds HTML documentation into the `doc` directory
- `npm run build` builds a deployable version of the project into the `dist` directory
- `npm run serve` starts a local server to serve the built project files (useful for testing the production version of OpenSCD)

## License

The [IEC 61850](https://webstore.iec.ch/publication/63319) XSD and NSD code components used are
distributed under their [end user license agreement](CC-EULA.pdf).

This project is licensed under the [Apache License 2.0](LICENSE.md).

&copy; 2020-2022 OMICRON electronics GmbH, TransnetBW GmbH, Alliander N.V., and others

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fopenscd%2Fopen-scd.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fopenscd%2Fopen-scd?ref=badge_large)
