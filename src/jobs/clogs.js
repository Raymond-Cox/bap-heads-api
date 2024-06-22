import User from '../models/User.model.js'
import { chunkedGetClogs } from '../utils/utils.js'

/**
 * Caches collection logs for all verified users
 */
export const cacheCollLogs = async () => {
  console.log('[CRON] Caching collection logs')
  try {
    const members = await User.find({}, ['username'], { limit: 10 })
    const memberNames = members.map(({ username }) => username)

    const results = await chunkedGetClogs(memberNames)

    console.log('[CRON] Collection logs cached')
    console.log(results)

    const updates = results.map(({ username, ...rest }) => {
      return User.updateOne({ username }, { ...rest })
    })

    const updateResults = await Promise.all(updates)

    const updateCount = updateResults.filter(
      ({ modifiedCount }) => modifiedCount
    ).length

    console.log(`[CRON] Updated ${updateCount} users`)
  } catch (error) {
    console.error(`[CRON] Error caching collection logs: ${error.message}`)
  }
}
