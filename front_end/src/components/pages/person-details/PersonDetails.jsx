import * as React from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../api/axiosConf'
import useFetchData from '../../api/useFetchData'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

import Loader from '../../UI/Loader'
import FullScreenDialog from '../../UI/Dialog'
import AlertDialog from '../../UI/AlertDialog'
import AddInsurance from './AddInsurance'
import EditCustomersProfile from './EditCustomersProfile'
import EditInsurance from './EditInsurance'

import params from '../../api/params'
import calculateAge from '../../helpers/calculateAge'
import profileImage from '../../images/profile-picture.png'
import './PersonDetails.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#704241',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
}))

const PersonDetails = function () {
	const { id } = useParams()

	const { data, loading, error, updateData } = useFetchData(`${params.URL}${params.endpoint.getInsuredPerson.replace(':id', id)}`)

	// logic for handling dialog open and close
	const [dialogData, setDialogData] = useState(null)
	const handleDialogOpen = (buttonType) => {
		setDialogData(buttonType)
	}
	const handleDialogClose = () => {
		setInsuranceIdToDelete(null)
		setDialogData(null)
	}

	const [processing, setProcessing] = useState(false)
	// logic for handling delete insurance
	const [insuranceIdToDelete, setInsuranceIdToDelete] = React.useState(null)

	const handleDeleteInsurance = async () => {
		const url = `${params.URL}${params.endpoint.deleteInsuranceFromPerson.replace(':insuranceId', insuranceIdToDelete).replace(':personId', id)}`

		try {
			setProcessing(true)
			const response = await api.delete(url)
			if (response.data.error) {
				console.log(response.data.error.message)
			}
			setInsuranceIdToDelete(null)
			setDialogData(null)
			updateData()
		} catch (error) {
			console.log(error)
		} finally {
			setProcessing(false)
		}
	}

	// logic for handling delete person
	const navigate = useNavigate()
	const handleDeletePerson = async () => {
		const url = `${params.URL}${params.endpoint.deleteInsuredPerson.replace(':id', id)}`

		try {
			setProcessing(true)
			const response = await api.delete(url)
			if (response.data.error) {
				console.log(response.data.error.message)
			} else {
				navigate('/')
			}
		} catch (error) {
			console.log(error)
		} finally {
			setProcessing(false)
		}
	}

	const [InsuranceIndex, setInsuranceIndex] = useState(null)

	return (
		<section className="container">
			{(loading || processing) && <Loader />}
			{error && <p>error</p>}
			{data && data.error && <p>{data.error.message}</p>}
			{data && !data.error && (
				<div className="person-details">
					{dialogData === 'addInsurance' && (
						<FullScreenDialog
							handleClose={handleDialogClose}
							title={`Add insurance to ${data.insuredPerson.firstName} ${data.insuredPerson.lastName}`}
							content={<AddInsurance personId={id} handleClose={handleDialogClose} updateData={updateData} />}
							open={true}
						/>
					)}
					{dialogData === 'editProfile' && (
						<FullScreenDialog
							open={true}
							handleClose={handleDialogClose}
							title={`Edit profile of ${data.insuredPerson.firstName} ${data.insuredPerson.lastName}`}
							content={
								<EditCustomersProfile
									userImage={data.insuredPerson.profilePicture && data.insuredPerson.profilePicture}
									customerFirstName={data.insuredPerson.firstName}
									customerLastName={data.insuredPerson.lastName}
									customerDateOfBirth={data.insuredPerson.dateOfBirth}
									customerGender={data.insuredPerson.gender}
									customerEmail={data.insuredPerson.email}
									customerPhone={data.insuredPerson.phone}
									customerCity={data.insuredPerson.city}
									customerAddress={data.insuredPerson.address}
									id={id}
									handleClose={handleDialogClose}
									updateData={updateData}
								/>
							}
						/>
					)}
					{dialogData === 'deleteProfile' && (
						<AlertDialog
							open={true}
							handleClose={handleDialogClose}
							title={`Delete ${data.insuredPerson.firstName} ${data.insuredPerson.lastName}`}
							content={'Are you sure you want to delete this profile?'}
							handleAction={handleDeletePerson}
						/>
					)}
					{dialogData === 'editIsurance' && (
						<FullScreenDialog
							open={true}
							handleClose={handleDialogClose}
							title="Edit Insurance"
							content={
								<EditInsurance
									insuranceType={data.insuredPerson.insurances[InsuranceIndex].insuranceType}
									insuranceAmount={data.insuredPerson.insurances[InsuranceIndex].amount}
									insuranceStart={data.insuredPerson.insurances[InsuranceIndex].insuranceStartDate}
									insuranceEnd={data.insuredPerson.insurances[InsuranceIndex].insuranceEndDate}
									id={data.insuredPerson.insurances[InsuranceIndex]._id}
									handleClose={handleDialogClose}
									updateData={updateData}
								/>
							}
						/>
					)}
					{dialogData === 'deleteIsurance' && (
						<AlertDialog
							open={true}
							handleClose={handleDialogClose}
							title={'Delete Insurance'}
							content={'Are you sure you want to delete this insurance?'}
							handleAction={handleDeleteInsurance}
						/>
					)}

					<div className="person-personal-details">
						<div className="profile-image-wrapper">
							<img
								className="profile-image"
								src={data.insuredPerson.profilePicture ? `${params.URL}/${data.insuredPerson.profilePicture}` : profileImage}
								alt="Selected"
							/>
						</div>
						<div className="person-info">
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 700 }} aria-label="customized table">
									<TableHead>
										<TableRow>
											<StyledTableCell>Full Name</StyledTableCell>
											<StyledTableCell align="right">Date Of Birth</StyledTableCell>
											<StyledTableCell align="right">Age</StyledTableCell>
											<StyledTableCell align="right">Gender</StyledTableCell>
											<StyledTableCell align="right">Email</StyledTableCell>
											<StyledTableCell align="right">Phone Number</StyledTableCell>
											<StyledTableCell align="right">City</StyledTableCell>
											<StyledTableCell align="right">Address</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<React.Fragment key={data.insuredPerson._id}>
											<StyledTableRow key={data.insuredPerson._id}>
												<StyledTableCell component="th" scope="row">
													{data.insuredPerson.firstName} {data.insuredPerson.lastName}
												</StyledTableCell>
												<StyledTableCell align="right">{data.insuredPerson.dateOfBirth}</StyledTableCell>
												<StyledTableCell align="right">{calculateAge(data.insuredPerson.dateOfBirth)}</StyledTableCell>
												<StyledTableCell align="right">{data.insuredPerson.gender}</StyledTableCell>
												<StyledTableCell align="right">{data.insuredPerson.email}</StyledTableCell>
												<StyledTableCell align="right">{data.insuredPerson.phone}</StyledTableCell>
												<StyledTableCell align="right">{data.insuredPerson.city}</StyledTableCell>
												<StyledTableCell align="right">{data.insuredPerson.address}</StyledTableCell>
											</StyledTableRow>
										</React.Fragment>
									</TableBody>
								</Table>
							</TableContainer>
							<div className="person-info-buttons">
								<Button
									variant="contained"
									size="small"
									color="secondary"
									sx={{ width: '180px' }}
									onClick={() => handleDialogOpen('addInsurance')}
								>
									Add Insurance
								</Button>
								<Button
									variant="contained"
									size="small"
									color="secondary"
									sx={{ width: '180px' }}
									onClick={() => handleDialogOpen('editProfile')}
								>
									Edit
								</Button>
								<Button
									variant="contained"
									size="small"
									color="secondary"
									sx={{ width: '180px' }}
									onClick={() => handleDialogOpen('deleteProfile')}
								>
									Delete
								</Button>
							</div>
						</div>
					</div>
					<Divider flexItem />
					<div className="person-insuranses">
						{data.insuredPerson.insurances.map((insurance, index) => {
							const formattedAmount = new Intl.NumberFormat('cz-CZ', {
								style: 'currency',
								currency: 'CZK',
							}).format(insurance.amount)
							return (
								<Paper
									key={insurance._id}
									sx={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										gap: '30px',
										padding: '20px',
									}}
									elevation={4}
								>
									<h4>{insurance.insuranceType}</h4>
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 700 }} aria-label="customized table">
											<TableHead>
												<TableRow>
													<StyledTableCell>Insurance Amount</StyledTableCell>
													<StyledTableCell align="right">Insurance Start Date</StyledTableCell>
													<StyledTableCell align="right">Insurance End Date</StyledTableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												<StyledTableRow key={insurance._id}>
													<StyledTableCell component="th" scope="row">
														{formattedAmount}
													</StyledTableCell>
													<StyledTableCell align="right">{insurance.insuranceStartDate}</StyledTableCell>
													<StyledTableCell align="right">{insurance.insuranceEndDate}</StyledTableCell>
												</StyledTableRow>
											</TableBody>
										</Table>
									</TableContainer>
									<div
										style={{
											width: '100%',
											display: 'flex',
											gap: '20px',
										}}
									>
										<Button
											data-insurance-index={index}
											variant="contained"
											size="small"
											color="primary"
											sx={{ width: '180px' }}
											onClick={(e) => {
												handleDialogOpen('editIsurance')
												setInsuranceIndex(e.target.getAttribute('data-insurance-index'))
											}}
										>
											Edit Insurance
										</Button>

										<Button
											data-insurance-id={insurance._id}
											variant="contained"
											size="small"
											color="primary"
											sx={{ width: '180px' }}
											onClick={(e) => {
												handleDialogOpen('deleteIsurance')
												setInsuranceIdToDelete(e.target.getAttribute('data-insurance-id'))
											}}
										>
											Delete Insurance
										</Button>
									</div>
								</Paper>
							)
						})}
					</div>
				</div>
			)}
		</section>
	)
}

export default PersonDetails
