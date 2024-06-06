import React, { useEffect } from 'react'
import { request } from '../../utils/request'

const PopUp = () => {
	const dataUser = async () => {
		const response = await request(import.meta.env.VITE_APP_API_URL + '/activePopups', 'GET')
		if (response.status !== 200) throw new Error('Error en consulta')
		// const data = response.data
	}
	useEffect(() => {
		dataUser()
	}, [])
	return <div>PopUp</div>
}

export default PopUp
