import Client from './client'
import Nodes from './nodes'

if (!global._babelPolyfill) {
  require('babel-polyfill')
}

const SOLARWINDS_USERNAME = process.env.SOLARWINDS_USERNAME
const SOLARWINDS_PASSWORD = process.env.SOLARWINDS_PASSWORD

class Landscape {
  constructor(username = SOLARWINDS_USERNAME, password = SOLARWINDS_PASSWORD) {
    this.client = new Client(username, password)
    this.nodes = new Nodes(this.client)
  }
}

export default Landscape
