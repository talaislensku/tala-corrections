import { Router } from 'express'
// import suggestions from './suggestions/route'
import corrections from './corrections/route'

const router = new Router()

// router.use('/suggestions', suggestions)
router.use('/corrections', corrections)

export default router
