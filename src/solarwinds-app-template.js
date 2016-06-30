#!/usr/bin/env node

import program from 'commander'
import is from 'is_js'

import { print, error } from './utils'
import SolarWinds from './'

const solarwinds = new SolarWinds()

program
  .command('list')
  .alias('ls')
  .description('List all application templates')
  .action(async () => {
    try {
      const appTemplates = await solarwinds.applicationTemplates.query()
      print(appTemplates)
    } catch (err) {
      error(err)
      process.exit(1)
    }
  })

program
  .command('inspect <APPTEMPLATE>')
  .description('Display detailed information about an application template')
  .action(async (id) => {
    try {
      const appTemplate = isNaN(id)
        ? await solarwinds.applicationTemplates.findByName(id)
        : await solarwinds.applicationTemplates.find(id)
      print(appTemplate)
    } catch (err) {
      error(err)
      process.exit(1)
    }
  })

program.parse(process.argv)
