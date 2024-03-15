import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './views/Login'
import Home from './views/Home'
import Register from './views/Register'
import Navbar from './components/Navbar'
import Information from './views/Information'
import Invoice from './views/Invoice'
import Payments from './views/Payments'
import Handle from './views/Handle'
import MyServices from './views/MyServices'
import MyServicesD from './views/MyServices/detail'
import LevelUp2 from './views/LevelUp/leveldos'
import Authentication from './views/LevelUp/authenticationPhotoSID'
import MyConsumption from './views/MyConsumption'
import Footer from './components/Footer'
import Profile from './views/Profile/profile'
import BaseInitial from './views/BaseInitial'
import RestorePassword from './views/RestorePassword'
import ChangePassword from './views/ChangePassword'
import { UserContext } from './contexts/UserContext'
import LoaderComponent from './components/Loader'
function App() {
  const [user, setUser] = useState(null)
  const [routes, setRoutes] = useState([])
  const [navBar, setNavBar] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { usuario, darkMode } = useContext(UserContext)
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario')
    const usuario2 = JSON.parse(storedUser)
    if (usuario2 != null && Object.keys(usuario2).length > 0 && user?.id !== usuario2?.id) {
      setUser(usuario2)
    }
  }, [usuario])

  const constructionRoutes = () => {
    const loginBase = [
      {
        name: '/Login',
        element: (
          <BaseInitial>
            <Login />
          </BaseInitial>
        )
      },
      {
        name: '/Login/:token/:idUser',
        element: (
          <BaseInitial>
            <Login />
          </BaseInitial>
        )
      },
      {
        name: '/Register',
        element: (
          <BaseInitial>
            <Register />
          </BaseInitial>
        )
      },
      {
        name: '/RestorePassword',
        element: (
          <BaseInitial>
            <RestorePassword />
          </BaseInitial>
        )
      },
      {
        name: '/ChangePassword/:token',
        element: (
          <BaseInitial>
            <ChangePassword />
          </BaseInitial>
        )
      },
      { name: '/', element: <Navigate to='/Login' /> },
      { name: '/*', element: <Navigate to='/Login' /> },
      { name: '/Home', element: <Navigate to='/Login' /> },
      { name: '/register', element: <Navigate to='/' /> }
    ]
    const routesBaseUser = [
      { name: '/', element: <Home /> },
      { name: '/*', element: <Navigate to='/Home' /> },
      { name: '/Profile', element: <Profile /> },
      { name: '/Home', element: <Home /> },
      { name: '/Information', element: <Information /> },
      { name: '/register', element: <Navigate to='/' /> },
      { name: '/Login', element: <Navigate to='/Home' /> }
    ]

    if (usuario && usuario?.id > 0) {
      let routerUser = []
      if (user?.level === 1) {
        routerUser = [...routesBaseUser, { name: '/LevelUp2', element: <LevelUp2 /> }]
      } else {
        routerUser = [...routesBaseUser, { name: '/authentication', element: <Authentication /> }, { name: '/Invoice', element: <Invoice /> }, { name: '/MyServices', element: <MyServices /> }, { name: '/Payments', element: <Payments /> }, { name: '/Handle', element: <Handle /> }, { name: '/detail', element: <MyServicesD /> }, { name: '/MyConsumption', element: <MyConsumption /> }]
      }
      if (routes[0]?.name !== routerUser[0].name) {
        setRoutes(routerUser)
      }
    } else {
      if (routes[0]?.name !== loginBase[0].name) {
        setRoutes([...loginBase])
      }
    }
  }
  useEffect(() => {
    constructionRoutes()
    if (usuario) {
      setNavBar(<Navbar />)
    } else {
      setNavBar(null)
    }
  }, [usuario])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('dark')
    } else {
      document.body.classList.add('dark')
    }
  }, [darkMode, usuario])

  useEffect(() => {
    if (routes.length > 0) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1500)
    }
  }, [navBar, usuario])
  //   "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  //   "rules": {
  //     "prettier/prettier": "warn",
  //     "space-before-function-paren": ["error", "always"]
  //   },
  return (
    <div className='flex flex-col min-h-screen w-screen h-screen overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 text-gray-700'>
      {isLoading ? (
        <div className='h-full w-full flex justify-center items-center'>
          <LoaderComponent />
        </div>
      ) : (
        <>
          {navBar}
          <div className={`flex-grow  ${usuario ? 'sm:pl-60 pt-20 pb-8' : ''} `}>
            <Routes>
              {routes.map((route) => (
                <Route key={route.name} path={route.path ?? route.name} element={route.element} />
              ))}
            </Routes>
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
