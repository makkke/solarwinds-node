#!/usr/bin/env node

import program from 'commander'
import SolarWinds from './solarwinds'
import { version } from '../package.json'

const solarwinds = new SolarWinds()

program
  .version(version)
  .command('nodes [id]')
  .description('list available nodes or node by id')
  .action(async (id) => {
    if (id) {
      const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
      console.log(node)
    } else {
      const nodes = await solarwinds.nodes.query()
      console.log(nodes)
    }
  })

program
  .command('unmanage <id>')
  .description('unmanage node by id of hostname')
  .option('-d, --duration <interval>', 'duration, for example 15s, 30m, 3h or 1d')
  .action(async (id, options) => {
    const { duration } = options
    if (typeof duration === 'undefined') {
      console.error('duration is required')
      process.exit(1)
    }

    const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
    const result = await solarwinds.nodes.unmanage(node.id, duration)
    console.log(result)
  })

program
  .command('remanage <id>')
  .description('remanage node by id of hostname')
  .action(async (id) => {
    const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
    const result = await solarwinds.nodes.remanage(node.id)
    console.log(result)
  })

program.parse(process.argv)

if (!program.args.length) program.help()
