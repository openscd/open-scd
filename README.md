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

## Contributing

### Building

If you want to build OpenSCD yourself in order to make some changes to your local installation or to contribute to the project, you may first want to install [Node.js](https://nodejs.org/) in order to be able to use our local development setup.

Once Node.js is installed on your system, you may get started by entering the following lines in your command prompt:

```
git clone https://github.com/openscd/open-scd.git
cd open-scd
npm install
npm start
```

This will start a local development server and open a browser window which will automatically be reloaded as soon as you save any changes to your local source code files.

### TypeDoc

This project uses [TypeDoc](https://typedoc.org/) to transform documentation comments in the source code into a rendered HTML document that can be queried and navigated through. If you want to consult the generated documentation for the TypeScript components, mixins, modules and other relevant artifacts of this project, you can [do it here](https://openscd.github.io/doc/).

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

### Development for CoMPAS OpenSCD

See [Development](DEVELOPMENT.md) for more information about how to build and run CoMPAS OpenSCD locally.

## License

The [IEC 61850](https://webstore.iec.ch/publication/63319) XSD and NSD code components used are
distributed under their [end user license agreement](CC-EULA.pdf).

This project is licensed under the [Apache License 2.0](LICENSE.md).

&copy; 2020-2022 OMICRON electronics GmbH, TransnetBW GmbH, Alliander N.V., and others

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fopenscd%2Fopen-scd.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fopenscd%2Fopen-scd?ref=badge_large)
