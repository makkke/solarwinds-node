import Client from './client'
import Nodes from './nodes'

/* eslint-disable */
if (!global._babelPolyfill) {
  require('babel-polyfill')
}
/* eslint-disable */

const SOLARWINDS_USERNAME = process.env.SOLARWINDS_USERNAME
const SOLARWINDS_PASSWORD = process.env.SOLARWINDS_PASSWORD
const SOLARWINDS_URL = process.env.SOLARWINDS_URL

class Landscape {
  constructor(username = SOLARWINDS_USERNAME, password = SOLARWINDS_PASSWORD, url = SOLARWINDS_URL) {
    this.client = new Client(username, password, url)
    this.nodes = new Nodes(this.client)
  }
}

export default Landscape
