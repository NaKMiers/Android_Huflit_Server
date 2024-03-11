import BoxModel from '../models/BoxModel.js'
import PromptModel from '../models/PromptModel.js'
import openai from '../../config/openai.js'

class ImageController {
  // [GET]: /images/:id
  async getPrompts(req, res) {
    console.log('getPrompts')

    const userId = req.user._id

    try {
      // get prompts
      const prompts = await PromptModel.find({ userId, type: 'image' })

      // response prompts
      res.status(200).json({ prompts })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [POST]: /image/create-prompt
  async createPrompt(req, res) {
    console.log('createPrompt')

    // get data to create prompt
    const { chatId, prompt } = req.body
    const userId = req.user._id

    try {
      let newChatId = chatId

      // create chat if not exist
      if (!newChatId) {
        const newChat = new BoxModel({
          userId,
          type: 'image',
          title: 'Untitled',
        })
        await newChat.save()

        newChatId = newChat._id
      }

      // create prompt
      const newPrompt = new PromptModel({
        userId,
        chatId: newChatId,
        type: 'image',
        from: 'user',
        text: prompt,
      })

      // save prompt
      const newSavedPrompt = await newPrompt.save()

      // response prompt
      res.status(200).json({ prompt: newSavedPrompt, message: 'Created prompt successfully!!!' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [POST]: /chat/create-images
  async createImages(req, res) {
    console.log('createImages')

    // get data to create completion
    const { chatId, prompt, amount, size } = req.body
    const userId = req.user._id

    try {
      let newChatId = chatId

      // create chat if not exist
      if (!newChatId) {
        const newChat = new BoxModel({
          userId,
          type: 'image',
          title: 'Untitled',
        })
        await newChat.save()

        newChatId = newChat._id
      }

      // create completion
      const images = await openai.images.generate({
        model: 'dall-e-2',
        prompt,
        n: +amount > 10 ? 10 : +amount || 1,
        size: ['256x256', '512x512', '1024x1024'].includes(size) ? size : '256x256',
      })

      const newImagePrompt = new PromptModel({
        userId,
        chatId: newChatId,
        type: 'image',
        from: 'ai',
        images: images.data.map(image => image.url),
      })

      // save image prompt
      const newSavedImagePrompt = await newImagePrompt.save()

      // return completion
      res.status(200).json({
        images: newSavedImagePrompt,
        message: 'Created images successfully!!!',
      })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [GET]: /admin/image/all
  async getAllImages(req, res) {
    console.log('getAllImages')

    try {
      // get images and merge to a list of image urls
      const prompts = await PromptModel.find({ type: 'image', from: 'ai' }).select('images').lean()

      const images = prompts.reduce((acc, prompt) => [...acc, ...prompt.images], [])
      res.status(200).json({ images })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

export default new ImageController()
