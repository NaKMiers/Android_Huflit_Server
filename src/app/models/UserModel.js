import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: [true, 'Please provide an email'],
      unique: [true, 'Email already exists'],
      trim: [true, 'Email cannot be empty'],
    },
    username: {
      type: String,
      require: [true, 'Please provide a username'],
      unique: [true, 'Username already exists'],
    },
    password: {
      type: String,
    },
    authType: {
      type: String,
      enum: ['local', 'google', 'facebook'],
      default: 'local',
    },
    avatar: {
      type: String,
      default: '/images/default-avatar.jpg',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    job: {
      type: String,
    },
    address: {
      type: String,
    },
    theme: {
      type: Number,
      default: 0,
    },
    model: {
      type: String,
      default: 'text-davinci-003',
    },
    maxTokens: {
      type: Number,
      default: 100,
    },
    temperature: {
      type: Number,
      default: 0.5,
    },
    size: {
      type: String,
      default: '256x256',
    },
    amount: {
      type: Number,
      default: 1,
    },
    mode: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
)

export default mongoose.models.user || mongoose.model('user', UserSchema)
