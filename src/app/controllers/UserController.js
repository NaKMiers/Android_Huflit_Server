import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'

class UserController {
  // [GET]: /admin/user/all
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.find().select('-password').lean()
      res.status(200).json({ users })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [GET]: /user/:id
  async getUser(req, res) {
    console.log('getUser')

    // get user id to get user
    const { id } = req.params

    try {
      // get user from database
      const user = await UserModel.findById(id).select('-password').lean()

      // check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // response user
      res.status(200).json({ user, message: 'Get user successfully!!!' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // // [PATCH]: /user/change-avatar
  // async changeAvatar(req, res) {
  //   console.log('changeAvatar')

  //   // check the existence if file
  //   if (!req.file) {
  //     return res.status(400).render('Pages/User', { error: 'No file uploaded' })
  //   }

  //   // get user id to update user avatar
  //   const userId = res.locals.user && res.locals.user._id

  //   try {
  //     // get user from database to check
  //     const user = await UserModel.findById(userId)

  //     // user does not exist
  //     if (user) {
  //       // upload file to aws s3 bucket
  //       const avatarUrl = await uploadFile(req.file, '1:1')

  //       // update user avatar in database with avatar url
  //       await UserModel.findByIdAndUpdate(userId, {
  //         $set: { avatar: avatarUrl },
  //       })

  //       // delete the image does not associated with the avatar in aws s3
  //       await deleteFile(user.avatar)

  //       // save notify to session to show notify right after page is rendered
  //       req.session.notify = {
  //         status: 'success',
  //         message: 'Đã thay đổi ảnh đại diện thành công',
  //         createdAt: moment(Date.now()).format('DD/MM/YYYY HH:mm:ss'),
  //       }

  //       // stay in current page
  //       res.redirect('back')
  //     }
  //   } catch (err) {
  //     res.status(500).json({ message: err.message })
  //   }
  // }

  // [POST]: /user/update-profile
  async updateProfile(req, res) {
    console.log('updateProfile')

    const { firstname, lastname, birthday, job, address } = req.body
    const userId = req.user._id

    console.log(req.body)
    console.log(userId)

    try {
      const user = await UserModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            firstname,
            lastname,
            birthday: new Date(birthday),
            job,
            address,
          },
        },
        { new: true }
      )

      // return user json
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [PATCH]: /user/change-theme/:theme
  async changeTheme(req, res) {
    console.log('changeTheme')

    // get theme to change
    const { theme } = req.params
    const userId = req.user._id

    try {
      // get user to change theme
      const user = await UserModel.findByIdAndUpdate(userId, { $set: { theme } }, { new: true })

      // return user
      res.status(200).json({ user, message: 'Changed theme successfully!!!' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [PATCH]: /user/change-password
  async changePassword(req, res) {
    console.log('changePassword')

    // get data to change password
    const { oldPassword, newPassword } = req.body
    const userId = req.user._id

    console.log(req.body)
    console.log(userId)

    try {
      // get user to change password
      const user = await UserModel.findById(userId)

      // check if user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // check authType to decide whether to change the pasword
      if (user.authType !== 'local') {
        return res.status(404).json({ message: 'Do not allow to do this action' })
      }

      // checking whether old password is correct
      const isValidPassword = await bcrypt.compare(oldPassword, user.password)
      if (!isValidPassword) {
        return res.status(404).json({ message: 'Old password is not correct' })
      }

      // create new password
      const hashedPassword = await bcrypt.hash(newPassword, +process.env.BCRYPT_SALT_ROUND)
      user.password = hashedPassword
      user.save()

      // response message
      res.status(200).json({ message: 'Changed password successfully!!!' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [PATCH]: /user/update-image-params
  async updateImageParams(req, res) {
    console.log('updateImageParams')

    // get data to update image params
    const { amount, size } = req.body
    const userId = req.user._id

    try {
      // update user
      const user = await UserModel.findByIdAndUpdate(userId, { $set: { amount, size } }, { new: true })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // response user
      res.status(200).json({ user, message: 'Updated image params successfully!!!' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [DELETE]: /admin/user/:id/delete
  deleteUser = async function (req, res) {
    console.log('deleteUser')

    // get user id to delete
    const { id } = req.params

    try {
      // delete user
      const deletedUser = await UserModel.findByIdAndDelete(id, { new: true })

      // stay in current page
      res.status(200).json({ user: deletedUser, message: 'Deleted user successfully!!!' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [DELETE]: /admin/user/delete-many
  deleteManyUsers = async function (req, res) {
    console.log('deleteManyUsers')

    // get user ids to delete
    const { data: userIds } = req.body

    try {
      // delete users in databases
      await UserModel.deleteMany({ _id: { $in: userIds } })

      // stay in current page
      res.status(200).json({ message: 'Deleted users successfully!!!' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

export default new UserController()
