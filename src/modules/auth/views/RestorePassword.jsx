import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import InputGroup from '../../../components/InputGroup'
// import Axios from 'axios'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { Button, CircularProgress } from '@mui/material'
import { request } from '../../../utils/request'
function RestorePassword() {
  const navigate = useNavigate()
  const [spinner, setSpinner] = useState(false)

  const passwordRecover = async (data) => {
    setSpinner(true)
    const url = import.meta.env.VITE_APP_API_URL + '/password_recover'
    try {
      const responseData = await request(url, 'POST', data)
      // const responseData = await Axios.post(url, data)
      if (responseData === 'Error') {
        alert('No existe el usuario')
        return
      }
      Swal.fire({
        icon: 'success',
        title: 'Perfecto!',
        text: `Se ha enviado un correo a ${data.email}, para restablecer su contraseña`
      })
    } catch (error) {
      console.error('Error en la solicitud:', error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ocurrio un problema`
      })
      setSpinner(false)
      return
    } finally {
      setSpinner(false)
      navigate('/Login')
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
      <h2 className='mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white'>Recuperar contraseña </h2>
      <form onSubmit={handleSubmit((data) => passwordRecover(data))}>
        <InputGroup required errors={errors} validation={register} id={'email'} name={'email'} title={'Email'} ph={'Ingrese un Email'} type={'email'} />
        <div className='w-full mt-3 flex text-center items-center justify-center'>
          <Button
            onClick={() => {
              navigate('/Login')
            }}
            variant='contained'
            sx={{ marginRight: 3 }}
            color='warning'
          >
            <b>Cancelar</b>
          </Button>
          <Button variant='contained' color='primary' disabled={spinner} type='submit'>
            {spinner ? <CircularProgress size={20} disableShrink={true} color='warning' /> : <b>Recuperar</b>}
          </Button>
        </div>
      </form>
    </>
  )
}

export default RestorePassword
