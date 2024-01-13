import BoxModel from '../models/BoxModel.js'

class BoxController {
  // [GET]: /box/get-boxes/:type
  async getBoxes(req, res) {
    console.log('getBoxes')

    const { type } = req.params
    const userId = req.user._id

    try {
      // get boxes from database
      const boxes = await BoxModel.find({ userId, type })

      // response boxes
      res.status(200).json({ boxes })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [POST]: /box/create-box/:type
  async createBox(req, res) {
    console.log('createBox')

    const { type } = req.params
    const userId = req.user._id

    try {
      // create new box
      const newBox = new BoxModel({
        userId,
        type,
        title: 'Untitled',
      })

      // save new box
      await newBox.save()

      // response new box
      res.status(200).json({ newBox })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [PATCH]: /box/edit-box/:id
  async editBox(req, res) {
    console.log('editBox')

    // get values to edit
    const { id } = req.params
    const { title } = req.body
    const userId = req.user._id

    try {
      // get box
      const box = await BoxModel.findById(id)

      // check box belong to user
      if (box.userId.toString() !== userId) {
        return res
          .status(400)
          .json({ message: 'You do not have permission to perform this action.' })
      }

      // update box
      box.title = title

      // save box
      const updatedBox = await box.save()

      // response box
      res.status(200).json({ box: updatedBox })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [DELETE]: /box/delete-box/:id
  async deleteBox(req, res) {
    console.log('deleteBox')

    // get box id to delete
    const { id } = req.params
    const userId = req.user._id

    try {
      // get box
      const box = await BoxModel.findById(id)

      // check box belong to user
      if (box.userId.toString() !== userId) {
        return res
          .status(400)
          .json({ message: 'You do not have permission to perform this action.' })
      }

      // delete box
      await BoxModel.findByIdAndDelete(id)

      res.status(200).json({ message: 'Deleted box successfully!!!' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

export default new BoxController()
