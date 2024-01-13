import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PromptSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      require: [true, 'Please provide an user id'],
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'box',
      require: [true, 'Please provide a chat id'],
    },
    type: {
      type: String,
      enum: ['chat', 'image'],
      default: 'chat',
    },
    from: {
      type: String,
      enum: ['user', 'ai'],
      default: 'user',
    },
    text: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.models.prompt || mongoose.model('prompt', PromptSchema)
