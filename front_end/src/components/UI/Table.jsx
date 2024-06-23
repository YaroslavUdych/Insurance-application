// Desc: Table component for displaying data in a table format in the Main page

import * as React from 'react'
import { useState } from 'react'

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

import { Link } from 'react-router-dom'

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

export default function CustomizedTables({ data }) {
	const [filter, setFilter] = useState('')

	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

	const rows = data?.insuredPersons || []

	const filteredRows = rows.filter((element) => `${element.firstName} ${element.lastName}`.toLowerCase().includes(filter.toLowerCase()))

	return (
		<section className="container">
			<TextField
				fullWidth
				size="small"
				label="Search by full name"
				color="secondary"
				variant="outlined"
				value={filter}
				onChange={handleFilterChange}
				InputProps={{
					endAdornment: <SearchIcon />,
				}}
			/>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 700 }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Full name</StyledTableCell>
							<StyledTableCell align="right">Insurance Type</StyledTableCell>
							<StyledTableCell align="right">Insurance Amount</StyledTableCell>
							<StyledTableCell align="right">Insurance Start Date</StyledTableCell>
							<StyledTableCell align="right">Insurance End Date</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredRows.map((row) => (
							<React.Fragment key={row._id}>
								{row.insurances.length > 0 ? (
									row.insurances.map((insurance, index) => {
										const formattedAmount = new Intl.NumberFormat('cz-CZ', {
											style: 'currency',
											currency: 'CZK',
										}).format(insurance.amount)
										return (
											<StyledTableRow key={`${row._id}-${insurance._id}`}>
												{index === 0 ? (
													<StyledTableCell component="th" scope="row">
														<Link to={`/person-details/${row._id}`}>{`${row.firstName} ${row.lastName}`}</Link>
													</StyledTableCell>
												) : (
													<StyledTableCell />
												)}
												<StyledTableCell align="right">{insurance.insuranceType}</StyledTableCell>
												<StyledTableCell align="right">{formattedAmount}</StyledTableCell>
												<StyledTableCell align="right">{insurance.insuranceStartDate}</StyledTableCell>
												<StyledTableCell align="right">{insurance.insuranceEndDate}</StyledTableCell>
											</StyledTableRow>
										)
									})
								) : (
									<StyledTableRow key={row._id}>
										<StyledTableCell component="th" scope="row">
											<Link to={`/person-details/${row._id}`}>{`${row.firstName} ${row.lastName}`}</Link>
										</StyledTableCell>
										<StyledTableCell align="right">No Insurance</StyledTableCell>
										<StyledTableCell align="right">-</StyledTableCell>
										<StyledTableCell align="right">-</StyledTableCell>
										<StyledTableCell align="right">-</StyledTableCell>
									</StyledTableRow>
								)}
							</React.Fragment>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</section>
	)
}
