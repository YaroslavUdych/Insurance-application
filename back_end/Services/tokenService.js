import jwt from 'jsonwebtoken'
import RefreshToken from '../Models/RefreshToken.js'

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
		return { accessToken, refreshToken }
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await RefreshToken.findOne({ user: userId })
		if (tokenData) {
			tokenData.refreshToken = refreshToken
			return tokenData.save()
		}
		const token = await RefreshToken.create({ user: userId, refreshToken })
		return token
	}

	async removeToken(refreshToken) {
		const tokenData = await RefreshToken.deleteOne({ refreshToken })
		return tokenData
	}

	validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			return userData
		} catch (error) {
			return null
		}
	}

	validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			return userData
		} catch (error) {
			return null
		}
	}

	async findToken(refreshToken) {
		const tokenData = await RefreshToken.findOne({ refreshToken })
		return tokenData
	}
}

export default new TokenService()
