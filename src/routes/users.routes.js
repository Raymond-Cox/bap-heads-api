import { Router } from 'express'
import { fetchUsers } from '../controllers/users.controllers.js'

const router = Router()

router.get('/', async (_req, res) => {
  const results = await fetchUsers()

  res.json(results)
})

export default router
