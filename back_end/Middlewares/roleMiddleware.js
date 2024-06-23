import jwt from 'jsonwebtoken'

const roleMiddleware = (role) => {
	return (req, res, next) => {
		try {
			const token = req.cookies.refreshToken
			if (!token) {
				return res.status(401).json({ message: 'User is not authorized' })
			}

			const decodedData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			if (decodedData.role !== role) {
				return res.status(403).json({ message: 'Access is denied' })
			}
			next()
		} catch (error) {
			console.log(error)
			return res.status(401).json({ message: 'User is not authorized' })
		}
	}
}

export default roleMiddleware
