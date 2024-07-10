import BapPoints from '../models/BapPoints.model.js'

/**
 * Fetches users BAP points, sorted by total
 */
export const getPoints = async (params = {}) => {
  return BapPoints.find(params, undefined, { sort: { total: -1 } })
}
/**
 * Updates the BAP points of a user
 * @param {{username: string, total: number, skilling: number, minigamesClues: number, pvm: number}} param0 - The user's username and points
 */
export const updatePoints = async ({
  username,
  total,
  skilling,
  minigamesClues,
  pvm,
}) => {
  console.log({ username, total, skilling, minigamesClues, pvm })
  return BapPoints.findOneAndUpdate(
    { username },
    { username, displayName: username, total, skilling, minigamesClues, pvm },
    { upsert: true, new: true }
  )
}
