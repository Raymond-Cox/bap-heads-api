import User from '../models/User.model.js'

export const fetchUsersScores = async () => {
  return User.find({})
}
