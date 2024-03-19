import mongoose from 'mongoose'

// connect database
async function ConnectDatabase(connectionString) {
  try {
    await mongoose.connect(connectionString)

    console.log('Database connect successfully')
  } catch (err) {
    console.log('Database connect failure')
  }
}

export { ConnectDatabase }
