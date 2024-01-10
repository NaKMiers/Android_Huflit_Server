import 'dotenv/config.js'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import routes from './routes/index.js'
import connectDatabase from './config/database.js'

// app
const app = express()

// static folder
app.use(express.static(path.resolve(process.cwd(), 'public')))

// middlewares
app.use(bodyParser.urlencoded({ extended: false, limit: '30mb' }))
app.use(bodyParser.json({ limit: '30mb' }))
app.use(cors())

// routes
routes(app)

// database
connectDatabase()

// app listener
app.listen(process.env.PORT, () => console.log('Server running on port: ' + process.env.PORT))
