import axios from 'axios'
// import { storage } from '../storage/storage'
export const request = async (url, method, data = false) => {
	if (!url || !method) {
		throw new Error('URL o método no proporcionados')
	}

	try {
		const response = await axios({
			method,
			url,
			data: data || {},
			withCredentials: true,
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		})
		return response
	} catch (error) {
		console.error('Error al enviar la solicitud:', error.response ? error.response.data : error.message)
		throw error
	}
}
export const requestApiExt = async (url, method, data = false) => {
	if (!url || !method) {
		throw new Error('URL o método no proporcionados')
	}

	try {
		const response = await axios({
			method,
			url,
			data: data || {},
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		})
		return response
	} catch (error) {
		console.error('Error al enviar la solicitud:', error.response ? error.response.data : error.message)
		throw error
	}
}

export const requestFiles = async (url, method, data = false) => {
	if (!url || !method) {
		throw new Error('URL o método no proporcionados')
	}

	try {
		const response = await axios({
			method,
			url,
			data: data || {},
			headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
		})
		return response
	} catch (error) {
		console.error('Error al enviar la solicitud:', error.response ? error.response.data : error.message)
		throw error
	}
}
