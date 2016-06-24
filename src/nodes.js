import moment from 'moment'
import parse from 'parse-duration'
import Node from './models/node'

const props = [
  'NodeId AS id', 'DisplayName', 'IP', 'SysName',
  'StatusDescription', 'UnManaged',
].join(', ')

class Nodes {
  constructor(client) {
    this.client = client
  }

  async query() {
    const nodes = await this.client.query(`SELECT ${props} FROM Orion.Nodes`)

    return nodes.map(x => new Node(x))
  }

  async find(id) {
    const res = await this.client.query(`
      SELECT TOP 1 ${props}
      FROM Orion.Nodes
      WHERE NodeId = ${id}
    `)

    return new Node(res[0])
  }

  async findByName(name) {
    const res = await this.client.query(`
      SELECT TOP 1 ${props}
      FROM Orion.Nodes
      WHERE SysName LIKE '%${name.toLowerCase()}%'
    `)

    return new Node(res[0])
  }

  async unmanage(id, duration) {
    const start = moment.utc()
    const end = moment.utc().add(parse(duration), 'ms')
    const format = 'MM-DD-YYYY HH:mm:ss A'
    const data = [`N:${id}`, start.format(format), end.format(format), 'false']

    await this.client.invoke('Orion.Nodes/Unmanage', data)

    return this.find(id)
  }

  async remanage(id) {
    const data = [`N:${id}`]
    await this.client.invoke('Orion.Nodes/Remanage', data)

    return this.find(id)
  }
}

export default Nodes
