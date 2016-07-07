import camelcaseKeys from 'camelcase-keys'

export function camelize(obj) {
  return camelcaseKeys(obj)
}

export function prettify(json) {
  return JSON.stringify(json, null, 2)
}

export function print(json) {
  console.log(prettify(json)) //eslint-disable-line
}

export function error(e) {
  console.error('Error:', e) //eslint-disable-line
}

export function parseFilter(filter = '') {
  const [key, value] = filter.split('=')
  if (!key || !value) return {}

  return { [key]: value }
}
