import request from 'request'

class Client {
  constructor(username, password) {
    this.request = request.defaults({
      baseUrl: 'https://swsam.surrey.ca:17778/SolarWinds/InformationService/V3/Json',
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
        resolve(body.results)
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
