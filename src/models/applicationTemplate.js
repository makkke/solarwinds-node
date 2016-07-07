class ApplicationTemplate {
  // eslint-disable-next-line max-len
  static props = ['applicationTemplateID', 'name', 'isMockTemplate', 'created', 'lastModified', 'viewID', 'hasImportedView', 'customApplicationType', 'uniqueId', 'displayName', 'description', 'instanceType', 'uri']

  constructor(appTemplate) {
    Object.keys(appTemplate).forEach(key => {
      Object.assign(this, { [key]: appTemplate[key] })
    })

    this.id = appTemplate.applicationTemplateID
  }
}

export default ApplicationTemplate
