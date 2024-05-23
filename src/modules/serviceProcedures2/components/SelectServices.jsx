import { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard'
import { useNavigate } from 'react-router-dom'
import ListRequeriments from './ListRequeriments'
import Button from '@mui/material/Button'
import seeRqueriments from '../../serviceProcedures/utils/seeRequirements'
import { useRegForm } from '../providers/RegFormProvider'
import Swal from 'sweetalert2'
import { request } from '../../../utils/request'

const SelectServices = ({ services }) => {
	const [visibleService, setVisibleService] = useState(null)
	const [selectedServices, setSelectedServices] = useState([...services])

	useEffect(() => {
		dispatch({ type: 'reset' })
	}, [])

	const handleSelectService = (service) => {
		console.log(service)
		// Crear una copia de selectedServices para evitar la mutación directa
		const newSelectedServices = [...selectedServices]

		// Buscar el índice del servicio en la lista
		const index = newSelectedServices.findIndex((s) => s.nombre === service.nombre && s.tipo === service.tipo)

		if (index !== -1) {
			// Si el servicio ya está en la lista, quitarlo
			newSelectedServices.splice(index, 1)
		} else {
			// Si el servicio no está en la lista, agregarlo
			newSelectedServices.push(service)
		}

		// Actualizar selectedServices con la nueva lista
		setSelectedServices(newSelectedServices)
	}
	const navigate = useNavigate()

	const [, dispatch] = useRegForm()
	const onSubmit = async () => {
		if (selectedServices.length === 0) {
			Swal.fire({
				icon: 'warning',
				title: 'Oops...',
				text: 'Debes seleccionar al menos un servicio para continuar.',
			})
			return
		}
		// Verificar si 'Datos Personales' ya está en la lista de servicios seleccionados
		const personalDataExists = selectedServices.some((service) => service.nombre === 'Datos Personales' && service.tipo === 0)

		// Si 'Datos Personales' no está en la lista, agregarlo
		if (!personalDataExists) {
			selectedServices.unshift({ nombre: 'Datos Personales', tipo: 0 })
		}
		// Ordenar los servicios seleccionados por tipo
		selectedServices.sort((a, b) => a.tipo - b.tipo)
		// Genero un registro en la DB con los servicios seleccionados

		const baseUrl = import.meta.env.VITE_APP_API_URL
		const url = `${baseUrl}/createRequestService`
		const sendData = { services: selectedServices }
		try {
			const data = await request(url, 'POST', sendData)
			console.log(data)
		} catch (error) {
			console.log()
			const { message } = error.response.data
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: message,
			})
			return
		}
		dispatch({ type: 'select_services', selectedServices })
		dispatch({ type: 'next' })
		navigate(`/multiStepForm/Datos Personales`)
	}

	return (
		<div>
			<h2 className='text-center m-5'>Selecciona tus Servicios</h2>
			<hr />
			<h5 className='text-center mt-5'>Marcá todos los servicios a solicitar</h5>
			<div className='flex w-full flex-wrap'>
				{services.map((service, index) => (
					<ServiceCard key={index} service={service} onSelectionChange={handleSelectService} seeRqueriments={seeRqueriments} visibleService={visibleService} setVisibleService={setVisibleService} />
				))}
			</div>
			<div className='mt-5 flex justify-center'>
				<Button variant='contained' color='success' className='!bg-green-400 w-1/2' onClick={onSubmit}>
					Solicitar Servicios
				</Button>
			</div>

			<div className='m-5'>
				{services.map((service, index) => (
					<div key={index} id={`${service.nombre}-${index}`} className='w-full bg-white p-3 rounded-md hidden'>
						<h4 className='text-center'>{service.nombre}</h4>
						<ListRequeriments servicio={service.nombre} />
					</div>
				))}
			</div>
		</div>
	)
}

export default SelectServices
