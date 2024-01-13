import express from 'express'
const router = express.Router()
import ChatController from '../app/controllers/ChatController.js'

router.get('/get-prompts', ChatController.getPrompts)

router.post('/create-prompt', ChatController.createPrompt)

router.post('/create-completion', ChatController.createCompletion)

// router.get('/:id', PromptController.getPrompts)
// router.post('/:id', PromptController.createFullCompletion)
// router.post('/:id/prompt', PromptController.createPrompt)

// router.delete('/:id/clear', PromptController.clearCompletions)

export default router
