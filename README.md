# `OpenSCD CoMPAS Edition`

[![NodeJS Build Github Action Status](<https://img.shields.io/github/workflow/status/com-pas/compas-open-scd/NodeJS%20Build?logo=GitHub>)](https://github.com/com-pas/compas-open-scd/actions?query=workflow%3A%22NodeJS+Build%22)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/5925/badge)](https://bestpractices.coreinfrastructure.org/projects/5925)
[![Slack](https://raw.githubusercontent.com/com-pas/compas-architecture/master/public/LFEnergy-slack.svg)](http://lfenergy.slack.com/)

Open Substation Communication Designer is an editor for SCL files as described in `IEC 61850-6`.

> Try it out at [openscd.github.io](https://openscd.github.io)!

## Installation

In order to install OpenSCD on your local device (only for you), simply visit [openscd.github.io](https://openscd.github.io), click the "Install OpenSCD" button in your address bar (Chrome or Edge on desktop) or click the "Add OpenSCD to home screen" notification in any mobile browser.

In order to install your own instance of OpenSCD on your own webserver (e.g. on your company intranet), simply download [our latest release](https://github.com/openscd/open-scd/releases/latest) (`open-scd.zip` or `open-scd.tar.gz`) and extract the archive contents into the "webroot" directory of your web server.

If you don't have your own webserver but still want your own version of OpenSCD hosted locally (e.g. on a system without an internet connection), you can [use a browser plugin that acts as a local webserver](https://github.com/openscd/open-scd/wiki/Install-OpenSCD#offline) (only for you) instead.

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

### Docker
It's also possible to run OpenSCD CoMPAS Edition as a docker. Of every release a docker image is created and pushed to Docker Hub.
To run the docker container use the following command.

```
docker run -it --rm -d -p 8080:80 --name compas-open-scd lfenergy/compas-open-scd:latest
```
Now open a browser and go to "http://localhost:8080". OpenSCD is shown.

### CoMPAS Service

During development, it is sometimes handy to use running backend services, like CIM Mapping or SCL Data Service.
The problem is that these services need an Authorization Header to work. Normally these are injected by a reverse proxy 
or something like that. 

There is a work-around and that is using the ModHeader Extension of the Browser (Chrome, Firefox, ...).
With this extension the header 'Authorization' can be added with a value 'Bearer <access token>'. 
The AccessToken can be retrieved from a running KeyCloak instance. 

## License

The [IEC 61850](https://webstore.iec.ch/publication/63319) XSD and NSD code components used are
distributed under their [end user license agreement](CC-EULA.pdf).

This project is licensed under the [Apache License 2.0](LICENSE.md).

&copy; 2020-2022 OMICRON electronics GmbH

