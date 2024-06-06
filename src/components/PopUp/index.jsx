import React, { useContext, useEffect, useState } from 'react'
import { request } from '../../utils/request'
import { UserContext } from '../../contexts/UserContext'

const PopUp = () => {
	const [showModal, setShowModal] = useState(false)
	const { usuario } = useContext(UserContext)
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
