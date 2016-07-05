import VirtualMachine from './models/virtualMachine'

class VirtualMachines {
  props = VirtualMachine.props.join()
  table = 'Orion.VIM.VirtualMachines'

  constructor(client) {
    this.client = client
  }

  async query(filter) {
    let vms
    if (filter) {
      if (filter.hasOwnProperty('name')) {
        vms = await this.client.query(this.getQuery('name', filter.name.toLowerCase()))
      } else if (filter.hasOwnProperty('ip')) {
        vms = await this.client.query(this.getQuery('iPAddress', filter.ip))
      } else {
        vms = await this.client.query(this.getQuery('virtualMachineID', filter.id))
      }
    } else {
      vms = await this.client.query(`
        SELECT ${this.props}
        FROM ${this.table}
        ORDER BY virtualMachineID
        `)
    }

    return vms.map(x => new VirtualMachine(x))
  }


  async find(id) {
    const res = await this.client.read(`Orion/${this.table}/VirtualMachineID=${id}`)

    return new VirtualMachine(res)
  }

  async findByName(name) {
    const res = await this.client.query(`
      SELECT TOP 1 ${this.props}
      FROM ${this.table}
      WHERE name LIKE '%${name.toLowerCase()}%'
    `)

    return new VirtualMachine(res[0])
  }

  getQuery(key, value) {
    return `
      SELECT ${this.props}
      FROM ${this.table}
      WHERE ${key} LIKE '%${value}%'
      ORDER BY ${key}
      `
  }
}

export default VirtualMachines
