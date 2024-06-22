import axios from 'axios'

/**
 * https://docs.collectionlog.net/#documentationgetting_started
 */
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
   * @returns {Promise<import('./api').Collection | undefined>}
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
   * @returns {Promise<import('./api').UsersRecentDrops | undefined>}
   */
  async getRecentObtains(username) {
    try {
      const { data } = await axios.get(`${this.url}/items/recent/${username}`)

      return data
    } catch (error) {
      console.error(
        `No recent items found for ${username}, Error: ${error.message}`
      )
    }
  }

  /**
   * Fetches last 5 items obtained for all users.
   * @returns {Promise<import('./api').UsersRecentDrops[] | undefined>}
   */
  async getRecentObtainsForAllUsers() {
    const promises = this.users.map(async (user) => this.getRecentObtains(user))

    return Promise.all(promises)
  }

  /**
   *
   * @returns {Promise<import('./api').Collection[]>}
   */
  async getLogsForAllUsers() {
    const promises = this.users.map(async (user) => this.getLogByUsername(user))

    return Promise.all(promises)
  }

  /**
   * Fetches all user's scores. Counts pets and sorts by total uniques obtained.
   * @returns {Promise<import('./api').BaseCollection[]>}
   */
  async fetchAllScores() {
    const data = await this.getLogsForAllUsers()

    // Filter out any users that don't have a collection log setup
    // Safety check, should never happen
    const filteredData = data.filter(Boolean)

    // Add pet, drop count calcs to each user
    const withCalculations = filteredData.map(
      ({ username, uniqueItems, uniqueObtained, tabs, accountType }) => ({
        username: username.toLowerCase(),
        displayName: username,
        uniqueItems,
        uniqueObtained,
        accountType,
        petCount: tabs.Other['All Pets'].items.filter(
          (petItem) => petItem.quantity > 0
        ).length,
      })
    )

    // Sort by number of uniques obtained
    return withCalculations.sort((a, b) => b.uniqueObtained - a.uniqueObtained)
  }
}

export default CollLogAPI
