import express from 'express'
const router = express.Router()
import ImageController from '../app/controllers/ImageController.js'

router.get('/get-prompts/:chatId', ImageController.getPrompts)

router.post('/create-prompt', ImageController.createPrompt)

router.post('/create-images', ImageController.createImages)

// router.get('/:id', ImageController.getImages)
// router.post('/:id', ImageController.generateFullImage)
// router.post('/:id/prompt', ImageController.createPrompt)

// router.delete('/:id/clear', ImageController.clearImages)

export default router
