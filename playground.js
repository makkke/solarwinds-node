import SolarWinds from './src/solarwinds'

const solarwinds = new SolarWinds()

async function app() {
  try {
    // const vms = await solarwinds.virtualMachines.query()
    // const node = await solarwinds.nodes.create({
    //   name: 'DevDocker03',
    //   ip: '10.0.8.162',
    // })
    // await solarwinds.nodes.remove(403)
    const nodes = await solarwinds.nodes.query()
    // const nodes = await solarwinds.nodes.remanage(403)
    // const node = await solarwinds.nodes.find(403)
    // node.unmanage(1)
    console.log(nodes)
  } catch (err) {
    console.error(err)
  }
}

app()
