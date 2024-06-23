const params = {
	URL: 'http://localhost:5000',

	endpoint: {
		getInsuredPersons: '/api/get-insured-persons',
		getInsuredPerson: '/api/get-insured-person/:id',
		createInsuredPerson: '/api/create-insured-person',
		addInsuranceToPerson: '/api/add-insurance-to-person/:id',
		updateInsuredPerson: '/api/update-insured-person/:id',
		updateInsurance: '/api/update-insurance/:id',
		deleteInsuredPerson: '/api/delete-insured-person/:id',
		deleteInsuranceFromPerson: '/api/delete-insurance/:insuranceId/from/:personId',

		login: '/auth/login',
		logout: '/auth/logout',
		refresh: '/auth/refresh',

		registerNewUser: '/users/create-user',
		getAllUsers: '/users/get-all-users',
		updateUser: '/users/update-user/:id',
		deleteUser: '/users/delete-user/:id',
	},
}

export default params
