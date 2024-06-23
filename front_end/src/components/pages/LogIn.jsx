// Desc: Log in page for the application

import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { InputAdornment, IconButton, Box, TextField, Button } from '@mui/material'
import AlertMessage from '../UI/AlertMessage'
import Loader from '../UI/Loader'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import keyImage from '../images/key-chain.png'

import { AuthContext } from '../../AuthContext'
import validate from '../validation/validate'
import params from '../api/params'
import api from '../api/axiosConf'

import './login.css'

function LogIn() {
	const [showPassword, setShowPassword] = useState(false)
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}
	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}

	const [password, setPassword] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [username, setUsername] = useState({
		value: '',
		message: '',
		ok: false,
	})

	const navigate = useNavigate()
	const { loginUser, getUserData } = useContext(AuthContext)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (event) => {
		event.preventDefault()
		setUsername((prevState) => ({
			...prevState,
			message: validate.isEmpty(prevState.value).message,
			ok: validate.isEmpty(prevState.value).isValid,
		}))
		setPassword((prevState) => ({
			...prevState,
			message: validate.isEmpty(prevState.value).message,
			ok: validate.isEmpty(prevState.value).isValid,
		}))

		if (username.ok && password.ok) {
			const url = params.URL + params.endpoint.login
			const body = {
				username: username.value,
				password: password.value,
			}

			try {
				setLoading(true)
				const response = await api.post(url, body)
				localStorage.setItem('accessToken', response.data.accessToken)
				localStorage.setItem('userData', JSON.stringify(response.data.userData))
				loginUser()
				getUserData(response.data.userData)
				navigate('/')
			} catch (error) {
				setError(error.response.data.message)
			} finally {
				setLoading(false)
			}
		}
	}

	return (
		<section className="container">
			{error && <AlertMessage open={error} message={error} severity="error" onClose={() => setError('')} />}
			{loading && <Loader />}
			<div className="login-wrapper">
				<div className="login-header">
					<p>Log in</p>
					<img src={keyImage} alt="keys" className="login-icon" />
				</div>
				<Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
					<TextField
						type="text"
						id="log-in-username"
						autoComplete="username"
						label="Username"
						helperText={username.message ? username.message : ''}
						variant="outlined"
						size="small"
						color={username.ok ? 'success' : 'secondary'}
						fullWidth
						margin="none"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<PersonIcon />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="start">
									{username.message ? <CancelOutlinedIcon sx={{ color: 'red', marginRight: '-8px' }} /> : null}
								</InputAdornment>
							),
						}}
						onInput={(e) => {
							setUsername((prevState) => ({
								...prevState,
								value: e.target.value,
								message: validate.isEmpty(e.target.value).message,
								ok: validate.isEmpty(e.target.value).isValid,
							}))
						}}
					/>

					<TextField
						type={showPassword ? 'text' : 'password'}
						autoComplete="current-password"
						id="log-in-password"
						label="Password"
						helperText={password.message ? password.message : ''}
						variant="outlined"
						size="small"
						color={password.ok ? 'success' : 'secondary'}
						fullWidth
						margin="none"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockIcon />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
										style={{ marginRight: '5px' }}
									>
										{showPassword ? <VisibilityOff color="secondary" /> : <Visibility color="secondary" />}
									</IconButton>
									{password.message ? <CancelOutlinedIcon sx={{ color: 'red' }} /> : null}
								</InputAdornment>
							),
						}}
						onInput={(e) => {
							setPassword((prevState) => ({
								...prevState,
								value: e.target.value,
								message: validate.isEmpty(e.target.value).message,
								ok: validate.isEmpty(e.target.value).isValid,
							}))
						}}
					/>
					<Button variant="contained" fullWidth type="submit" color="secondary" size="small" disabled={loading}>
						Log in
					</Button>
				</Box>
			</div>
		</section>
	)
}

export default LogIn
