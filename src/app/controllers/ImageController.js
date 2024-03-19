import BoxModel from '../models/BoxModel.js'
import PromptModel from '../models/PromptModel.js'
import openai from '../../config/openai.js'

class ImageController {
  // [GET]: /images/:chatId
  async getPrompts(req, res) {
    console.log('getPrompts')

    const userId = req.user._id
    const { chatId } = req.params

    try {
      // get prompts
      const prompts = await PromptModel.find({ userId, type: 'image', chatId }).lean()

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

      // create images
      // const images = await openai.images.generate({
      //   model: 'dall-e-2',
      //   prompt,
      //   n: +amount > 4 ? 4 : +amount || 1,
      //   size: ['256x256', '512x512', '1024x1024'].includes(size) ? size : '256x256',
      // })

      const randomImages = [
        'https://image.lexica.art/full_webp/14ac3027-e18b-4897-8819-501508218788',
        'https://image.lexica.art/full_webp/99851a66-f899-4cdf-b04a-cd1bec23ab0c',
        'https://image.lexica.art/full_webp/a43d0eeb-5feb-4ab2-af2c-bec63673778a',
        'https://image.lexica.art/full_webp/b9c3282d-feba-4058-97c2-702466127ec8',
        'https://image.lexica.art/full_webp/bdb469c1-433e-4086-b045-9ebd42d1c36a',
        'https://image.lexica.art/full_webp/ee27312a-e1a9-4bb4-afff-296c5f22b609',
        'https://image.lexica.art/full_webp/003e58db-9026-4d38-8414-8f10a418e26b',
        'https://image.lexica.art/full_webp/0d470f70-4d1d-4daf-a9e1-bfc3821e257a',
        'https://image.lexica.art/full_webp/3bd629d0-4f62-4743-8158-58325b164938',
        'https://image.lexica.art/full_webp/6fa866f2-4a2b-4fce-b442-7e4f997517ec',
        'https://image.lexica.art/full_webp/85b4385a-bfe9-4ecf-bb63-7919c7e03d9e',
        'https://image.lexica.art/full_webp/e3ecae94-cb13-4938-8d7e-5a4667cfef80',
        'https://image.lexica.art/full_webp/f824d76b-db29-479b-a0e8-f33bfae7654f',
        'https://image.lexica.art/full_webp/037cffbf-5b2f-4e58-98c4-06d154fea6cb',
        'https://image.lexica.art/full_webp/2cf8182c-9848-4097-827e-dcf65ebce30c',
        'https://image.lexica.art/full_webp/42b5f99f-20cd-49f3-a570-17f16a2c460c',
      ]

      const images = {
        data: [
          ...Array.from({ length: amount || 1 }).map(() => ({
            url: randomImages[Math.floor(Math.random() * randomImages.length)],
          })),
        ],
      }

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
