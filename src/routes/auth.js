import express from 'express'
import AuthController from '../app/controllers/AuthController.js'
const router = express.Router()

router.post('/login', AuthController.login)

router.post('/register', AuthController.register)

router.post('/forgot-password', AuthController.forgotPassword)

router.post('/reset-password', AuthController.resetPassword)

export default router
