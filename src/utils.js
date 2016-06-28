import camelcaseKeys from 'camelcase-keys'

export function camelize(obj) {
  return camelcaseKeys(obj)
}

export function prettify(json) {
  return JSON.stringify(json, null, 2)
}

export function print(json) {
  console.log(prettify(json))
}

export function error(e) {
  console.error('Error:', e)
}
