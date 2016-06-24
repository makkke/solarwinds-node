# SolarWinds Node.js

[![CircleCI](https://circleci.com/gh/cityofsurrey/solarwinds-node.svg?style=svg&circle-token=7167ace50d0b666119d8a8f7cfc15c9313bb9232)](https://circleci.com/gh/cityofsurrey/solarwinds-node)

The Node.js library and CLI for the Solarwinds API.

## Install

```console
$ npm install --global solarwinds
```

## CLI

This cli uses the environment variables `SOLARWINDS_USERNAME` and `SOLARWINDS_PASSWORD` for authentication.


```console
$ solarwinds --help

  Usage
    solarwinds [command] [options]

  Commands:
    nodes [id]               list available nodes or node by id

    unmanage [options] <id>  unmanage node by id of hostname

      -d, --duration [interval]  duration like 30m, 3h or 1d (default is 5m)

    remanage <id>            remanage node by id of hostname

  Options:
    -h, --help     output usage information
    -V, --version  output the version number

  Examples
    solarwinds nodes
    solarwinds unmanage devdocker02 --duration 1h
    solarwinds remanage devdocker02
```

## Usage

This library by default uses the environment variables `SOLARWINDS_USERNAME` and `SOLARWINDS_PASSWORD` that can be overwritten:

```js
import SolarWinds from 'solarwinds'

const solarwinds = new SolarWinds('username', 'password')
```

## Resources

- [SolarWinds API Schema](http://solarwinds.github.io/OrionSDK/schema/index.html)