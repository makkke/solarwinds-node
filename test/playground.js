import SolarWinds from '../src/solarwinds'

const solarwinds = new SolarWinds()

async function app() {
  try {
    const nodes = await solarwinds.nodes.query()
    console.log(nodes)
  } catch (err) {
    console.error(err)
  }
}

app()
