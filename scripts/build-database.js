/* eslint-disable no-console */
import readline from 'readline'
import fs from 'fs'
import Corrections from '../suggestions/corrections'

const corrections = new Corrections()
let count = 0

const rl = readline.createInterface({
  input: fs.createReadStream('./data/ordmyndalisti.txt'),
})

console.log('Building database...')

rl.on('line', (line) => {
  count++
  corrections.add(line)
})

rl.on('close', () => {
  console.log(`${count} words inserted`)
})
