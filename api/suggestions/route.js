import { Router } from 'express'
import suggest from '../../suggestions/suggestions'

const router = new Router()
const MAX_EDIT_DISTANCE = 3

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

  const dist = distance ? Math.min(Number(distance), MAX_EDIT_DISTANCE) : 2
  const suggestions = suggest(word, dist)

  res.json({ suggestions })
})

export default router
