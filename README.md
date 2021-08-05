# `OpenSCD CoMPAS Edition`

[![NodeJS Build Github Action Status](<https://img.shields.io/github/workflow/status/com-pas/compas-open-scd/NodeJS%20Build?logo=GitHub>)](https://github.com/com-pas/compas-open-scd/actions?query=workflow%3A%22NodeJS+Build%22)
[![LFX Security Status](https://img.shields.io/badge/dynamic/json?color=orange&label=LFX%20Security%20Tool&query=issues%5B%3F%28%40%5B%27repository-name%27%5D%20%3D%3D%20%27compas-open-scd%27%29%5D%5B%27high-open-issues%27%5D&suffix=%20High%20open%20issues&url=https%3A%2F%2Fapi.security.lfx.linuxfoundation.org%2Fv1%2Fproject%2Fe8b6fdf9-2686-44c5-bbaa-6965d04ad3e1%2Fissues)](https://security.lfx.linuxfoundation.org/#/e8b6fdf9-2686-44c5-bbaa-6965d04ad3e1/issues)
[![Slack](https://raw.githubusercontent.com/com-pas/compas-architecture/master/public/LFEnergy-slack.svg)](http://lfenergy.slack.com/)

Open Substation Communication Designer is an editor for SCL files as described in `IEC 61850-6`.

> Try it out at [openscd.github.io](https://openscd.github.io)!

## Installation

```
git clone https://github.com/openscd/open-scd.git
cd open-scd
npm install
npm start
```

## Scripts

- `start` runs `OpenSCD` for development, reloading on file changes
- `test` runs the test suite with Karma
- `lint` runs the linter
- `doc` builds markdown documentation in the `doc` directory

### Docker
It's also possible to run OpenSCD CoMPAS Edition as a docker. Of every release a docker image is created and pushed to Docker Hub.
To run the docker container use the following command.

```
docker run -it --rm -d -p 8080:80 --name compas-open-scd lfenergycompas/compas-open-scd:latest
```
Now open a browser and go to "http://localhost:8080". OpenSCD is shown.

## License

The [IEC 61850](https://webstore.iec.ch/publication/63319) XSD and NSD code components used are
distributed under their [end user license agreement](CC-EULA.pdf).

This project is licensed under the [Apache License 2.0](LICENSE).

&copy; 2020-2021 OMICRON electronics GmbH

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fopenscd%2Fopen-scd.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fopenscd%2Fopen-scd?ref=badge_large)
