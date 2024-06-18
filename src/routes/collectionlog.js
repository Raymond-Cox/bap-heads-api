import { Router } from 'express'
import CollLogAPI from '../api/CollLogAPI.js'

const router = Router()

router.get('/', async (_req, res) => {
  // Make a request to the OSRS API
  const results = await CollLogAPI.fetchAllScores()

  res.json(results)
})

export default router
