#!/usr/bin/env node

import program from 'commander'
import is from 'is_js'
import Table from 'easy-table'

import { print, error } from './utils'
import SolarWinds from './'

const solarwinds = new SolarWinds()

program
  .command('list')
  .alias('ls')
  .description('List all available vms')
  .action(async () => {
    try {
      const vms = await solarwinds.virtualMachines.query()
      const table = new Table()

      vms.forEach(vm => {
        table.cell('ID', vm.virtualMachineID)
        table.cell('NAME', vm.name)
        table.cell('IP', vm.iPAddress)
        table.cell('OS', vm.os())
        table.newRow()
      })

      console.log(table.toString())
    } catch (err) {
      error(err)
      process.exit(1)
    }
  })

program
  .command('inspect <VM>')
  .description('Display detailed information about a vm')
  .action(async (id) => {
    try {
      const vm = isNaN(id) ? await solarwinds.virtualMachines.findByName(id) : await solarwinds.virtualMachines.find(id)
      print(vm)
    } catch (err) {
      error(err)
      process.exit(1)
    }
  })

program.parse(process.argv)
