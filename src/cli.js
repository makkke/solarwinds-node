#!/usr/bin/env node

import program from 'commander'
import SolarWinds from './solarwinds'

const solarwinds = new SolarWinds()

program
  .version('0.0.1')
  .arguments('<command> [id]')
  .action(async (command, id) => {
    switch (command) {
      case 'nodes': {
        if (id) {
          const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
          console.log(node)
        } else {
          const nodes = await solarwinds.nodes.query()
          console.log(nodes)
        }
        break
      }

      case 'unmanage': {
        const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
        const result = await solarwinds.nodes.unmanage(node.id, '1m')
        console.log(result)
        break
      }

      case 'remanage': {
        const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
        const result = await solarwinds.nodes.remanage(node.id)
        console.log(result)
        break
      }

      default:
        console.log('help')
    }
  })

program.parse(process.argv)
