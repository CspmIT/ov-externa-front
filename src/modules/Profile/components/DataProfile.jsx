import { CameraAlt, Cancel, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { createRef, useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import { request, requestFiles } from '../../../utils/request'
import Swal from 'sweetalert2'
import { formatDateForInput } from '../../../utils/dateFunction'

function DataProfile({ editProfile, userData, setEditProfile, setValor }) {
	const { setUsuario, usuario } = useContext(UserContext)
	const fileInputRef = createRef()
	const [imgProfile, setImgProfile] = useState('https://app.coopmorteros.coop/public/images/cooptech/Iso_Cooptech.png')

	const saveImage = async (data) => {
		const formData = new FormData()
		// Agrega la imagen al objeto FormData
		if (data.img_profile.length > 0) {
			formData.append('img', data.img_profile[0])
		}
		let message = 'Error'
		try {
			const url = import.meta.env.VITE_FILE_API_URL + '/uploadProfile'
			const response = await requestFiles(url, 'POST', formData)

			if (response.status === 200) {
				message = response.data.filename
			}
			return message
		} catch (error) {
			return message
		}
	}

	const checkServerStatus = async () => {
		setImgProfile('https://app.coopmorteros.coop/public/images/cooptech/Iso_Cooptech.png')
		if (!usuario.img_profile) {
			return
		}
		const directory = 'images/profile/' + usuario.img_profile
		try {
			const response = await request(`${import.meta.env.VITE_FILE_API_URL}/existsFile`, 'POST', { directory })
			if (response.status === 200) {
				console.log(response)
				setImgProfile(`${import.meta.env.VITE_FILE_API_URL}/images/profile/${usuario.img_profile}`)
			}
		} catch (error) {
			console.log('Error checking server status:', error)
		}
	}
	useEffect(() => {
		checkServerStatus()
	}, [])

	const handleDivClick = () => {
		fileInputRef.current.click()
	}

	const handleFileChange = async (event) => {
		try {
			const file = { img_profile: event.target.files }
			const mensaje = await saveImage(file)
			const url = `${import.meta.env.VITE_APP_API_URL}/updatePhotoProfile`
			const res = await request(url, 'patch', { img_profile: mensaje })
			if (res.status === 200) {
				Swal.fire({
					title: 'Perfecto!',
					text: 'Se cambio tu foto de perfil correctamente',
					icon: 'success',
					allowOutsideClick: false,
					timer: 1200,
				})
				setUsuario({ ...usuario, img_profile: mensaje })
			}
		} catch (error) {
			Swal.fire('Atención!', error, 'warning')
		}
	}
	useEffect(() => {
		if (usuario.img_profile) {
			checkServerStatus()
		}
	}, [usuario])
	return (
		<>
			<div className='bg-transparent w-full justify-center items-center flex flex-col'>
				<div className='w-full flex flex-col items-end justify-end'>
					<IconButton
						variant='contained'
						className={`${!editProfile ? '!bg-yellow-400' : '!bg-red-300'}`}
						onClick={async () => {
							setEditProfile(!editProfile)
							setValor(1)
							setTimeout(() => {
								setValor(0)
							}, 15)
						}}
					>
						{!editProfile ? <Edit /> : <Cancel />}
					</IconButton>
				</div>
				<div className='h-44 w-44 relative overflow-hidden rounded-full bg-orange-500 border-0 flex justify-center items-center group'>
					<img src={imgProfile} alt='imagen de perfil' className='w-full h-full object-cover rounded-full' />
					<div onClick={handleDivClick} className='absolute cursor-pointer top-0 w-full h-full z-50 hidden group-hover:flex flex-col bg-slate-900/60 justify-center items-center'>
						<IconButton
							variant='contained'
							className='!text-white'
							onClick={async () => {
								setEditProfile(!editProfile)
								setValor(1)
								setTimeout(() => {
									setValor(0)
								}, 15)
							}}
						>
							<CameraAlt />
						</IconButton>
						<input type='file' ref={fileInputRef} className='hidden' onChange={handleFileChange} />
						<p className='uppercase text-center text-sm text-white w-2/3'>Cambiar Foto de perfl</p>
					</div>
				</div>
				<div className={` w-full justify-center items-center flex flex-col gap-3`}>
					{userData.type_person === 1 ? (
						<h1 className='text-2xl font-bold mt-4'>
							{userData.name} {userData.last_name}
						</h1>
					) : (
						<>
							<h1 className='text-3xl font-bold mt-4 mb-0'>{userData.name}</h1>
							<h1 className='text-2xl font-bold m-0'>{userData.last_name}</h1>
						</>
					)}
					<p className='text-gray-500 dark:text-gray-400 p-0 m-0'>
						Correo:
						<span className='text-black dark:text-white'> {userData.email} </span>
					</p>
					<p className='text-gray-500 dark:text-gray-400 p-0 m-0'>
						Fecha de Nacimiento:
						<span className='text-black dark:text-white'> {formatDateForInput(userData.born_date, true)} </span>
					</p>
					{userData.fixed_phone && (
						<p className='text-gray-500 dark:text-gray-400 p-0 m-0'>
							Teléfono Fijo:
							<span className='text-black dark:text-white'> {userData.fixed_phone ?? 'Pendiente'}</span>
						</p>
					)}
					<p className='text-gray-500 dark:text-gray-400 p-0 m-0'>
						Teléfono Celular:
						<span className='text-black dark:text-white'> {userData.cell_phone ?? 'Pendiente'}</span>
					</p>
					<p className='text-gray-500 dark:text-gray-400 p-0 m-0'>
						Dirección:
						<span className='text-black dark:text-white'> {userData.address} </span>
					</p>
					{userData.type_person === 1 && (
						<p className='text-gray-500 dark:text-gray-400 p-0 m-0'>
							Sexo:
							<span className='text-black dark:text-white'> {userData.id_type_sex === 1 ? 'Femenino' : 'Masculino'} </span>
						</p>
					)}
				</div>
			</div>
		</>
	)
}

export default DataProfile
