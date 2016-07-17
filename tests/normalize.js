import test from 'ava'
import { normalize } from '../suggestions/corrections'

const replacements = {
  'á': 'a',
  'f': 'v',
  'æ': 'ae',
  'þ': 'th',
}

test('Should replace a single occurance of a single letter', assert => {
  assert.deepEqual(normalize('ár', replacements), 'ar')
})

test('Should replace a multiple occurances of a single letter', assert => {
  assert.deepEqual(normalize('álfur', replacements), 'alvur')
})
