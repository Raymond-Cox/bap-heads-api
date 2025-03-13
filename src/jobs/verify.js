import WiseOldManAPI from '../api/WiseOldManAPI.js'
import User from '../models/User.model.js'

/**
 * Deletes users that are not in the clan anymore
 */
export const verify = async () => {
  console.log('[CRON] Verifying users')

  try {
    // Fetch all clan members
    const members = await WiseOldManAPI.getClanMembers()
    console.log(`[CRON] ${members.length} Members fetched`)

    // Delete users that are not in the clan anymore
    const { deletedCount } = await User.deleteMany({
      username: { $nin: members },
    })
    console.log(`[CRON] ${deletedCount} Members deleted from the database`)
  } catch (error) {
    console.error(`[CRON] Error verifying users: ${error.message}`)
  }
}
