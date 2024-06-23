import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import PersonalInfoForm from '../../UI/PersonalInfoForm'
import InsuranceInfoForm from '../../UI/InsuranceInfoForm'
import AlertDialog from '../../UI/AlertDialog'
import AlertMessage from '../../UI/AlertMessage'
import Loader from '../../UI/Loader'

import validate from '../../validation/validate'
import params from '../../api/params'
import api from '../../api/axiosConf'
import './createInsuredPerson.css'
// the uploaded files or media files for the application

const steps = ['Fill in personal information', 'Fill in the insurance information']

const CreateInsuredPerson = function () {
	const [activeStep, setActiveStep] = useState(0)

	const [image, setImage] = useState(null)
	const handleFileChange = (file) => {
		setImage(file)
	}

	const [firstName, setFirstName] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [lastName, setLastName] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [dateOfBirth, setDateOfBirth] = useState({
		value: null,
		message: '',
		ok: false,
	})
	const [gender, setGender] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [email, setEmail] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [phone, setPhone] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [city, setCity] = useState({
		value: '',
		message: '',
		ok: false,
	})
	const [address, setAddress] = useState({
		value: '',
		message: '',
		ok: false,
	})
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
			case 'dateOfBirth':
				setDateOfBirth((prevState) => ({
					...prevState,
					value: date,
					message: validate.date(date).message,
					ok: validate.date(date).isValid,
				}))
				break
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

	const handleNext = () => {
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
			setActiveStep((prevActiveStep) => prevActiveStep + 1)
		}
	}

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [data, setData] = useState(null)
	const navigate = useNavigate()

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
			const url = `${params.URL}${params.endpoint.createInsuredPerson}`
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
			formData.append('insuranceType', typeOfInsurance.value)
			formData.append('amount', amount.value)
			formData.append('insuranceStartDate', dateInsuranceStart.value.format('DD.MM.YYYY'))
			formData.append('insuranceEndDate', dateInsuranceEnd.value.format('DD.MM.YYYY'))

			try {
				setLoading(true)
				const response = await api.post(url, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				if (response.data.ok) {
					setActiveStep((prevActiveStep) => prevActiveStep + 1)
					setData(response.data.newInsuredPerson)
				}
			} catch (error) {
				setError(error.response.data.message)
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}

	const handleReset = () => {
		setImage(null)
		setFirstName({ value: '', message: '', ok: false })
		setLastName({ value: '', message: '', ok: false })
		setDateOfBirth({ value: null, message: '', ok: false })
		setGender({ value: '', message: '', ok: false })
		setEmail({ value: '', message: '', ok: false })
		setPhone({ value: '', message: '', ok: false })
		setCity({ value: '', message: '', ok: false })
		setAddress({ value: '', message: '', ok: false })
		setTypeOfInsurance({ value: '', message: '', ok: false })
		setAmount({ value: '', message: '', ok: false })
		setDateInsuranceStart({ value: null, message: '', ok: false })
		setDateInsuranceEnd({ value: null, message: '', ok: false })
		setActiveStep(0)
	}

	return (
		<section className="container">
			{loading && <Loader />}
			{error && <AlertMessage message={error} severity="error" open={true} onClose={() => setError('')} />}
			<form className="create-insured-person-form">
				<Box
					sx={{
						width: '80%',
					}}
				>
					<div className="form-slider">
						<PersonalInfoForm
							activeStep={activeStep}
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
						<InsuranceInfoForm
							activeStep={activeStep}
							typeOfInsurance={typeOfInsurance}
							amount={amount}
							dateInsuranceStart={dateInsuranceStart}
							dateInsuranceEnd={dateInsuranceEnd}
							onInputChange={handleInputChange}
							onDateChange={handleDateChange}
						/>
					</div>

					{activeStep < steps.length && (
						<Stepper activeStep={activeStep}>
							{steps.map((label, index) => {
								const stepProps = {}
								const labelProps = {}
								return (
									<Step key={label} {...stepProps}>
										<StepLabel {...labelProps}>{label}</StepLabel>
									</Step>
								)
							})}
						</Stepper>
					)}
					{activeStep === steps.length ? (
						<React.Fragment>
							<AlertDialog
								title="Insured person created successfully"
								content={`The insured person ${data.firstName} ${data.lastName} has been created successfully`}
								open={true}
								closeButtonText="Create another"
								actionButtonText="View profile"
								handleClose={handleReset}
								handleAction={() => navigate(`/person-details/${data._id}`)}
							/>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
							<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
								<Button
									color={activeStep === 0 ? 'inherit' : 'secondary'}
									variant="contained"
									size="small"
									disabled={activeStep === 0}
									onClick={handleBack}
									sx={{ mr: 1, width: '250px' }}
								>
									Back
								</Button>
								<Box sx={{ flex: '1 1 auto' }} />
								<Button
									onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
									variant="contained"
									size="small"
									color={activeStep === steps.length - 1 ? 'success' : 'secondary'}
									sx={{ width: '250px' }}
								>
									{activeStep === steps.length - 1 ? 'CREATE INSURED PERSON' : 'Next'}
								</Button>
							</Box>
						</React.Fragment>
					)}
				</Box>
			</form>
		</section>
	)
}

export default CreateInsuredPerson
