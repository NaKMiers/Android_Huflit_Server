import express from 'express'
const router = express.Router()
import BoxController from '../app/controllers/BoxController.js'

router.get('/get-boxes/:type', BoxController.getBoxes)

router.post('/create-box/:type', BoxController.createBox)

router.patch('/edit-box/:id', BoxController.editBox)

router.delete('/delete-box/:id', BoxController.deleteBox)

export default router
