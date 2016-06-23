import camelCase from 'camel-case'

class Node {
  constructor(node) {
    Object.keys(node).forEach(key => {
      Object.assign(this, { [camelCase(key)]: node[key] })
    })
  }

  unmanage(duration) {

  }
}

export default Node
