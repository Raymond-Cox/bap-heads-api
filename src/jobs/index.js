import cron from 'node-cron'
import { CRONS } from '../utils/times.js'
import { verify } from './verify.js'
import { cacheCollLogs } from './clogs.js'
import { snapshot } from './snapshot.js'

const { APP_ENV } = process.env

/**
 * Sets up all jobs
 */
export const setupCronJobs = () => {
  if (APP_ENV === 'prod') {
    // Add crons that are safe to run for prod only below
    cron.schedule(CRONS.daily, verify)
    cron.schedule(CRONS.hourly, cacheCollLogs)
    cron.schedule(CRONS.weekly, snapshot)
    console.log('Production crons scheduled')
  }

  // Add crons that are safe to run for dev & prod below
}
