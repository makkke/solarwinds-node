#!/usr/bin/env node

import program from 'commander'
import { version } from '../package.json'

program
  .version(version)
  .command('node', 'Nodes monitored by SolarWinds. `NODE` can be a node id or a hostname.')
  .command('vm', 'Virtual machines accessible by SolarWinds. `VM` can be a vm id or a vm name.')
  .command('app-template', 'Application templates. `APPTEMPLATE` can be an app template id or a name.')

  .parse(process.argv)

if (!program.args.length) program.help()
