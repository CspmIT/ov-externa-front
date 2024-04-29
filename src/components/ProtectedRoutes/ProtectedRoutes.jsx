import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { storage } from '../../storage/storage'
import Navbar from '../Navbar'

const ProtectedRoutes = ({ children }) => {
  const authUser = storage.get('usuario')
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
