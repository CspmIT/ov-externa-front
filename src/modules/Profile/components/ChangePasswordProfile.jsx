import { Button, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TbEye, TbEyeClosed } from 'react-icons/tb'
import { request } from '../../../utils/request'
import Swal from 'sweetalert2'

function ChangePasswordProfile() {
	const {
		register: passwordRegister,
		handleSubmit: passwordHandleSubmit,
		formState: { errors: passwordErrors },
		reset: passwordReset,
	} = useForm()

	const [pass, setPass] = useState('password')
	const [newPass, setNewPass] = useState('password')
	const [confirmPass, setConfirmPass] = useState('password')
	const [eyePass, setEyePass] = useState(<TbEyeClosed />)
	const [eyeNewPass, setEyeNewPass] = useState(<TbEyeClosed />)
	const [eyeConfirmPass, setEyeConfirmPass] = useState(<TbEyeClosed />)

	const visiblePassword = () => {
		if (pass === 'password') {
			setPass('text')
			setEyePass(<TbEye />)
		} else {
			setPass('password')
			setEyePass(<TbEyeClosed />)
		}
	}

	const visibleNewPassword = () => {
		if (newPass === 'password') {
			setNewPass('text')
			setEyeNewPass(<TbEye />)
		} else {
			setNewPass('password')
			setEyeNewPass(<TbEyeClosed />)
		}
	}

	const visibleConfirmPassword = () => {
		if (confirmPass === 'password') {
			setConfirmPass('text')
			setEyeConfirmPass(<TbEye />)
		} else {
			setConfirmPass('password')
			setEyeConfirmPass(<TbEyeClosed />)
		}
	}

	const updatePassword = async (data) => {
		const { password, newPassword } = data
		const url = import.meta.env.VITE_APP_API_URL + '/updatePassword'
		const info = {
			// id,
			password,
			newPassword,
		}
		try {
			const response = await request(url, 'PATCH', info)
			if (response.status === 200) {
				Swal.fire({
					icon: 'success',
					title: 'Perfecto!',
					text: response.data.message,
					allowOutsideClick: false,
				}).then(() => {
					passwordReset()
				})
			}
		} catch (error) {
			Swal.fire({
				icon: 'warning',
				title: 'Atención!',
				text: error,
				allowOutsideClick: false,
			}).then(() => {})
		}
	}
	return (
		<>
			<div className='!bg-transparent'>
				<div className='flex flex-col items-center mt-4'>
					<h1 className='text-2xl font-bold'>Modificar Contraseña</h1>
				</div>
				<form className='flex flex-col gap-4 items-center mt-4' onSubmit={passwordHandleSubmit(updatePassword)}>
					<TextField
						error={passwordErrors.password}
						type={pass}
						label='Contraseña'
						placeholder='Contraseña actual'
						{...passwordRegister('password', {
							required: 'El Campo es requerido',
							minLength: { value: 8, message: 'Debe tener al menos 8 caracteres' },
							pattern: { value: /^(?=.*[A-Z]).{8,}$/, message: 'El Formato correcto debe tener al menos 1 Mayuscula, 1 Simbolo especial y 1 Numero' },
						})}
						className='w-1/3'
						InputProps={{
							endAdornment: (
								<IconButton size='small' type='button' onClick={visiblePassword} className='absolute right-0'>
									{eyePass}
								</IconButton>
							),
						}}
						helperText={passwordErrors.password && passwordErrors.password.message}
					/>
					<TextField
						error={passwordErrors.newPassword}
						type={newPass}
						label='Nueva contraseña'
						placeholder='Nueva contraseña'
						{...passwordRegister('newPassword', {
							required: 'El Campo es requerido',
							minLength: { value: 8, message: 'Debe tener al menos 8 caracteres' },
							pattern: { value: /^(?=.*[A-Z]).{8,}$/, message: 'El Formato correcto debe tener al menos 1 Mayuscula, 1 Simbolo especial y 1 Numero' },
							validate: {
								matchesPreviousPassword: (val, values) => {
									return values.newPassword === values.confirmPassword || 'Las contraseñas deben coincidir.'
								},
							},
						})}
						className='w-1/3'
						InputProps={{
							endAdornment: (
								<IconButton size='small' type='button' onClick={visibleNewPassword} className='absolute right-0'>
									{eyeNewPass}
								</IconButton>
							),
						}}
						helperText={passwordErrors.newPassword && passwordErrors.newPassword.message}
					/>
					<TextField
						error={passwordErrors.confirmPassword}
						type={confirmPass}
						label='Confirmar contraseña'
						placeholder='Confirmar contraseña'
						{...passwordRegister('confirmPassword', {
							required: 'El Campo es requerido',
							minLength: { value: 8, message: 'Debe tener al menos 8 caracteres' },
							pattern: { value: /^(?=.*[A-Z]).{8,}$/, message: 'El Formato correcto debe tener al menos 1 Mayuscula, 1 Simbolo especial y 1 Numero' },
							validate: {
								matchesPreviousPassword: (val, values) => {
									return values.newPassword === values.confirmPassword || 'Las contraseñas deben coincidir.'
								},
							},
						})}
						className='w-1/3'
						InputProps={{
							endAdornment: (
								<IconButton size='small' type='button' onClick={visibleConfirmPassword} className='absolute right-0'>
									{eyeConfirmPass}
								</IconButton>
							),
						}}
						helperText={passwordErrors.confirmPassword && passwordErrors.confirmPassword.message}
					/>
					<Button variant='contained' type='submit' className=' w-64 mt-2'>
						Actualizar constraseña
					</Button>
				</form>
			</div>
		</>
	)
}

export default ChangePasswordProfile
