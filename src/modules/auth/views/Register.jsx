import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { TbEye, TbEyeClosed } from 'react-icons/tb'

import InputGroup from '../../../components/InputGroup'
import Button from '../../../components/Button'
import { request } from '../../../utils/request'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import ToggleTypePerson from '../components/ToggleTypePerson'

const Register = () => {
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
	const navigate = useNavigate()
	const formulario = async (data) => {
		const url = import.meta.env.VITE_APP_API_URL + '/register'
		try {
			Swal.fire({
				title: 'Por favor espere...',
				text: 'Estamos ejecutando su petición',
				allowOutsideClick: false,
				didOpen: () => {
					Swal.showLoading()
				},
			})
			await request(url, 'POST', data)
			Swal.close()
			Swal.fire({
				icon: 'success',
				title: '¡Registrado!',
				text: 'Enviamos un mail a tu correo para confirmar la cuenta.',
			})
			navigate('/Login')
		} catch (error) {
			Swal.close()
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: error,
			})
		}
	}
	const [typePerson, setTypePerson] = useState('fisica')

	useEffect(() => {
		if (typePerson === 'fisica') {
			setValue('typePerson', 1)
			register('last_name')
		} else {
			setValue('typePerson', 2)
			unregister('last_name')
		}
	}, [typePerson])

	const {
		register,
		unregister,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm()

	return (
		<>
			<h2 className='max-sm:mt-5 mb-8 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white'>Registrarme</h2>
			<form id='formRegister' onSubmit={handleSubmit((data) => formulario(data))} autoComplete={'new-password'}>
				<div className='w-full justify-center flex'>
					<ToggleTypePerson changeSelect={setTypePerson} />
				</div>
				<div className='w-full grid sm:grid-cols-2 gap-3 mt-2 mb-3'>
					<InputGroup
						className={typePerson !== 'fisica' ? 'col-span-2' : ''}
						required
						errors={errors}
						validation={register}
						id={'name'}
						name={'name'}
						title={typePerson === 'fisica' ? 'Nombre' : 'Razon Social'}
						ph={typePerson === 'fisica' ? 'Nombre' : 'Razon Social'}
						type={'text'}
					/>
					{typePerson === 'fisica' ? <InputGroup required errors={errors} validation={register} id={'last_name'} name={'last_name'} title={'Apellido'} ph={'Apellido'} type={'text'} /> : null}
					<InputGroup className={'hidden'} errors={errors} validation={register} id={'typePerson'} name={'typePerson'} type={'hidden'} />
					<InputGroup required errors={errors} validation={register} id={'email'} name={'email'} title={'Email'} ph={'Ingrese un Email'} type={'email'} />
					<InputGroup
						required
						validate={{
							matchesPreviousPassword: (val, values) => {
								return values.email === values.email_confirmation || 'Los emails deben coincidir.'
							},
						}}
						errors={errors}
						validation={register}
						id={'email_confirmation'}
						name={'email_confirmation'}
						title={'Repetir Email'}
						ph={'Ingrese nuevamente tu Email'}
						type={'email'}
					/>
					<InputGroup required errors={errors} validation={register} id={'password'} name={'password'} title={'Contraseña'} showPass={showPassword} ph={'Ingrese una Contraseña'} type={pass} btnIcon={iconEye} />
					<InputGroup
						required
						validate={{
							matchesPreviousPassword: (val, values) => {
								return values.password === values.password_confirmation || 'Las contraseñas deben coincidir.'
							},
						}}
						errors={errors}
						validation={register}
						id={'password_confirmation'}
						name={'password_confirmation'}
						title={'Repetir Contraseña'}
						ph={'Ingrese Nuevamente una Contraseña'}
						type={passRepeat}
						showPass={showPasswordRepeat}
						btnIcon={iconEyeRepeat}
					/>
				</div>
				<div className='w-full flex justify-center'>
					<Button
						props={{
							class: 'text-black bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 m-2',
							text: 'Registrarme',
							type: 'submit',
						}}
					/>
					<Link to={'/Login'}>
						<Button
							props={{
								class: 'text-black bg-white hover:bg-yellow-400 focus:bg-yellow-400 m-2',
								text: 'Cancelar',
							}}
						/>
					</Link>
				</div>
			</form>
		</>
	)
}

export default Register
