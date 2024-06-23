import { useEffect, useContext, useState } from 'react'

import Header from './components/pages/Header'
import Routing from './routing/Routing'
import { AuthContext } from './AuthContext'
import Loader from './components/UI/Loader'

function App() {
	const { loginUser, isUserLoggedIn, getUserData } = useContext(AuthContext)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			loginUser()
			const userData = JSON.parse(localStorage.getItem('userData'))
			getUserData(userData)
		}
		setLoading(false)
	}, [])

	if (loading) {
		return (
			<section className="app">
				<Loader />
			</section>
		)
	}

	return (
		<section className="app">
			{isUserLoggedIn && <Header />}
			<Routing />
		</section>
	)
}

export default App
