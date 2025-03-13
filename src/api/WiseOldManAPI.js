import { WOMClient } from '@wise-old-man/utils'

const client = new WOMClient()

/**
 * https://docs.wiseoldman.net/
 */
class WiseOldManAPI {
  constructor() {
    this.clanId = 5474
    this.limit = 50
    this.offset = 0
    /**
     * @type {{username: string, displayName: string, accountType: string, uniqueObtained: number}[]}
     */
    this._data = []
  }

  /**
   * Fetches all clan members
   * @returns {Promise<string[]>} clan members
   */
  async getClanMembers() {
    try {
      const data = await client.groups.getGroupDetails(this.clanId)

      return data.memberships.map(({ player }) => player.username)
    } catch (error) {
      console.error(
        `No clan members found for ${this.clanId}, Error: ${error.message}`
      )
    }
  }

  /**
   * Sanitizes the data for the db
   * @param {import('@wise-old-man/utils').GroupHiscoresEntry[]} data
   */
  sanitizeData(data) {
    return data.map(({ player, data }) => {
      return {
        username: player.username,
        displayName: player.displayName,
        uniqueObtained: Number(data.score),
        accountType: player.type,
      }
    })
  }

  /**
   * Fetches the collection log data for the clan
   * @returns
   */
  async _fetchPaginatedClog({ limit = this.limit, offset = this.offset } = {}) {
    const data = await client.groups.getGroupHiscores(
      this.clanId,
      'collections_logged',
      {
        limit,
        offset,
      }
    )

    const sanitized = this.sanitizeData(data)
    this._data.push(...sanitized)

    // If the last uniqueObtained is not -1, fetch the next page
    if (sanitized.at(-1).uniqueObtained !== -1) {
      return this._fetchPaginatedClog({ limit, offset: offset + limit })
    }
  }

  /**
   * Fetches all the clan members collection log data
   *
   */
  async getClanClogs() {
    await this._fetchPaginatedClog()

    return this._data.filter((d) => d.uniqueObtained !== -1)
  }
}

export default new WiseOldManAPI()
