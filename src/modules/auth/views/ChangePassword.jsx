// Importa las dependencias necesarias
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import InputGroup from '../../../components/InputGroup'
import { Button, CircularProgress } from '@mui/material'
import { TbEye, TbEyeClosed } from 'react-icons/tb'
import Swal from 'sweetalert2'
import { request } from '../../../utils/request'
import { backend } from '../../../routes/apiEndpoints'
// import Axios from 'axios'

// Define el componente ChangePassword
const ChangePassword = () => {
	// Recupera el token de la URL
	const { token, userId } = useParams(['token'])
	const [spinner] = useState(false)
	const navigate = useNavigate()

	const [pass, setPass] = useState('password')
	const [iconEye, setIconEye] = useState(<TbEye />)
	const [passRepeat, setPassRepeat] = useState('password')
	const [iconEyeRepeat, setIconEyeRepeat] = useState(<TbEye />)
	const showPasswordRepeat = () => {
		setPassRepeat(passRepeat === 'password' ? 'text' : 'password')
		setIconEyeRepeat(passRepeat === 'password' ? <TbEyeClosed /> : <TbEye />)
	}
	const showPassword = () => {
		setPass(pass === 'password' ? 'text' : 'password')
		setIconEye(pass === 'password' ? <TbEyeClosed /> : <TbEye />)
	}

	const changePassword = async (data) => {
		// const url = "http://localhost:8000/change_password";
		const url = backend.OvExterna + '/changePassword'
		const info = { password: data.password, token, id_user:userId }
		try {
			const responseData = await request(url, 'POST', info)
			// const responseData = await Axios.post(url, info)
			if (responseData.status === 200) {
				Swal.fire({
					icon: 'success',
					title: 'Perfecto!',
					text: 'Tu contraseña fue modificada con exito',
					allowOutsideClick: false,
				}).then(() => {
					navigate('/Login')
				})
			}
		} catch (error) {
			Swal.fire({
				icon: 'warning',
				title: 'Atención!',
				text: 'Tu token expiro o no existe, debe volver a intentar recuperar la contraseña',
				allowOutsideClick: false,
			}).then(() => {
				navigate('/Login')
			})
			console.log(error)
		}
	}
	const validationToken = async (token) => {
		// const url = 'http://localhost:8000/validationToken'
		const url = backend.OvExterna + '/validationToken'
		const info = { token_temp:token, id_user: userId }
		try {
			const responseData = await request(url, 'POST', info)
			if (responseData.status === 200) {
				return true
			}
		} catch (error) {
			Swal.fire({
				icon: 'warning',
				title: 'Atención!',
				text: 'Tu token expiro o no existe, debe volver a intentar recuperar la contraseña',
				allowOutsideClick: false,
			}).then(() => {
				navigate('/Login')
			})
			console.log(error)
		}
	}
	useEffect(() => {
		if (token) {
			validationToken(token)
		}
	}, [token])

	useEffect(() => {
		document.body.classList.remove('dark')
	}, [])

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()
	return (
		<>
			<h2 className='mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white'>Cambio de contraseña </h2>
			<form onSubmit={handleSubmit((data) => changePassword(data))}>
				<InputGroup
					required
					errors={errors}
					validation={register}
					id={'password'}
					name={'password'}
					title={'Contraseña Nueva'}
					showPass={showPassword}
					ph={'Ingrese una Contraseña nueva'}
					type={pass}
					btnIcon={iconEye}
				/>
				<InputGroup
					className={'mt-5'}
					validate={{
						matchesPreviousPassword: (val, values) => {
							return values.password === values.password_confirmation || 'Las contraseñas deben coincidir.'
						},
					}}
					required
					errors={errors}
					validation={register}
					id={'password_confirmation'}
					name={'password_confirmation'}
					title={'Repetir Contraseña Nueva'}
					ph={'Ingrese Nuevamente la Contraseña nueva'}
					type={passRepeat}
					showPass={showPasswordRepeat}
					btnIcon={iconEyeRepeat}
				/>
				<div className='w-full mt-6 flex text-center items-center justify-center'>
					<Button variant='contained' color='primary' disabled={spinner} type='submit'>
						{spinner ? <CircularProgress size={20} disableShrink={true} color='warning' /> : <b>Guardar</b>}
					</Button>
				</div>
			</form>
		</>
	)
}

export default ChangePassword
