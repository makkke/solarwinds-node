import VirtualMachine from './models/virtualMachine'

const props = VirtualMachine.props.join()

class VirtualMachines {
  constructor(client) {
    this.client = client
  }

  async query() {
    const vms = await this.client.query(`
      SELECT ${props}
      FROM Orion.VIM.VirtualMachines
      ORDER BY VirtualMachineID
    `)

    return vms.map(x => new VirtualMachine(x))
  }

  async find(id) {
    const res = await this.client.read(`Orion/Orion.VIM.VirtualMachines/VirtualMachineID=${id}`)

    return new VirtualMachine(res)
  }

  async findByName(name) {
    const res = await this.client.query(`
      SELECT TOP 1 ${props}
      FROM Orion.VIM.VirtualMachines
      WHERE name LIKE '%${name.toLowerCase()}%'
    `)

    return new VirtualMachine(res[0])
  }

}

export default VirtualMachines
