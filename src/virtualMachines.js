import VirtualMachine from './models/virtualMachine'


class VirtualMachines {
  props = VirtualMachine.props.join()
  table = 'Orion.VIM.VirtualMachines'

  constructor(client) {
    this.client = client
  }

  async query() {
    const vms = await this.client.query(`
      SELECT ${this.props}
      FROM ${this.table}
      ORDER BY VirtualMachineID
    `)

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

}

export default VirtualMachines
