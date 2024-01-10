import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'

class AuthController {
  // [POST]: /auth/login
  async login(req, res) {
    console.log('login')

    // get data
    const { emailOrUsername, password } = req.body

    try {
      // get user from database for checking
      const user = await UserModel.findOne({
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      })

      // check if user exists or not
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // check if password matches
      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) {
        res.status(404).json('Invalid password')
      }

      // response user data
      res.status(200).json({ user, message: 'Login success' })
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
        $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
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
      newUser.save()

      // response user data
      res.status(200).json({ user, message: 'Login success' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

export default new AuthController()
