import readline from 'readline'
import fs from 'fs'
import { Router } from 'express'
import levenshtein from 'liblevenshtein'
import Corrections from '../../suggestions/corrections'

const router = new Router()
const MAX_EDIT_DISTANCE = 3

function buildDictionary(completionList) {
  // Assume "completionList" is a list of terms you want to match against in
  // fuzzy queries.
  const builder = new levenshtein.Builder()
    .dictionary(completionList)  // generate spelling candidates from unsorted completionList
    .algorithm('transposition')          // use Levenshtein distance extended with transposition
    // .sort_candidates(true)               // sort the spelling candidates before returning them
    // .case_insensitive_sort(true)         // ignore character-casing while sorting terms
    .include_distance(false)             // just return the ordered terms (drop the distances)
    .maximum_candidates(100)             // only want the top-10 candidates

  // Maximum number of spelling errors we will allow the spelling candidates to
  // have, with regard to the query term.
  return builder.build()
}

const completionList = []
let transducer

const rl = readline.createInterface({
  input: fs.createReadStream('./data/ordmyndalisti.txt'),
})

rl.on('line', (line) => {
  completionList.push(line)
})

rl.on('close', () => {
  transducer = buildDictionary(completionList)
})

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

router.get('/:word', (req, res) => {
  const { word } = req.params
  const { distance } = req.query

  if (distance && !isNumeric(distance)) {
    res.status(400).send({ error: 'distance must be a number' })
    return
  }

  const dist = distance ? Math.min(Number(distance), MAX_EDIT_DISTANCE) : 1
  const suggestions = transducer.transduce(word, dist)

  const corrector = new Corrections()
  suggestions.forEach(result => corrector.add(result))

  const corrections = corrector.correct(word)

  res.json({ corrections, suggestions })
})

export default router
