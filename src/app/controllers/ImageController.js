class ImageController {
  // // [GET]: /images/:id
  // getImages = async function (req, res) {
  //   console.log('getImages')
  //   const { id: decodeId, admin } = req.body
  //   const id = req.params.id
  //   try {
  //     if (id === decodeId || admin) {
  //       const images = await PromptModel.find({
  //         userId: id,
  //         type: { $in: ['user-image', 'ai-image'] },
  //       })
  //       res.status(200).json(images)
  //     } else {
  //       res.status(400).json('You do not have permission to perform this action.')
  //     }
  //   } catch (err) {
  //     res.status(500).json({ message: err.message })
  //   }
  // }
  // // [POST]: /images/
  // generateImage = async function (req, res) {
  //   console.log('generate-image')
  //   const { prompt, amount, size } = req.body
  //   try {
  //     if (prompt.trim()) {
  //       amount > 10 ? (amount = 10) : amount
  //       amount < 1 ? (amount = 1) : amount
  //       const images = await openai.createImage({
  //         prompt,
  //         n: Math.floor(amount) || 1,
  //         size: ['256x256', '512x512', '1024x1024'].includes(size) ? size : '256x256',
  //       })
  //       const imageData = await images.data.data
  //       const imageRes = imageData.map(image => image.url)
  //       res.status(200).json(imageRes)
  //     } else {
  //       res.status(403).json('Content is empty.')
  //     }
  //   } catch (err) {
  //     res.status(500).json({ message: err.message })
  //   }
  // }
  // // [POST]: /images/:id
  // generateFullImage = async function (req, res) {
  //   console.log('generateFullImage')
  //   const { id: decodeId, admin, prompt, amount, size } = req.body
  //   const id = req.params.id
  //   console.log(prompt, amount, size)
  //   try {
  //     if (id === decodeId || admin) {
  //       if (prompt.trim()) {
  //         amount > 10 ? (amount = 10) : amount
  //         amount < 1 ? (amount = 1) : amount
  //         const images = await openai.createImage({
  //           prompt,
  //           n: Math.floor(amount) || 1,
  //           size: ['256x256', '512x512', '1024x1024'].includes(size) ? size : '256x256',
  //         })
  //         const imageData = await images.data.data
  //         console.log('imageData: ', imageData)
  //         const newImage = new PromptModel({
  //           userId: id,
  //           type: 'ai-image',
  //           images: imageData.map(image => image.url),
  //         })
  //         const newImageRes = await newImage.save()
  //         res.status(200).json(newImageRes)
  //       } else {
  //         res.status(403).json('Content is empty')
  //       }
  //     } else {
  //       res.status(400).json('You do not have permission to perform this action.')
  //     }
  //   } catch (err) {
  //     res.status(500).json({ message: err.message })
  //   }
  // }
  // // [POST]: /images/:id/prompt
  // createPrompt = async function (req, res) {
  //   console.log('createPrompt')
  //   const { id: decodeId, admin, prompt } = req.body
  //   const id = req.params.id
  //   try {
  //     if (id === decodeId || admin) {
  //       if (prompt.trim()) {
  //         const newPrompt = new PromptModel({
  //           userId: id,
  //           type: 'user-image',
  //           text: prompt,
  //         })
  //         const promptRes = await newPrompt.save()
  //         res.status(200).json(promptRes)
  //       } else {
  //         res.status(403).json('Content is empty.')
  //       }
  //     } else {
  //       res.status(400).json('You do not have permission to perform this action.')
  //     }
  //   } catch (err) {
  //     res.status(500).json({ message: err.message })
  //   }
  // }
  // // [DELETE]: /images/:id/clear
  // clearImages = async function (req, res) {
  //   console.log('clearImages')
  //   const { id: decodeId, admin } = req.body
  //   const id = req.params.id
  //   try {
  //     if (id === decodeId || admin) {
  //       await PromptModel.deleteMany({
  //         userId: id,
  //         type: { $in: ['ai-image', 'user-image'] },
  //       })
  //       res.status(200).json('All images have been cleared.')
  //     } else {
  //       res.status(400).json('You do not have permission to perform this action.')
  //     }
  //   } catch (err) {
  //     res.status(500).json({ message: err.message })
  //   }
  // }
}

module.exports = new ImageController()
