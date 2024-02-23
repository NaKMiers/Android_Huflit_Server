import openai from '../../config/openai.js'
import BoxModel from '../models/BoxModel.js'
import PromptModel from '../models/PromptModel.js'

class ChatController {
  // [GET]: /chat/get-prompts
  async getPrompts(req, res) {
    console.log('getPrompts')

    const userId = req.user._id

    try {
      // get prompts
      const prompts = await PromptModel.find({ userId, type: 'chat' })

      // response prompts
      res.status(200).json({ prompts })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [GET]: /chat/get-prompts/:chatId
  async getPromptsByChatId(req, res) {
    console.log('getPromptsByChatId')

    const userId = req.user._id
    const chatId = req.params.chatId

    try {
      // get prompts
      const prompts = await PromptModel.find({ userId, chatId, type: 'chat' })

      // response prompts
      res.status(200).json({ prompts })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [POST]: /completions/:id/prompt
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
          type: 'chat',
          title: 'Untitled',
        })
        await newChat.save()

        newChatId = newChat._id
      }

      // create prompt
      const newPrompt = new PromptModel({
        userId,
        chatId: newChatId,
        type: 'chat',
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

  // [POST]: /chat/create-completion
  async createCompletion(req, res) {
    console.log('createCompletion')

    // get data to create completion
    const { chatId, prompt, model, maxTokens, temperature } = req.body
    const userId = req.user._id
    console.log(req.body)
    console.log(userId)

    try {
      let newChatId = chatId

      // create chat if not exist
      if (!newChatId) {
        const newChat = new BoxModel({
          userId,
          type: 'chat',
          title: 'Untitled',
        })
        await newChat.save()

        newChatId = newChat._id
      }

      // create completion
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: prompt }],
        model: model || 'gpt-4',
        max_tokens: +maxTokens || 100,
        temperature: +temperature || 0.6,
      })

      const newCompletion = new PromptModel({
        userId,
        chatId: newChatId,
        type: 'chat',
        from: 'ai',
        text: completion.choices[0].message.content,
      })

      // save completion
      const newSavedcompletion = await newCompletion.save()

      // return completion
      res.status(200).json({
        completion: newSavedcompletion,
        message: 'Created completion successfully!!!',
      })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // // [DELETE]: /completions/:id/clear
  // clearCompletions = async function (req, res) {
  //   console.log('clearCompletions') // user logined
  //   const { id: decodeId, admin } = req.body
  //   const id = req.params.id
  //   try {
  //     if (id === decodeId || admin) {
  //       await PromptModel.deleteMany({ userId: id, type: { $in: ['ai', 'user'] } })
  //       res.status(200).json('All completions have been cleared.')
  //     } else {
  //       res.status(400).json('You do not have permission to perform this action.')
  //     }
  //   } catch (err) {
  //     res.status(500).json({ message: err.message })
  //   }
  // }
}

export default new ChatController()
