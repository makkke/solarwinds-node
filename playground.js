import SolarWinds from '../src/solarwinds'

const solarwinds = new SolarWinds()

async function app() {
  try {
    // const nodes = await solarwinds.nodes.query()
    // const nodes = await solarwinds.nodes.unmanage(403, '1h')
    // const nodes = await solarwinds.nodes.remanage(403)
    const node = await solarwinds.nodes.findByName('devdocker03')
    // node.unmanage(1)
    console.log(node)
  } catch (err) {
    console.error(err)
  }
}

app()
