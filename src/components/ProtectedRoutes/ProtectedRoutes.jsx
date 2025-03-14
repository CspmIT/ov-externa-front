import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import Cookies from 'js-cookie'
import PopUp from '../PopUp'

const ProtectedRoutes = ({ children }) => {
	// Obtengo la informacion que se encuentra en la cookie
	const authUser = Cookies.get('token')
	const storedUser = localStorage.getItem('usuario')
	if (!authUser || !storedUser) {
		localStorage.removeItem('usuario')
		Cookies.remove('token')
		return <Navigate to='/login' />
	}
	return (
		<>
			<Navbar />
			<div className='flex-grow sm:pl-60 pt-20 pb-8'>
				<Outlet />
			</div>
			<PopUp />
		</>
	)
}

export default ProtectedRoutes
