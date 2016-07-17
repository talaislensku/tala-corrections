import test from 'ava'
import Corrections from '../suggestions/corrections'
import db from 'memdown'

const replacements = {
  'á': 'a',
  'f': 'v',
  'æ': 'ae',
  'þ': 'th',
}

test('Should suggest corrections for single letters', async assert => {
  const corrections = new Corrections(replacements, db)
  await corrections.add('álfur')

  // One letter wrong
  assert.deepEqual(await corrections.correct('alfur'), ['álfur'])
  assert.deepEqual(await corrections.correct('álvur'), ['álfur'])

  // Two letters wrong
  assert.deepEqual(await corrections.correct('alvur'), ['álfur'])
})

test('Should suggest corrections for double letters', async assert => {
  const corrections = new Corrections(replacements, db)
  await corrections.add('frábært')

  // One letter wrong
  assert.deepEqual(await corrections.correct('frabært'), ['frábært'])
  assert.deepEqual(await corrections.correct('frábaert'), ['frábært'])

  // Two letters wrong
  assert.deepEqual(await corrections.correct('frabaert'), ['frábært'])
})

test('Should support multiple corrections for the same letter', async assert => {
  const corrections = new Corrections(replacements, db)
  await corrections.add('alþingi')

  // One letter wrong
  // assert.deepEqual(await corrections.correct('alpingi'), ['alþingi'])
  assert.deepEqual(await corrections.correct('althingi'), ['alþingi'])
})
