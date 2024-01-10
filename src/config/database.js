import { connect } from 'mongoose'

async function connectDatabase() {
  try {
    await connect(process.env.MONGODB)

    console.log('Connect MongoDB successfully!!!')
  } catch (err) {
    console.log('Connect MongoDB failure!!!')
  }
}

export default connectDatabase
