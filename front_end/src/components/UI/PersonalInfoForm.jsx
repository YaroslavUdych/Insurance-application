// Desc: PersonalInfoForm component to display the personal information form
// as part of the multi-step form.

import { TextField, InputAdornment, Select, MenuItem, InputLabel, FormControl, FormHelperText, Button } from '@mui/material'

import { styled } from '@mui/material/styles'

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import 'dayjs/locale/en-gb'

import './personalInfoForm.css'
import ProfileDefaultPicture from '../images/profile-picture.png'
import params from '../api/params'

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
})

const PersonalInfoForm = function ({
	activeStep,
	customerImage,
	createdCustomerImage,
	firstName,
	lastName,
	dateOfBirth,
	gender,
	email,
	phone,
	city,
	address,
	onInputChange,
	onDateChange,
	onFileChange,
}) {
	const handleFileChange = (event) => {
		const file = event.target.files[0]
		onFileChange(file)
	}

	let formVisibilityClass = ''
	if (activeStep !== undefined) {
		formVisibilityClass = activeStep === 0 ? 'visible' : 'hidden'
	}

	return (
		<section className={`personal-info-form-wrapper ${formVisibilityClass}`}>
			<h3 className="personal-info-form-title">Personal Information</h3>
			<div className="personal-info-form-body">
				<div className="personal-info-form-profile-picture">
					<div className="profile-image-wrapper">
						<img
							className="profile-image"
							src={
								customerImage || createdCustomerImage
									? customerImage
										? URL.createObjectURL(customerImage)
										: `${params.URL}/${createdCustomerImage}`
									: ProfileDefaultPicture
							}
							alt="Profile"
						/>
					</div>

					<div className="personal-info-form-upload">
						<label htmlFor="file-upload">
							<VisuallyHiddenInput id="file-upload" type="file" accept="image/*" onChange={handleFileChange} />
							<Button
								variant="contained"
								component="span"
								startIcon={<CloudUploadIcon />}
								size="small"
								color="primary"
								sx={{
									width: '100%',
								}}
							>
								Upload Profile Picture
							</Button>
						</label>
					</div>
				</div>

				<div className="personal-info-form-inputs-wrapper">
					<div className="personal-info-form-inputs">
						<div className="personal-info-form-column">
							<TextField
								value={firstName.value}
								name="firstName"
								autoComplete="off"
								type="text"
								id="first-name"
								label="First name"
								helperText={firstName.message ? firstName.message : ''}
								variant="outlined"
								size="small"
								color={firstName.ok ? 'success' : 'secondary'}
								fullWidth
								margin="none"
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">
											{firstName.ok ? <CheckCircleOutlineOutlinedIcon sx={{ color: 'green', marginRight: '-8px' }} /> : null}
											{firstName.message ? <CancelOutlinedIcon sx={{ color: 'red', marginRight: '-8px' }} /> : null}
										</InputAdornment>
									),
								}}
								onInput={onInputChange}
							/>
							<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
								<DatePicker
									slotProps={{
										field: {
											size: 'small',
											helperText: dateOfBirth.message ? dateOfBirth.message : '',
											color: dateOfBirth.ok ? 'success' : 'secondary',
										},
									}}
									value={dateOfBirth.value}
									onChange={(date) => onDateChange(date, 'dateOfBirth')}
									name="dateOfBirth"
									label="Date of birth"
									margin="none"
									sx={{ width: '100%' }}
								/>
							</LocalizationProvider>
							<TextField
								value={email.value}
								name="email"
								autoComplete="off"
								type="email"
								id="email"
								label="Email"
								helperText={email.message ? email.message : ''}
								variant="outlined"
								size="small"
								color={email.ok ? 'success' : 'secondary'}
								fullWidth
								margin="none"
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">
											{email.ok ? <CheckCircleOutlineOutlinedIcon sx={{ color: 'green', marginRight: '-8px' }} /> : null}
											{email.message ? <CancelOutlinedIcon sx={{ color: 'red', marginRight: '-8px' }} /> : null}
										</InputAdornment>
									),
								}}
								onInput={onInputChange}
							/>

							<TextField
								value={city.value}
								name="city"
								autoComplete="off"
								type="text"
								id="city"
								label="City"
								helperText={city.message ? city.message : ''}
								variant="outlined"
								size="small"
								color={city.ok ? 'success' : 'secondary'}
								fullWidth
								margin="none"
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">
											{city.ok ? <CheckCircleOutlineOutlinedIcon sx={{ color: 'green', marginRight: '-8px' }} /> : null}
											{city.message ? <CancelOutlinedIcon sx={{ color: 'red', marginRight: '-8px' }} /> : null}
										</InputAdornment>
									),
								}}
								onInput={onInputChange}
							/>
						</div>

						<div className="personal-info-form-column">
							<TextField
								value={lastName.value}
								name="lastName"
								autoComplete="off"
								type="text"
								id="last-name"
								label="Last name"
								helperText={lastName.message ? lastName.message : ''}
								variant="outlined"
								size="small"
								color={lastName.ok ? 'success' : 'secondary'}
								fullWidth
								margin="none"
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">
											{lastName.ok ? <CheckCircleOutlineOutlinedIcon sx={{ color: 'green', marginRight: '-8px' }} /> : null}
											{lastName.message ? <CancelOutlinedIcon sx={{ color: 'red', marginRight: '-8px' }} /> : null}
										</InputAdornment>
									),
								}}
								onInput={onInputChange}
							/>

							<FormControl variant="outlined" size="small" fullWidth margin="none">
								<InputLabel id="select-gender-label">Gender</InputLabel>
								<Select name="gender" labelId="select-gender" label="Gender" value={gender.value} onChange={onInputChange}>
									<MenuItem value="Male">Male</MenuItem>
									<MenuItem value="Female">Female</MenuItem>
								</Select>
								<FormHelperText>{gender.message ? gender.message : ''}</FormHelperText>
							</FormControl>

							<TextField
								value={phone.value}
								name="phone"
								autoComplete="off"
								type="tel"
								id="phone"
								label="Phone number"
								helperText={phone.message ? phone.message : ''}
								variant="outlined"
								size="small"
								color={phone.ok ? 'success' : 'secondary'}
								fullWidth
								margin="none"
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">
											{phone.ok ? <CheckCircleOutlineOutlinedIcon sx={{ color: 'green', marginRight: '-8px' }} /> : null}
											{phone.message ? <CancelOutlinedIcon sx={{ color: 'red', marginRight: '-8px' }} /> : null}
										</InputAdornment>
									),
								}}
								onInput={onInputChange}
							/>

							<TextField
								value={address.value}
								name="address"
								autoComplete="off"
								type="text"
								id="address"
								label="Address"
								helperText={address.message ? address.message : ''}
								variant="outlined"
								size="small"
								color={address.ok ? 'success' : 'secondary'}
								fullWidth
								margin="none"
								InputProps={{
									endAdornment: (
										<InputAdornment position="start">
											{address.ok ? <CheckCircleOutlineOutlinedIcon sx={{ color: 'green', marginRight: '-8px' }} /> : null}
											{address.message ? <CancelOutlinedIcon sx={{ color: 'red', marginRight: '-8px' }} /> : null}
										</InputAdornment>
									),
								}}
								onInput={onInputChange}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default PersonalInfoForm
