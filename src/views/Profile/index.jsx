import CardCustom from '../../components/CardCustom/index'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Input,
  Tab,
  Tabs,
  FormHelperText,
  FormControl,
  Box
} from '@mui/material'
import { useForm } from 'react-hook-form'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import { TbEye, TbEyeClosed } from 'react-icons/tb'
import Swal from 'sweetalert2'
import { CustomTabPanel, a11yProps } from '../../components/PanelTab'

function Profile() {
  const getUserData = async () => {
    // Obtengo los datos del usuario
    const { id } = JSON.parse(localStorage.getItem('usuario'))
    const url = 'http://cooptech.com.ar:30888/api/getLevel'
    // const url = 'http://localhost:8000/api/getLevel'

    const response = await Axios.post(url, { user: id })
    return response.data
  }

  const [userData, setUserData] = useState({})

  // Validaciones del formulario editar
  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    formState: { errors: editErrors },
    reset: editReset
  } = useForm()

  // Validaciones del formulario cambiar contraseña
  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    formState: { errors: passwordErrors },
    reset: passwordReset,
    watch
  } = useForm()
  const password = watch('newPassword', '')
  // Función para enviar los datos del formulario a la api
  const onSubmit = async (data) => {
    try {
      await updateUserData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateUserData = async (data) => {
    const { id } = JSON.parse(localStorage.getItem('usuario'))
    const url = 'http://cooptech.com.ar:30888/api/updateUser'
    // const url = 'http://localhost:8000/api/updateUser'
    // Agrego el id al objeto data
    data.id = id
    const response = await Axios.patch(url, data)
    if (response.data) {
      // Muestro un sweet alert con el mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Datos actualizados',
        showConfirmButton: false,
        timer: 1500,
        onClose: () => {
          // Voy a la pestaña de datos personales
          document.getElementById('tab-0').click()
        }
      })
    }
  }

  // TODO: Falta agregar los ojitos para mostrar la contraseña en los inputs.
  // TODO: Falta ver que accion al finalizar la actualizacion de la contraseña.
  const updatePassword = async (data) => {
    const { id, token } = JSON.parse(localStorage.getItem('usuario'))
    const { password, newPassword, confirmPassword } = data
    // const url = 'http://cooptech.com.ar:30888/api/change_password'
    const url = 'http://localhost:8000/api/updatePassword'
    const info = {
      id,
      password,
      newPassword,
      newPassword_confirmation: confirmPassword
    }
    try {
      // Envio los datos a la api, paso el token en el header
      const response = await Axios.post(url, info, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Perfecto!',
          text: response.data.message,
          allowOutsideClick: false
        }).then(() => {
          passwordReset()
        })
      }
    } catch (error) {
      const errorObj = error.response.data.message
      const messages = []
      for (const key in errorObj) {
        messages.push(errorObj[key])
      }
      Swal.fire({
        icon: 'warning',
        title: 'Atención!',
        text: messages.join('\n'),
        allowOutsideClick: false
      }).then(() => {})
      console.log(error)
    }
  }

  // Función obtener los datos del usuario y cargarlos en el formulario.
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData()
      setUserData(data)
      editReset({
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        address: data.address
      })
    }
    fetchData()
  }, [editReset])

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const classTabs =
    'w-1/2 !border-solid !border-gray-200 !rounded-t-xl !max-w-full !text-base !text-black !font-bold dark:!text-zinc-200 dark:!border-gray-700'
  const classTabStatus = [
    ['!border-r-2 !bg-white !border-t-2 !border-l-2 dark:!bg-zinc-800 '],
    ['!border-b-2 !bg-gray-200 dark:!bg-zinc-900 ']
  ]

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

  return (
    <div>
      <h2 className='text-center m-5'>Mi perfil</h2>
      <hr className='mb-5' />

      <Box sx={{ width: '100%' }}>
        <Tabs
          aria-label='Opciones del Perfil'
          variant='fullWidth'
          indicatorColor='transparent'
          value={value}
          onChange={handleChange}
        >
          <Tab
            className={`${classTabs} ${classTabStatus[value === 0 ? 0 : 1]}`}
            {...a11yProps(0)}
            label='Ver perfil'
          />
          <Tab
            className={classTabs + ' ' + classTabStatus[value === 1 ? 0 : 1]}
            label='Modificar Datos'
            {...a11yProps(1)}
          />
          <Tab
            className={classTabs + ' ' + classTabStatus[value === 2 ? 0 : 1]}
            {...a11yProps(2)}
            label='Modificar Contraseña'
          />
        </Tabs>
        <div className='bg-white border-2 border-t-0 pt-4 px-4 rounded-b-2xl border-zinc-200 dark:!border-gray-700 dark:!bg-zinc-800'>
          <CustomTabPanel value={value} index={0}>
            <CardCustom className='p-8 !bg-transparent'>
              <div className='flex flex-col items-center'>
                <img
                  className='h-32 w-32 rounded-full mt-4'
                  src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                  alt='imagen de perfil'
                />
                <h1 className='text-2xl font-bold mt-4'>
                  {userData.first_name} {userData.last_name}
                </h1>
                <p className='text-gray-500 dark:text-gray-500'>
                  Correo:
                  <span className='text-black dark:text-white'>
                    {' '}
                    {userData.email}{' '}
                  </span>
                </p>
                <p className='text-gray-500 dark:text-gray-400'>
                  Teléfono:
                  <span className='text-black dark:text-white'>
                    {' '}
                    {userData.phone ?? 'Pendiente'}
                  </span>
                </p>
                <p className='text-gray-500 dark:text-gray-400'>
                  Dirección:
                  <span className='text-black dark:text-white'>
                    {' '}
                    {userData.address}{' '}
                  </span>
                </p>
              </div>
            </CardCustom>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <CardCustom className='p-8 !bg-transparent'>
              <div className='flex flex-col items-center mt-4'>
                <h1 className='text-2xl font-bold'>Nivel de usuario</h1>
                <p className='text-gray-500 dark:text-gray-400'>
                  Nivel:
                  <span className='text-black dark:text-white'>
                    {' '}
                    {userData.level}{' '}
                  </span>
                </p>
              </div>

              {/* FORMULARIO PARA MODIFICAR LOS DATOS DE LA CUENTA (NOMBRE, APELLIDO, TELEFONO Y DIRECCION) */}
              <form
                className='flex flex-col items-center mt-4'
                onSubmit={editHandleSubmit(onSubmit)}
                id='formEditUser'
              >
                <h1 className='text-2xl font-bold'>Modificar datos</h1>
                <FormControl error={editErrors.first_name ?? false}>
                  <Input
                    placeholder='Nombre'
                    variant='outlined'
                    className='w-64 mt-2'
                    {...editRegister('first_name', {
                      required: true,
                      minLength: 2
                    })}
                  />
                  <FormHelperText>
                    {editErrors.first_name && <InfoOutlined />}
                    {editErrors.first_name?.type === 'required' &&
                      'El nombre es requerido'}
                    {editErrors.first_name?.type === 'minLength' &&
                      'El nombre debe tener al menos 2 caracteres'}
                  </FormHelperText>
                </FormControl>

                <FormControl error={editErrors.last_name ?? false}>
                  <Input
                    variant='outlined'
                    className='w-64 mt-2'
                    placeholder='Apellido'
                    {...editRegister('last_name', {
                      required: true,
                      minLength: 2
                    })}
                  />
                  <FormHelperText>
                    {editErrors.last_name && <InfoOutlined />}
                    {editErrors.last_name?.type === 'required' &&
                      'El apellido es requerido'}
                    {editErrors.last_name?.type === 'minLength' &&
                      'El apellido debe tener al menos 2 caracteres'}
                  </FormHelperText>
                </FormControl>

                <FormControl error={editErrors.phone ?? false}>
                  <Input
                    className='w-64 mt-2'
                    variant='outlined'
                    placeholder='Teléfono'
                    {...editRegister('phone', {
                      required: true,
                      minLength: 11,
                      pattern: /^[0-9]+$/
                    })}
                  />
                  <FormHelperText>
                    {editErrors.phone && <InfoOutlined />}
                    {editErrors.phone?.type === 'required' &&
                      'El teléfono es requerido'}
                    {editErrors.phone?.type === 'minLength' &&
                      'El teléfono debe tener al menos 11 caracteres'}
                    {editErrors.phone?.type === 'pattern' &&
                      'El teléfono debe contener solo números'}
                  </FormHelperText>
                </FormControl>
                <FormControl error={editErrors.address ?? false}>
                  <Input
                    variant='outlined'
                    className='w-64 mt-2'
                    placeholder='Dirección'
                    {...editRegister('address', {
                      required: true,
                      minLength: 5
                    })}
                  />
                  <FormHelperText>
                    {editErrors.address && <InfoOutlined />}
                    {editErrors.address?.type === 'required' &&
                      'La dirección es requerida'}
                    {editErrors.address?.type === 'minLength' &&
                      'La dirección debe tener al menos 5 caracteres'}
                  </FormHelperText>
                </FormControl>
                <button
                  className='bg-blue-500 text-white rounded-lg p-2 w-64 mt-2'
                  type='submit'
                >
                  Guardar cambios
                </button>
              </form>
            </CardCustom>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            <CardCustom className='p-8 !bg-transparent'>
              <div className='flex flex-col items-center mt-4'>
                <h1 className='text-2xl font-bold'>Modificar Contraseña</h1>
              </div>
              <form
                className='flex flex-col items-center mt-4'
                onSubmit={passwordHandleSubmit(updatePassword)}
              >
                <FormControl error={passwordErrors.password ?? false}>
                  <div className='relative flex flex-col items-center justify-center'>
                    <Input
                      type={pass}
                      {...passwordRegister('password', {
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      })}
                      variant='outlined'
                      className='w-64 mt-2'
                      placeholder='Contraseña actual'
                    />
                    <button
                      type='button'
                      onClick={visiblePassword}
                      className='absolute right-3'
                    >
                      {eyePass}
                    </button>
                  </div>
                  <FormHelperText>
                    {passwordErrors.password && <InfoOutlined />}
                    {passwordErrors.password?.type === 'required' &&
                      'La contraseña es requerida'}
                  </FormHelperText>
                </FormControl>
                <FormControl error={passwordErrors.newPassword ?? false}>
                  <div className='relative flex flex-col items-center justify-center'>
                    <Input
                      type={newPass}
                      {...passwordRegister('newPassword', {
                        required: true,
                        pattern: /^(?=.*[A-Z]).{6,}$/,
                        minLength: 6
                      })}
                      variant='outlined'
                      className='w-64 mt-2'
                      placeholder='Nueva contraseña'
                    />
                    <button
                      type='button'
                      onClick={visibleNewPassword}
                      className='absolute right-3'
                    >
                      {eyeNewPass}
                    </button>
                  </div>
                  <FormHelperText>
                    {passwordErrors.newPassword && <InfoOutlined />}
                    {passwordErrors.newPassword?.type === 'required' &&
                      'La nueva contraseña es requerida'}
                    {passwordErrors.newPassword?.type === 'pattern' &&
                      'La contraseña debe contener al menos una mayúscula'}
                    {passwordErrors.newPassword?.type === 'minLength' &&
                      'La contraseña debe tener al menos 6 caracteres'}
                  </FormHelperText>
                </FormControl>
                <FormControl error={passwordErrors.confirmPassword}>
                  <div className='relative flex flex-col items-center justify-center'>
                    <Input
                      type={confirmPass}
                      // Valido que coincidan las contraseñas
                      {...passwordRegister('confirmPassword', {
                        required: true,
                        validate: (value) => value === password
                      })}
                      variant='outlined'
                      className='w-64 mt-2'
                      placeholder='Confirmar contraseña'
                    />
                    <button
                      type='button'
                      onClick={visibleConfirmPassword}
                      className='absolute right-3'
                    >
                      {eyeConfirmPass}
                    </button>
                  </div>
                  <FormHelperText>
                    {passwordErrors.confirmPassword && <InfoOutlined />}
                    {passwordErrors.confirmPassword?.type === 'required' &&
                      'Debe confirmar la contraseña'}
                    {passwordErrors.confirmPassword?.type === 'validate' &&
                      'Las contraseñas no coinciden'}
                  </FormHelperText>
                </FormControl>
                <button className='bg-blue-500 text-white rounded-lg p-2 w-64 mt-2'>
                  Actualizar constraseña
                </button>
              </form>
            </CardCustom>
          </CustomTabPanel>
        </div>
      </Box>
    </div>
  )
}

export default Profile
