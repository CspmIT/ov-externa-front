import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../Navbar'
import Cookies from 'js-cookie'

const ProtectedRoutes = ({ children }) => {
  // Obtengo la informacion que se encuentra en la cookie
  const authUser = Cookies.get('token')
  if (!authUser) {
    return <Navigate to='/login' />
  }
  return (
    <>
      <Navbar />
      <div className='flex-grow sm:pl-60 pt-20 pb-8'>
        <Outlet />
      </div>
    </>
  )
}

export default ProtectedRoutes
