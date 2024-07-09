import User from '../models/User.model.js'

/**
 * Fetches all users, sorted by username
 */
export const fetchUsers = async () => {
  return User.find({}, undefined, { sort: { username: 1 } })
}
