import DashboardLvl2 from '../../components/DashBoardCustomer/Dashboard_lvl2'
import { useNavigate } from 'react-router-dom'
import DashboardLvl1 from '../../components/DashBoardCustomer/Dashboard_lvl1'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const Home = () => {
  const { usuario, setUsuario } = useContext(UserContext)
  usuario.numberCustomer = 902769
  setUsuario(usuario)
  const navigate = useNavigate()
  const id = JSON.parse(localStorage.getItem('usuario'))?.sub
  const level = JSON.parse(localStorage.getItem('usuario'))?.level
  // setUsuario(...usuario, { numberCustomer: 902769 })
  if (!id) {
    Swal.fire({
      icon: 'warning',
      title: 'Atención!',
      text: 'El token es invalido. Por favor inicie sesión nuevamente.',
      allowOutsideClick: false
    }).then(async () => {
      // Limpio el localstorage
      await localStorage.removeItem('usuario')
      navigate('/Login')
    })
  }

  return (
    <div className='flex flex-wrap w-full'>
      {level === 1 ? <DashboardLvl1 /> : <DashboardLvl2 />}
    </div>
  )
}

export default Home
