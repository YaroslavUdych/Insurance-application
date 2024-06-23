import { Router } from 'express'
import usersController from '../Controllers/usersController.js'
import { check } from 'express-validator'
import roleMiddleware from '../Middlewares/roleMiddleware.js'

const USERS_ROUTER = Router()

USERS_ROUTER.get('/get-all-users', roleMiddleware('ADMIN'), usersController.getUsers)
USERS_ROUTER.post(
	'/create-user',
	[
		roleMiddleware('ADMIN'),
		check('username', 'Username cannot be empty').notEmpty(),
		check('password', 'Password must be at least 4 characters').isLength({ min: 4 }),
	],
	usersController.createUser
)
USERS_ROUTER.put('/update-user/:id', [roleMiddleware('ADMIN')], usersController.updateUser)
USERS_ROUTER.delete('/delete-user/:id', [roleMiddleware('ADMIN')], usersController.deleteUser)

export default USERS_ROUTER
