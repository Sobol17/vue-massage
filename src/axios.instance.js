import router from '@/router'
import axios from 'axios'
const axiosInst = axios.create({
	baseURL: '',
	headers: {
		Accept: 'application/json',
	},
	withCredentials: true,
})

axiosInst.interceptors.request.use(
	config => {
		const token = localStorage.getItem('access_token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

axiosInst.interceptors.response.use(
	async response => {
		const delay = 300
		await new Promise(resolve => setTimeout(resolve, delay))
		return response
	},
	error => {
		if (
			(error.response && error.response.status === 401) ||
			(error.response.status === 403 &&
				router.currentRoute.value.path !== '/login')
		) {
			localStorage.removeItem('access_token')
			sessionStorage.removeItem('access_token')
			router.push({ name: 'login' })
		}
		return Promise.reject(error)
	}
)

export default axiosInst
