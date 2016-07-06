#!/usr/bin/env node

import program from 'commander'
import is from 'is_js'
import Table from 'easy-table'

import { print, error, filterOptions } from './utils'
import SolarWinds from './'

const solarwinds = new SolarWinds()

program
  .command('create')
  .description('Create a node')
  .option('--name <value>', 'Node name')
  .option('--hostname <value>', 'Node host name for polling. Has to be resolvable by DNS')
  .option('--community [value]', 'Community string (default \'\')')
  .option('--ip <value>', 'IP address')
  .action(async (options) => {
    try {
      const node = await solarwinds.nodes.create(options)
      print(node)
    } catch (err) {
      error(err)
      process.exit(1)
    }
  })

program
  .command('list')
  .alias('ls')
  .option('--filter <value>', 'Filter output based on conditions provided')
  .description('List all available nodes')
  .action(async (options) => {
    try {
      const filter = filterOptions(options)
      const vms = await solarwinds.nodes.query(filter)

      const table = new Table()
      vms.forEach(vm => {
        table.cell('ID', vm.nodeID)
        table.cell('NAME', vm.name)
        table.cell('HOSTNAME', vm.dns)
        table.cell('IP', vm.iPAddress)
        table.newRow()
      })

      console.log(table.toString()) // eslint-disable-line
    } catch (err) {
      error(err)
      process.exit(1)
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
      error(err)
      process.exit(1)
    }
  })

program
  .command('unmanage <NODE>')
  .description('Unmanage a node for a duration')
  .option('--duration <value>', 'Duration, for example 15s, 30m, 3h or 1d')
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
      error(err)
      process.exit(1)
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
      error(err)
      process.exit(1)
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
      error(err)
      process.exit(1)
    }
  })

program.parse(process.argv)
