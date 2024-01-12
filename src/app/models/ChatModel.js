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
      enum: ['completion', 'image'],
      default: 'completion',
    },
    title: {
      type: String,
    },
  },
  { timestamps: true }
)

export default mongoose.models.chat || mongoose.model('chat', ChatSchema)
