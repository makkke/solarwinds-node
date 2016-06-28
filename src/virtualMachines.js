import VirtualMachine from './models/virtualMachine'

const props = [
  'VirtualMachineID AS id', 'Name', 'IPAddress', 'NodeID',
  'StatusDescription',
].join(', ')

class VirtualMachines {
  constructor(client) {
    this.client = client
  }

  async query() {
    const vms = await this.client.query(`SELECT ${props} FROM Orion.VIM.VirtualMachines`)

    return vms.map(x => new VirtualMachine(x))
  }
}

export default VirtualMachines
