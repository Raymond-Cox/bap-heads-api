import axios from 'axios'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'

dayjs.extend(isSameOrAfter)

class CollLogAPI {
  /**
   * Creates an instance of CollLogAPI.
   * @param {string[]} users usernames
   */
  constructor(users) {
    this.url = 'https://api.collectionlog.net'
    this.users = users
  }

  /**
   * Fetches log data by username.
   * @param {string} username
   * @returns {Promise<import('./api').Collection>}
   */
  async getLogByUsername(username) {
    try {
      const { data } = await axios.get(
        `${this.url}/collectionlog/user/${username}`
      )

      return data.collectionLog
    } catch (error) {
      console.error(
        `No collection log found for ${username}, Error: ${error.message}`
      )
    }
  }

  /**
   * Fetches 5 most recent items obtained by username.
   * @param {string} username
   * @returns {Promise<import('./api').Item[]>}
   */
  async getRecentObtains(username) {
    try {
      const { data } = await axios.get(`${this.url}/items/recent/${username}`)

      return data.items
    } catch (error) {
      console.error(
        `No recent items found for ${username}, Error: ${error.message}`
      )
    }
  }

  /**
   * Fetches all user's scores. Counts pets and sorts by total uniques obtained.
   * @returns {Promise<import('./api').BaseCollection[]>}
   */
  async fetchAllScores() {
    const promises = this.users.map(async (user) => this.getLogByUsername(user))

    const data = await Promise.all(promises)

    // Filter out any users that don't have a collection log setup
    const filteredData = data.filter(Boolean)

    // Add recent drops to each user
    const withRecentDrops = await Promise.all(
      filteredData.map(async (d) => {
        const recentDrops = await this.getRecentObtains(d.username)

        // Filter out any items that have a quantity greater than 1
        // and are older than 1 week.
        const recentUniques =
          recentDrops?.filter(({ quantity, obtainedAt }) => {
            const weekAgo = dayjs().subtract(7, 'day')
            return quantity === 1 && dayjs(obtainedAt).isSameOrAfter(weekAgo)
          }) || []

        return { ...d, recentDrops: recentUniques }
      })
    )

    // Add pet, drop count calcs to each user
    const withCalculations = withRecentDrops.map(
      ({
        username,
        uniqueItems,
        uniqueObtained,
        tabs,
        accountType,
        recentDrops,
      }) => ({
        username,
        uniqueItems,
        uniqueObtained,
        accountType,
        petCount: tabs.Other['All Pets'].items.filter(
          (petItem) => petItem.quantity > 0
        ).length,
        recentDropCount: recentDrops?.length || 0,
      })
    )

    // Sort by number of uniques obtained
    return withCalculations.sort((a, b) => b.uniqueObtained - a.uniqueObtained)
  }
}

export default CollLogAPI
