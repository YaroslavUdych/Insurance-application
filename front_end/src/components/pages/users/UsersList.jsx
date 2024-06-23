import { useState } from 'react'
import useFetchData from '../../api/useFetchData'
import api from '../../api/axiosConf'
import params from '../../api/params'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'
import FullScreenDialog from '../../UI/Dialog'
import EditUser from './EditUser'

import AlertDialog from '../../UI/AlertDialog'
import AlertMessage from '../../UI/AlertMessage'
import Loader from '../../UI/Loader'

const UsersList = function () {
	const { data, loading, error, updateData } = useFetchData(`${params.URL}${params.endpoint.getAllUsers}`, 'GET', null, {
		username: JSON.parse(localStorage.getItem('userData')).username,
	})

	const [dialogOpen, setDialogOpen] = useState(false)
	const [fullScreenDialogOpen, setFullScreenDialogOpen] = useState(false)
	const [userId, setUserId] = useState('')
	const [username, setUsername] = useState('')
	const [userRole, setUserRole] = useState('')
	const [processing, setProcessing] = useState(false)
	const [success, setSuccess] = useState('')
	const [deleteError, setDeleteError] = useState('')

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

	const handleDeleteUser = async () => {
		const url = `${params.URL}${params.endpoint.deleteUser.replace(':id', userId)}`
		try {
			setProcessing(true)
			const response = await api.delete(url)
			if (response.data.ok) {
				setSuccess(response.data.message)
				updateData()
			} else {
				setDeleteError(response.data.message)
			}
		} catch (error) {
			setDeleteError(error.message)
		} finally {
			setProcessing(false)
			setUserId('')
			setUsername('')
		}
	}

	return (
		<section className="container">
			<AlertDialog
				open={dialogOpen}
				handleClose={() => {
					setDialogOpen(false)
				}}
				title={`Are you sure you want to delete user ${username}?`}
				content="This action cannot be undone"
				handleAction={handleDeleteUser}
			/>
			<FullScreenDialog
				open={fullScreenDialogOpen}
				handleClose={() => {
					setFullScreenDialogOpen(false)
				}}
				title={`Edit user ${username}`}
				content={
					<EditUser
						userCurrentRole={userRole}
						id={userId}
						handleClose={() => {
							setFullScreenDialogOpen(false)
						}}
						updateData={updateData}
					/>
				}
			/>
			{(loading || processing) && <Loader />}
			{success && <AlertMessage message={success} severity="success" open={success} onClose={() => setSuccess('')} />}
			{error && <p>{error}</p>}
			{deleteError && (
				<AlertMessage
					message={deleteError}
					severity="error"
					open={deleteError}
					onClose={() => {
						setDeleteError('')
					}}
				/>
			)}
			{data && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>User Name</StyledTableCell>
								<StyledTableCell>Role</StyledTableCell>
								<StyledTableCell colSpan={2}>Actions</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.users.map((user) => (
								<StyledTableRow key={user._id}>
									<StyledTableCell>{user.username}</StyledTableCell>
									<StyledTableCell>{user.role}</StyledTableCell>
									<StyledTableCell width={200}>
										<Button
											variant="contained"
											size="small"
											fullWidth
											color="primary"
											data-user-id={user._id}
											data-username={user.username}
											data-user-role={user.role}
											disabled={processing}
											onClick={(e) => {
												setUserId(e.target.dataset.userId)
												setUsername(e.target.dataset.username)
												setUserRole(e.target.dataset.userRole)
												setFullScreenDialogOpen(true)
											}}
										>
											Edit
										</Button>
									</StyledTableCell>
									<StyledTableCell width={200}>
										<Button
											variant="contained"
											size="small"
											fullWidth
											color="secondary"
											data-user-id={user._id}
											data-username={user.username}
											disabled={processing}
											onClick={(e) => {
												setUserId(e.target.dataset.userId)
												setUsername(e.target.dataset.username)
												setDialogOpen(true)
											}}
										>
											Delete
										</Button>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</section>
	)
}

export default UsersList
