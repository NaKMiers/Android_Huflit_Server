import express from 'express'
import UserController from '../app/controllers/UserController.js'
import ImageController from '../app/controllers/ImageController.js'
const router = express.Router()

// user
router.get('/user/all', UserController.getAllUsers)
router.delete('/user/:id/delete', UserController.deleteUser)
router.delete('/user/delete-many', UserController.deleteManyUsers)

// image
router.get('/image/all', ImageController.getAllImages)

export default router
