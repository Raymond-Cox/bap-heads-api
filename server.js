import express from 'express'
import collectionlogRouter from './src/routes/collectionlog.js'
import 'dotenv/config'
import { setupCronJobs } from './src/jobs/index.js'

const app = express()
const port = 3001

// Define the root route
app.get('/', (_req, res) => {
  res.send('Hello World!')
})

// Define the routers
app.use('/collectionlog', collectionlogRouter)

// Start the server
app.listen(port, () => {
  setupCronJobs()
  console.log(`Example app listening on port ${port}`)
})
