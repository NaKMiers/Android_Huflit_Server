import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ChatSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      require: [true, 'Please provide an user id'],
    },
    type: {
      type: String,
      enum: ['chat', 'image'],
      default: 'chat',
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.models.box || mongoose.model('box', ChatSchema)
