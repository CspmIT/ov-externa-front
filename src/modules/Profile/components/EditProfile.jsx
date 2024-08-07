import { Button, InputAdornment, MenuItem, Skeleton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { request } from '../../../utils/request'
import { validarFecha } from '../../../utils/dateFunction'
import { daysArray, monthArray } from '../../serviceProcedures/utils/data'
import { getAllStreet, getProvinces, listCityXIdState, listStreetXIdCity } from '../../../views/LevelUp/utils/Address'
import { Add } from '@mui/icons-material'
import ModalNewStreet from './ModalNewStreet'
function EditProfile({ value, editProfile, userData, setEditProfile, setValor, fetchData }) {
	const [provinces, setProvinces] = useState([])
	const [cities, setCities] = useState([])
	const [streets, setStreets] = useState([])
	const [isLoaded, setIsLoaded] = useState(false)
	useEffect(() => {
		if (value === 1) {
			Object.keys(userData).map((key) => setValue(key, userData[key]))
		}
	}, [value])

	useEffect(() => {
		getProvinces().then((provincias) => {
			setProvinces(provincias)
		})
	}, [])
	useEffect(() => {
		if (provinces.length) {
			listCityXIdState(userData.state).then((cities) => {
				setCities(cities)
			})
		}
	}, [provinces])

	useEffect(() => {
		if (cities.length) {
			setValue('city', userData.city)
			listStreetXIdCity(userData.city).then((streets) => {
				setStreets(streets)
			})
		}
	}, [cities])
	useEffect(() => {
		if (streets.length) {
			setValue('street', userData?.street)
			setIsLoaded(true)
		}
	}, [streets])

	const CancelEditProfile = () => {
		Swal.fire({
			title: '¿Deseas Cancelar la edición?',
			text: 'Tenga en cuenta que no se guardara nada de lo editado en el formulario',
			icon: 'question',
			allowOutsideClick: false,
			showCancelButton: true,
			customClass: {
				container: ' z-[9999] ',
			},
			confirmButtonText: 'Aceptar',
			cancelButtonText: 'Cancelar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				setEditProfile(!editProfile)
				setValor(1)
				setValor(0)
			}
		})
	}
	const onSubmit = async (dato) => {
		try {
			const { value: password } = await Swal.fire({
				title: 'Ingresa tu contraseña',
				input: 'password',
				inputLabel: 'Contraseña',
				inputPlaceholder: 'Ingresa tu contraseña',
				inputAttributes: {
					minlength: '8',
					autocapitalize: 'off',
					autocorrect: 'off',
				},
			})
			Swal.fire({
				title: 'Por favor espere...',
				text: 'Estamos ejecutando su petición',
				allowOutsideClick: false,
				didOpen: () => {
					Swal.showLoading()
				},
			})
			if (password) {
				dato.pass = password
				dato.id_person = userData.id_person
				const url = import.meta.env.VITE_APP_API_URL + '/updateProfile'
				const response = await request(url, 'PATCH', dato)
				if (response.status === 200) {
					setEditProfile(!editProfile)
					fetchData()
					setValor(1)
					setTimeout(() => {
						setValor(0)
					}, 15)
					Swal.close()
				}
			} else {
				Swal.close()
			}
		} catch (error) {
			Swal.close()
			Swal.fire('Atención!', error, 'warning')
		}
	}

	// Valido la fecha de nacimiento
	const validateDate = () => {
		const anio = editWatch('año')
		const mes = editWatch('mes')
		const dia = editWatch('dia')
		return validarFecha(anio, mes, dia)
	}

	// Validaciones del formulario editar
	const {
		register: editRegister,
		handleSubmit: editHandleSubmit,
		formState: { errors: editErrors },
		watch: editWatch,
		setValue,
	} = useForm()
	const [streetsAdd, setStreetsAdd] = useState([])
	const [openModalStreet, setOpenModalStreet] = useState(false)
	const handleModalStreet = () => {
		if (!openModalStreet && !streetsAdd.length) {
			getAllStreet().then((streets) => {
				setStreetsAdd(streets)
			})
		}
		setOpenModalStreet(!openModalStreet)
	}
	if (!isLoaded) {
		return (
			<div className='flex flex-col gap-3 pt-12'>
				<div className='flex flex-row gap-3 '>
					<Skeleton variant='rectangular' className='!w-1/3' height={50} />
					<Skeleton variant='rectangular' className='!w-1/3' height={50} />
					<Skeleton variant='rectangular' className='!w-1/3' height={50} />
				</div>
				<div className='flex flex-row gap-3 '>
					<Skeleton variant='rectangular' className='!w-1/3' height={50} />
					<Skeleton variant='rectangular' className='!w-1/3' height={50} />
					<Skeleton variant='rectangular' className='!w-1/3' height={50} />
				</div>
				<div className='flex flex-row gap-3 '>
					<Skeleton variant='rectangular' className='!w-1/3' height={50} />
					<Skeleton variant='rectangular' className='!w-1/3' height={50} />
					<Skeleton variant='rectangular' className='!w-1/3' height={50} />
				</div>
			</div>
		)
	}
	return (
		<>
			<div className='!bg-transparent'>
				<form encType='multipart/form-data' className='flex flex-col items-center mt-4' onSubmit={editHandleSubmit(onSubmit)} id='formEditUser'>
					<div className='flex flex-col gap-4 w-full my-5'>
						<div className='flex w-full gap-2 justify-center items-center'>
							<TextField
								error={editErrors.name}
								type='text'
								label={`${userData.type_person === 1 ? 'Nombre' : 'Razon social'}`}
								{...editRegister('name', { required: 'El Campo es requerido' })}
								className='w-1/3'
								helperText={editErrors.name && editErrors.name.message}
								defaultValue={editProfile ? userData.name : ''}
							/>
							<TextField
								error={editErrors.last_name}
								type='text'
								label={`${userData.type_person === 1 ? 'Apellido' : 'Nombre de Fantasia'}`}
								{...editRegister('last_name', { required: 'El Campo es requerido' })}
								className='w-1/3'
								helperText={editErrors.last_name && editErrors.last_name.message}
								defaultValue={editProfile ? userData.last_name : ''}
							/>
							{userData.type_person === 1 && (
								<TextField
									select={true}
									label='Sexo'
									className='w-1/3'
									{...editRegister('id_type_sex', { required: 'El Campo es requerido' })}
									error={editErrors.id_type_sex}
									helperText={editErrors.id_type_sex && editErrors.id_type_sex.message}
									defaultValue={editProfile ? userData.id_type_sex : ''}
								>
									<MenuItem key={1} value={1}>
										Femenino
									</MenuItem>
									<MenuItem key={2} value={2}>
										Masculino
									</MenuItem>
								</TextField>
							)}
						</div>
						<div className='flex w-full gap-2 justify-center items-center'>
							<TextField
								error={editErrors.email}
								type='text'
								label='Email'
								{...editRegister('email', {
									required: 'El Campo es requerido',
									pattern: {
										value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
										message: 'Debe escribir un email correctamente',
									},
								})}
								className='w-5/12'
								helperText={editErrors.email && editErrors.email.message}
								defaultValue={editProfile ? userData.email : ''}
							/>
							<TextField
								error={editErrors.day}
								select={true}
								label={userData.type_person === 1 ? 'Día de Nac.' : 'Día de Reg.'}
								id={'day'}
								{...editRegister('day', { required: 'El Campo es requerido', validate: validateDate() })}
								className='w-1/12'
								helperText={editErrors.day && editErrors.day.message}
								defaultValue={editProfile ? userData.day : ''}
							>
								{daysArray.map((item) => (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								))}
							</TextField>
							<TextField
								error={editErrors.month}
								select={true}
								label={userData.type_person === 1 ? 'Mes de Nac.' : 'Mes de Reg.'}
								id={'month'}
								{...editRegister('month', { required: 'El Campo es requerido' })}
								className='w-3/12'
								helperText={editErrors.month && editErrors.month.message}
								defaultValue={editProfile ? userData.month : ''}
							>
								{monthArray.map((item) => (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								))}
							</TextField>
							<TextField
								error={editErrors.year}
								select={true}
								label={userData.type_person === 1 ? 'Año de Nac.' : 'Año de Reg.'}
								id={'year'}
								{...editRegister('year', { required: 'El Campo es requerido' })}
								className='w-3/12'
								helperText={editErrors.year && editErrors.year.message}
								defaultValue={editProfile ? userData.year : ''}
							>
								{Array.from({ length: 120 }, (_, i) => i + new Date().getFullYear() - 120).map((item) => (
									<MenuItem key={item} value={item}>
										{item}
									</MenuItem>
								))}
							</TextField>
						</div>
						<div className='flex w-full gap-2 justify-center items-center'>
							<TextField
								error={editErrors.state}
								select={true}
								label='Provincia'
								id={'state'}
								{...editRegister('state', {
									required: 'El Campo es requerido',
									onChange: (e) => {
										listCityXIdState(e.target.value).then((cities) => {
											setCities(cities)
										})
									},
								})}
								className='w-3/12'
								helperText={editErrors.state && editErrors.state.message}
								defaultValue={editProfile ? userData.state : ''}
							>
								{provinces.map((item) => (
									<MenuItem key={item.id} value={item.cod_pro}>
										{item.name}
									</MenuItem>
								))}
							</TextField>
							<TextField
								error={editErrors.city}
								select={true}
								label='Ciudad'
								id={'city'}
								{...editRegister('city', {
									required: 'El Campo es requerido',
									onChange: (e) => {
										listStreetXIdCity(e.target.value).then((streets) => {
											setStreets(streets)
										})
									},
								})}
								className='w-4/12'
								helperText={editErrors.city && editErrors.city.message}
								defaultValue={editProfile ? userData.city : ''}
							>
								{cities.map((item) => (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								))}
							</TextField>
							<TextField
								error={editErrors.street}
								select={true}
								label='Calle'
								id={'street'}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<Add className='cursor-pointer hover:ring-1 rounded-xl' onClick={() => handleModalStreet()} />
										</InputAdornment>
									),
								}}
								{...editRegister('street', { required: 'El Campo es requerido' })}
								className='w-3/12'
								helperText={editErrors.street && editErrors.street.message}
								defaultValue={editProfile ? userData.street : ''}
							>
								{streets.map((item) => (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								))}
							</TextField>
							<TextField
								error={editErrors.number_address}
								label='Nro'
								id={'number_address'}
								{...editRegister('number_address', { required: 'El Campo es requerido' })}
								className='w-1/12'
								helperText={editErrors.number_address && editErrors.number_address.message}
								defaultValue={editProfile ? userData.number_address : ''}
							/>
							<TextField
								error={editErrors.floor}
								label='Piso'
								id={'floor'}
								{...editRegister('floor')}
								className='w-1/12'
								helperText={editErrors.floor && editErrors.floor.message}
								defaultValue={editProfile ? userData.floor : ''}
							/>
							<TextField
								error={editErrors.dpto}
								label='Dpto'
								id={'dpto'}
								{...editRegister('dpto')}
								className='w-1/12'
								helperText={editErrors.dpto && editErrors.dpto.message}
								defaultValue={editProfile ? userData.dpto : ''}
							/>
						</div>
						<div className='flex w-full gap-2 justify-center items-center'>
							<TextField
								error={editErrors.caractCellPhone}
								label='Caracteristica Celular'
								id={'caractCellPhone'}
								{...editRegister('caractCellPhone', { required: 'El Campo es requerido' })}
								className='w-2/12'
								InputProps={{
									startAdornment: <InputAdornment position='start'>+549 0</InputAdornment>,
								}}
								helperText={editErrors.caractCellPhone && editErrors.caractCellPhone.message}
								defaultValue={editProfile ? userData?.caractCellPhone : ''}
							/>
							<TextField
								error={editErrors.numbCellPhone}
								label='Numero Celular'
								id={'numbCellPhone'}
								{...editRegister('numbCellPhone', { required: 'El Campo es requerido' })}
								className='w-4/12'
								InputProps={{
									startAdornment: <InputAdornment position='start'>15</InputAdornment>,
								}}
								helperText={editErrors.numbCellPhone && editErrors.numbCellPhone.message}
								defaultValue={editProfile ? userData?.numbCellPhone : ''}
							/>
							<TextField
								label='Caracteristica Fijo'
								id={'caractFixedPhone'}
								{...editRegister('caractFixedPhone')}
								className='w-2/12'
								InputProps={{
									startAdornment: <InputAdornment position='start'>+549 0</InputAdornment>,
								}}
								defaultValue={editProfile ? userData?.caractFixedPhone : ''}
							/>
							<TextField label='Numero Fijo' id={'numbFixedPhone'} {...editRegister('numbFixedPhone')} className='w-4/12' defaultValue={editProfile ? userData?.numbFixedPhone : ''} />
						</div>
					</div>
					<div className='gap-3 flex'>
						<Button
							variant='contained'
							className='!bg-red-500'
							type='button'
							onClick={() => {
								CancelEditProfile()
							}}
						>
							Cancelar
						</Button>
						<Button variant='contained' type='submit' title='Guardar Cambios' className='!bg-green-500 '>
							Guardar
						</Button>
					</div>
				</form>
			</div>
			<ModalNewStreet streetsAdd={streetsAdd} openModalStreet={openModalStreet} handleModalStreet={() => handleModalStreet} userData={userData} setStreets={setStreets} editWatch={editWatch('city')} />
		</>
	)
}

export default EditProfile
