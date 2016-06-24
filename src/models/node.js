class Node {
  constructor(node) {
    Object.keys(node).forEach(key => {
      Object.assign(this, { [key]: node[key] })
    })
  }
}

export default Node
