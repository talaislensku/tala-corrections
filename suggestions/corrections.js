import { replacements } from './replacements'
import level from 'levelup'
import AsyncDb from './async-db'

export function normalize(str, reps) {
  return Object.keys(reps).reduce((curr, key) =>
    curr.replace(key, reps[key]), str)
}

class Corrections {
  constructor(reps = replacements, db) {
    this.replacements = reps
    this.db = new AsyncDb(level('./db', {
      valueEncoding: 'json',
      db,
    }))
  }

  async add(word) {
    const normalized = normalize(word, this.replacements)
    const corrections = await this.db.get(normalized) || []
    return this.db.put(normalized, [...corrections, word])
  }

  async correct(word) {
    return await this.db.get(normalize(word, this.replacements)) || []
  }
}

export default Corrections
