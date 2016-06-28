class Node {
  constructor(node) {
    Object.keys(node).forEach(key => {
      Object.assign(this, { [key]: node[key] })
    })

    this.id = node.nodeID
  }
}

export default Node
