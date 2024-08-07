import { useEffect, useState } from 'react'
import { request } from '../utils/request'

const GetIp = () => {
	const [ip, setIp] = useState('')
	useEffect(() => {
		async function getIp() {
			const baseURL = import.meta.env.VITE_APP_API_URL
			const url = `${baseURL}/getIp`
			const response = await request(url, 'GET')
			const { ip } = response.data
			setIp(ip)
		}
		try {
			getIp()
		} catch (error) {
			console.error('Error al obtenr la IP:', error)
		}
	}, [])

	return (
		<div>
			{ip}
			{import.meta.env.VITE_APP_TEST}
		</div>
	)
}

export default GetIp
