// Desc: Employee routes for the application

import { Route, Routes } from 'react-router-dom'

import Main from '../components/pages/Main'
import About from '../components/pages/About'
import CreateInsuredPerson from '../components/pages/create-insured-person/CreateInsuredPerson'
import PersonDetails from '../components/pages/person-details/PersonDetails'
import PageNotFound from '../components/pages/PageNotFound'

const EmployeeRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Main />} />
			<Route path="/about" element={<About />} />
			<Route path="/create-insured-person" element={<CreateInsuredPerson />} />
			<Route path="/person-details/:id" element={<PersonDetails />} />
			<Route path="*" element={<PageNotFound description="main" />} />
		</Routes>
	)
}

export default EmployeeRoutes
