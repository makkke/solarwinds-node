#!/usr/bin/env node

import program from 'commander'
import { version } from '../package.json'

program
  .version(version)
  .command('node', 'Nodes monitored by SolarWinds.')
  .command('vm', 'Virtual machines accessible by SolarWinds.')
  .command('app-template', 'Application templates.')
  .command('credential', 'Credentials.')
  .parse(process.argv)

if (!program.args.length) program.help()
