import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { TbEye, TbEyeClosed } from 'react-icons/tb'
import InputGroup from '../../../components/InputGroup'
import Button from '../../../components/Button'
// import Axios from 'axios'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { UserContext } from '../../../contexts/UserContext'
import { request } from '../../../utils/request'

const Login = () => {
	const { token, idUser } = useParams(['token', 'idUser'])
	const { usuario, setUsuario, setDarkMode, setAccount } = useContext(UserContext)
	const navigate = useNavigate()
	const [pass, setPass] = useState('password')
	const [remember, setRemember] = useState(false)
	const location = useLocation()
	const [iconEye, setIconEye] = useState(<TbEye />)
	const showPassword = () => {
		setPass(pass === 'password' ? 'text' : 'password')
		setIconEye(pass === 'password' ? <TbEyeClosed /> : <TbEye />)
	}
	const handleChangeCheckBoxRemember = (e) => {
		setRemember(!remember)
	}

	const RenviarToken = async () => {
		const url = import.meta.env.VITE_APP_API_URL + '/reSendEmailToken'
		const info = { token, idUser }
		try {
			const responseData = await request(url, 'POST', info)
			// const responseData = await Axios.post(url, info)
			if (responseData.status !== 200) {
				throw new Error('No existe el usuario')
			}
			Swal.fire({
				icon: 'success',
				title: 'Perfecto!',
				text: `Se ha reenviado un email a ${info.mail} para activar la cuenta`,
			}).then(() => {
				navigate('/Login')
			})
		} catch (error) {
			console.log(error)
		}
	}

	const formulario = async (datos) => {
		// const url = import.meta.env.VITE_APP_API_URL + '/login'
		const urlNode = import.meta.env.VITE_APP_API_URL + '/login'
		Swal.fire({
			title: 'Por favor espere...',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading()
			},
		})
		try {
			const responseData = await request(urlNode, 'POST', datos)
			// const responseData = await Axios.post(urlNode, datos)
			if (responseData.status === 200) {
				// Obtengo la informacion que llega en el payload del token
				const decoded = jwtDecode(responseData.data.token)
				// Obtengo la fecha de expiracion del token y la guardo en una cookie
				const expirationDate = new Date(decoded.exp)
				Cookies.set('token', responseData.data.token, {
					expires: expirationDate,
					secure: false,
					sameSite: 'Lax',
				})
				decoded.popup = true
				localStorage.setItem('usuario', JSON.stringify(decoded))
                // Esto se hace porque el usuario nivel 1 no tiene socios asociados
                if(decoded.level === 1){
                    const user = { ...decoded, accounts: [{ level: 1, primary: true }] }

                    setAccount({ level: 1, primary: true })
                    setDarkMode(decoded.dark)
                    setUsuario(user)

                    Swal.close()

                    navigate('/')
                    return true
                }

				const otherCustomer = await request(import.meta.env.VITE_APP_API_URL + '/allOther', 'GET')
                // Se obtienen todos los socios de procoop relacionados al usuario logueado
				let DataOtherUser = await otherCustomer.data.map((item) => {
					return {
						id_relation: item.id,
						name: item.procoop_last_name,
						num: item.procoop_number,
						primary: item.primary_account,
						level: item.level,
						active: item.primary_account,
					}
				})
                // Se obtiene y se setea la cuenta principal del usuario logueado
				setAccount(DataOtherUser.filter((item) => item.primary)[0])
				const user = { ...decoded, accounts: DataOtherUser }
				setDarkMode(decoded.dark)
				setUsuario(user)
				Swal.close()
				navigate('/')
			}
		} catch (error) {
			Swal.close()
			Swal.fire({
				icon: 'warning',
				title: error !== '' ? 'Atención!' : 'Sitio en mantenimiento',
				text: error,
				allowOutsideClick: false,
			})
		}
	}

	const validacionToken = async (token, id) => {
		const url = import.meta.env.VITE_APP_API_URL + '/validationUser'
		const info = { token_temp: token, id }
		Swal.fire({
			title: 'Por favor espere...',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading()
			},
		})
		try {
			await request(url, 'POST', info)
			Swal.close()
			Swal.fire({
				icon: 'success',
				title: 'Perfecto!',
				text: 'Se habilito correctamente tu cuenta.',
				allowOutsideClick: false,
			}).then(() => {
				navigate('/Login')
			})
		} catch (error) {
			console.log(error)
			Swal.close()
			Swal.fire({
				icon: 'warning',
				title: 'Atención!',
				text: error.response.data,
				confirmButtonText: 'Reenviar Token',
				allowOutsideClick: false,
				showCancelButton: true,
			}).then((result) => {
				if (!result.isConfirmed) {
					navigate('/Login')
				} else {
					RenviarToken()
				}
			})
		}
	}
	useEffect(() => {
		if (token && idUser && (!usuario || !usuario.length)) {
			validacionToken(token, idUser)
		}
		const authUser = Cookies.get('token')
		const storedUser = localStorage.getItem('usuario')
		if (!authUser || !storedUser) {
			localStorage.removeItem('usuario')
			Cookies.remove('token')
		} else {
			if (location.pathname === '/Login' || location.pathname === '/login') {
				navigate('/')
			}
		}
	}, [])

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm()
	return (
		<>
			<h2 className='mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white'>Iniciar Sesión </h2>
			{import.meta.env.VITE_TEST}
			<form onSubmit={handleSubmit(formulario)}>
				<InputGroup required errors={errors} validation={register} id={'email'} name={'email'} title={'Email'} ph={'Ingrese un Email'} type={'email'} />
				<InputGroup
					required
					errors={errors}
					validation={register}
					className={'mt-5'}
					id={'password'}
					name={'password'}
					title={'Contraseña'}
					showPass={showPassword}
					ph={'Ingrese una Contraseña'}
					type={pass}
					btnIcon={iconEye}
				/>
				<div className='w-full mt-3 flex flex-col text-center items-center justify-center'>
					<FormControlLabel onChange={handleChangeCheckBoxRemember} control={<Checkbox errors={errors} {...register('remember')} name={'remember'} id={'remember'} />} label='Recuerdame' />
					<Button
						props={{
							class: 'text-gray-700 text-xl mt-3 bg-green-500 hover:bg-green-400',
							text: 'Ingresar',
							type: 'submit',
						}}
					/>
				</div>
				<div className='mt-4 w-full flex-col flex text-center'>
					<label className='mt-2'>
						¿Olvidaste tu contraseña?
						<span
							className='font-bold cursor-pointer ml-2 text-teal-700'
							onClick={() => {
								navigate('/RestorePassword')
							}}
						>
							Recuperala
						</span>
					</label>
					<label className='m-0 mt-2'>
						¿No tenés una cuenta?
						<span
							className='font-bold ml-2 cursor-pointer text-orange-600'
							onClick={() => {
								navigate('/Register')
							}}
						>
							Registrate
						</span>
					</label>
				</div>
			</form>
		</>
	)
}

export default Login
