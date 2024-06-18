import { Router } from 'express'
import CollLogAPI from '../api/CollLogAPI.js'
import WiseOldManAPI from '../api/WiseOldManAPI.js'

const router = Router()

router.get('/', async (_req, res) => {
  // Fetch all clan members
  const members = await WiseOldManAPI.getClanMembers()

  // Get collection log data for all clan members
  const collLogAPI = new CollLogAPI(members)
  const results = await collLogAPI.fetchAllScores()

  res.json(results)
})

export default router
