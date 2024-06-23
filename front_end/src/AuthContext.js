// this component is used to create a context for the user authentication status and user data
import { createContext, useState } from 'react'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
	const [userData, setUserData] = useState({
		username: '',
		role: '',
	})

	const loginUser = () => {
		setIsUserLoggedIn(true)
	}

	const logoutUser = () => {
		setIsUserLoggedIn(false)
		setUserData({
			username: '',
			role: '',
		})
	}

	const getUserData = (data) => {
		setUserData({
			username: data.username,
			role: data.role,
		})
	}

	return <AuthContext.Provider value={{ isUserLoggedIn, loginUser, logoutUser, userData, getUserData }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthContextProvider }
