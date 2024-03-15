// import React from 'react';
import CardCustom from '../../components/CardCustom/index'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab, { tabClasses } from '@mui/joy/Tab'
import TabPanel from '@mui/joy/TabPanel'
import { useForm } from 'react-hook-form'
import Input from '@mui/joy/Input'
import FormHelperText from '@mui/joy/FormHelperText'
import FormControl from '@mui/joy/FormControl'
import InfoOutlined from '@mui/icons-material/InfoOutlined'
import Swal from 'sweetalert2'

function profile() {
  const getUserData = async () => {
    // Obtengo los datos del usuario
    const { id } = JSON.parse(localStorage.getItem('usuario'))
    const url = 'http://cooptech.com.ar:30888/api/getLevel'
    // const url = 'http://localhost:8000/api/getLevel'

    const response = await Axios.post(url, { user: id })
    return response.data
  }

  const [userData, setUserData] = useState({})

  // Validaciones del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

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

  // Función obtener los datos del usuario y cargarlos en el formulario.
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData()
      setUserData(data)
      reset({
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        address: data.address
      })
    }
    fetchData()
  }, [reset])

  return (
    <div>
      <h2 className='text-center m-5'>Mi perfil</h2>
      <hr className='mb-5' />

      <Tabs aria-label='Opciones del Perfil' defaultValue={0} className='rounded-3xl mb-5'>
        <TabList
          disableUnderline
          tabFlex={1}
          sx={{
            [`& .${tabClasses.root}`]: {
              fontSize: 'sm',
              fontWeight: 'lg',
              '&[aria-selected="true"]': {
                color: 'primary.500',
                bgcolor: 'background.surface'
              },
              [`&.${tabClasses.focusVisible}`]: {
                outlineOffset: '-4px'
              }
            }
          }}
        >
          <Tab disableIndicator variant='soft' sx={{ flexGrow: 1 }}>
            Datos Personales
          </Tab>
          <Tab disableIndicator variant='soft' sx={{ flexGrow: 1 }}>
            Editar Datos
          </Tab>
          <Tab disableIndicator variant='soft' sx={{ flexGrow: 1 }}>
            Modificar Contraseña
          </Tab>
        </TabList>

        <TabPanel value={0}>
          <CardCustom>
            <div className='flex flex-col items-center'>
              <img className='h-32 w-32 rounded-full mt-4' src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='imagen de perfil' />
              <h1 className='text-2xl font-bold mt-4'>
                {userData.first_name} {userData.last_name}
              </h1>
              <p className='text-gray-500'>
                Correo:
                <span className='text-black'> {userData.email} </span>
              </p>
              <p className='text-gray-500'>
                Teléfono:
                <span className='text-black'> {userData.phone ?? 'Pendiente'}</span>
              </p>
              <p className='text-gray-500'>
                Dirección:
                <span className='text-black'> {userData.address} </span>
              </p>
            </div>
          </CardCustom>
        </TabPanel>

        <TabPanel value={1}>
          <CardCustom className='p-8'>
            <div className='flex flex-col items-center mt-4'>
              <h1 className='text-2xl font-bold'>Nivel de usuario</h1>
              <p className='text-gray-500'>
                Nivel:
                <span className='text-black'> {userData.level} </span>
              </p>
            </div>

            {/* FORMULARIO PARA MODIFICAR LOS DATOS DE LA CUENTA (NOMBRE, APELLIDO, TELEFONO Y DIRECCION) */}
            <form className='flex flex-col items-center mt-4' onSubmit={handleSubmit(onSubmit)} id='formEditUser'>
              <h1 className='text-2xl font-bold'>Modificar datos</h1>
              <FormControl error={errors.first_name ?? false}>
                <Input
                  placeholder='Nombre'
                  variant='outlined'
                  className='w-64 mt-2'
                  {...register('first_name', {
                    required: true,
                    minLength: 2
                  })}
                />
                <FormHelperText>
                  {errors.first_name && <InfoOutlined />}
                  {errors.first_name?.type === 'required' && 'El nombre es requerido'}
                  {errors.first_name?.type === 'minLength' && 'El nombre debe tener al menos 2 caracteres'}
                </FormHelperText>
              </FormControl>

              <FormControl error={errors.last_name ?? false}>
                <Input
                  variant='outlined'
                  className='w-64 mt-2'
                  placeholder='Apellido'
                  {...register('last_name', {
                    required: true,
                    minLength: 2
                  })}
                />
                <FormHelperText>
                  {errors.last_name && <InfoOutlined />}
                  {errors.last_name?.type === 'required' && 'El apellido es requerido'}
                  {errors.last_name?.type === 'minLength' && 'El apellido debe tener al menos 2 caracteres'}
                </FormHelperText>
              </FormControl>

              <FormControl error={errors.phone ?? false}>
                <Input
                  className='w-64 mt-2'
                  variant='outlined'
                  placeholder='Teléfono'
                  {...register('phone', {
                    required: true,
                    minLength: 11,
                    pattern: /^[0-9]+$/
                  })}
                />
                <FormHelperText>
                  {errors.phone && <InfoOutlined />}
                  {errors.phone?.type === 'required' && 'El teléfono es requerido'}
                  {errors.phone?.type === 'minLength' && 'El teléfono debe tener al menos 11 caracteres'}
                  {errors.phone?.type === 'pattern' && 'El teléfono debe contener solo números'}
                </FormHelperText>
              </FormControl>

              <FormControl error={errors.address ?? false}>
                <Input
                  variant='outlined'
                  className='w-64 mt-2'
                  placeholder='Dirección'
                  {...register('address', {
                    required: true,
                    minLength: 5
                  })}
                />
                <FormHelperText>
                  {errors.address && <InfoOutlined />}
                  {errors.address?.type === 'required' && 'La dirección es requerida'}
                  {errors.address?.type === 'minLength' && 'La dirección debe tener al menos 5 caracteres'}
                </FormHelperText>
              </FormControl>
              <button className='bg-blue-500 text-white rounded-lg p-2 w-64 mt-2' type='submit'>
                Guardar cambios
              </button>
            </form>
          </CardCustom>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default profile
