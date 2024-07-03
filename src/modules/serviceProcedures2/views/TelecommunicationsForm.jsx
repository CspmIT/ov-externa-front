import { Button, MenuItem, Paper, TextField } from '@mui/material'
import { useRegForm } from '../providers/RegFormProvider'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'

const TelecommunicationsForm = () => {
	const [state, dispatch] = useRegForm()
	const [user, setTypeUser] = useState(0)
	const [total, setTotal] = useState(0)
	const [carrito, setCarrito] = useState([])
	const [services, setServices] = useState([])

	const { register, formState: errors } = useForm()
	const navigate = useNavigate()
	const currentStep = state?.step - 1
	const step = state?.step
	const handleChangeTotal = async (item) => {
		const { value } = item
		setTotal(total + value)
		setCarrito([...carrito, item])
	}

	// Función para agrupar servicios por nombre
	const groupServicesByName = (services) => {
		const grouped = {}
		services.forEach((service) => {
			if (!grouped[service.name]) {
				grouped[service.name] = [service]
			} else {
				grouped[service.name].push(service)
			}
		})
		return grouped
	}

	const groupedServices = groupServicesByName(services)

	const getServices = async (typeUser) => {
		if (typeUser === '1') {
			return [
				{
					name: 'Telefonia',
					description: 'Casa de familia',
					value: 1800,
				},
				{
					name: 'Television',
					description: 'IPTV (televisión con el decodificador adicional)',
					aditional: [
						{
							name: 'Decodificador adicional',
							value: 1800,
						},
						{
							name: 'Pack de futbol',
							value: 3500,
						},
						{
							name: 'Pack de adultos',
							value: 3500,
						},
					],
				},
				{
					name: 'Television',
					description: 'El tv en android y se puede ver el contenido a traves de sensa',
					aditional: [
						{
							name: 'Decodificador adicional',
							value: 1800,
						},
						{
							name: 'Pack de futbol',
							value: 3500,
						},
					],
				},
				{
					name: 'Television',
					description: 'Sensa app (aplicacion para ver por streaming y es necesario que el tv sea android)',
					aditional: [
						{
							name: 'Pack de futbol',
							value: 3500,
						},
					],
				},
				{
					name: 'Internet',
					description: '60 MPS (IPTV)',
					value: 1800,
				},
				{
					name: 'Internet',
					description: '100 MPS (IPTV/sensa box/sensa app)',
					value: 1800,
				},
				{
					name: 'Internet',
					description: '300 MPS (IPTV/sensa box/sensa app)',
					value: 1800,
				},
			]
		}
	}

	const handleChangeTypeUser = async (value) => {
		const services = await getServices(value)
		setTypeUser(value)
		setServices(services)
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
				<div className='col-span-12 flex gap-3'>
					{user === '1' && (
						<>
							<div className='flex flex-row w-3/4 gap-3'>
								{Object.entries(groupedServices).map(([serviceName, serviceGroup], index) => (
									<Paper elevation={3} variant='outlined' key={index} className='w-1/3 p-4'>
										<h4 className='text-center'>{serviceName}</h4>
										{serviceGroup.map((service, serviceIndex) => (
											<div key={serviceIndex}>
												{service.aditional && <h5 className='text-center'>{service.description}</h5>}
												{service.aditional ? (
													service.aditional.map((item, itemIndex) => (
														<>
															<div key={itemIndex} className='flex flex-row items-center gap-3 justify-between mb-3'>
																<h5>{item.name}</h5>
																<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: serviceName, description: item.name, value: item.value })}>
																	<AddIcon />
																</Button>
															</div>
														</>
													))
												) : (
													<div className='flex flex-row items-center gap-3 justify-between'>
														<h5>{service.description}</h5>
														<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: serviceName, description: service.description, value: service.value })}>
															<AddIcon />
														</Button>
													</div>
												)}
											</div>
										))}
									</Paper>
								))}
								{/* <Paper elevation={3} variant='outlined' className='w-1/3 p-4'>
									<h4 className='text-center'>Telefonia</h4>
									<div className='flex flex-row items-center gap-3 justify-between'>
										<h5>Casa de familia</h5>
										<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: 'Telefonia', description: 'Casa de familia', value: 1800 })}>
											<AddIcon />
										</Button>
									</div>
								</Paper>
								<Paper elevation={3} variant='outlined' className='w-1/3 p-3'>
									<h4 className='text-center'>Television</h4>
									<h5 className='text-center'>IPTV (televisión con el decodificador adicional)</h5>
									<div className='flex flex-row items-center gap-3 mb-2 justify-between'>
										Decodificador adicional
										<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: 'Telefonia', categoria: 'IPTV', description: 'Casa de familia', value: 1800 })}>
											<AddIcon />
										</Button>
									</div>
									<div className='flex flex-row items-center gap-3 mb-2 justify-between'>
										Pack de futbol
										<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: 'Telefonia', description: 'Casa de familia', value: 1800 })}>
											<AddIcon />
										</Button>
									</div>
									<div className='flex flex-row items-center gap-3 justify-between mb-2'>
										Pack de adultos
										<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: 'Telefonia', description: 'Casa de familia', value: 1800 })}>
											<AddIcon />
										</Button>
									</div>
									<h5 className='text-center'>El tv en android y se puede ver el contenido a traves de sensa</h5>
									<div className='flex flex-row items-center gap-3 mb-2 justify-between'>
										Decodificador adicional
										<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: 'Telefonia', description: 'Casa de familia', value: 1800 })}>
											<AddIcon />
										</Button>
									</div>
									<div className='flex flex-row items-center gap-3 mb-2 justify-between'>
										Pack de futbol
										<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: 'Telefonia', description: 'Casa de familia', value: 1800 })}>
											<AddIcon />
										</Button>
									</div>
									<h5 className='text-center'>Sensa app (aplicacion para ver por streaming y es necesario que el tv sea android)</h5>
									<div className='flex flex-row items-center gap-3 mb-2 justify-between'>
										Pack de futbol
										<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: 'Telefonia', description: 'Casa de familia', value: 1800 })}>
											<AddIcon />
										</Button>
									</div>
								</Paper>
								<Paper elevation={3} variant='outlined' className='w-1/3 p-4'>
									<h4 className='text-center'>Internet</h4>
									<div className='flex flex-row items-center gap-3 mb-2 justify-between'>
										60 MPS (IPTV)
										<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: 'Telefonia', description: 'Casa de familia', value: 1800 })}>
											<AddIcon />
										</Button>
									</div>
									<div className='flex flex-row items-center gap-3 mb-2 justify-between'>
										100 MPS (IPTV/sensa box/sensa app)
										<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: 'Telefonia', description: 'Casa de familia', value: 1800 })}>
											<AddIcon />
										</Button>
									</div>
									<div className='flex flex-row items-center gap-3 mb-2 justify-between'>
										300 MPS (IPTV/sensa box/sensa app)
										<Button variant='outlined' color='primary' onClick={() => handleChangeTotal({ name: 'Telefonia', description: 'Casa de familia', value: 1800 })}>
											<AddIcon />
										</Button>
									</div>
								</Paper> */}
							</div>
							<div className='flex flex-col w-3/12 gap-3 items-start justify-center'>
								<Paper elevation={3} className='items-start p-4 w-full'>
									{carrito.map((item, index) => (
										<>
											<h5>
												{item.name} <ClearIcon className='cursor-pointer' />
											</h5>
											<div key={index} className='flex flex-row gap-3 mb-3 justify-between'>
												<span>{item.description}</span>
												<h5>$ {item.value}</h5>
											</div>
										</>
									))}
									<div className='flex flex-row gap-3 justify-center items-center'>
										<h4>Costo total</h4>
										<h3>$ {total}</h3>
									</div>
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
							errors.typeUser ? console.log('error') : dispatch({ type: 'next' })
							navigate(`/multiStepForm/${state?.services[step].nombre}`)
						}}
					>
						Siguiente
					</Button>
				</div>
			</form>
		</>
	)
}

export default TelecommunicationsForm
