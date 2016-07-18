import { Router } from 'express'
import Corrections from '../../suggestions/corrections'

const router = new Router()
const corrections = new Corrections()

router.get('/:word', (req, res, next) => {
  corrections.correct(req.params.word)
    .then(results => res.json(results), next)
})

export default router
