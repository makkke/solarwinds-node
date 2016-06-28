import Client from './client'
import Nodes from './nodes'
import VirtualMachines from './virtualMachines'

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
    this.client = new Client(username, password, hostname, port)
    this.nodes = new Nodes(this.client)
    this.virtualMachines = new VirtualMachines(this.client)
  }
}

export default Landscape
