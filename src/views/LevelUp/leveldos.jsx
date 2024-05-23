import CardCustom from '../../components/CardCustom'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import formulario from './validateForm'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { request, requestApiExt } from '../../utils/request'
import { Box, Button, IconButton, Modal } from '@mui/material'
import { Add, Close } from '@mui/icons-material'
import Swal from 'sweetalert2'
import { formatDateForInput } from '../../utils/dateFunction'
const leveldos = () => {
	const { NameUser, TypeUser } = JSON.parse(localStorage.getItem('usuario'))
	const {
		register,
		watch,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm()

	const [provinces, setProvinces] = useState([])
	const [localidades, setLocalidades] = useState([])
	const [streets, setStreets] = useState([])
	const [streetsApi, setStreetsApi] = useState([])
	const [openModalStreet, setOpenModalStreet] = useState(false)
	const handleCloseModalAPI = () => {
		setOpenModalStreet(false)
	}
	const openModalStreetApi = async () => {
		const Provincia = provinces.filter((item) => item.id === parseInt(watch('StateId')))
		const City = localidades.filter((item) => item.id === parseInt(watch('CityId')))
		const url = `https://apis.datos.gob.ar/georef/api/calles?max=5000&provincia=${Provincia[0].nombre}&localidad_censal=${City[0].nombre.split(' - CP ')[0]}&orden=nombre`
		const res = await requestApiExt(url, 'GET')
		const calles = await res.data.calles.map((item) => {
			return { nombre: item.nombre, id: item.id }
		})
		setStreetsApi(calles)
		setOpenModalStreet(true)
	}
	useEffect(() => {
		const getProvinces = async () => {
			try {
				const url = import.meta.env.VITE_APP_API_URL + '/listState'
				const res = await request(url, 'GET')
				const provincias = res.data
					.map((item) => {
						return { id: item.COD_PRO, nombre: item.DES_PRO }
					})
					.sort((a, b) => a.nombre.localeCompare(b.nombre))
				// Una vez que obtengo las provincias, las guardo en el estado
				setProvinces(provincias)
			} catch (error) {
				console.error({ message: error.message })
			}
		}
		getProvinces()
	}, [])

	const handleProvinceChange = async () => {
		try {
			const provinceId = watch('StateId')
			const url = `${import.meta.env.VITE_APP_API_URL}/listCity/?id=${provinceId}`
			const res = await request(url, 'GET')
			const localidades = res.data
				.map((item) => {
					return { id: item.id, nombre: `${item.DES_LOC} - CP : ${item.COD_POS}` }
				})
				.sort((a, b) => a.nombre.localeCompare(b.nombre))
			await setLocalidades(localidades)
		} catch (error) {
			console.error({ message: error.message })
		}
	}
	const handleCityChange = async () => {
		try {
			const cityId = parseInt(watch('CityId'))
			const url = `${import.meta.env.VITE_APP_API_URL}/listStreet/?id=${cityId}`
			const res = await request(url, 'GET')
			const Calles = res.data
				.map((item) => {
					return { id: item.id, nombre: item.name }
				})
				.sort((a, b) => a.nombre.localeCompare(b.nombre))
			setStreets(Calles)
		} catch (error) {
			console.error({ message: error.message })
		}
	}
	const saveNewStreet = async () => {
		try {
			const dataApi = streetsApi.filter((item) => item.id === watch('addressApi'))
			const data = { name: dataApi[0].nombre, id_api: dataApi[0].id, idCity: parseInt(watch('CityId')) }
			const url = `${import.meta.env.VITE_APP_API_URL}/addStreet`
			const res = await request(url, 'POST', data)
			if (res.status === 200) {
				Swal.fire({ icon: 'success', title: '¡Calle agregada!', text: 'La calle ha sido agregada correctamente' })
				handleCloseModalAPI()
				handleCityChange()
				return true
			}
		} catch (error) {
			Swal.fire({ icon: 'error', title: '¡Error!', text: 'No se pudo agregar la calle' })
		}
	}
	const navigate = useNavigate()
	const controlDni = async () => {
		try {
			const dni = parseInt(watch('document_number'))
			if (dni.toString().length > 7) {
				const url = `${import.meta.env.VITE_APP_API_URL}/searchUserxDni/?dni=${dni}`
				const res = await request(url, 'GET')
				if (res.status === 200) {
					const data = res.data
					if (data) {
						Swal.fire({
							title: 'El Numero de documento ya fue cargado en el sistema',
							text: `¿Sos ${data.last_name + ' ' + data.name}?`,
							icon: 'question',
							allowOutsideClick: false,
							showCancelButton: true,
							confirmButtonText: 'Aceptar',
							cancelButtonText: 'Cancelar',
						}).then(async (result) => {
							if (result.isConfirmed) {
								setValue('document_type', data.type_dni)
								setValue('sex', data.TypeSex.id)
								setValue('StateId', data?.Person_Address?.Address?.State?.COD_PRO || null)
								setValue('number_address', data?.Person_Address?.Address?.number_address || null)
								setValue('phoneCaract', data.cell_phone.split(' ')[0])
								setValue('numberPhone', data.cell_phone.split(' ')[1])
								setValue('birthdate', formatDateForInput(data.born_date))
								await handleProvinceChange()
								await setTimeout(() => {
									setValue('CityId', data?.Person_Address?.Address?.City?.COD_LOC || null)
									handleCityChange()
								}, 200)
								await setTimeout(() => {
									setValue('StreetId', data?.Person_Address?.Address?.Street?.id || null)
								}, 300)
							} else {
								setValue('document_number', '')
							}
						})
					}
				}
			}
		} catch (error) {
			console.error({ message: error.message })
		}
	}
	return (
		<CardCustom>
			<div className='flex flex-wrap w-full'>
				<p className='py-10 leading-7'>
					Hola {NameUser}, estás a unos pasos de subir al Nivel 2. Para esto, te vamos a pedir una serie de datos necesarios para validar tu identidad y así poder usar tu Oficina Virtual aprovechando todos los
					beneficios.
					<br />
					Uno de los datos más importantes y obligatorio es tu número de socio, ya que ingresando el mismo, podrás acceder a todas tus cuentas como así también todos tus servicios.
					<br />A continuación, verás una imagen del encabezado de tu factura. El número de socio podés obtenerlo desde la misma, tal como lo muestra la imagen.
				</p>
				<div className='w-full flex justify-center mb-10'>
					<img className='w-full md:w-3/4' src='https://app.coopmorteros.coop/public/images/otros/Factura.jpg' />
				</div>
				<form
					id='formLvlUp2'
					onSubmit={handleSubmit(async (data) => {
						formulario(data, navigate)
					})}
					className='w-full flex flex-wrap p-7'
				>
					<div className='w-full md:w-1/2 lg:w-1/4 p-2'>
						<div className='mt-2'>
							<label htmlFor='number_customer' className='block font-semibold ml-1 mb-2 dark:text-white'>
								Nº Socio
							</label>
							<input
								id='number_customer'
								type='text'
								placeholder='Ingrese su N° de Socio'
								{...register('number_customer', {
									required: true,
									pattern: /^[0-9]*$/,
								})}
								// Si el campo es requerido y no se completa, pinto el borde de rojo
								className={`block w-full rounded-md border-0 p-2 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
									errors.number_customer ? 'border-red-500' : ''
								}`}
							/>
							{errors.number_customer?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
							{errors.number_customer?.type === 'pattern' && <span className='text-red-500'>Solo se pueden ingresar numeros</span>}
						</div>
					</div>
					<div className='w-full md:w-1/2 lg:w-1/4 p-2'>
						<div className='mt-2'>
							<label htmlFor='document_type' className='block font-semibold ml-1 mb-2 dark:text-white'>
								Tipo Doc.
							</label>
							<select
								id='document_type'
								{...register('document_type', {
									required: true,
								})}
								className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'
							>
								<option className='robotoCondensed' value=''>
									Seleccionar...
								</option>
								<option value='1'>DNI</option>
								<option value='3'>CUIL</option>
								<option value='4'>CUIT</option>
								<option value='2'>LC</option>
								<option value='6'>LE</option>
							</select>
							{errors.document_type?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
						</div>
					</div>
					<div className='w-full md:w-1/2 lg:w-1/4 p-2'>
						<div className='mt-2'>
							<label htmlFor='document_number' className='block font-semibold ml-1 mb-2 dark:text-white'>
								Nº de Documento
							</label>
							<input
								id='document_number'
								type='text'
								placeholder='Ingrese su N° de Documento'
								{...register('document_number', {
									required: true,
									pattern: /^[0-9]*$/,
									onBlur: (e) => controlDni(),
								})}
								className='block w-full rounded-md border-0 p-2 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6'
							/>
							{errors.document_number?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
							{errors.document_number?.type === 'pattern' && <span className='text-red-500'>Solo se pueden ingresar numeros</span>}
						</div>
					</div>
					{TypeUser === 1 ? (
						<div className='w-full md:w-1/2 lg:w-1/4 p-2'>
							<div className='mt-2'>
								<label htmlFor='sex' className='block font-semibold ml-1 mb-2 dark:text-white'>
									Sexo
								</label>
								<select
									id='sex'
									{...register('sex', { required: true })}
									className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'
								>
									<option className='robotoCondensed' value=''>
										Seleccionar...
									</option>
									<option value='1'>Femenino</option>
									<option value='2'>Masculino</option>
								</select>
								{errors.sex?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
							</div>
						</div>
					) : null}
					<div className='w-full md:w-1/2 lg:w-1/3 p-2'>
						<div className='mt-2'>
							<label htmlFor='StateId' className='block font-semibold ml-1 mb-2 dark:text-white'>
								Provincias
							</label>
							<select
								id='StateId'
								{...register('StateId', { required: true, onChange: (e) => handleProvinceChange() })}
								className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'
							>
								<option className='robotoCondensed' value=''>
									Seleccionar...
								</option>
								{provinces.map((item, index) => (
									<option key={index} className='robotoCondensed' value={item.id}>
										{item.nombre}
									</option>
								))}
							</select>
							{errors.StateId?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
						</div>
					</div>
					<div className='w-full md:w-1/2 lg:w-1/3 p-2'>
						<div className='mt-2'>
							<label htmlFor='CityId' className='block font-semibold ml-1 mb-2 dark:text-white'>
								Localidades
							</label>
							<select
								id='CityId'
								{...register('CityId', { required: true, onChange: () => handleCityChange() })}
								className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'
							>
								<option className='robotoCondensed' value=''>
									Seleccionar...
								</option>
								{localidades.map((item, index) => (
									<option key={index} className='robotoCondensed' value={item.id}>
										{item.nombre}
									</option>
								))}
							</select>
							{errors.CityId?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
						</div>
					</div>
					<div className='w-full flex md:w-1/2 lg:w-1/3 p-2'>
						<div className='mt-2 w-2/3'>
							<div className='w-full flex relative'>
								<label htmlFor='StreetId' className='block font-semibold ml-1 mb-2 dark:text-white'>
									Dirección
								</label>
								<IconButton className='top-0 right-0 !absolute' color='error' size='small' onClick={() => openModalStreetApi()}>
									<Add />
								</IconButton>
							</div>
							<select
								id='StreetId'
								{...register('StreetId', { required: true })}
								className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'
							>
								<option className='robotoCondensed' value=''>
									Seleccionar...
								</option>
								{streets.map((item, index) => (
									<option key={index} className='robotoCondensed' value={item.id}>
										{item.nombre}
									</option>
								))}
							</select>
							{errors.StreetId?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
						</div>
						<div className='ml-2 mt-2 w-1/3'>
							<label htmlFor='number_address' className='block font-semibold ml-1 mb-2 dark:text-white'>
								Numero
							</label>
							<input
								id='number_address'
								type='text'
								placeholder='Dirección'
								{...register('number_address', { required: true })}
								className='block  w-full rounded-md border-0 p-2 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1  placeholder:text-gray-400 sm:text-sm sm:leading-6'
							/>
							{errors.number_address?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
						</div>
					</div>
					<div className='w-full md:w-1/2 lg:w-1/3 p-2'>
						<div className='mt-2'>
							<label className='block font-semibold ml-1 mb-2 dark:text-white'>Caracteristica</label>
							<div className='flex'>
								<span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
									0
								</span>
								<input
									{...register('phoneCaract', {
										required: true,
										pattern: /^[0-9]*$/,
									})}
									type='text'
									id='phoneCaract'
									className='block ring-1 rounded-none rounded-e-md dark:bg-zinc-700 dark:text-gray-200 shadow border-0 p-2.5 text-gray-900 w-full placeholder:text-gray-400 sm:text-sm sm:leading-6'
									placeholder='Caract. (Sin el 0)'
								/>
							</div>
							{errors.phoneCaract?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
							{errors.phoneCaract?.type === 'pattern' && <span className='text-red-500'>Solo se pueden ingresar numeros</span>}
						</div>
					</div>
					<div className='w-full md:w-1/2 lg:w-1/3 p-2'>
						<div className='mt-2'>
							<label className='block font-semibold ml-1 mb-2 dark:text-white'>Número de Celular</label>
							<div className='flex'>
								<span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
									15
								</span>
								<input
									{...register('numberPhone', {
										required: true,
										pattern: /^[0-9]*$/,
									})}
									type='text'
									id='numberPhone'
									className='block ring-1 rounded-none rounded-e-md dark:bg-zinc-700 dark:text-gray-200 shadow border-0 p-2.5 text-gray-900 w-full placeholder:text-gray-400 sm:text-sm sm:leading-6'
									placeholder='Número (Sin el 15)'
								/>
							</div>
							{errors.numberPhone?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
							{errors.numberPhone?.type === 'pattern' && <span className='text-red-500'>Solo se pueden ingresar numeros</span>}
						</div>
					</div>
					<div className='w-full md:w-1/2 lg:w-1/3 p-2'>
						<div className='mt-2'>
							<label htmlFor='birthday' className='block font-semibold ml-1 mb-2 dark:text-white'>
								{TypeUser === 1 ? 'Fecha de Nacimiento' : 'Fecha de Registro'}
							</label>
							<input
								{...register('birthdate', { required: true })}
								type='date'
								id='birthday'
								className='block ring-1 rounded-none rounded-e-md dark:bg-zinc-700 dark:text-gray-200 shadow border-0 p-2.5 text-gray-900 w-full placeholder:text-gray-400 sm:text-sm sm:leading-6'
							/>
							{errors.birthdate?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
						</div>
					</div>

					<div className='w-full flex justify-center'>
						<Button variant='contained' type='submit' className='!text-black !bg-yellow-300 hover:!bg-yellow-400 focus:!bg-yellow-400 !m-2'>
							Guardar
						</Button>
					</div>
					<Modal className='flex justify-center items-center' open={openModalStreet} onClose={handleCloseModalAPI} aria-labelledby='parent-modal-title' aria-describedby='parent-modal-description'>
						<Box className={'w-full flex justify-center items-center'}>
							<div className=' bg-white w-1/2 p-5 flex-col justify-center items-center'>
								<div className='relative  p-5 '>
									<h3 className='text-gray-900 m-0 font-bold text-center font-sans' id='exampleModalLabel'>
										Calles segun Nacion
									</h3>
									<div className='absolute  right-5 top-5'>
										<Close onClick={handleCloseModalAPI} className='text-gray-500 hover:text-gray-800 hover:cursor-pointer' />
									</div>
								</div>

								<select
									id='addressApi'
									{...register('addressApi')}
									className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'
								>
									<option className='robotoCondensed' value=''>
										Seleccionar...
									</option>
									{streetsApi.map((item, index) => (
										<option key={index} className='robotoCondensed' value={item.id}>
											{item.nombre}
										</option>
									))}
								</select>
								<div className='w-100 mt-5 flex justify-center items-center'>
									<Button variant='contained' type='button' color='primary' onClick={saveNewStreet}>
										Guardar
									</Button>
								</div>
							</div>
						</Box>
					</Modal>
				</form>
			</div>
		</CardCustom>
	)
}

export default leveldos
