import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './views/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import NotFound from './views/NotFound'
import Register from './views/Register'
import Navbar from './components/Navbar'
import Information from './views/Information'
import Invoice from './views/Invoice'
import Payments from './views/Payments'
import Handle from './views/Handle'
import MyServices from './views/MyServices'
import MyServicesD from './views/MyServices/detail'
import ConsumptionSimulator from './views/ConsumptionSimulator'


function App() {
  const rutes = [{ name: '/Login', element: <Login /> },
  { name: '/', element: <Home /> }, { name: '/*', element: <NotFound /> }, { name: '/Register', element: <Register /> },
  { name: '/Information', element: <Information /> }, { name: '/Invoice', element: <Invoice /> }, { name: '/Payments', element: <Payments /> },
  { name: '/Handle', element: <Handle /> }, {name: '/MyServices', element: <MyServices />}, {name: '/ConsumptionSimulator', element: <ConsumptionSimulator />},
  {name: '/detail', element: <MyServicesD />}];
  return (
    <div className='w-screen h-screen overflow-y-hidden'>
      <Navbar />
      <Routes>
        {rutes.map((rute) => (
          <Route key={rute.name} path={rute.name} element={rute.element} />
        ))}
      </Routes>
    </div>
  )
}

export default App
