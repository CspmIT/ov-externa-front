import { Button, MenuItem, Paper, TextField } from '@mui/material'
import { useRegForm } from '../providers/RegFormProvider'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ClearIcon from '@mui/icons-material/Clear'
import { request } from '../../../utils/request'
import CardServices from '../components/Telecommunications/CardServices'
import { formatToArgentinePeso } from '../../../utils/currencyFunctions'
import Swal from 'sweetalert2'

const TelecommunicationsForm = () => {
	const [state, dispatch] = useRegForm()
	const [user, setTypeUser] = useState(null)
	const [total, setTotal] = useState(0)
	const [carrito, setCarrito] = useState([])
	const [services, setServices] = useState([])

	const { register, formState: errors } = useForm()
	const navigate = useNavigate()
	const currentStep = state?.step - 1
	const step = state?.step
	console.log(state)
	// Funcion para verificar si el servicio que se quiere agregar ya existe en el carrito
	const existInCarrito = (element) => {
		const exist = carrito.find((item) => item.name === element.name)
		if (exist) {
			return true
		}
		return false
	}

	// Funcion para agregar servicios al carrito y sumar el total
	const handleChangeTotal = async (item) => {
		const { value } = item
		item.value = formatToArgentinePeso(value)
		if (!existInCarrito(item)) {
			const newTotal = total + value
			setTotal(newTotal)
			setCarrito([...carrito, item])
		}
	}

	const handleChangeTotalDelete = async (item) => {
		const { value } = item
		const newvalue = value.replace('$', '').replace('.', '').replace(',', '.')
		const newCarrito = carrito.filter((element) => element.name !== item.name)
		setTotal(total - parseFloat(newvalue))
		setCarrito(newCarrito)
	}

	// Funcion que simula la obtencion de servicios segun el tipo de usuario
	const getServices = async (typeUser) => {
		const url = 'http://localhost:4000/searchServicesTelecomunications/' + typeUser
		const response = await request(url, 'GET')
		return [response.data]
	}

	// Funcion cuando se cambia el tipo de usuario, obtiene los servicios correspondientes
	const handleChangeTypeUser = async (value) => {
		const services = await getServices(value)
		setTypeUser(value)
		setServices(services)
	}
	const finalStep = () => {
		return step === state?.services.length
	}
	return (
		<>
			<form action='' className='flex flex-col w-full gap-3'>
				<div className='col-span-12 flex gap-3'>
					<div className='flex flex-col w-full gap-3 items-center justify-center '>
						<TextField
							className='w-3/4'
							defaultValue={state?.telecommunications?.typeUser || ''}
							{...register('typeUser', { required: true, message: 'Debe selecionar un tipo de usuario', onChange: (e) => handleChangeTypeUser(e.target.value) })}
							error={errors.typeUser}
							helperText={errors.typeUser && errors.typeUser.message}
							label='Tipo de Usuario'
							variant='outlined'
							select={true}
						>
							<MenuItem value='1'>Residencial</MenuItem>
							<MenuItem value='2'>Comercial</MenuItem>
							<MenuItem value='3'>Rural</MenuItem>
							<MenuItem value='4'>Jubilado</MenuItem>
							<MenuItem value='5'>Profesional</MenuItem>
						</TextField>
					</div>
				</div>
				<h3 className='text-center my-5'>Cotiza tu plan</h3>
				<div className='col-span-12 flex gap-3'>
					{user && (
						<>
							<div className='flex flex-row w-3/4 gap-3'>
								{/* Desabilitar cards de tv y telefonia has ta que no selecciona internet */}
								{/* Agregar a las cards la opcion no quiero este servicio */}
								<CardServices title={'INTERNET'} service={services[0].internet} handleChangeTotal={handleChangeTotal} />
								{/* Agregar un icono para ver info */}
								<CardServices title={'TELEVISIÓN'} service={services[0].tv} handleChangeTotal={handleChangeTotal} />
								{user !== '3' && <CardServices title={'TELEFONIA'} service={services[0].telefonia} handleChangeTotal={handleChangeTotal} />}
							</div>
							<div className='flex flex-col w-3/12 gap-3 items-start justify-center'>
								<Paper elevation={3} className='items-start p-4 w-full'>
									{carrito.map((item, index) => (
										<>
											<h5>
												{item.name} <ClearIcon onClick={() => handleChangeTotalDelete(item)} className='cursor-pointer' />
											</h5>
											<div key={index} className='flex flex-row gap-3 mb-3 justify-between'>
												<span>{item.description}</span>
												<h5>{item.value}</h5>
											</div>
										</>
									))}
									<div className='flex flex-row gap-3 justify-center items-center'>
										<h4>Abono mensual sin impuestos</h4>
										<h3>{formatToArgentinePeso(total)}</h3>
									</div>
									<p>Los precios estan sujetos a modificaciones sin previo aviso</p>
									<div className='flex flex-row gap-3 justify-center items-center'>
										<h4>Costo de instalacion sin impuestos</h4>
										<h3>{formatToArgentinePeso(total)}</h3>
									</div>
									<p>Los costos de instalacion estan sujetos a modificaciones sin previo aviso</p>
									<p>Los costos de instalacion se pueden abonar hasta en 3 cuotas sin interes</p>
								</Paper>
							</div>
						</>
					)}
				</div>

				<div className='col-span-12 flex mt-3 items-center justify-center gap-3'>
					<Button
						className='w-1/6'
						variant='outlined'
						onClick={() => {
							dispatch({ type: 'back' })
							navigate(`/multiStepForm/${state?.services[currentStep - 1].nombre}`)
						}}
					>
						Volver
					</Button>
					<Button className='w-1/9' variant='contained' color='secondary'>
						Guardar y continuar despues
					</Button>
					<Button
						className='w-1/6'
						variant='contained'
						onClick={() => {
							errors.typeUser
								? console.log('error')
								: finalStep()
								? Swal.fire({
										title: 'Atención',
										text: '¿Desea finalizar la solicitud de servicios?',
										icon: 'info',
										confirmButtonText: 'Si',
										showCancelButton: true,
										cancelButtonText: 'No',
								  }).then((result) => {
										if (result.isConfirmed) {
											// Muestro un mensaje de exito
											Swal.fire({
												title: 'Solicitud de servicios',
												text: 'La solicitud se envio correctamente. Verificaremos los datos y nos pondremos en contacto.',
												icon: 'success',
												confirmButtonText: 'Okey',
											})
										}
								  })
								: dispatch({ type: 'next' })
							navigate(`/multiStepForm/${state?.services[step].nombre}`)
						}}
					>
						{finalStep ? 'Finalizar' : 'Siguiente'}
					</Button>
				</div>
			</form>
		</>
	)
}

export default TelecommunicationsForm
