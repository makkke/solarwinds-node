class Nodes {
  constructor(client) {
    this.client = client
  }

  async query() {
    return this.client.query('SELECT TOP 5 DisplayName, DetailsUrl FROM Orion.Nodes')
  }
}

export default Nodes
