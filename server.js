import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import collectionlogRouter from './src/routes/collectionlog.js'
import { setupCronJobs } from './src/jobs/index.js'

const { MONGO_URL } = process.env
const app = express()
const port = 3001

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Define the root route
app.get('/', (_req, res) => {
  res.send('Hello World!')
})

// Define the routers
app.use('/collectionlog', collectionlogRouter)

// Start the server
app.listen(port, run)

/**
 * Connects to the MongoDB database and starts the cron jobs
 */
async function run() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to MongoDB')

    setupCronJobs()
    console.log(`Example app listening on port ${port}`)
  } catch (error) {
    console.error('Error connecting to MongoDB', error)
  }
}
