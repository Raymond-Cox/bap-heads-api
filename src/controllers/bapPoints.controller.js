import User from '../models/User.model.js'

/**
 * Updates the BAP points of a user
 * @param {{username: string, points: number}} param0 - The user's username and points
 */
export const updatePoints = async ({ username, points }) => {
  return User.updateOne({ username }, { bapPoints: points })
}
