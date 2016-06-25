# SolarWinds Node.js

[![npm version](https://badge.fury.io/js/solarwinds.svg)](https://badge.fury.io/js/solarwinds)
[![Code Climate](https://codeclimate.com/github/cityofsurrey/solarwinds-node/badges/gpa.svg)](https://codeclimate.com/github/cityofsurrey/solarwinds-node)
[![CircleCI](https://circleci.com/gh/cityofsurrey/solarwinds-node.svg?style=shield&circle-token=7167ace50d0b666119d8a8f7cfc15c9313bb9232)](https://circleci.com/gh/cityofsurrey/solarwinds-node)

The Node.js library and CLI for the Solarwinds API.

## Configuration

This library/cli uses the following environment variables:

  - **SOLARWINDS_USERNAME** - username of SolarWinds API user.
  - **SOLARWINDS_PASSWORD** - password of SolarWinds API user.
  - **SOLARWINDS_URL** - url of SolarWinds API, e.g `https://solarwinds.example.com:17778`.

## Install

```console
$ npm install -g solarwinds
```

## CLI Usage

```console
  Usage: solarwinds [options] [command]


  Commands:

    node        Nodes monitored by SolarWinds. `NODE` can be a **node id** or a **hostname**.
    help [cmd]  display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

### Nodes

Nodes monitored by SolarWinds. `NODE` can be a **node id** or a **hostname**.

```console
  Usage: solarwinds node [options] [command]


  Commands:

    list|ls                    lists all available nodes
    inspect <NODE>             displays detailed information about a node
    unmanage [options] <NODE>  Unmanages a node for a duration
    remanage <NODE>            remanage node by id of hostname

  Options:

    -h, --help  output usage information
```

#### node list

```console
  Usage: solarwinds node list|ls [options]

  Lists all available nodes

  Options:

    -h, --help  output usage information
```

#### node inspect

```console
  Usage: solarwinds node inspect [options] <NODE>

  Displays detailed information about a node

  Options:

    -h, --help  output usage information
```

#### node unmanage

```console
  Usage: solarwinds node unmanage [options] <NODE>

  Unmanages a node for a duration

  Options:

    -h, --help              output usage information
    -d, --duration <value>  duration, for example 15s, 30m, 3h or 1d
```

#### node remanage

```console
  Usage: solarwinds node remanage [options] <NODE>

  Remanage node by id of hostname

  Options:

    -h, --help  output usage information
```

## Library Usage

This library by default uses the environment variables specified above that can be overwritten:

```js
import SolarWinds from 'solarwinds'

const solarwinds = new SolarWinds('username', 'password', 'url')
...
const nodes = await solarwinds.nodes.query()
```

## Resources

- [SolarWinds API Schema](http://solarwinds.github.io/OrionSDK/schema/index.html)