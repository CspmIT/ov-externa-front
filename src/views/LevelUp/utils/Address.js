import { request } from '../../../utils/request'

export const getProvinces = async () => {
	try {
		const url = import.meta.env.VITE_APP_API_URL + '/listState'
		const res = await request(url, 'GET')
		const provincias = res.data
			.map((item) => {
				return { id: item.id, cod_pro: item.cod_pro, name: item.des_pro }
			})
			.sort((a, b) => a.name.localeCompare(b.name))
		// Una vez que obtengo las provincias, las guardo en el estado

		return provincias
	} catch (error) {
		console.error({ message: error.message })
	}
}

export const listCityXIdState = async (idProvincia) => {
	try {
		const url = `${import.meta.env.VITE_APP_API_URL}/listCity/?id=${idProvincia}`
		const res = await request(url, 'GET')
		const localidades = res.data
			.map((item) => {
				return { id: item.id, name: `${item.des_loc} - CP : ${item.cod_pos}` }
			})
			.sort((a, b) => a.name.localeCompare(b.name))
		return localidades
	} catch (error) {
		console.error({ message: error.message })
	}
}
export const listStreetXIdCity = async (idCity) => {
	try {
		const url = `${import.meta.env.VITE_APP_API_URL}/listStreet/?id=${idCity}`
		const res = await request(url, 'GET')
		const Calles = res.data
			.map((item) => {
				return { id: item.id, name: item.name }
			})
			.sort((a, b) => a.name.localeCompare(b.name))
		return Calles
		// setStreets(Calles)
	} catch (error) {
		console.error({ message: error.message })
	}
}
export const getAllStreet = async () => {
	try {
		const url = `${import.meta.env.VITE_APP_API_URL}/allStreet`
		const res = await request(url, 'GET')
		const Calles = res.data
			.map((item) => {
				return { id: item.COD_CAL, name: item.DES_CAL }
			})
			.sort((a, b) => a.name.localeCompare(b.name))
		return Calles
	} catch (error) {
		console.error({ message: error.message })
	}
}
