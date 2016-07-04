#!/usr/bin/env node

import program from 'commander'
import is from 'is_js'

import { print, error } from './utils'
import SolarWinds from './'

const solarwinds = new SolarWinds()

program
  .command('list')
  .alias('ls')
  .description('List all credentials')
  .action(async () => {
    try {
      const credentials = await solarwinds.credentials.query()
      print(credentials)
    } catch (err) {
      error(err)
      process.exit(1)
    }
  })

program
  .command('inspect <CREDENTIAL>')
  .description('Display detailed information about a credential')
  .action(async (id) => {
    try {
      const credential = is.number(id)
        ? await solarwinds.credentials.find(id)
        : await solarwinds.credentials.findByName(id)
      print(credential)
    } catch (err) {
      error(err)
      process.exit(1)
    }
  })

program.parse(process.argv)
