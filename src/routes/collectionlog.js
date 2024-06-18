import { Router } from 'express'
import { fetchUsersAndScores } from '../controllers/collectionlog.controllers.js'

const router = Router()

router.get('/', async (_req, res) => {
  const results = await fetchUsersAndScores()

  res.json(results)
})

export default router
