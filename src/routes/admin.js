import express from 'express'
import UserController from '../app/controllers/UserController.js'
const router = express.Router()

router.get('/user/all', UserController.getAllUsers)
router.delete('/user/:id/delete', UserController.deleteUser)
router.delete('/user/delete-many', UserController.deleteManyUsers)

export default router
