// Desc: This file contains the form for the insurance information.
// It is a part of the multi-step form in the PersonalInfoForm component.

import { TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import 'dayjs/locale/en-gb'

import './personalInfoForm.css'

const InsuranceInfoForm = function ({ activeStep, typeOfInsurance, amount, dateInsuranceStart, dateInsuranceEnd, onInputChange, onDateChange }) {
	let formVisibilityClass = ''
	if (activeStep !== undefined) {
		formVisibilityClass = activeStep === 1 ? 'visible' : 'hidden'
	}

	return (
		<section className={`personal-info-form-wrapper ${formVisibilityClass}`}>
			<h3 className="personal-info-form-title">Insurance Information</h3>
			<div className="personal-info-form-body">
				<div className="personal-info-form-inputs-wrapper">
					<div className="personal-info-form-inputs">
						<div className="personal-info-form-column">
							<FormControl variant="outlined" size="small" fullWidth margin="none">
								<InputLabel id="select-typeOfInsurance-label">Type of insurance</InputLabel>
								<Select
									name="typeOfInsurance"
									labelId="select-typeOfInsurance-label"
									id="select-typeOfInsurance"
									value={typeOfInsurance.value}
									label="Type of insurance"
									onChange={onInputChange}
									color={typeOfInsurance.ok ? 'success' : 'secondary'}
								>
									<MenuItem value="Car Insurance">Car Insurance</MenuItem>
									<MenuItem value="Medical Insurance">Medical Insurance</MenuItem>
									<MenuItem value="Home Insurance">Home Insurance</MenuItem>
									<MenuItem value="Life Insurance">Life Insurance</MenuItem>
									<MenuItem value="Travel Insurance">Travel Insurance</MenuItem>
									<MenuItem value="Pet Insurance">Pet Insurance</MenuItem>
									<MenuItem value="Business Insurance">Business Insurance</MenuItem>
								</Select>
								<FormHelperText>{typeOfInsurance.message ? typeOfInsurance.message : ''}</FormHelperText>
							</FormControl>

							<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
								<DatePicker
									slotProps={{
										field: {
											size: 'small',
											helperText: dateInsuranceStart.message ? dateInsuranceStart.message : '',
											color: dateInsuranceStart.ok ? 'success' : 'secondary',
										},
									}}
									value={dateInsuranceStart.value}
									onChange={(date) => onDateChange(date, 'dateInsuranceStart')}
									label="Valid from"
									margin="none"
									sx={{ width: '100%' }}
								/>
							</LocalizationProvider>
						</div>

						<div className="personal-info-form-column">
							<TextField
								value={amount.value}
								name="amount"
								type="number"
								id="insurance-amount"
								label="Insurance amount"
								helperText={amount.message ? amount.message : ''}
								variant="outlined"
								size="small"
								color={amount.ok ? 'success' : 'secondary'}
								fullWidth
								margin="none"
								onInput={onInputChange}
							/>

							<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
								<DatePicker
									slotProps={{
										field: {
											size: 'small',
											helperText: dateInsuranceEnd.message ? dateInsuranceEnd.message : '',
											color: dateInsuranceEnd.ok ? 'success' : 'secondary',
										},
									}}
									value={dateInsuranceEnd.value}
									onChange={(date) => onDateChange(date, 'dateInsuranceEnd')}
									label="Valid until"
									margin="none"
									sx={{ width: '100%' }}
								/>
							</LocalizationProvider>
						</div>
					</div>
					<div />
				</div>
			</div>
		</section>
	)
}

export default InsuranceInfoForm
