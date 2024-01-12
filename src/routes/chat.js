import express from 'express'
const router = express.Router()
import ChatController from '../app/controllers/ChatController.js'

router.get('/', ChatController.getPrompts)

router.post('/create-prompt', ChatController.createPrompt)

router.post('/create-completion', ChatController.createCompletion)

// router.get('/:id', ChatController.getPrompts)
// router.post('/:id', ChatController.createFullCompletion)
// router.post('/:id/prompt', ChatController.createPrompt)

// router.delete('/:id/clear', ChatController.clearCompletions)

export default router
