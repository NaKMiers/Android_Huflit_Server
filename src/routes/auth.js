import express from 'express'
import AuthController from '../app/controllers/AuthController.js'
const router = express.Router()

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)

export default router
