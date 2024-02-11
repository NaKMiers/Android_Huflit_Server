import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendMail } from '../../utils/sendMail.js'

class AuthController {
  // [POST]: /auth/check-user
  async checkUser(req, res) {
    console.log('checkUser')

    // get data
    const { emailOrUsername } = req.body

    try {
      // get user from database for checking
      const user = await UserModel.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      }).lean()

      // check if user exists or not
      return res.status(200).json({ message: 'User exists', user })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [POST]: /auth/login
  async login(req, res) {
    console.log('login')

    // get data
    const { emailOrUsername, password } = req.body

    try {
      // get user from database for checking
      const user = await UserModel.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      }).lean()

      // check if user exists or not
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // check if password matches
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        return res.status(404).json('Invalid password')
      }

      const tokenData = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        theme: user.theme,
      }
      const token = jwt.sign(tokenData, process.env.JWT_SECRET)

      const { password: pw, ...otherInfos } = user

      // response user data
      res.status(200).json({ user: otherInfos, token, message: 'Login success' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [POST]: /auth/resgiter
  async register(req, res) {
    console.log('register')

    // get data
    const { email, username, password } = req.body

    try {
      // get user from database for checking
      const user = await UserModel.findOne({
        $or: [{ email }, { username }],
      })

      // check if user already exists or not
      if (user) {
        return res.status(404).json({ message: 'User has already existed' })
      }

      // hash password before saving to database
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      // create new user
      const newUser = new UserModel({
        email,
        username,
        password: hashedPassword,
      })
      await newUser.save()

      const tokenData = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        theme: newUser.theme,
      }
      const token = jwt.sign(tokenData, process.env.JWT_SECRET)

      const { password: pw, ...otherInfos } = newUser._doc

      // response user data
      res.status(200).json({ user: otherInfos, token, message: 'Register success' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // // [/GET]: /auth/google/callback
  // googleAuth = async function (req, res) {
  //   console.log('googleAuth')

  //   try {
  //     if (!req.user) {
  //       res.redirect('/auth/login')
  //     } else {
  //       // get data for authentication
  //       const { profile } = req.user
  //       const { id } = profile
  //       const email = profile.emails[0].value
  //       const avatar = profile._json.picture
  //       const firstname = profile.name.givenName
  //       const lastname = profile.name.familyName

  //       // get user from database to check exist
  //       const user = await UserModel.findOne({ email }).lean()

  //       // check whether user exists
  //       if (user) {
  //         // update user in case user change the google account info
  //         await UserModel.findByIdAndUpdate(user._id, { $set: { avatar } })

  //         // exclude password from user who have just logined
  //         const { password: hiddenPassword, ...otherDetails } = user

  //         // set user session
  //         req.session.user = otherDetails

  //         res.redirect('/')
  //       } else {
  //         // create new user with google infomation
  //         const newUser = new UserModel({
  //           email: email,
  //           avatar,
  //           firstname,
  //           lastname,
  //           authType: 'google',
  //           authGoogleId: id,
  //         })

  //         await newUser.save()

  //         // exclude password from userRegistered
  //         const { password: hiddenPassword, ...otherDetails } = newUser._doc

  //         // set user session
  //         req.session.user = otherDetails
  //         // req.sessionOptions.maxAge = 2 * 60 * 60 * 1000 // 2 hours

  //         // return home page
  //         res.redirect('/')
  //       }
  //     }
  //   } catch (err) {
  //     res.status(500).json({ message: err.message })
  //   }
  // }

  // [POST]: /auth/forgot-password
  forgotPassword = async function (req, res) {
    console.log('forgotPassword')

    // get email to send link to reset password
    const { email } = req.body

    try {
      const user = await UserModel.findOne({ email }).lean()

      if (!user) {
        return res.render('Pages/ForgotPassword', { error: 'Email không tồn tại', data: { email } })
      }

      if (user.authType !== 'local') {
        return res.render('Pages/ForgotPassword', {
          error: `Email này được xác thực bởi ${user.authType}, bạn không thể thực hiện tính năng này`,
          data: { email },
        })
      }

      const mailHashed = await bcrypt.hash(email, +process.env.BCRYPT_SALT_ROUND)
      const url = `${process.env.APP_URL}/auth/reset-password?email=${email}&token=${mailHashed}`
      sendMail(email, 'Reset Password', `<a href="${url}"> Reset Password </a>`)

      res.status(200).json({ message: 'Reset password link has been sent to your email' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  // [PATCH]: /auth/reset-password
  resetPassword = async function (req, res) {
    console.log('resetPassword')
    const { email, token } = req.query
    const { newPassword } = req.body

    try {
      // check if token is valid
      const isValidToResetPassword = await bcrypt.compare(email, token)

      if (!isValidToResetPassword) {
        return res.status(404).json({ message: 'Token is invalid' })
      }

      const hashedPassword = await bcrypt.hash(newPassword, +process.env.BCRYPT_SALT_ROUND)

      await UserModel.findOneAndUpdate({ email }, { $set: { password: hashedPassword } })

      // return message
      res.status(200).json({ message: 'Reset password successfully!!!' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

export default new AuthController()
