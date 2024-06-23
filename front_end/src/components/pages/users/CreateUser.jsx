import { useState, useRef } from 'react'

import { InputAdornment, Box, TextField, Button, IconButton, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Loader from '../../UI/Loader'
import AlertMessage from '../../UI/AlertMessage'

import validate from '../../validation/validate'
import api from '../../api/axiosConf'
import params from '../../api/params'

const CreateUser = function () {
	const [showPassword, setShowPassword] = useState(false)
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}
	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}

	const [userName, setUserName] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [password, setPassword] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [role, setRole] = useState({
		value: '',
		message: '',
		ok: false,
	})

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()

		setUserName((prevState) => ({
			...prevState,
			message: validate.isEmpty(prevState.value).message,
			ok: validate.isEmpty(prevState.value).isValid,
		}))
		setPassword((prevState) => ({
			...prevState,
			message: validate.isEmpty(prevState.value).message,
			ok: validate.isEmpty(prevState.value).isValid,
		}))
		setRole((prevState) => ({
			...prevState,
			message: validate.select(prevState.value).message,
			ok: validate.select(prevState.value).isValid,
		}))

		if (userName.ok && password.ok && role.ok) {
			const url = params.URL + params.endpoint.registerNewUser
			const data = {
				username: userName.value,
				password: password.value,
				role: role.value,
			}
			try {
				setLoading(true)
				const response = await api.post(url, data)
				setSuccess(response.data.message)
			} catch (error) {
				setError(error.response.data.message)
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
	}

	const userNameElement = useRef(null)
	const passwordElement = useRef(null)

	return (
		<section className="container">
			{loading && <Loader />}
			{error && <AlertMessage message={error} severity="error" open={true} onClose={() => setError('')} />}
			{success && (
				<AlertMessage
					message={success}
					severity="success"
					open={true}
					onClose={() => {
						userNameElement.current.value = ''
						passwordElement.current.value = ''
						setUserName({ value: '', message: '', ok: false })
						setPassword({ value: '', message: '', ok: false })
						setRole({ value: '', message: '', ok: false })
						setSuccess('')
					}}
				/>
			)}
			<Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
				<TextField
					inputRef={userNameElement}
					type="text"
					id="log-in-username"
					autoComplete="username"
					label="Username"
					helperText={userName.message ? userName.message : ''}
					variant="outlined"
					size="small"
					color={userName.ok ? 'success' : 'secondary'}
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
								{userName.message ? <CancelOutlinedIcon sx={{ color: 'red', marginRight: '-8px' }} /> : null}
							</InputAdornment>
						),
					}}
					onInput={(e) => {
						setUserName((prevState) => ({
							...prevState,
							value: e.target.value,
							message: validate.isEmpty(e.target.value).message,
							ok: validate.isEmpty(e.target.value).isValid,
						}))
					}}
				/>

				<FormControl variant="outlined" size="small" fullWidth margin="none">
					<InputLabel id="select-role-label">Role</InputLabel>
					<Select
						name="Role"
						labelId="select-role"
						label="Role"
						value={role.value}
						onChange={(e) => {
							setRole((prevState) => ({
								...prevState,
								value: e.target.value,
								message: validate.select(e.target.value).message,
								ok: validate.select(e.target.value).isValid,
							}))
						}}
					>
						<MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
						<MenuItem value="ADMIN">ADMIN</MenuItem>
					</Select>
					<FormHelperText>{role.message ? role.message : ''}</FormHelperText>
				</FormControl>

				<TextField
					inputRef={passwordElement}
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
					Create User
				</Button>
			</Box>
		</section>
	)
}

export default CreateUser
