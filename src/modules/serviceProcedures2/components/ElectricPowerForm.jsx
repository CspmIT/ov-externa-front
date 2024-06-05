import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField, Tooltip } from '@mui/material'
import { useRegForm } from '../providers/RegFormProvider'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LeafletMap from './LeafletMap'
import { useEffect, useState } from 'react'
import { useTheme } from '@emotion/react'
import { request } from '../../../utils/request'
const ElectricPowerForm = () => {
	const [isOwner, setIsOwner] = useState(null)
	const [markerPosition, setMarkerPosition] = useState([-30.71624815384811, -62.005226726953374])
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const theme = useTheme()
	const [state, dispatch] = useRegForm()
	const currentStep = state?.step - 1
	const navigate = useNavigate()
	const step = state?.step
	const {
		register,
		handleSubmit,
		watch,
		// setValue,
		formState: { errors },
	} = useForm()

	const typeActivity = watch('typeActivity')

	const getFormData = async () => {
		const baseUrl = import.meta.env.VITE_APP_API_URL
		// Recorro services Items y obtengo el id del formulario cuando el service type sea igual al servicio actual
		const serviceItems = state?.serviceItems
		const selectServices = state?.services
		if (!serviceItems || !selectServices) return
		const serviceItem = serviceItems.find((item) => item.service_type === selectServices[currentStep].tipo)
		const sendData = {
			formID: serviceItem.id_service_form,
			type: serviceItem.service_type,
		}
		const response = await request(`${baseUrl}/getFormService`, 'POST', sendData)
	}

	useEffect(() => {
		getFormData()
	}, [])

	const onSubmit = async (values) => {
		dispatch({ type: 'next' })
		navigate(`/multiStepForm/${state?.services[step].nombre}`)
	}

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 800,
		textColor: 'text.primary',
		olor: 'text.primary',
		bgcolor: 'background.paper',
		border: 'none',
		borderRadius: 4,
		boxShadow: 24,
		p: 4,
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full gap-3'>
				<div className='col-span-12 flex gap-3'>
					<div className='flex flex-col w-full gap-3 items-center justify-center '>
						<div className='w-2/3 flex justify-center items-center'>
							<FormControl className='w-3/4' error={errors.typeProcedure}>
								<InputLabel id='typeProcedure'>Tipo de tramite *</InputLabel>
								<Select labelId='typeProcedure' label='Tipo de tramite' id='typeProcedure' defaultValue='' {...register('typeProcedure', { required: true })}>
									<MenuItem value='1'>Nueva Alta</MenuItem>
									<MenuItem value='2'>Cambio de titularidad</MenuItem>
								</Select>
							</FormControl>
							<Tooltip
								className='w-auto ms-2'
								placement='right'
								title='Si la residencia donde esta solicitando el servicio aun tiene el medidor del inquilino anterior, el tramite que debe realizar es el de "cambio de titularidad"'
							>
								<IconButton>
									<HelpOutlineIcon />
								</IconButton>
							</Tooltip>
						</div>
						<div className='w-2/3 flex items-center justify-center'>
							<FormControl className='w-[79%]' error={errors.typeActivity}>
								<InputLabel id='typeActivity'>Tipo de Actividad *</InputLabel>
								<Select labelId='typeActivity' label='Tipo de Actividad' id='typeActivity' defaultValue='' {...register('typeActivity', { required: true })}>
									<MenuItem value='1'>Residencial</MenuItem>
									<MenuItem value='2'>Comercial o Industrial</MenuItem>
									<MenuItem value='3'>Obra</MenuItem>
									<MenuItem value='4'>Industria o complejo de departamentos</MenuItem>
								</Select>
							</FormControl>
						</div>
						{typeActivity && (
							<div className='w-[53%] flex gap-3'>
								<FormControl className='w-full'>
									<InputLabel id='meterType'>Tipo de Medidor *</InputLabel>
									<Select labelId='meterType' error={errors.meterType} label='Tipo de Medidor' id='meterType' defaultValue='' {...register('meterType', { required: true })}>
										<MenuItem value='1'>Monofasico</MenuItem>
										<MenuItem value='2'>Trifasico</MenuItem>
									</Select>
								</FormControl>
								<Modal open={open} onClose={handleClose}>
									<Box sx={style}>
										<h4 className={`text-center`} style={{ color: theme.palette.text.primary }}>
											Tipos de medidores
										</h4>
										<p style={{ color: theme.palette.text.primary }}>
											<b>Medidor Monofásico:</b> Eficiencia para Consumo Residencial y Pequeños Negocios El medidor monofásico es la elección común en hogares y pequeños negocios. Su diseño
											simplificado se centra en la medición de una sola fase de electricidad. Esto lo hace perfecto para aplicaciones de menor escala, como iluminación residencial, electrodomésticos
											y pequeñas herramientas eléctricas.
										</p>
										<p style={{ color: theme.palette.text.primary }}>
											<b>Medidor Trifásico:</b> Potencia para Grandes Demandas El medidor trifásico es una herramienta esencial en entornos industriales y comerciales con demandas eléctricas
											significativas. Su principal distinción radica en la capacidad para gestionar tres fases de electricidad de forma simultánea. Esto lo hace ideal para equipos y maquinaria que
											requieren una potencia mayor, como motores industriales, sistemas de aire acondicionado de gran escala y equipos de producción.
										</p>
									</Box>
								</Modal>
								<Button onClick={handleOpen}>Tipos de medidores</Button>
							</div>
						)}
						{typeActivity === '2' && (
							<div className='w-2/3 flex mt-3 items-center justify-center'>
								<FormControl className='w-3/4' error={errors.residenceAddress}>
									<FormLabel id='residence-address' className='text-center'>
										¿El comercio comparte el mismo medidor que su domicilio de residencia?
									</FormLabel>
									<RadioGroup error={errors.residenceAddress} row aria-labelledby='residence-address' className='flex justify-center' {...register('residenceAddress', { required: true })}>
										<FormControlLabel value='1' control={<Radio />} label='Si' />
										<FormControlLabel value='2' control={<Radio />} label='No' />
									</RadioGroup>
								</FormControl>
							</div>
						)}
						{typeActivity && (
							<div className='w-full flex gap-3 items-start justify-center'>
								<div className='w-3/5 flex flex-col gap-3'>
									<h4>Domicilio de conexion</h4>
									<FormControl className='w-full' error={errors.provincia}>
										<InputLabel id='provincia'>Provincia</InputLabel>
										<Select labelId='provincia' label='Provincia' id='provincia' defaultValue='' {...register('provincia', { required: true })}>
											<MenuItem value='3'>Cordoba</MenuItem>
											<MenuItem value='4'>Santa Fe</MenuItem>
										</Select>
									</FormControl>
									<div className='w-full flex gap-3'>
										<FormControl className='w-1/2' error={errors.localidad}>
											<InputLabel id='localidad'>Localidad</InputLabel>
											<Select labelId='localidad' label='Localidad' id='localidad' defaultValue='' {...register('localidad', { required: true })}>
												<MenuItem value='1'>Morteros Zona Urbana</MenuItem>
												<MenuItem value='2'>Morteros Zona Rural</MenuItem>
												<MenuItem value='3'>Colonia 10 de Julio</MenuItem>
												<MenuItem value='4'>Colonia 2 Hermanos</MenuItem>
												<MenuItem value='5'>Colonia Mauniers</MenuItem>
												<MenuItem value='6'>Colonia Isleta</MenuItem>
												<MenuItem value='7'>Colonia Miramar</MenuItem>
												<MenuItem value='8'>Colonia Milessi</MenuItem>
												<MenuItem value='9'>Colonia Bairo</MenuItem>
												<MenuItem value='10'>Colonia San Pedro</MenuItem>
											</Select>
										</FormControl>
										<FormControl className='w-1/4' error={errors.calle}>
											<InputLabel id='calle'>Calle</InputLabel>
											<Select labelId='calle' label='Calle' id='calle' defaultValue='' {...register('calle', { required: true })}>
												<MenuItem value='1'>Calle 1</MenuItem>
												<MenuItem value='2'>Calle 2</MenuItem>
												<MenuItem value='3'>Calle 3</MenuItem>
											</Select>
										</FormControl>
										<FormControl className='w-1/4'>
											<TextField label='Numero' error={errors.numberAddress} {...register('numberAddress', { required: true })}></TextField>
										</FormControl>
									</div>
									<h5>Dato catastral</h5>
									<div className='w-full flex gap-3'>
										<TextField error={errors.circ} {...register('circ', { required: true })} className='w-[16.6%]' label='Circ.'></TextField>
										<TextField {...register('sec', { required: true })} error={errors.sec} className='w-[16.6%]' label='Sec.'></TextField>
										<TextField {...register('man', { required: true })} error={errors.man} className='w-[16.6%]' label='Man.'></TextField>
										<TextField {...register('par', { required: true })} error={errors.par} className='w-[16.6%]' label='Par.'></TextField>
										<TextField {...register('ph', { required: true })} error={errors.ph} className='w-[16.6%]' label='PH'></TextField>
										<TextField {...register('lote', { required: true })} error={errors.lote} className='w-[16.6%]' label='Lote'></TextField>
									</div>
									<div className='w-full flex'>
										<a href='https://mapascordoba.gob.ar/viewer/mapa/3' target='_blank' rel='noopener noreferrer'>
											<Button role='link' variant='contained' color='info'>
												Si no lo conoces el dato catastral verificar en el cedulon de acueducto o en el impuesto municipal o podes averiguarlo
											</Button>
										</a>
									</div>
									<div className='w-full flex mt-3 gap-3 items-center'>
										<FormLabel error={errors.propietarioInmueble} id='propietario-inmueble' className='text-center'>
											¿Eres propietario del inmueble?
										</FormLabel>
										<RadioGroup
											error={errors.propietarioInmueble}
											row
											aria-labelledby='propietario-inmueble'
											className='flex justify-center ms-3'
											{...register('propietarioInmueble', { required: true })}
											onChange={(event) => setIsOwner(event.target.value)}
										>
											<FormControlLabel value='1' control={<Radio />} label='Si' />
											<FormControlLabel value='2' control={<Radio />} label='No' />
										</RadioGroup>
									</div>
								</div>
								<div className='w-2/5 h-[35vh] !max-w-[93vw] '>
									<h5>Puede arrastrar el marcador para indicar el domicilio en el mapa</h5>
									<LeafletMap markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} />
								</div>
							</div>
						)}
						{typeActivity && isOwner === '2' && (
							<div className='w-full flex gap-3 items-center justify-start'>
								<TextField className='w-1/4' {...register('nameProperty', { required: true })} error={errors.nameProperty} label='Nombre del propietario'></TextField>
								<TextField className='w-1/4' {...register('lastNameProperty', { required: true })} error={errors.lastNameProperty} label='Apellido del propietario'></TextField>
								<TextField className='w-1/4' {...register('numberDocProperty', { required: true })} error={errors.numberDocProperty} label='Numero de documento'></TextField>
							</div>
						)}
					</div>
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
					<Button disabled={!state?.person} className='w-1/6' variant='contained' color='success' type='submit'>
						{currentStep === state?.services?.length ? 'Finalizar' : 'Siguiente'}
					</Button>
				</div>
			</form>
		</div>
	)
}

export default ElectricPowerForm
