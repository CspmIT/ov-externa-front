import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  const { usuario, setUsuario, setDarkMode } = useContext(UserContext)
  const navigate = useNavigate()
  const [pass, setPass] = useState('password')
  const [remember, setRemember] = useState(false)
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
        text: `Se ha reenviado un email a ${info.mail} para activar la cuenta`
      }).then(() => {
        navigate('/Login')
      })
    } catch (error) {
      console.log(error)
    }
  }

  // const rememberLogin = () => {
  //   // Obtener la cookie
  //   const cookie = document.cookie
  //   // Dividir la cookie en un array de strings
  //   const cookieArray = cookie.split(';')
  //   // Buscar la cookie que quieres
  //   let jwtCookie
  //   for (let i = 0; i < cookieArray.length; i++) {
  //     let c = cookieArray[i]
  //     while (c.charAt(0) === ' ') {
  //       c = c.substring(1)
  //     }
  //     if (c.indexOf('token') === 0) {
  //       jwtCookie = c.substring(4, c.length)
  //     }
  //   }
  //   // Si la cookie existe, establecer la fecha de expiración a un tiempo muy lejano
  //   if (jwtCookie) {
  //     const expiryDate = new Date()
  //     expiryDate.setFullYear(expiryDate.getFullYear() + 10)
  //     document.cookie = 'token=' + jwtCookie + ';expires=' + expiryDate.toUTCString() + ';path=/'
  //   }
  // }

  const formulario = async (datos) => {
    // const url = import.meta.env.VITE_APP_API_URL + '/login'
    const urlNode = import.meta.env.VITE_APP_API_URL + '/login'
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
          sameSite: 'Lax'
        })
        localStorage.setItem('usuario', JSON.stringify(decoded))
        // const bodyOtherCustomer = { id_user: responseData.data.id }
        // const otherCustomer = await Axios.post(import.meta.env.VITE_APP_API_URL + '/allOther', bodyOtherCustomer)
        // console.log(otherCustomer)
        // const user = { ...responseData.data, other: [...otherCustomer.data.data] }
        const user = { ...decoded }
        setDarkMode(decoded.dark)
        setUsuario(user)
        navigate('/')
        // rememberLogin()
      }
    } catch (error) {
      console.log(error.message)
      Swal.fire({
        icon: 'warning',
        title: error?.response?.data?.error !== '' ? 'Atención!' : 'Sitio en mantenimiento',
        text: error?.response?.data?.error !== '' ? error.message : 'Intente ingresar nuevamente mas tarde',
        allowOutsideClick: false
      })
    }
  }

  const validacionToken = async (token, id) => {
    const url = import.meta.env.VITE_APP_API_URL + '/validationUser'
    const info = { token_temp: token, id }
    try {
      await request(url, 'POST', info)
      Swal.fire({
        icon: 'success',
        title: 'Perfecto!',
        text: 'Se habilito correctamente tu cuenta.',
        allowOutsideClick: false
      }).then(() => {
        navigate('/Login')
      })
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención!',
        text: error.response.data.message,
        confirmButtonText: 'Reenviar Token',
        allowOutsideClick: false,
        showCancelButton: true
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
  }, [idUser, token])

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  return (
    <>
      <h2 className='mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white'>Iniciar Sesión </h2>
      <form onSubmit={handleSubmit(formulario)}>
        <InputGroup required errors={errors} validation={register} id={'email'} name={'email'} title={'Email'} ph={'Ingrese un Email'} type={'email'} />
        <InputGroup required errors={errors} validation={register} className={'mt-5'} id={'password'} name={'password'} title={'Contraseña'} showPass={showPassword} ph={'Ingrese una Contraseña'} type={pass} btnIcon={iconEye} />
        <div className='w-full mt-3 flex flex-col text-center items-center justify-center'>
          <FormControlLabel onChange={handleChangeCheckBoxRemember} control={<Checkbox errors={errors} {...register('remember')} name={'remember'} id={'remember'} />} label='Recuerdame' />
          <Button
            props={{
              class: 'text-gray-700 text-xl mt-3 bg-green-500 hover:bg-green-400',
              text: 'Ingresar',
              type: 'submit'
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
