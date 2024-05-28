import { useContext, useEffect, useState } from 'react'
import { FaCircle } from 'react-icons/fa'
import DropdownServices from '../../components/DropdownServices'
import Swal from 'sweetalert2'
import { setServiceInfo } from '../../utils/services'
import LoaderComponent from '../../components/Loader'
import { request } from '../../utils/request'
import { UserContext } from '../../contexts/UserContext'

const MyServices = () => {
	const { account } = useContext(UserContext)
	const [services, setRowsServices] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		const searchData = async () => {
			const socio = account.num
			const url = `${import.meta.env.VITE_APP_API_URL}/getService?id_procoop=${socio}`
			try {
				const response = await request(url, 'get')
				if (response.status !== 200) throw new Error('Error en consulta')
				const newData = []

				for (const service in response.data) {
					for (const key in response.data[service]) {
						const obj = response.data[service][key]
						obj.service = service
						if (!newData[service]) {
							newData[service] = []
						}
						newData[service].push(obj)
					}
				}
				setRowsServices(newData)
				setIsLoading(false)
			} catch (error) {
				Swal.fire({
					icon: 'error',
					html: 'Error al enviar la solicitud: ' + error.message,
					title: 'Atención!',
				})
				throw error
			}
		}
		searchData()
	}, [])

	return (
		<>
			{isLoading ? (
				<LoaderComponent />
			) : (
				<>
					<h2 className='text-center m-5'>Mis Servicios</h2>
					<div className={`flex mt-2 mb-5 rounded-xl p-5 bg-gray-200 dark:bg-zinc-800`}>
						<span className='flex mr-3'>
							<FaCircle className='text-green-500 mr-2' /> Servicio Activo
						</span>
						<span className='flex mr-3'>
							<FaCircle className='text-yellow-500 mr-2' /> Servicio Pendiente de Conexión
						</span>
						<span className='flex mr-3'>
							<FaCircle className='text-red-500 mr-2' /> Servicio Inactivo
						</span>
					</div>
					{Object.entries(services).map(([service, serviceInfo], rowIndex) => {
						const { icon, color, bgIcon, colorIcon, title } = setServiceInfo(service)
						return <DropdownServices key={rowIndex} props={{ icon, title, color, bgIcon, colorIcon, accounts: serviceInfo }} />
					})}
				</>
			)}
		</>
	)
}

export default MyServices
