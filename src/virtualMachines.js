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
        vms = await this.client.query(`
          SELECT ${this.props}
          FROM ${this.table}
          WHERE name LIKE '%${filter.name.toLowerCase()}%'
          ORDER BY name
          `)
      } else if (filter.hasOwnProperty('ip')) {
        vms = await this.client.query(`
          SELECT ${this.props}
          FROM ${this.table}
          WHERE iPAddress LIKE '%${filter.ip}%'
          ORDER BY iPAddress
          `)
      } else {
        vms = await this.client.query(`
          SELECT ${this.props}
          FROM ${this.table}
          WHERE virtualMachineID LIKE '%${filter.id}%'
          ORDER BY virtualMachineID
          `)
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

  async findByName(name) {
    const res = await this.client.query(`
      SELECT TOP 1 ${this.props}
      FROM ${this.table}
      WHERE name LIKE '%${name.toLowerCase()}%'
    `)

    return new VirtualMachine(res[0])
  }
}

export default VirtualMachines
