import { useState } from 'react'
import dayjs from 'dayjs'

import PersonalInfoForm from '../../UI/PersonalInfoForm'
import Loader from '../../UI/Loader'
import Button from '@mui/material/Button'
import AlertMessage from '../../UI/AlertMessage'

import validate from '../../validation/validate'
import params from '../../api/params'
import api from '../../api/axiosConf'

const EditCustomersProfile = function ({
	userImage,
	customerFirstName,
	customerLastName,
	customerDateOfBirth,
	customerGender,
	customerEmail,
	customerPhone,
	customerCity,
	customerAddress,
	id,
	handleClose,
	updateData,
}) {
	const [image, setImage] = useState(null)
	const handleFileChange = (file) => {
		setImage(file)
	}
	const [firstName, setFirstName] = useState({
		value: customerFirstName,
		message: '',
		ok: true,
	})
	const [lastName, setLastName] = useState({
		value: customerLastName,
		message: '',
		ok: true,
	})
	const [dateOfBirth, setDateOfBirth] = useState({
		value: dayjs(customerDateOfBirth, 'DD/MM/YYYY'),
		message: '',
		ok: true,
	})
	const [gender, setGender] = useState({
		value: customerGender,
		message: '',
		ok: true,
	})
	const [email, setEmail] = useState({
		value: customerEmail,
		message: '',
		ok: true,
	})
	const [phone, setPhone] = useState({
		value: customerPhone,
		message: '',
		ok: true,
	})
	const [city, setCity] = useState({
		value: customerCity,
		message: '',
		ok: true,
	})
	const [address, setAddress] = useState({
		value: customerAddress,
		message: '',
		ok: true,
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		switch (name) {
			case 'firstName':
				setFirstName((prevState) => ({
					...prevState,
					value: value,
					message: validate.name(value).message,
					ok: validate.name(value).isValid,
				}))
				break
			case 'lastName':
				setLastName((prevState) => ({
					...prevState,
					value: value,
					message: validate.name(value).message,
					ok: validate.name(value).isValid,
				}))
				break
			case 'gender':
				setGender((prevState) => ({
					...prevState,
					value: value,
					message: validate.select(value).message,
					ok: validate.select(value).isValid,
				}))
				break
			case 'email':
				setEmail((prevState) => ({
					...prevState,
					value: value,
					message: validate.email(value).message,
					ok: validate.email(value).isValid,
				}))
				break
			case 'phone':
				setPhone((prevState) => ({
					...prevState,
					value: value,
					message: validate.phone(value).message,
					ok: validate.phone(value).isValid,
				}))
				break
			case 'city':
				setCity((prevState) => ({
					...prevState,
					value: value,
					message: validate.isEmpty(value).message,
					ok: validate.isEmpty(value).isValid,
				}))
				break
			case 'address':
				setAddress((prevState) => ({
					...prevState,
					value: value,
					message: validate.isEmpty(value).message,
					ok: validate.isEmpty(value).isValid,
				}))
				break
			default:
				break
		}
	}

	const handleDateChange = (date, name) => {
		switch (name) {
			case 'dateOfBirth':
				setDateOfBirth((prevState) => ({
					...prevState,
					value: date,
					message: validate.date(date).message,
					ok: validate.date(date).isValid,
				}))
				break
			default:
				break
		}
	}

	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)

	const handleSubmit = async () => {
		setFirstName((prevState) => ({
			...prevState,
			message: validate.name(prevState.value).message,
			ok: validate.name(prevState.value).isValid,
		}))
		setLastName((prevState) => ({
			...prevState,
			message: validate.name(prevState.value).message,
			ok: validate.name(prevState.value).isValid,
		}))
		setDateOfBirth((prevState) => ({
			...prevState,
			message: validate.date(prevState.value).message,
			ok: validate.date(prevState.value).isValid,
		}))
		setGender((prevState) => ({
			...prevState,
			message: validate.select(prevState.value).message,
			ok: validate.select(prevState.value).isValid,
		}))
		setEmail((prevState) => ({
			...prevState,
			message: validate.email(prevState.value).message,
			ok: validate.email(prevState.value).isValid,
		}))
		setPhone((prevState) => ({
			...prevState,
			message: validate.phone(prevState.value).message,
			ok: validate.phone(prevState.value).isValid,
		}))
		setCity((prevState) => ({
			...prevState,
			message: validate.isEmpty(prevState.value).message,
			ok: validate.isEmpty(prevState.value).isValid,
		}))
		setAddress((prevState) => ({
			...prevState,
			message: validate.isEmpty(prevState.value).message,
			ok: validate.isEmpty(prevState.value).isValid,
		}))

		if (firstName.ok && lastName.ok && dateOfBirth.ok && gender.ok && email.ok && phone.ok && city.ok && address.ok) {
			const url = `${params.URL}${params.endpoint.updateInsuredPerson.replace(':id', id)}`
			const formData = new FormData()
			formData.append('profilePicture', image)
			formData.append('firstName', firstName.value)
			formData.append('lastName', lastName.value)
			formData.append('dateOfBirth', dateOfBirth.value.format('DD.MM.YYYY'))
			formData.append('gender', gender.value)
			formData.append('email', email.value)
			formData.append('phone', phone.value)
			formData.append('city', city.value)
			formData.append('address', address.value)

			try {
				setLoading(true)
				const response = await api.put(url, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})

				if (response.data.ok) {
					setSuccess(true)
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
		<div className="container">
			<PersonalInfoForm
				createdCustomerImage={userImage}
				firstName={firstName}
				lastName={lastName}
				dateOfBirth={dateOfBirth}
				gender={gender}
				email={email}
				phone={phone}
				city={city}
				address={address}
				onInputChange={handleInputChange}
				onDateChange={handleDateChange}
				onFileChange={handleFileChange}
				customerImage={image}
			/>
			{loading && <Loader />}
			{error && (
				<AlertMessage
					open={error ? true : false}
					severity={'error'}
					message={error}
					onClose={() => {
						setError('')
					}}
				/>
			)}
			{success && (
				<AlertMessage
					open={success ? true : false}
					severity={'success'}
					message={'Customer profile updated successfully'}
					onClose={() => {
						setSuccess(false)
						handleClose()
					}}
				/>
			)}
			<Button variant="contained" size="small" color="secondary" sx={{ width: '250px' }} onClick={handleSubmit} disabled={loading}>
				Save
			</Button>
		</div>
	)
}

export default EditCustomersProfile
