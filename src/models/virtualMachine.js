class VirtualMachine {
  constructor(vm) {
    Object.keys(vm).forEach(key => {
      Object.assign(this, { [key]: vm[key] })
    })
  }
}

export default VirtualMachine
