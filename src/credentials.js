import Credential from './models/credential'

class Credentials {
  props = Credential.props.join()
  table = 'Orion.Credential'

  constructor(client) {
    this.client = client
  }

  async query() {
    const credentials = await this.client.query(`SELECT ${this.props} FROM ${this.table}`)

    return credentials.map(x => new Credential(x))
  }

  async find(id) {
    const credential = await this.client.read(`Orion/${this.table}/ID=${id}`)

    return new Credential(credential)
  }

  async findByName(name) {
    const response = await this.client.query(`
      SELECT TOP 1 ${this.props}
      FROM ${this.table}
      WHERE Name LIKE '%${name.toLowerCase()}%'
    `)

    return new Credential(response[0])
  }
}

export default Credentials
