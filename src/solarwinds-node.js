#!/usr/bin/env node

import program from 'commander'
import is from 'is_js'

import { print } from './utils'
import SolarWinds from './'

const solarwinds = new SolarWinds()

program
  .command('create')
  .description('Create a node')
  .option('--name <value>', 'Node name')
  .option('--ip <value>', 'IP address')
  .action(async (options) => {
    try {
      const { name, ip } = options
      const node = await solarwinds.nodes.create({
        name,
        ip,
      })
      print(node)
    } catch (err) {
      throw new Error(err)
    }
  })

program
  .command('list')
  .alias('ls')
  .description('List all available nodes')
  .action(async () => {
    try {
      const nodes = await solarwinds.nodes.query()
      print(nodes)
    } catch (err) {
      throw new Error(err)
    }
  })

program
  .command('inspect <NODE>')
  .description('Display detailed information about a node')
  .action(async (id) => {
    try {
      const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
      print(node)
    } catch (err) {
      throw new Error(err)
    }
  })

program
  .command('unmanage <NODE>')
  .description('Unmanage a node for a duration')
  .option('-d, --duration <value>', 'Duration, for example 15s, 30m, 3h or 1d')
  .action(async (id, options) => {
    const { duration } = options
    if (is.undefined(duration)) {
      throw new Error('Provide duration option')
    }

    try {
      const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
      const result = await solarwinds.nodes.unmanage(node.id, duration)
      print(result)
    } catch (err) {
      throw new Error(err)
    }
  })

program
  .command('remanage <NODE>')
  .description('Remanage node')
  .action(async (id) => {
    try {
      const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
      const result = await solarwinds.nodes.remanage(node.id)
      print(result)
    } catch (err) {
      throw new Error(err)
    }
  })

program
  .command('remove <NODE>')
  .alias('rm')
  .description('Remove node')
  .action(async (id) => {
    try {
      const node = isNaN(id) ? await solarwinds.nodes.findByName(id) : await solarwinds.nodes.find(id)
      await solarwinds.nodes.remove(node.id)
      print(node.id)
    } catch (err) {
      throw new Error(err)
    }
  })

program.parse(process.argv)
