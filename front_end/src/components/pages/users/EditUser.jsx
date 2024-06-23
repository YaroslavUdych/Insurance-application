import { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from '@mui/material'
import AlertMessage from '../../UI/AlertMessage'
import Loader from '../../UI/Loader'
import api from '../../api/axiosConf'
import params from '../../api/params'
import validate from '../../validation/validate'

const EditUser = function ({ userCurrentRole, id, handleClose, updateData }) {
	const [role, setRole] = useState({
		value: userCurrentRole,
		message: '',
		ok: true,
	})

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState('')
	const [error, setError] = useState('')

	const handleUpdateUser = async () => {
		setRole((prevState) => ({
			...prevState,
			message: validate.select(role.value).message,
			ok: validate.select(role.value).isValid,
		}))
		if (role.ok) {
			const url = `${params.URL}${params.endpoint.updateUser.replace(':id', id)}`
			const data = {
				role: role.value,
			}
			try {
				setLoading(true)
				const response = await api.put(url, data)
				if (response.data.ok) {
					setSuccess(response.data.message)
					updateData()
				} else {
					setError(response.data.message)
				}
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
	}

	return (
		<section className="container">
			{loading && <Loader />}
			{success && (
				<AlertMessage
					message={success}
					severity="success"
					open={success}
					onClose={() => {
						setSuccess('')
						handleClose()
					}}
				/>
			)}
			{error && <AlertMessage message={error} severity="error" open={error} onClose={() => setError('')} />}
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
			<Button variant="contained" size="small" color="primary" sx={{ width: '280px' }} disabled={loading} onClick={handleUpdateUser}>
				Save
			</Button>
		</section>
	)
}

export default EditUser
