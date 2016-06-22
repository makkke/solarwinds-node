import request from 'request'

class Client {
  constructor(username, password) {
    this.request = request.defaults({
      baseUrl: 'https://swsam.surrey.ca:17778/SolarWinds/InformationService/V3/Json',
      headers: {
        'Content-Type': 'application/json',
      },
      auth: { username, password },
    })
  }

  query(q) {
    return new Promise((resolve, reject) => {
      this.request.get({
        url: '/query',
        qs: { query: q },
      }, (error, response, body) => {
        if (error) return reject(error)

        resolve(body.results)
      })
    })
  }
}

export default Client
