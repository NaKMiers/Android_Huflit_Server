import authRouter from './auth.js'
import chatRouter from './chat.js'
import imageRouter from './image.js'
import userRouter from './user.js'
import boxRouter from './box.js'

import { requireAuth } from '../app/middlewares/AuthMiddleware.js'

function routes(app) {
  app.use('/auth', authRouter)

  app.use('/user', requireAuth, userRouter)

  app.use('/chat', requireAuth, chatRouter)

  app.use('/image', requireAuth, imageRouter)

  app.use('/box', requireAuth, boxRouter)

  app.use('/', async (req, res) => {
    // const { id: decodeId, admin, prompt, model, maxTokens, temperature } = req.body

    // let completion = ''

    // const stream = await openai.chat.completions.create({
    //   model: 'gpt-4',
    //   messages: [{ role: 'user', content: 'Say this is a test' }],
    //   stream: true,
    // })
    // for await (const chunk of stream) {
    //   const str = chunk.choices[0]?.delta?.content || ''
    //   completion += str
    //   console.log(chunk.choices[0]?.delta?.content || '')

    //   process.stdout.write(chunk.choices[0]?.delta?.content || '')
    // }

    // res.send('<h1 style="color: tomato; font-size: 32px">THIS IS HOME PAGE</h1>')
    res.status(200).json({ message: 'This is home page' })
  })
}

export default routes
