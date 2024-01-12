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
import LevelUp2 from './views/LevelUp/leveldos'
import LevelUp3 from './views/LevelUp/leveltres'
import Footer from './components/Footer'


function App() {
  const rutes = [{ name: '/Login', element: <Login /> },
  { name: '/', element: <Home /> }, { name: '/*', element: <NotFound /> }, { name: '/Register', element: <Register /> },
  { name: '/Information', element: <Information /> }, { name: '/Invoice', element: <Invoice /> }, { name: '/Payments', element: <Payments /> },
  { name: '/Handle', element: <Handle /> }, {name: '/MyServices', element: <MyServices />}, {name: '/ConsumptionSimulator', element: <ConsumptionSimulator />},
  {name: '/detail', element: <MyServicesD />},  {name: '/LevelUp2', element: <LevelUp2 />},  {name: '/LevelUp3', element: <LevelUp3 />}];
  return (
    <div className='w-screen h-screen overflow-y-auto overflow-y-hidden'>
      <Navbar />
      <Routes>
        {rutes.map((rute) => (
          <Route key={rute.name} path={rute.name} element={rute.element} />
        ))}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
