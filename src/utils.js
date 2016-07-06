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

export function filterOptions(options) {
  if (options.filter) {
    const [key, value] = options.filter.split('=')
    return { [key]: value }
  }
}
