import is from 'is_js'

import Client from './client'
import NodeManager from './managers/nodeManager'
import VirtualMachines from './virtualMachines'
import ApplicationTemplates from './applicationTemplates'
import Credentials from './credentials'

/* eslint-disable */
if (!global._babelPolyfill) {
  require('babel-polyfill')
}
/* eslint-disable */

const SOLARWINDS_USERNAME = process.env.SOLARWINDS_USERNAME
const SOLARWINDS_PASSWORD = process.env.SOLARWINDS_PASSWORD
const SOLARWINDS_HOSTNAME = process.env.SOLARWINDS_HOSTNAME
const SOLARWINDS_PORT = process.env.SOLARWINDS_PORT || 17778

class Landscape {
  constructor(
    username = SOLARWINDS_USERNAME, password = SOLARWINDS_PASSWORD,
    hostname = SOLARWINDS_HOSTNAME, port = SOLARWINDS_PORT
  ) {
    if (is.undefined(username) || is.empty(username)) throw new Error('Provide username for SolarWinds or env variable SOLARWINDS_USERNAME')
    if (is.undefined(password) || is.empty(password)) throw new Error('Provide password for SolarWinds or env variable SOLARWINDS_PASSWORD')
    if (is.undefined(hostname) || is.empty(hostname)) throw new Error('Provide hostname of SolarWinds API or env variable SOLARWINDS_HOSTNAME')
    if (is.undefined(port) || is.empty(port)) throw new Error('Provide port of SolarWinds API or env variable SOLARWINDS_PORT')

    this.client = new Client(username, password, hostname, port)

    this.nodes = new NodeManager(this.client)
    this.virtualMachines = new VirtualMachines(this.client)
    this.applicationTemplates = new ApplicationTemplates(this.client)
    this.credentials = new Credentials(this.client)
  }
}

export default Landscape
