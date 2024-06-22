import WiseOldManAPI from '../api/WiseOldManAPI.js'
import User from '../models/User.model.js'
import { chunkedGetClogs } from '../utils/utils.js'

/**
 * Verifies members from WiseOldMan API are setup on collectionlog.net
 * Stores verified members in the database
 */
export const verify = async () => {
  console.log('[CRON] Verifying users')

  try {
    // Fetch all clan members
    const members = await WiseOldManAPI.getClanMembers()
    console.log(`[CRON] ${members.length} Members fetched`)

    // Collect users who already exist in the database
    const existingUsers = await User.find({ username: { $in: members } })
    console.log(
      `[CRON] ${existingUsers.length} Users already exist in the database`
    )

    // Remove the users that already exist in the database from members array
    const existingUsernames = existingUsers.map(({ username }) => username)
    const newMembers = members.filter(
      (member) => !existingUsernames.includes(member)
    )

    const verifiedUsers = await chunkedGetClogs(newMembers)

    // Set the lastCheckpointUniqueObtained to the current uniqueObtained
    const withCheckpoint = verifiedUsers.map((user) => ({
      ...user,
      lastCheckpointUniqueObtained: user.uniqueObtained,
    }))

    console.log(`[CRON] ${withCheckpoint.length} Users verified`)

    const results = await User.insertMany(withCheckpoint, { ordered: false })

    console.log(`[CRON] ${results.length} Users inserted`)
  } catch (error) {
    console.error(`[CRON] Error verifying users: ${error.message}`)
  }
}
