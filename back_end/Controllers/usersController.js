import User from '../Models/User.js'
import Role from '../Models/Role.js'
import bcrypt from 'bcrypt'
import tokenService from '../Services/tokenService.js'
import { validationResult } from 'express-validator'
import RefreshToken from '../Models/RefreshToken.js'

class usersController {
	// GET:  get all users except the current user
	static async getUsers(req, res) {
		try {
			const { username } = req.headers
			const users = await User.find()
			const usersList = users.filter((user) => user.username !== username)

			res.status(200).json({ code: 200, ok: true, users: usersList })
		} catch (error) {
			res.status(400).json({ code: 400, ok: false, error: error, message: error.message })
		}
	}
	//POST:  create user
	static async createUser(req, res) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors.array()[0].msg })
			}

			const { username, password, role } = req.body
			const candidate = await User.findOne({ username })
			if (candidate) {
				return res.status(400).json({ message: `User with name '${username}' already exists` })
			}

			const userRole = await Role.findOne({ value: role })
			if (!userRole) {
				return res.status(400).json({ message: `Role with name '${role}' not found` })
			}
			const hashPassword = bcrypt.hashSync(password, 7)
			const user = new User({ username, password: hashPassword, role: userRole.value })
			await user.save()

			const tokens = tokenService.generateTokens({ username: user.username, role: user.role, id: user._id })
			await tokenService.saveToken(user._id, tokens.refreshToken)

			return res.json({
				message: `User with name '${username}' created`,
				accesstoken: tokens.accessToken,
				refreshtoken: tokens.refreshToken,
			})
		} catch (error) {
			res.status(400).json({ ok: false, error: error, message: 'Error registration' })
		}
	}
	//PUT:  update user
	static async updateUser(req, res) {
		try {
			await User.findByIdAndUpdate(req.params.id, req.body)
			res.status(200).json({ code: 200, ok: true, message: 'User updated successfully' })
		} catch (error) {
			res.status(400).json({ code: 400, ok: false, error: error, message: error.message })
		}
	}
	//DELETE:  delete user
	static async deleteUser(req, res) {
		try {
			const findToken = await RefreshToken.findOne({ user: req.params.id })
			await RefreshToken.findByIdAndDelete(findToken._id)
			await User.findByIdAndDelete(req.params.id)

			res.status(200).json({ code: 200, ok: true, message: 'User deleted successfully' })
		} catch (error) {
			res.status(400).json({ code: 400, ok: false, error: error, message: error.message })
		}
	}
}

export default usersController
