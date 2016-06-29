import request from 'request'
import is from 'is_js'

import { camelize } from './utils'

class Client {
  constructor(username, password, hostname, port) {
    this.shortUrl = `https://${hostname}:${port}/SolarWinds/InformationService/V3/Json`
    this.longUrl = `${this.shortUrl}/swis://${hostname}`
    this.request = request.defaults({
      auth: { username, password },
      json: true,
      strictSSL: false,
    })

    this.checkCredentials()
  }

  checkCredentials() {
    this.request.get({
      url: `${this.shortUrl}/Query`,
      qs: { query: 'SELECT NodeID FROM Orion.Nodes' },
    }, (error, response, body) => {
      if (error || is.undefined(body)) throw new Error('Invalid SolarWinds username or password')
    })
  }

  query(q) {
    return new Promise((resolve, reject) => {
      this.request.get({
        url: `${this.shortUrl}/Query`,
        qs: { query: q },
      }, (error, response, body) => {
        if (error) return reject(error)
        if (is.undefined(body)) return reject(new Error('Invalid response from SolarWinds API'))

        resolve(body.results.map(x => camelize(x)))
      })
    })
  }

  invoke(route, data) {
    return new Promise((resolve, reject) => {
      this.request.post({
        url: `${this.shortUrl}/Invoke/${route}`,
        body: data,
      }, (error, response, body) => {
        if (error) return reject(error)

        resolve(body)
      })
    })
  }

  create(route, data) {
    return new Promise((resolve, reject) => {
      this.request.post({
        url: `${this.shortUrl}/Create/${route}`,
        body: data,
      }, (error, response, body) => {
        if (error) return reject(error)
        resolve(body)
      })
    })
  }

  read(route) {
    return new Promise((resolve, reject) => {
      this.request.get(`${this.longUrl}/${route}`, (error, response, body) => {
        if (error) return reject(error)
        resolve(camelize(body))
      })
    })
  }

  delete(route) {
    return new Promise((resolve, reject) => {
      this.request.delete(`${this.longUrl}/${route}`, (error, response, body) => {
        if (error) return reject(error)
        resolve(body)
      })
    })
  }
}

export default Client
