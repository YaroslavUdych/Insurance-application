/**
 * Header component displays the header section of the application.
 * It includes the user name, navigation links based on user role, and a logout button.
 */
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { Tab, Button } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

import { AuthContext } from '../../AuthContext'
import params from '../api/params'
import api from '../api/axiosConf'

import './header.css'

const Header = function () {
	const { logoutUser, userData } = useContext(AuthContext)
	const navigate = useNavigate()

	const handleLogOut = async () => {
		try {
			const response = await api.post(params.URL + params.endpoint.logout)
			if (response.status === 200) {
				localStorage.removeItem('accessToken')
				logoutUser()
				navigate('/')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<header>
			<div className="user-name">
				<PersonIcon />
				<p>{userData.username}</p>
			</div>
			{userData.role === 'EMPLOYEE' && (
				<nav>
					<Tab label="Customers List" component={NavLink} to="/" />
					<Tab label="Create Customer" component={NavLink} to="/create-insured-person" />
					<Tab label="About" component={NavLink} to="/about" />
				</nav>
			)}
			{userData.role === 'ADMIN' && (
				<nav>
					<Tab label="Users List" component={NavLink} to="/" />
					<Tab label="Create User" component={NavLink} to="/create-user" />
				</nav>
			)}

			<Button variant="contained" color="error" size="small" sx={{ width: '180px' }} onClick={handleLogOut}>
				Log out
			</Button>
		</header>
	)
}

export default Header
