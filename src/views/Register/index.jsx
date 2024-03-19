import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { TbEye, TbEyeClosed } from 'react-icons/tb'

import InputGroup from '../../components/InputGroup'
import Button from '../../components/Button'
import request from '../../routes/request'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'

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

  const formulario = async (data) => {
    // const url = 'http://localhost:8000/api/register'
    const url = `http://cooptech.com.ar:30888/api/register`
    try {
      await request(url, 'POST', data)
      Swal.fire({
        icon: 'success',
        title: '¡Registrado!',
        text: 'Ahora puedes iniciar sesión.'
      })
    } catch (error) {
      console.error('Error en la solicitud:', error)
    }
  }

  useEffect(() => {
    document.body.classList.remove('dark')
  }, [])

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()

  return (
    <>
      <h2 className='max-sm:mt-5 mb-8 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white'>Registrarme</h2>
      <form id='formRegister' onSubmit={handleSubmit((data) => formulario(data))} autoComplete={'new-password'}>
        <div className='w-full grid sm:grid-cols-2 gap-3 mt-2 mb-3'>
          <InputGroup required errors={errors} validation={register} id={'first_name'} name={'first_name'} title={'Nombre'} ph={'Nombre'} type={'text'} />
          <InputGroup required errors={errors} validation={register} id={'last_name'} name={'last_name'} title={'Apellido'} ph={'Apellido'} type={'text'} />
          <InputGroup required errors={errors} validation={register} id={'email'} name={'email'} title={'Email'} ph={'Ingrese un Email'} type={'email'} />
          <InputGroup
            required
            validate={{
              matchesPreviousPassword: (val, values) => {
                return values.email === values.email_confirmation || 'Los emails deben coincidir.'
              }
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
              }
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
          <Button props={{ class: 'text-black bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 m-2', text: 'Registrarme', type: 'submit' }} />
          <Link to={'/Login'}>
            <Button props={{ class: 'text-black bg-white hover:bg-yellow-400 focus:bg-yellow-400 m-2', text: 'Cancelar' }} />
          </Link>
        </div>
      </form>
    </>
  )
}

export default Register
