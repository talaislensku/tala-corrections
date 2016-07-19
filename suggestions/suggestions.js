import readline from 'readline'
import fs from 'fs'
import levenshtein from 'liblevenshtein'

function buildDictionary(completionList) {
  // Assume "completionList" is a list of terms you want to match against in
  // fuzzy queries.
  const builder = new levenshtein.Builder()
    .dictionary(completionList)  // generate spelling candidates from unsorted completionList
    .algorithm('transposition')          // use Levenshtein distance extended with transposition
    // .sort_candidates(true)               // sort the spelling candidates before returning them
    // .case_insensitive_sort(true)         // ignore character-casing while sorting terms
    .include_distance(false)             // just return the ordered terms (drop the distances)
    .maximum_candidates(100)             // limit results to 100 candidates

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

export default function suggest(word, distance) {
  return transducer.transduce(word, distance)
}
