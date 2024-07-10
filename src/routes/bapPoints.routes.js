import { Router } from 'express'
import { getPoints, updatePoints } from '../controllers/bapPoints.controller.js'

const router = Router()

router.get('/', async (_req, res) => {
  const results = await getPoints()

  res.json(results)
})

router.get('/:username', async (req, res) => {
  const results = await getPoints({ username: req.params.username })

  res.json(results)
})

router.post('/', async (req, res) => {
  const results = await updatePoints(req.body)

  res.json(results)
})

export default router
