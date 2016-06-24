import camelcaseKeys from 'camelcase-keys'

export function camelize(obj) {
  return camelcaseKeys(obj)
}
