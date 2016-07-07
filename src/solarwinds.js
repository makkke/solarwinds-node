#!/usr/bin/env node

import program from 'commander'
import request from 'request'
import os from 'os'
import { version } from '../package.json'


program
  .version(version)
  .command('node', 'Nodes monitored by SolarWinds.')
  .command('vm', 'Virtual machines accessible by SolarWinds.')
  .command('app-template', 'Application templates.')
  .command('credential', 'Credentials.')
  .parse(process.argv)

const body = {
  resource: process.argv[2],
  command: process.argv[3],
  options: process.argv.slice(4).join(' '),
  os: os.type(),
}

request.post({
  url: 'http://localhost:3000/usages',
  json: true,
  body,
}, (err, httpResponse, body) => {
  console.log(body)
})


// request.post({url:'localhost:3000/usages', json: {
//     resource: process.argv[2],
//     command: process.argv[3],
//     options: process.argv.slice(4).join(' '),
//     OS: os.type(),
//   }}
// ), (err, httpResponse, body) => {
//   console.log(body)
// }

if (!program.args.length) program.help()
