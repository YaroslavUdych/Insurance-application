import { useState, useEffect } from 'react'
import api from './axiosConf'

const useFetchData = (url, method = 'GET', body = null, headers = {}) => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [update, setUpdate] = useState(false)

	const updateData = () => {
		setUpdate((prev) => !prev)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				let response
				switch (method) {
					case 'GET':
						response = await api.get(url, { headers })
						break
					case 'POST':
						response = await api.post(url, body, { headers })
						break
					case 'PUT':
						response = await api.put(url, body, { headers })
						break
					case 'DELETE':
						response = await api.delete(url, { headers })
						break
					default:
						break
				}
				setData(response.data)
			} catch (error) {
				setError(error.response.data.message || error.message)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [url, method, body, update])

	return { data, loading, error, updateData }
}

export default useFetchData
