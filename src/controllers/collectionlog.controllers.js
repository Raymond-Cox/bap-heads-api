import CollLogAPI from '../api/CollLogAPI.js'
import WiseOldManAPI from '../api/WiseOldManAPI.js'

export const fetchUsersAndScores = async () => {
  // Fetch all clan members
  const members = await WiseOldManAPI.getClanMembers()

  // Get collection log data for all clan members
  const collLogAPI = new CollLogAPI(members)
  const results = await collLogAPI.fetchAllScores()

  return results
}
