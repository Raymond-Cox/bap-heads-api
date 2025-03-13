import WiseOldManAPI from '../api/WiseOldManAPI.js'
import User from '../models/User.model.js'

/**
 * Caches collection logs for all users with 500+ unique items
 */
export const cacheCollLogs = async () => {
  console.log('[CRON] Caching collection logs')
  try {
    const clogData = await WiseOldManAPI.getClanClogs()

    console.log('[CRON] Collection logs cached')
    console.log(clogData)

    const updates = clogData.map(({ username, ...rest }) => {
      return User.findOneAndUpdate({ username }, { ...rest }, { upsert: true })
    })

    const updateResults = await Promise.all(updates)

    console.log(`[CRON] Updated ${updateResults.length} users`)
  } catch (error) {
    console.error(`[CRON] Error caching collection logs: ${error.message}`)
  }
}
