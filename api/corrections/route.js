// import readline from 'readline'
// import fs from 'fs'
import { Router } from 'express'
import Corrections from '../../suggestions/corrections'

const router = new Router()
const corrections = new Corrections()

// const rl = readline.createInterface({
//   input: fs.createReadStream('./data/ordmyndalisti.txt'),
// })
//
// rl.on('line', (line) => {
//   corrections.add(line)
// })
//
// rl.on('close', () => {
//   console.log('done')
// })

router.get('/:word', (req, res, next) => {
  corrections.correct(req.params.word)
    .then(results => res.json(results), next)
})

export default router
