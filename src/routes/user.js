import express from 'express'
import UserController from '../app/controllers/UserController.js'

const router = express.Router()

router.get('/:id', UserController.getUser)

router.patch('/change-password', UserController.changePassword)

router.post('/update-profile', UserController.updateProfile)

router.patch('/change-theme/:theme', UserController.changeTheme)

router.patch('/update-image-params', UserController.updateImageParams)

// router.put('/:id', UserController.updateUser)
// router.delete('/:id', UserController.deleteUser)
// router.patch('/:id/change-avatar', upload.single('avatar'), UserController.changeAvatar)

export default router
