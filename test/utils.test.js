import test from 'ava'
import * as utils from '../src/utils'

test('camelize() should convert properties to camelcase', t => {
  const ugly = {
    Name: 'Lurtz',
    Description: 'Angry Uruk-hai',
  }

  const pretty = utils.camelize(ugly)

  t.truthy(pretty.hasOwnProperty('name'))
  t.truthy(pretty.hasOwnProperty('description'))

  t.is(pretty.name, ugly.Name)
  t.is(pretty.description, ugly.Description)
})
