import { Router } from 'express'
import { updatePoints } from '../controllers/bapPoints.controller.js'

const router = Router()

router.get('/', (_req, res) => {
  res.send('Hello from the BAP Points route!')
})

router.post('/', async (req, res) => {
  const results = await updatePoints(req.body)

  res.json(results)
})

export default router
