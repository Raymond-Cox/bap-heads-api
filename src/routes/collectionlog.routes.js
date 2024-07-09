import { Router } from 'express'
import { fetchUsersScores } from '../controllers/collectionlog.controllers.js'

const router = Router()

router.get('/', async (_req, res) => {
  const results = await fetchUsersScores()

  res.json(results)
})

export default router
