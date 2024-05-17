import ButtonCustonm from '../../components/Button'
import CardCustom from '../../components/CardCustom'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import formulario from './validateForm'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { request, requestApiExt } from '../../utils/request'
import { Box, Button, IconButton, Modal } from '@mui/material'
import { Add, Close } from '@mui/icons-material'
import Swal from 'sweetalert2'
const leveldos = () => {
  const { NameUser, TypeUser } = JSON.parse(localStorage.getItem('usuario'))
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit
  } = useForm()

  const [provinces, setProvinces] = useState([])
  const [localidades, setLocalidades] = useState([])
  const [streets, setStreets] = useState([])
  const [streetsApi, setStreetsApi] = useState([])
  const [openModalStreet, setOpenModalStreet] = useState(false)
  const handleCloseModalAPI = () => {
    setOpenModalStreet(false)
  }
  const openModalStreetApi = async () => {
    const Provincia = provinces.filter((item) => item.id === parseInt(watch('id_state')))
    const City = localidades.filter((item) => item.id === parseInt(watch('id_cities')))
    const url = `https://apis.datos.gob.ar/georef/api/calles?max=5000&provincia=${Provincia[0].nombre}&localidad_censal=${City[0].nombre}&orden=nombre`
    const res = await requestApiExt(url, 'GET')
    const calles = await res.data.calles.map((item) => {
      return { nombre: item.nombre, id: item.id }
    })
    setStreetsApi(calles)
    setOpenModalStreet(true)
  }
  useEffect(() => {
    const getProvinces = async () => {
      // const url = 'https://apis.datos.gob.ar/georef/api/provincias?orden=nombre'
      // const res = await requestApiExt(url, 'GET')
      const url = import.meta.env.VITE_APP_API_URL + '/listState'
      const res = await request(url, 'GET')
      // const res = await requestApiExt(url, 'GET')
      // const { provincias } = res.data
      const provincias = res.data
        .map((item) => {
          return { id: item.COD_PRO, nombre: item.DES_PRO }
        })
        .sort((a, b) => a.nombre.localeCompare(b.nombre))
      // Una vez que obtengo las provincias, las guardo en el estado
      setProvinces(provincias)
    }
    getProvinces()
  }, [])

  const handleProvinceChange = async (event) => {
    const provinceId = event.target.value
    // const url = `https://apis.datos.gob.ar/georef/api/localidades?provincia=${provinceId}&campos=id,nombre&orden=nombre&max=5000`
    // const res = await requestApiExt(url, 'GET')
    // const { localidades } = res.data
    const url = `${import.meta.env.VITE_APP_API_URL}/listCity/?id=${provinceId}`
    const res = await request(url, 'GET')

    const localidades = res.data
      .map((item) => {
        return { id: item.id, nombre: item.DES_LOC }
      })
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
    setLocalidades(localidades)
  }
  const handleCityChange = async (event) => {
    const cityId = event.target.value
    const url = `${import.meta.env.VITE_APP_API_URL}/listStreet/?id=${cityId}`
    const res = await request(url, 'GET')

    const localidades = res.data
      .map((item) => {
        return { id: item.id, nombre: item.DES_LOC }
      })
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
    setStreets(localidades)
  }
  const saveNewStreet = async (event) => {
    const dataApi = streetsApi.filter((item) => item.id === watch('addressApi'))
    console.log(dataApi)
    const data = { name: dataApi[0].nombre, id_api: dataApi[0].id, idCity: parseInt(watch('id_cities')) }
    console.log(data)
    const url = `${import.meta.env.VITE_APP_API_URL}/addStreet`
    const res = await request(url, 'POST', data)
    if (res.status === 200) {
      Swal.fire({ icon: 'success', title: '¡Calle agregada!', text: 'La calle ha sido agregada correctamente' })
      handleCloseModalAPI()
      handleCityChange()
      return true
    } else {
      Swal.fire({ icon: 'error', title: '¡Error!', text: 'No se pudo agregar la calle' })
    }
  }

  const navigate = useNavigate()

  return (
    <CardCustom>
      <div className='flex flex-wrap w-full'>
        <p className='py-10 leading-7'>
          Hola {NameUser}, estás a unos pasos de subir al Nivel 2. Para esto, te vamos a pedir una serie de datos necesarios para validar tu identidad y así poder usar tu Oficina Virtual aprovechando todos los beneficios.
          <br />
          Uno de los datos más importantes y obligatorio es tu número de socio, ya que ingresando el mismo, podrás acceder a todas tus cuentas como así también todos tus servicios.
          <br />A continuación, verás una imagen del encabezado de tu factura. El número de socio podés obtenerlo desde la misma, tal como lo muestra la imagen.
        </p>
        <div className='w-full flex justify-center mb-10'>
          <img className='w-full md:w-3/4' src='https://app.coopmorteros.coop/public/images/otros/Factura.jpg' />
        </div>
        <form
          id='formRegister'
          onSubmit={handleSubmit((data) => {
            // Agrego al objeto el nombre de la localidad
            data = {
              ...data,
              name_city: localidades.find((item) => item.id === data.id_cities).nombre,
              name_state: provinces.find((item) => item.id === data.id_state).nombre
            }
            formulario(data, navigate)
          })}
          className='w-full flex flex-wrap p-7'
        >
          <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
            <div className='mt-2'>
              <label htmlFor='number_customer' className='block font-semibold ml-1 mb-2 dark:text-white'>
                Nº Socio
              </label>
              <input
                id='number_customer'
                type='text'
                placeholder='Ingrese su N° de Socio'
                {...register('number_customer', {
                  required: true,
                  pattern: /^[0-9]*$/
                })}
                // Si el campo es requerido y no se completa, pinto el borde de rojo
                className={`block w-full rounded-md border-0 p-2 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6 ${errors.number_customer ? 'border-red-500' : ''}`}
              />
              {errors.number_customer?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
              {errors.number_customer?.type === 'pattern' && <span className='text-red-500'>Solo se pueden ingresar numeros</span>}
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
            <div className='mt-2'>
              <label htmlFor='document_type' className='block font-semibold ml-1 mb-2 dark:text-white'>
                Tipo Doc.
              </label>
              <select
                id='document_type'
                {...register('document_type', {
                  required: true
                })}
                className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'
              >
                <option className='robotoCondensed' value=''>
                  Seleccionar...
                </option>
                <option value='1'>DNI</option>
                <option value='3'>CUIL</option>
                <option value='4'>CUIT</option>
                <option value='2'>LC</option>
                <option value='6'>LE</option>
              </select>
              {errors.document_type?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
            <div className='mt-2'>
              <label htmlFor='document_number' className='block font-semibold ml-1 mb-2 dark:text-white'>
                Nº de Documento
              </label>
              <input
                id='document_number'
                type='text'
                placeholder='Ingrese su N° de Documento'
                {...register('document_number', {
                  required: true,
                  pattern: /^[0-9]*$/
                })}
                className='block w-full rounded-md border-0 p-2 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6'
              />
              {errors.document_number?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
              {errors.document_number?.type === 'pattern' && <span className='text-red-500'>Solo se pueden ingresar numeros</span>}
            </div>
          </div>
          {TypeUser === 1 ? (
            <div className='w-full md:w-1/2 lg:w-1/4 p-2'>
              <div className='mt-2'>
                <label htmlFor='sex' className='block font-semibold ml-1 mb-2 dark:text-white'>
                  Sexo
                </label>
                <select id='sex' {...register('sex', { required: true })} className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'>
                  <option className='robotoCondensed' value=''>
                    Seleccionar...
                  </option>
                  <option value='1'>Femenino</option>
                  <option value='2'>Masculino</option>
                </select>
                {errors.sex?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
              </div>
            </div>
          ) : null}
          <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
            <div className='mt-2'>
              <label htmlFor='id_state' className='block font-semibold ml-1 mb-2 dark:text-white'>
                Provincias
              </label>
              <select id='id_state' {...register('id_state', { required: true })} className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6' onChange={handleProvinceChange}>
                <option className='robotoCondensed' value=''>
                  Seleccionar...
                </option>
                {provinces.map((item, index) => (
                  <option key={index} className='robotoCondensed' value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
              {errors.id_state?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
            <div className='mt-2'>
              <label htmlFor='id_cities' className='block font-semibold ml-1 mb-2 dark:text-white'>
                Localidades
              </label>
              <select id='id_cities' {...register('id_cities', { required: true })} className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6' onChange={handleCityChange}>
                <option className='robotoCondensed' value=''>
                  Seleccionar...
                </option>
                {localidades.map((item, index) => (
                  <option key={index} className='robotoCondensed' value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
              {errors.id_cities?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
            </div>
          </div>
          <div className='w-full flex md:w-1/2 lg:w-1/3 p-2'>
            <div className='mt-2 w-2/3'>
              <div className='w-full flex relative'>
                <label htmlFor='address' className='block font-semibold ml-1 mb-2 dark:text-white'>
                  Dirección
                </label>
                <IconButton className='top-0 right-0 !absolute' color='error' size='small' onClick={() => openModalStreetApi()}>
                  <Add />
                </IconButton>
              </div>
              <select id='address' {...register('address', { required: true })} className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'>
                <option className='robotoCondensed' value=''>
                  Seleccionar...
                </option>
                {streets.map((item, index) => (
                  <option key={index} className='robotoCondensed' value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
              {errors.id_cities?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}

              {/* <input id='address' type='text' placeholder='Dirección' {...register('address', { required: true })} className='block  w-full rounded-md border-0 p-2 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1  placeholder:text-gray-400 sm:text-sm sm:leading-6' />
              {errors.address?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>} */}
            </div>
            <div className='ml-2 mt-2 w-1/3'>
              <label htmlFor='nroAddress' className='block font-semibold ml-1 mb-2 dark:text-white'>
                Numero
              </label>
              <input id='nroAddress' type='text' placeholder='Dirección' {...register('nroAddress', { required: true })} className='block  w-full rounded-md border-0 p-2 text-gray-900 dark:bg-zinc-800 dark:text-gray-200 shadow-sm ring-1  placeholder:text-gray-400 sm:text-sm sm:leading-6' />
              {errors.address?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
            <div className='mt-2'>
              <label className='block font-semibold ml-1 mb-2 dark:text-white'>Caracteristica</label>
              <div className='flex'>
                <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>0</span>
                <input
                  {...register('phoneCaract', {
                    required: true,
                    pattern: /^[0-9]*$/
                  })}
                  type='text'
                  id='caractPhone'
                  className='block ring-1 rounded-none rounded-e-md dark:bg-zinc-700 dark:text-gray-200 shadow border-0 p-2.5 text-gray-900 w-full placeholder:text-gray-400 sm:text-sm sm:leading-6'
                  placeholder='Caract. (Sin el 0)'
                />
              </div>
              {errors.phoneCaract?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
              {errors.phoneCaract?.type === 'pattern' && <span className='text-red-500'>Solo se pueden ingresar numeros</span>}
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
            <div className='mt-2'>
              <label className='block font-semibold ml-1 mb-2 dark:text-white'>Número de Celular</label>
              <div className='flex'>
                <span className='inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>15</span>
                <input
                  {...register('numberPhone', {
                    required: true,
                    pattern: /^[0-9]*$/
                  })}
                  type='text'
                  id='numberPhone'
                  className='block ring-1 rounded-none rounded-e-md dark:bg-zinc-700 dark:text-gray-200 shadow border-0 p-2.5 text-gray-900 w-full placeholder:text-gray-400 sm:text-sm sm:leading-6'
                  placeholder='Número (Sin el 15)'
                />
              </div>
              {errors.numberPhone?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
              {errors.numberPhone?.type === 'pattern' && <span className='text-red-500'>Solo se pueden ingresar numeros</span>}
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 p-2'>
            <div className='mt-2'>
              <label htmlFor='birthday' className='block font-semibold ml-1 mb-2 dark:text-white'>
                Fecha de Nacimiento
              </label>
              <input {...register('birthdate', { required: true })} type='date' id='birthday' className='block ring-1 rounded-none rounded-e-md dark:bg-zinc-700 dark:text-gray-200 shadow border-0 p-2.5 text-gray-900 w-full placeholder:text-gray-400 sm:text-sm sm:leading-6' />
              {errors.birthdate?.type === 'required' && <span className='text-red-500'>Este campo es obligatorio</span>}
            </div>
          </div>

          <div className='w-full flex justify-center'>
            <ButtonCustonm
              props={{
                class: 'text-black bg-yellow-300 hover:bg-yellow-400 focus:bg-yellow-400 m-2',
                text: 'Enviar',
                type: 'submit'
              }}
            />
          </div>
          <Modal className='flex justify-center items-center' open={openModalStreet} onClose={handleCloseModalAPI} aria-labelledby='parent-modal-title' aria-describedby='parent-modal-description'>
            <Box className={'w-full flex justify-center items-center'}>
              <div className=' bg-white w-1/2 p-5 flex-col justify-center items-center'>
                <div className='relative  p-5 '>
                  <h3 className='text-gray-900 m-0 font-bold text-center font-sans' id='exampleModalLabel'>
                    Calles segun Nacion
                  </h3>
                  <div className='absolute  right-5 top-5'>
                    <Close onClick={handleCloseModalAPI} className='text-gray-500 hover:text-gray-800 hover:cursor-pointer' />
                  </div>
                </div>

                <select id='addressApi' {...register('addressApi', { required: true })} className='block ring-1 bg-white dark:bg-zinc-800 w-full rounded-md border-0 p-3 text-gray-900 dark:text-gray-200 shadow placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6'>
                  <option className='robotoCondensed' value=''>
                    Seleccionar...
                  </option>
                  {streetsApi.map((item, index) => (
                    <option key={index} className='robotoCondensed' value={item.id}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
                <div className='w-100 mt-5 flex justify-center items-center'>
                  <Button variant='contained' type='button' color='primary' onClick={saveNewStreet}>
                    Guardar
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
        </form>
      </div>
    </CardCustom>
  )
}

export default leveldos
