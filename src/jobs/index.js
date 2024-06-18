import cron from 'node-cron'
import { CRONS } from '../utils/times.js'
import { cacheCollLogs } from './collectionlog.job.js'

const { APP_ENV } = process.env

/**
 * Sets up all jobs
 */
export const setupCronJobs = () => {
  if (APP_ENV === 'prod') {
    // Add crons that are safe to run for prod only below
  }

  // Add crons that are safe to run for dev & prod below
  cron.schedule(CRONS.fiveMinutes, cacheCollLogs)
}
