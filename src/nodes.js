import moment from 'moment'
import parse from 'parse-duration'
import Node from './models/node'

class Nodes {
  props = Node.props.join()

  constructor(client) {
    this.client = client
  }

  async query(filter) {
    let nodes
    if (filter) {
      if (filter.hasOwnProperty('name')) {
        nodes = await this.client.query(this.getQuery('sysName', filter.name.toLowerCase()))
      } else if (filter.hasOwnProperty('ip')) {
        nodes = await this.client.query(this.getQuery('iPAddress', filter.ip))
      } else if (filter.hasOwnProperty('hostname')) {
        nodes = await this.client.query(this.getQuery('dns', filter.hostname))
      } else {
        nodes = await this.client.query(this.getQuery('nodeID', filter.id))
      }
    } else {
      nodes = await this.client.query(`
        SELECT ${this.props}
        FROM Orion.Nodes
        `)
    }

    return nodes.map(x => new Node(x))
  }

  async find(id) {
    const res = await this.client.read(`Orion/Orion.Nodes/NodeID=${id}`)

    return new Node(res)
  }

  async findByName(name) {
    const props = Node.props.join()
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
      EngineID: 1,

      // candidates for exposing as options
      DynamicIP: false,
      ObjectSubType: 'SNMP',
      SNMPVersion: 2,
      // SNMPPort: 161, // agentPort?
      Allow64BitCounters: true,
      PollInterval: 300,
      RediscoveryInterval: 30,
      StatCollection: 15,
      External: false,

      Caption: node.name, // same as DisplayName, NodeName
      SysName: node.name,

      DNS: node.hostname,

      Community: node.community,

      IPAddress: node.ip,
    }

    await this.client.create('Orion.Nodes', data)

    return node.name
  }

  remove(id) {
    return this.client.delete(`Orion/Orion.Nodes/NodeID=${id}`)
  }

  getQuery(key, value) {
    return `
      SELECT ${this.props}
      FROM Orion.Nodes
      WHERE ${key} LIKE '%${value}%'
      ORDER BY ${key}
      `
  }
}

export default Nodes
