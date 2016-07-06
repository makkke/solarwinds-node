#!/usr/bin/env node

import program from 'commander'
import Table from 'easy-table'
import is from 'is_js'

import { print, error, parseFilter } from './utils'
import SolarWinds from './'

const solarwinds = new SolarWinds()

program
  .command('list')
  .alias('ls')
  .option('--filter <value>', 'Filter output based on conditions provided')
  .description('List all available virtual machines')
  .action(async (options) => {
    try {
      const filter = parseFilter(options.filter)
      const vms = await solarwinds.virtualMachines.query(filter)

      const table = new Table()
      vms.forEach(vm => {
        table.cell('ID', vm.virtualMachineID)
        table.cell('NAME', vm.name)
        table.cell('IP', vm.iPAddress)
        table.cell('OS', vm.os())
        table.newRow()
      })

      console.log(table.toString()) // eslint-disable-line
    } catch (err) {
      error(err)
      process.exit(1)
    }
  })

program
  .command('inspect <VM>')
  .description('Display detailed information about a virtual machine')
  .action(async (id) => {
    try {
      const vm = is.number(id)
        ? await solarwinds.virtualMachines.find(id)
        : await solarwinds.virtualMachines.findByName(id)
      print(vm)
    } catch (err) {
      error(err)
      process.exit(1)
    }
  })

program.parse(process.argv)
