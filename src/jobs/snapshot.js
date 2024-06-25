import User from '../models/User.model.js'

/**
 * Updates the lastCheckpointUniqueObtained field for all users to the current uniqueObtained field
 */
export const snapshot = async () => {
  console.log('[CRON] Updating snapshots')

  try {
    const users = await User.find({}, undefined, {
      sort: { uniqueObtained: -1 },
    })

    const updates = users.map(async (user, index) => {
      const { uniqueObtained } = user

      return User.updateOne(
        { username: user.username },
        {
          lastCheckpointUniqueObtained: uniqueObtained,
          lastCheckpointRankIndex: index,
        }
      )
    })

    await Promise.all(updates)

    const updateCount = updates.filter(
      ({ modifiedCount }) => modifiedCount
    ).length

    console.log(`[CRON] Updated ${updateCount} snapshots`)
  } catch (error) {
    console.error(`[CRON] Error updating snapshots: ${error.message}`)
  }
}
