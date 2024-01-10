import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PromptSchema = new Schema(
  {
    userId: {
      type: String,
      require: [true, 'Please provide an user id'],
    },
    type: {
      type: String,
      enum: ['completion', 'image'],
      default: 'completion',
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
