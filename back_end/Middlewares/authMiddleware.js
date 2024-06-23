import tokenService from '../Services/tokenService.js'

const authMiddleware = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(401).json({ message: 'User is not authorized' })
		}
		const userData = tokenService.validateAccessToken(token)
		if (!userData) {
			return res.status(401).json({ message: 'User is not authorized' })
		}

		req.user = userData
		next()
	} catch (error) {
		console.log(error)
		return res.status(401).json({ message: 'User is not authorized' })
	}
}

export default authMiddleware
