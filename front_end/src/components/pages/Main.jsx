// Desc: Main page component for the application
// contains the table for displaying data all insured persons

import CustomizedTables from '../UI/Table'
import Loader from '../UI/Loader'

import params from '../api/params'
import useFetchData from '../api/useFetchData'

const Main = function () {
	const { data, loading } = useFetchData(params.URL + params.endpoint.getInsuredPersons)

	return (
		<>
			{loading && <Loader />}
			{data && <CustomizedTables data={data} />}
		</>
	)
}

export default Main
