import express from 'express'
import mongoose, { set } from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import APP_ROUTER from './Routers/appRouter.js'
import AUTH_ROUTER from './Routers/authRouter.js'
import USERS_ROUTER from './Routers/usersRouter.js'

dotenv.config()

const APP = express()
const PORT = process.env.PORT || 5000

const corsOptions = {
	origin: 'http://localhost:3000',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization', 'username'],
	optionsSuccessStatus: 200,
	credentials: true,
}

APP.use(cors(corsOptions))
APP.use('/uploads', express.static('uploads'))
APP.use(cookieParser())
APP.use(express.json())
APP.use('/api', APP_ROUTER)
APP.use('/auth', AUTH_ROUTER)
APP.use('/users', USERS_ROUTER)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION_STRING)
		console.log('MongoDB connected...')
		APP.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}...`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
