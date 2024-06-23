import User from '../Models/User.js'
import bcrypt from 'bcrypt'
import tokenService from '../Services/tokenService.js'

class authController {
	static async login(req, res, next) {
		try {
			const { username, password } = req.body
			const user = await User.findOne({ username })

			if (!user) {
				return res.status(400).json({ message: `User with name '${username}' not found` })
			}

			const isValidPassword = bcrypt.compareSync(password, user.password)
			if (!isValidPassword) {
				return res.status(400).json({ message: 'Invalid password' })
			}

			const tokens = tokenService.generateTokens({ username: user.username, role: user.role, id: user._id })
			await tokenService.saveToken(user._id, tokens.refreshToken)

			res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
			return res.json({
				message: `User with name '${username}' logged in`,
				accessToken: tokens.accessToken,
				userData: { username: user.username, role: user.role },
			})
		} catch (error) {
			res.status(400).json({ ok: false, error: error, message: 'Error login' })
		}
	}

	static async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			await tokenService.removeToken(refreshToken)

			res.clearCookie('refreshToken')
			return res.json({ message: 'User logged out' })
		} catch (error) {
			res.status(400).json({ ok: false, error: error, message: 'Error logout' })
		}
	}

	static async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			if (!refreshToken) {
				return res.status(401).json({ message: 'User is not authorized' })
			}

			const userData = tokenService.validateRefreshToken(refreshToken)
			const tokenFromDb = await tokenService.findToken(refreshToken)
			if (!userData || !tokenFromDb) {
				return res.status(401).json({ message: 'User is not authorized' })
			}

			const user = await User.findById(userData.id)
			const tokens = tokenService.generateTokens({ username: user.username, role: user.role, id: user._id })
			await tokenService.saveToken(user._id, tokens.refreshToken)

			res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

			return res.json({
				message: `User with name '${user.username}' refreshed`,
				accessToken: tokens.accessToken,
			})
		} catch (error) {
			res.status(401).json({ ok: false, error: error, message: 'User is not authorized' })
		}
	}
}

export default authController
