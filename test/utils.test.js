import test from 'ava'
import is from 'is_js'

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

test('parseFilter() should parse filter options into property', t => {
  const filter = 'name=Lurtz'
  const parsedFilter = utils.parseFilter(filter)

  t.truthy(parsedFilter.hasOwnProperty('name'))
  t.is(parsedFilter.name, 'Lurtz')
})

test('parseFilter() should return an empty object if filter is not parsable', t => {
  const filter = 'nameIsLurtz'
  t.truthy(is.empty(utils.parseFilter(filter)))
})

test('parseFilter() should return an empty object if filter is empty', t => {
  t.truthy(is.empty(utils.parseFilter('')))
  t.truthy(is.empty(utils.parseFilter()))
})
