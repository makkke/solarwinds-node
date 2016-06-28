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
    const res = await this.client.read(`Orion/Orion.Nodes/NodeID=${id}`)

    return new Node(res)
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

  async create(node) {
    const data = {
      EntityType: 'Orion.Nodes',
      IPAddress: node.ip,
      EngineID: 1,
      DynamicIP: false,
      ObjectSubType: 'SNMP',
      SNMPVersion: 2,
      SNMPPort: 161,
      Caption: node.name,
      Allow64BitCounters: true,

      SysName: node.name,

      // PollInterval: 120,
      // RediscoveryInterval: 30,
      // StatCollection: 10,
    }

    await this.client.create('Orion.Nodes', data)

    return this.findByName(node.name)
  }

  remove(id) {
    return this.client.delete(`Orion/Orion.Nodes/NodeID=${id}`)
  }
}

export default Nodes
