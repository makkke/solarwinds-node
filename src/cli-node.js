#!/usr/bin/env node

import program from 'commander'
import { print } from './utils'
import SolarWinds from './solarwinds'

const solarwinds = new SolarWinds()

program
  .command('list')
  .alias('ls')
  .description('Lists all available nodes')
  .action(async () => {
    const nodes = await solarwinds.nodes.query()
    print(nodes)
  })

program
  .command('inspect <NODE>')
  .description('Displays detailed information about a node')
  .action(async (id) => {
    const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
    print(node)
  })

program
  .command('unmanage <NODE>')
  .description('Unmanages a node for a duration')
  .option('-d, --duration <value>', 'duration, for example 15s, 30m, 3h or 1d')
  .action(async (id, options) => {
    const { duration } = options
    if (typeof duration === 'undefined') {
      console.error('duration is required')
      process.exit(1)
    }

    const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
    const result = await solarwinds.nodes.unmanage(node.id, duration)
    print(result)
  })

program
  .command('remanage <NODE>')
  .description('Remanage node by id of hostname')
  .action(async (id) => {
    const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
    const result = await solarwinds.nodes.remanage(node.id)
    print(result)
  })

program.parse(process.argv)
