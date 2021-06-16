# `OpenSCD CoMPAS Edition`

[![Build Status](https://travis-ci.org/openscd/open-scd.svg?branch=main)](https://travis-ci.org/openscd/open-scd)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fopenscd%2Fopen-scd.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fopenscd%2Fopen-scd?ref=badge_shield)
[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

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

The [IEC 61850](https://webstore.iec.ch/publication/63319) XML schemas used are
distributed under their [end user license agreement](CC-EULA.pdf).

This project is licensed under the [Apache License 2.0](LICENSE).

&copy; 2020 OMICRON electronics GmbH

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fopenscd%2Fopen-scd.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fopenscd%2Fopen-scd?ref=badge_large)
