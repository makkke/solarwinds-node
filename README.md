# SolarWinds Node.js

[![npm version](https://badge.fury.io/js/solarwinds.svg)](https://badge.fury.io/js/solarwinds)
[![Code Climate](https://codeclimate.com/github/cityofsurrey/solarwinds-node/badges/gpa.svg)](https://codeclimate.com/github/cityofsurrey/solarwinds-node)
[![CircleCI](https://circleci.com/gh/cityofsurrey/solarwinds-node.svg?style=shield&circle-token=7167ace50d0b666119d8a8f7cfc15c9313bb9232)](https://circleci.com/gh/cityofsurrey/solarwinds-node)

The Node.js library and CLI for the Solarwinds API.

## Configuration

This library/cli uses the following environment variables:

| Env Variable | Description |
| ------------ | ----------- |
| **SOLARWINDS_USERNAME** | Username of SolarWinds API user. |
| **SOLARWINDS_PASSWORD** | Password of SolarWinds API user. |
| **SOLARWINDS_HOSTNAME** | Name of host where SolarWinds API is installed, e.g `solarwinds.example.com` |
| **SOLARWINDS_PORT** | Port of SolarWinds API, default is `17778`. |

## Install

```console
$ npm install -g solarwinds
```

## CLI Usage

```console
  Usage: solarwinds [options] [command]


  Commands:

    node           Nodes monitored by SolarWinds.
    vm             Virtual machines accessible by SolarWinds.
    app-template   Application templates.
    credential     Credentials.

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

#### node create

```console
  Usage: solarwinds node create [options]

  Create a node

  Options:

    -h, --help           output usage information
    --name <value>       Node name
    --hostname <value>   Node host name for polling. Has to be resolvable by DNS
    --community [value]  Community string (default '')
    --ip <value>         IP address
```

#### node list

```console
  Usage: solarwinds node list|ls [options]

  List all available nodes

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

  Unmanage a node for a duration

  Options:

    -h, --help              output usage information
    -d, --duration <value>  Duration, for example 15s, 30m, 3h or 1d
```

#### node remanage

```console
  Usage: solarwinds node remanage [options] <NODE>

  Remanage node by id of hostname

  Options:

    -h, --help  output usage information
```

#### node remove

```console
  Usage: solarwinds node remove|rm [options] <NODE>

  Remove node

  Options:

    -h, --help  output usage information

```

### Application Templates

Application templates. `APPTEMPLATE` can be a application template **id** or a **name**.

```console
  Usage: solarwinds app-template [options] [command]


  Commands:

    list|ls                List all application templates
    inspect <APPTEMPLATE>  Display detailed information about an application template

  Options:

    -h, --help  output usage information

```

#### app-template list

```console
  Usage: solarwinds app-template list|ls [options]

  List all application templates

  Options:

    -h, --help  output usage information
```

#### app-template inspect

```console
  Usage: solarwinds app-template inspect [options] <APPTEMPLATE>

  Display detailed information about an application template

  Options:

    -h, --help  output usage information
```

### Credentials

Credentials. `CREDENTIAL` can be a credential **id** or a **name**.

```console
  Usage: solarwinds credential [options] [command]


  Commands:

    list|ls               List all credentials
    inspect <CREDENTIAL>  Display detailed information about a credential

  Options:

    -h, --help  output usage information
```

#### credential list

```console
  Usage: solarwinds credential list|ls [options]

  List all credentials

  Options:

    -h, --help  output usage information
```

#### credential inspect

```console
  Usage: solarwinds credential inspect [options] <CREDENTIAL>

  Display detailed information about a credential

  Options:

    -h, --help  output usage information
```

### Virtual Machines

Virtual machines accessible by SolarWinds. `VM` can be a vm **id** or a vm **name**.

```console
  Usage: solarwinds vm [options] [command]

  Commands:

  list|ls       List all available virtual machines
  inspect <VM>  Display detailed information about a virtual machine

  Options:

  -h, --help  output usage information
```

#### vm list

```console
  Usage: solarwinds vm list|ls [options]

  List all available virtual machines

  Options:

    -h, --help  output usage information
```

#### vm inspect

```console
  Usage: solarwinds vm inspect [options] <VM>

  Display detailed information about a virtual machine

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
