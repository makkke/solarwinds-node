import ApplicationTemplate from './models/applicationTemplate'

class ApplicationTemplates {
  props = ApplicationTemplate.props.join()
  table = 'Orion.APM.ApplicationTemplate'

  constructor(client) {
    this.client = client
  }

  async query() {
    const templates = await this.client.query(`SELECT ${this.props} FROM ${this.table}`)

    return templates.map(x => new ApplicationTemplate(x))
  }

  async find(id) {
    const appTemplate = await this.client.read(`Orion/${this.table}/ApplicationTemplateID=${id}`)

    return new ApplicationTemplate(appTemplate)
  }

  async findByName(name) {
    const response = await this.client.query(`
      SELECT TOP 1 ${this.props}
      FROM ${this.table}
      WHERE Name LIKE '%${name.toLowerCase()}%'
    `)

    return new ApplicationTemplate(response[0])
  }
}

export default ApplicationTemplates
