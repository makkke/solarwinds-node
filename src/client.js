import request from 'request'
import { camelize } from './utils'

class Client {
  constructor(username, password) {
    this.request = request.defaults({
      baseUrl: process.env.SOLARWINDS_URL || 'https://swsam.surrey.ca:17778/SolarWinds/InformationService/V3/Json',
      auth: { username, password },
      json: true,
      strictSSL: false,
    })
  }

  query(q) {
    return new Promise((resolve, reject) => {
      this.request.get({
        url: '/Query',
        qs: { query: q },
      }, (error, response, body) => {
        if (error) return reject(error)
        resolve(body.results.map(x => camelize(x)))
      })
    })
  }

  invoke(url, data) {
    return new Promise((resolve, reject) => {
      this.request.post({
        url: `/Invoke/${url}`,
        body: data,
      }, (error, response, body) => {
        if (error) return reject(error)
        resolve(body)
      })
    })
  }
}

export default Client
