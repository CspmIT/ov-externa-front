import CardCustom from '../../components/CardCustom'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import formulario from './validateForm'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { request } from '../../utils/request'
import { Button, IconButton } from '@mui/material'
import { Add } from '@mui/icons-material'
import Swal from 'sweetalert2'
import { formatDateForInput } from '../../utils/dateFunction'
import ModalNewStreet from '../../modules/Profile/components/ModalNewStreet'
import { getAllStreet } from './utils/Address'
const leveldos = () => {
	const { NameUser, TypeUser } = JSON.parse(localStorage.getItem('usuario'))
	const {
		register,
		watch,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm()

	const [numberSocio, setNumberSocio] = useState()
	const [provinces, setProvinces] = useState([])
	const [localidades, setLocalidades] = useState([])
	const [streets, setStreets] = useState([])
	const [streetsApi, setStreetsApi] = useState([])
	const [openModalStreet, setOpenModalStreet] = useState(false)
	const openModalStreetApi = async () => {
		if (!openModalStreet && !streetsApi.length) {
			getAllStreet().then((streets) => {
				setStreetsApi(streets)
			})
		}
		setOpenModalStreet(!openModalStreet)
	}
	useEffect(() => {
		const getProvinces = async () => {
			try {
				const url = import.meta.env.VITE_APP_API_URL + '/listState'
				const res = await request(url, 'GET')
				const provincias = res.data
					.map((item) => {
						return { id: item.cod_pro, name: item.des_pro }
					})
					.sort((a, b) => a.name.localeCompare(b.name))
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
			const provinceId = watch('id_state')
			const url = `${import.meta.env.VITE_APP_API_URL}/listCity/?id=${provinceId}`
			const res = await request(url, 'GET')
			const localidades = res.data
				.map((item) => {
					return { id: item.id, name: `${item.des_loc} - CP : ${item.cod_pos}` }
				})
				.sort((a, b) => a.name.localeCompare(b.name))
			await setLocalidades(localidades)
		} catch (error) {
			console.error({ message: error.message })
		}
	}
	const handleCityChange = async () => {
		try {
			const idCity = parseInt(watch('id_city'))
			console.log(idCity)
			const url = `${import.meta.env.VITE_APP_API_URL}/listStreet/?id=${idCity}`
			const res = await request(url, 'GET')
			const Calles = res.data
				.map((item) => {
					return { id: item.id, name: item.name }
				})
				.sort((a, b) => a.name.localeCompare(b.name))
			setStreets(Calles)
		} catch (error) {
			console.error({ message: error.message })
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
								setValue('sex', data.typeSex.id)
								setValue('id_state', data?.dataPerson?.Person_Address[0]?.Address?.state?.cod_pro || null)
								setValue('number_address', data?.dataPerson?.Person_Address[0]?.Address?.number_address || null)
								setValue('phoneCaract', data.dataPerson.cell_phone.split(' ')[0])
								setValue('numberPhone', data.dataPerson.cell_phone.split(' ')[1])
								setValue('birthdate', formatDateForInput(data.born_date || data.date_registration))
								await handleProvinceChange()
								setTimeout(() => {
									setValue('id_city', data?.dataPerson?.Person_Address[0]?.Address?.city?.cod_loc || null)
									handleCityChange()
								}, 200)
								setTimeout(() => {
									setValue('id_street', data?.dataPerson?.Person_Address[0]?.Address?.street?.id || null)
								}, 400)
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
	const controlNumberCustomer = async () => {
		try {
			const number = parseInt(watch('number_customer')) || ''

			if (number.toString().length > 0 && number !== '') {
				if (number === numberSocio) {
					return false
				} else {
					setNumberSocio(number)
				}
				const url = `${import.meta.env.VITE_APP_API_URL}/searchUserxNumCustomer/?num=${number}`
				const res = await request(url, 'GET')
				if (res.status === 200) {
					const data = res.data
					if (data) {
						const name = data.name ? data.name : data.social_raeson
						const lastName = data.last_name ? data.last_name : data.fantasy_name
						Swal.fire({
							title: 'Atención',
							text: `¿Queres utilizar a ${lastName + ' ' + (name || '')} como socio?`,
							icon: 'question',
							allowOutsideClick: false,
							showCancelButton: true,
							confirmButtonText: 'Aceptar',
							cancelButtonText: 'Cancelar',
						}).then(async (result) => {
							if (result.isConfirmed) {
								setValue('name_customer', data.name || data.social_raeson)
								setValue('last_name_customer', data.last_name || data.fantasy_name)
							} else {
								setValue('number_customer', '')
							}
						})
					}
				}
			}
		} catch (error) {
			Swal.fire({
				title: 'Error',
				text: error.request.response,
				icon: 'error',
			})
		}
	}
	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault() // Evita que el formulario se envíe
		}
	}
	return (
		<CardCustom>
			<div className='flex flex-wrap w-full'>
				<p className='py-10 leading-7 pl-4 text-center w-full font-semibold text-gray-700 text-xl'>
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
					onKeyPress={handleKeyPress}
					className='w-full flex flex-wrap p-7'
				>
					<div className='w-full flex-row gap-3 p-2 mb-5'>
						<h2 className='w-full text-center'>Datos del Socio</h2>
						<p className=' w-100 text-center p-0 m-0 '>
							los campos con (<span className='text-red-500 text-3xl align-sub'>*</span>) son obligatorios
						</p>
						<p className='text-red-500 w-100  p-0 m-0 text-center text-lg'>Se solicita corregir el nombre y el apellido de ser necesario del socio que seleccione</p>
						<div className='w-full flex gap-3'>
							<div className='mt-2 md:w-1/2 lg:w-1/3 '>
								<label htmlFor='number_customer' className='block font-semibold ml-1 mb-2 dark:text-white'>
									Nº Socio <span className='text-red-500 text-lg'>*</span>
								</label>
								<input
									id='number_customer'
									type='text'
									placeholder='Ingrese su N° de Socio'
									{...register('number_customer', {
										required: true,
										pattern: /^[0-9]*$/,
										onBlur: (e) => controlNumberCustomer(),
									})}
									className={`block w-full rounded-md border-0 p-2 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
										errors.number_customer ? 'border-red-500' : ''
									}`}
								/>
								{errors.number_customer?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
								{errors.number_customer?.type === 'pattern' && <span className='text-red-500'>Solo se pueden ingresar numeros</span>}
							</div>
							<div className='mt-2 md:w-1/2 lg:w-1/3 '>
								<label htmlFor='name_customer' className='block font-semibold ml-1 mb-2 dark:text-white'>
									Nombre <span className='text-red-500 text-lg'>*</span>
								</label>
								<input
									id='name_customer'
									type='text'
									placeholder='Ingrese nombre del socio'
									{...register('name_customer', {
										required: true,
										onChange: (e) => {
											setValue('name_customer', e.target.value.toUpperCase())
										},
									})}
									className={`block w-full rounded-md border-0 p-2 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
										errors.name_customer ? 'border-red-500' : ''
									}`}
								/>
								{errors.name_customer?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
							</div>
							<div className='mt-2 md:w-1/2 lg:w-1/3 '>
								<label htmlFor='name_customer' className='block font-semibold ml-1 mb-2 dark:text-white'>
									Apellido <span className='text-red-500 text-lg'>*</span>
								</label>
								<input
									id='last_name_customer'
									type='text'
									placeholder='Ingrese nombre del socio'
									{...register('last_name_customer', {
										required: true,
										onChange: (e) => {
											setValue('last_name_customer', e.target.value.toUpperCase())
										},
									})}
									className={`block w-full rounded-md border-0 p-2 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
										errors.last_name_customer ? 'border-red-500' : ''
									}`}
								/>
								{errors.last_name_customer?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
							</div>
						</div>
					</div>
					<div className='w-full flex flex-wrap'>
						<h2 className='w-full text-center'>Datos del Usuario</h2>
						<div className='w-full md:w-1/2 lg:w-1/3  p-2'>
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
						<div className='w-full md:w-1/2 lg:w-1/3  p-2'>
							<div className='mt-2'>
								<label htmlFor='document_number' className='block font-semibold ml-1 mb-2 dark:text-white'>
									Nº de Documento <span className='text-red-500 text-lg'>*</span>
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
							<div className='w-full md:w-1/2 lg:w-1/3  p-2'>
								<div className='mt-2'>
									<label htmlFor='sex' className='block font-semibold ml-1 mb-2 dark:text-white'>
										Sexo <span className='text-red-500 text-lg'>*</span>
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
						<div className='w-full md:w-1/2 lg:w-1/3  p-2'>
							<div className='mt-2'>
								<label htmlFor='id_state' className='block font-semibold ml-1 mb-2 dark:text-white'>
									Provincias <span className='text-red-500 text-lg'>*</span>
								</label>
								<select
									id='id_state'
									{...register('id_state', { required: true, onChange: (e) => handleProvinceChange() })}
									className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'
								>
									<option className='robotoCondensed' value=''>
										Seleccionar...
									</option>
									{provinces.map((item, index) => (
										<option key={index} className='robotoCondensed' value={item.id}>
											{item.name}
										</option>
									))}
								</select>
								{errors.id_state?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
							</div>
						</div>
						<div className='w-full md:w-1/2 lg:w-1/3  p-2'>
							<div className='mt-2'>
								<label htmlFor='id_city' className='block font-semibold ml-1 mb-2 dark:text-white'>
									Localidades <span className='text-red-500 text-lg'>*</span>
								</label>
								<select
									id='id_city'
									{...register('id_city', { required: true, onChange: () => handleCityChange() })}
									className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'
								>
									<option className='robotoCondensed' value=''>
										Seleccionar...
									</option>
									{localidades.map((item, index) => (
										<option key={index} className='robotoCondensed' value={item.id}>
											{item.name}
										</option>
									))}
								</select>
								{errors.id_city?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
							</div>
						</div>
						<div className='w-full flex flex-row md:w-1/2 lg:w-1/3  p-2'>
							<div className='mt-2 w-2/3'>
								<div className='w-full flex relative'>
									<label htmlFor='id_street' className='block font-semibold ml-1 mb-2 dark:text-white'>
										Dirección <span className='text-red-500 text-lg'>*</span>
									</label>
									<IconButton className='top-0 right-0 !absolute' color='error' size='small' onClick={() => openModalStreetApi()}>
										<Add />
									</IconButton>
								</div>
								<select
									id='id_street'
									{...register('id_street', { required: true })}
									className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'
								>
									<option className='robotoCondensed' value=''>
										Seleccionar...
									</option>
									{streets.map((item, index) => (
										<option key={index} className='robotoCondensed' value={item.id}>
											{item.name}
										</option>
									))}
								</select>
								{errors.id_street?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
							</div>
							<div className='ml-2 mt-2 w-1/3'>
								<label htmlFor='number_address' className='block font-semibold ml-1 mb-2 dark:text-white'>
									Numero <span className='text-red-500 text-lg'>*</span>
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
						<div className='w-full md:w-1/2 lg:w-1/3  p-2'>
							<div className='mt-2'>
								<label className='block font-semibold ml-1 mb-2 dark:text-white'>
									Caracteristica <span className='text-red-500 text-lg'>*</span>
								</label>
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
						<div className='w-full md:w-1/2 lg:w-1/3  p-2'>
							<div className='mt-2'>
								<label className='block font-semibold ml-1 mb-2 dark:text-white'>
									Número de Celular <span className='text-red-500 text-lg'>*</span>
								</label>
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
									{TypeUser === 1 ? 'Fecha de Nacimiento' : 'Fecha de Registro'} <span className='text-red-500 text-lg'>*</span>
								</label>
								<input
									{...register('birthdate', { required: true })}
									type='date'
									id='birthday'
									className='block  w-full rounded-md border-0 p-2 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1  placeholder:text-gray-400 sm:text-sm sm:leading-6'
								/>
								{errors.birthdate?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
							</div>
						</div>

						<div className='w-full flex justify-center p-2'>
							<Button variant='contained' type='submit' className='!text-black !bg-yellow-300 hover:!bg-yellow-400 focus:!bg-yellow-400 !m-2'>
								Guardar
							</Button>
						</div>
					</div>
				</form>
				<ModalNewStreet
					streetsAdd={streetsApi}
					openModalStreet={openModalStreet}
					handleModalStreet={() => openModalStreetApi}
					userData={{ city: watch('id_city') }}
					setStreets={setStreets}
					editWatch={watch('id_city')}
				/>
			</div>
		</CardCustom>
	)
}

export default leveldos
