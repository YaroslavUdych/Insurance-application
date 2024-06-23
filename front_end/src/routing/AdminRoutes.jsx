// Desc: Admin Routes for the admin dashboard

import { Route, Routes } from 'react-router-dom'
import UsersList from '../components/pages/users/UsersList'
import PageNotFound from '../components/pages/PageNotFound'
import CreateUser from '../components/pages/users/CreateUser'

const AdminRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<UsersList />} />
			<Route path="/create-user" element={<CreateUser />} />
			<Route path="*" element={<PageNotFound description="main" />} />
		</Routes>
	)
}

export default AdminRoutes
