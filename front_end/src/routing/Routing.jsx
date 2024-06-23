// Desc: Routing for the application
// this file is used to route the user to the correct page based on their role

import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../AuthContext'

import PageNotFound from '../components/pages/PageNotFound'
import LogIn from '../components/pages/LogIn'
import AdminRoutes from './AdminRoutes'
import EmployeeRoutes from './EmployeeRoutes'

const Routing = () => {
	const { isUserLoggedIn, userData } = useContext(AuthContext)

	return (
		<Routes>
			{isUserLoggedIn ? (
				<>
					{userData.role === 'ADMIN' && <Route path="/*" element={<AdminRoutes />} />}
					{userData.role === 'EMPLOYEE' && <Route path="/*" element={<EmployeeRoutes />} />}
				</>
			) : (
				<>
					<Route path="/" element={<LogIn />} />
					<Route path="*" element={<PageNotFound title="or you need to log in" description="login" />} />
				</>
			)}
		</Routes>
	)
}

export default Routing
