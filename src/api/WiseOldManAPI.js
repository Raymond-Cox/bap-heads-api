import axios from 'axios'

/**
 * https://docs.wiseoldman.net/
 */
class WiseOldManAPI {
  constructor() {
    this.url = 'https://api.wiseoldman.net/v2'
    this.clanId = 5474
  }

  /**
   * Fetches all clan members.
   * @returns {Promise<string[]>} clan members
   */
  async getClanMembers() {
    try {
      const { data } = await axios.get(`${this.url}/groups/${this.clanId}`)

      return data.memberships.map(({ player }) => player.username)
    } catch (error) {
      console.error(
        `No clan members found for ${this.clanId}, Error: ${error.message}`
      )
    }
  }
}

export default new WiseOldManAPI()
