import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  displayName: {
    type: String,
    required: false,
    trim: true,
  },
  accountType: {
    type: String,
    required: false,
    default: 'regular',
  },
  uniqueObtained: {
    type: Number,
    default: 0,
  },
  lastCheckpointUniqueObtained: {
    type: Number,
    default: 0,
  },
  lastCheckpointRankIndex: {
    type: Number,
    default: 0,
  },
})

const User = mongoose.model('User', userSchema)

export default User
