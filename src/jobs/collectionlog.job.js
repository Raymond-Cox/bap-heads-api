import CollLogAPI from '../api/CollLogAPI.js'
import WiseOldManAPI from '../api/WiseOldManAPI.js'

/**
 * Caches collection logs for all users
 */
export const cacheCollLogs = async () => {
  console.log('[CRON] Caching collection logs')
  try {
    const members = await WiseOldManAPI.getClanMembers()

    // I need to chunk the members array into smaller arrays of 10
    // to avoid hitting the API rate limit
    // Add a 5 second delay between each chunk to avoid rate limiting

    const chunkSize = 10
    const chunkedMembers = Array.from(
      { length: Math.ceil(members.length / chunkSize) },
      (_, index) => {
        const start = index * chunkSize
        return members.slice(start, start + chunkSize)
      }
    )

    const promises = chunkedMembers.map(async (chunk, index) => {
      if (index !== 0) {
        await new Promise((resolve) => setTimeout(resolve, 5000 * index))
      }

      const collLogAPI = new CollLogAPI(chunk)
      return collLogAPI.fetchAllScores()
    })

    const chunkedResults = await Promise.all(promises)

    // flatten the results array
    const results = chunkedResults.flat()

    console.log('[CRON] Collection logs cached')
    console.log(results)
  } catch (error) {
    console.error(`[CRON] Error caching collection logs: ${error.message}`)
  }
}
