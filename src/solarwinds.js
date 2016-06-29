#!/usr/bin/env node

import program from 'commander'
import { version } from '../package.json'

program
  .version(version)
  .command('node', 'Nodes monitored by SolarWinds. `NODE` can be a **node id** or a **hostname**.')
  .parse(process.argv)

if (!program.args.length) program.help()
