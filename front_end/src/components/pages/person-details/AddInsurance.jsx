import { useState } from 'react'

import InsuranceInfoForm from '../../UI/InsuranceInfoForm'
import Loader from '../../UI/Loader'
import Button from '@mui/material/Button'
import AlertMessage from '../../UI/AlertMessage'

import validate from '../../validation/validate'
import params from '../../api/params'
import api from '../../api/axiosConf'

const AddInsurance = function ({ personId, handleClose, updateData }) {
	const [typeOfInsurance, setTypeOfInsurance] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [amount, setAmount] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [dateInsuranceStart, setDateInsuranceStart] = useState({
		value: null,
		message: '',
		ok: false,
	})
	const [dateInsuranceEnd, setDateInsuranceEnd] = useState({
		value: null,
		message: '',
		ok: false,
	})

	const handleInputChange = (e) => {
		const { name, value } = e.target
		switch (name) {
			case 'typeOfInsurance':
				setTypeOfInsurance((prevState) => ({
					...prevState,
					value: value,
					message: validate.select(value).message,
					ok: validate.select(value).isValid,
				}))
				break
			case 'amount':
				setAmount((prevState) => ({
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
			case 'dateInsuranceStart':
				setDateInsuranceStart((prevState) => ({
					...prevState,
					value: date,
					message: validate.date(date).message,
					ok: validate.date(date).isValid,
				}))
				break
			case 'dateInsuranceEnd':
				setDateInsuranceEnd((prevState) => ({
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
		setTypeOfInsurance((prevState) => ({
			...prevState,
			message: validate.select(prevState.value).message,
			ok: validate.select(prevState.value).isValid,
		}))
		setAmount((prevState) => ({
			...prevState,
			message: validate.isEmpty(prevState.value).message,
			ok: validate.isEmpty(prevState.value).isValid,
		}))
		setDateInsuranceStart((prevState) => ({
			...prevState,
			message: validate.date(prevState.value).message,
			ok: validate.date(prevState.value).isValid,
		}))
		setDateInsuranceEnd((prevState) => ({
			...prevState,
			message: validate.date(prevState.value).message,
			ok: validate.date(prevState.value).isValid,
		}))

		if (typeOfInsurance.ok && amount.ok && dateInsuranceStart.ok && dateInsuranceEnd.ok) {
			const url = `${params.URL}${params.endpoint.addInsuranceToPerson.replace(':id', personId)}`
			const body = {
				insuranceType: typeOfInsurance.value,
				amount: amount.value,
				insuranceStartDate: dateInsuranceStart.value.format('DD.MM.YYYY'),
				insuranceEndDate: dateInsuranceEnd.value.format('DD.MM.YYYY'),
			}

			try {
				setLoading(true)
				const response = await api.post(url, body)
				if (response.status === 200) {
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
		<section className="container">
			<InsuranceInfoForm
				typeOfInsurance={typeOfInsurance}
				amount={amount}
				dateInsuranceStart={dateInsuranceStart}
				dateInsuranceEnd={dateInsuranceEnd}
				onInputChange={handleInputChange}
				onDateChange={handleDateChange}
			/>
			{loading && <Loader />}
			{error && (
				<AlertMessage
					open={error ? true : false}
					message={error}
					severity="error"
					onClose={() => {
						setError('')
					}}
				/>
			)}
			{success && (
				<AlertMessage
					open={success ? true : false}
					message="Insurance added successfully"
					severity="success"
					onClose={() => {
						setSuccess(false)
						handleClose()
					}}
				/>
			)}

			<Button
				variant="contained"
				size="small"
				color="secondary"
				sx={{ width: '250px' }}
				onClick={handleSubmit}
				disabled={loading}
			>
				Add Insurance
			</Button>
		</section>
	)
}

export default AddInsurance
