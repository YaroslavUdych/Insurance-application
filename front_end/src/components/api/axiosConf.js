import axios from 'axios'
import params from './params'

const api = axios.create({
	baseURL: params.URL,
	withCredentials: true,
})

// Add a request interceptor
api.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
	return config
})

// Add a response interceptor
api.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config
		if (error.response.status === 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true
			try {
				const response = await axios.get(params.URL + params.endpoint.refresh, {
					withCredentials: true,
				})
				localStorage.setItem('accessToken', response.data.accessToken)
				return api.request(originalRequest)
			} catch (error) {
				console.log(error)
			}
		}
		return Promise.reject(error)
	}
)

export default api
