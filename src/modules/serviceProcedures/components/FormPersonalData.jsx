import { useState, useEffect, useContext } from 'react'
import { styled } from '@mui/material/styles'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, InputAdornment } from '@mui/material'
import Axios from 'axios'
import { useForm } from 'react-hook-form'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone'
import Webcam from 'react-webcam'
import { FormValidContext } from '../../../contexts/FormsContext'
import { inputsBusinessData, inputsPersonalData, typePersonArray } from '../utils/data'
import Swal from 'sweetalert2'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0
})

const FormPersonalData = ({ onFormChange }) => {
  // Valido si hay datos en el localStorage
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange' // Esto hará que isValid se actualice en cada cambio de los campos
  })

  // const [formData, setFormData] = useState({})

  const typePerson = watch('typePerson')
  // const formValues = watch()

  const searchInProcop = async (searchTerm) => {
    // Hago una busqueda en procop
    // Si encuentro algo, retorno los datos
    // Si no encuentro nada, retorno false
    let object = {
      dni: searchTerm
    }

    if (typePerson === 2) {
      object = {
        cuit: searchTerm
      }
    }

    const response = await Axios.post(import.meta.env.VITE_APP_API_URL + '/procoop/personaPorDni', object)
    if (response) {
      return response.data
    }
    return false
  }

  // Funciones para buscar en procop
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(false)
  const handleSearch = async (event) => {
    event.preventDefault()
    setSearchResults(false)
    // JOSE: 38112034
    // espero que termine la busqueda en procop
    // Cambio el boton de confirmar por un spinner
    const result = await searchInProcop(searchTerm)
    if (!result?.error) {
      Swal.fire({
        title: 'Persona encontrada',
        html: `Con el ${typePerson === 1 ? 'DNI' : 'CUIT'} ingresado encontramos esta persona: <br><b>${result[0].APELLIDOS}<b> <br> ¿Estos son tus datos?`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true
      }).then((response) => {
        if (response.isConfirmed) {
          // Separo los datos para poder pintarlos en el input
          const data = result[0]
          const fecha = data.FEC_NAC.split('-')
          data.day = fecha[2].split('T')[0]
          data.month = fecha[1]
          data.year = fecha[0]
          setSearchResults(data)
          // Pinto los datos en los inputs
          inputsPersonalData.forEach((input) => {
            setValue(input.name, data[input.name])
          })
        } else {
          setSearchResults(false)
          inputsBusinessData.forEach((input) => {
            setValue(input.name, '')
          })
          // Limpio todos los campos del formulario
          inputsPersonalData.forEach((input) => {
            setValue(input.name, '')
          })
          setValue('day', '')
          setValue('month', '')
          setValue('year', '')
        }
      })
    } else {
      Swal.fire({
        title: 'Persona no encontrada',
        text: `No se encontraron datos con el ${typePerson === 1 ? 'DNI' : 'CUIT'} ingresado`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      inputsBusinessData.forEach((input) => {
        setValue(input.name, '')
      })
      // Limpio todos los campos del formulario
      inputsPersonalData.forEach((input) => {
        setValue(input.name, '')
      })
      setValue('day', '')
      setValue('month', '')
      setValue('year', '')
      setSearchResults(true)
    }
  }

  // Funciones para la camara
  const [showCamera, setShowCamera] = useState(false)
  const [photo, setPhoto] = useState(null)

  const handleStartCamera = (event) => {
    event.preventDefault()
    setShowCamera(true)
    setPhoto(null)
  }

  const handleTakePhoto = (event, getScreenshot) => {
    event.preventDefault()
    const imageSrc = getScreenshot()
    setPhoto(imageSrc)
    setShowCamera(false)
  }
  const { setIsValid } = useContext(FormValidContext) // Obtén la función setIsValid del contexto

  // Actualiza el estado del formulario cuando los campos cambien
  useEffect(() => {
    setIsValid(isValid)
  }, [isValid, setIsValid])

  return (
    <form className='w-full p-5' onSubmit={handleSubmit}>
      <TextField {...register('idProcop')} type='hidden' />
      <Grid container spacing={3} justifyContent='center'>
        <Grid item md={8}>
          <FormControl className='w-full mb-3'>
            <InputLabel id='type-person'>Tipo de persona</InputLabel>
            <Select
              labelId='type-person'
              id='type-person'
              label='Tipo de persona'
              defaultValue=''
              {...register('typePerson', { required: true })}
              onChange={(e) => {
                setValue('typePerson', e.target.value)
                setSearchResults(false)
              }}
            >
              {typePersonArray.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {errors.typePerson && <span className='text-red-500'>Este campo es requerido</span>}
          </FormControl>
        </Grid>
        {typePerson && !searchResults && (
          <Grid item md={5} className='!flex !flex-col'>
            <TextField id='searchTerm' label={typePerson === 1 ? 'DNI' : 'CUIT/CUIL'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Button onClick={handleSearch}>Buscar</Button>
          </Grid>
        )}

        {searchResults && typePerson === 1 && (
          <>
            {inputsPersonalData.map((input, index) => (
              <Grid item md={input.grid} key={index}>
                {input.component === 'Select' ? (
                  <FormControl className='w-full'>
                    <InputLabel id={input.name}>{input.label}</InputLabel>
                    <Select defaultValue={searchResults[input.name]} labelId={input.name} id={input.name} label={input.label} {...register(input.name, { required: true })} onChange={(e) => setValue(input.name, e.target.value)}>
                      {input.options.map((item) => (
                        <MenuItem key={item.id} selected value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <FormControl className='w-full'>
                    <TextField
                      label={input.label}
                      type={input.type}
                      id={input.name}
                      {...register(input.name, {
                        required: input?.groupLabel !== 'Telefono fijo'
                      })}
                      defaultValue={searchResults[input.name]?.trim()}
                      InputProps={
                        input.start
                          ? {
                              startAdornment: <InputAdornment position='start'>{input.start}</InputAdornment>
                            }
                          : {}
                      }
                    />
                  </FormControl>
                )}
                {errors[input.name] && <span className='text-red-500'>Este campo es requerido</span>}
              </Grid>
            ))}
          </>
        )}
        {searchResults && typePerson === 2 && (
          <>
            {inputsBusinessData.map((input, index) => (
              <Grid item md={input.grid} key={index}>
                {input.component === 'Select' ? (
                  <FormControl className='w-full'>
                    <InputLabel id={input.name}>{input.label}</InputLabel>
                    <Select labelId={input.name} id={input.name} label={input.label} defaultValue={searchResults[input.name]} {...register(input.name, { required: true })} onChange={(e) => setValue(input.name, e.target.value)}>
                      {input.options.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <FormControl className='w-full'>
                    <TextField
                      label={input.label}
                      type={input.type}
                      id={input.name}
                      defaultValue={searchResults[input.name]?.trim()}
                      {...register(input.name, { required: true })}
                      InputProps={
                        input.start
                          ? {
                              startAdornment: <InputAdornment position='start'>{input.start}</InputAdornment>
                            }
                          : {}
                      }
                    />
                  </FormControl>
                )}
                {errors[input.name] && <span className='text-red-500'>Este campo es requerido</span>}
              </Grid>
            ))}
            <Grid item md={12} textAlign={'center'} alignItems={'center'}>
              <label>Poder/Estatuto/Autorizacion del apoderado</label>
              <Grid container spacing={1}>
                <Grid item md={6}>
                  <FormControl className='w-full'>
                    <Button component='label' variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
                      Subir archivo
                      <VisuallyHiddenInput type='file' />
                    </Button>
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl className='w-full'>
                    <Button onClick={handleStartCamera}>Tomar una foto</Button>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid className='mt-5' container md={12} direction={'column'} justifyContent={'center'} alignItems={'center'}>
              {showCamera && (
                <Webcam className='w-1/2 rounded-xl' audio={false} height={'auto'} screenshotFormat='image/jpeg' mirrored={true}>
                  {({ getScreenshot }) => (
                    <Button className='my-3' variant='contained' color='primary' onClick={(event) => handleTakePhoto(event, getScreenshot)}>
                      <CameraAltTwoToneIcon /> Capturar foto
                    </Button>
                  )}
                </Webcam>
              )}
              {photo && <img src={photo} alt='Foto' className='w-1/2 my-4 rounded-xl' />}
            </Grid>
          </>
        )}
      </Grid>
    </form>
  )
}

export default FormPersonalData
