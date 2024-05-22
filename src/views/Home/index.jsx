import DashboardLvl2 from '../../components/DashBoardCustomer/Dashboard_lvl2'
import { useNavigate } from 'react-router-dom'
import DashboardLvl1 from '../../components/DashBoardCustomer/Dashboard_lvl1'
import Swal from 'sweetalert2'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { request } from '../../utils/request'

const Home = () => {
	const { usuario, setUsuario } = useContext(UserContext)
	const [level, setlevel] = useState(1)
	// const { usuario, setUsuario } = useContext(UserContext)

	// usuario.numberCustomer = 902769
	// setUsuario(usuario)
	const navigate = useNavigate()
	const id = JSON.parse(localStorage.getItem('usuario'))?.sub
	const levelStorage = JSON.parse(localStorage.getItem('usuario'))?.level
	// setUsuario(...usuario, { numberCustomer: 902769 })
	if (!id) {
		Swal.fire({
			icon: 'warning',
			title: 'Atención!',
			text: 'El token es invalido. Por favor inicie sesión nuevamente.',
			allowOutsideClick: false,
		}).then(async () => {
			// Limpio el localstorage
			await localStorage.removeItem('usuario')
			navigate('/Login')
		})
	}
	const dataUser = async (id) => {
		const dataUser = await request(import.meta.env.VITE_APP_API_URL + '/dataUser', 'POST', { id })
		if (dataUser.status !== 200) throw new Error('Error en consulta')
		const data = dataUser.data
		setUsuario({ ...usuario, name: data.name_register, last_name: data.lastName_register, level: data.level })
		setlevel(data.level)
	}
	useEffect(() => {
		if (!levelStorage && id) {
			dataUser(id)
		} else {
			setlevel(levelStorage)
		}
	}, [id, level])
	return <div className='flex flex-wrap w-full'>{level === 1 ? <DashboardLvl1 /> : <DashboardLvl2 />}</div>
}

export default Home
