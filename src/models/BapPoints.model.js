import mongoose from 'mongoose'

const bapPointsSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
  },
  total: {
    type: Number,
    default: 0,
    required: true,
  },
  skilling: {
    type: Number,
    default: 0,
    required: true,
  },
  minigamesClues: {
    type: Number,
    default: 0,
    required: true,
  },
  pvm: {
    type: Number,
    default: 0,
    required: true,
  },
})

const BapPoints = mongoose.model('BapPoints', bapPointsSchema)

export default BapPoints
