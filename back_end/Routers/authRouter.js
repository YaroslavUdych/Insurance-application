import { Router } from 'express'
import authController from '../Controllers/authController.js'

const AUTH_ROUTER = Router()

AUTH_ROUTER.post('/login', authController.login)
AUTH_ROUTER.post('/logout', authController.logout)
AUTH_ROUTER.get('/refresh', authController.refresh)

export default AUTH_ROUTER
