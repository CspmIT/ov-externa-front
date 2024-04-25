import { useState, useEffect, useContext } from 'react'
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useForm } from 'react-hook-form'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone'
import Webcam from 'react-webcam'
import { FormValidContext } from '../../../contexts/FormsContext'
import {
  inputsBusinessData,
  inputsPersonalData,
  typePersonArray
} from '../utils/data'

const FormPersonalData = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange' // Esto hará que isValid se actualice en cada cambio de los campos
  })

  const typePerson = watch('typePerson')

  const searchInProcop = async (searchTerm) => {
    // Aquí deberías hacer la búsqueda en procop
    // espero que termine la busqueda en procop
    console.log(searchTerm)

    const procopData = [
      { id: '1', num_dni: '12345678', name: 'Juan', lastName: 'Perez' },
      { id: '2', num_dni: '87654321', name: 'Maria', lastName: 'Gomez' }
    ]
    const data = await new Promise((resolve) =>
      setTimeout(() => {
        procopData.filter((item) => item.num_dni === searchTerm)
        resolve()
      }, 3000)
    )

    return data
  }

  // Funciones para buscar en procop
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(false)
  const handleSearch = async (event) => {
    event.preventDefault()
    // espero que termine la busqueda en procop

    const result = await searchInProcop(searchTerm)
    console.log(result)
    setSearchResults(result)
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
      <Grid container spacing={3} justifyContent='center'>
        <Grid item md={8}>
          <FormControl className='w-full mb-3'>
            <InputLabel id='type-person'>Tipo de persona</InputLabel>
            <Select
              labelId='type-person'
              id='type-person'
              label='Tipo de persona'
              {...register('typePerson', { required: true })}
              onChange={(e) => setValue('typePerson', e.target.value)}
            >
              {typePersonArray.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {errors.typePerson && (
              <span className='text-red-500'>Este campo es requerido</span>
            )}
          </FormControl>
        </Grid>
        {typePerson && (
          <Grid>
            <TextField
              label='Buscar'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                    <Select
                      labelId={input.name}
                      id={input.name}
                      label={input.label}
                      {...register(input.name, { required: true })}
                      onChange={(e) => setValue(input.name, e.target.value)}
                    >
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
                      {...register(input.name, { required: true })}
                    />
                  </FormControl>
                )}
                {errors[input.name] && (
                  <span className='text-red-500'>Este campo es requerido</span>
                )}
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
                    <Select
                      labelId={input.name}
                      id={input.name}
                      label={input.label}
                      {...register(input.name, { required: true })}
                      onChange={(e) => setValue(input.name, e.target.value)}
                    >
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
                      {...register(input.name, { required: true })}
                    />
                  </FormControl>
                )}
                {errors[input.name] && (
                  <span className='text-red-500'>Este campo es requerido</span>
                )}
              </Grid>
            ))}
            <Grid item md={12} textAlign={'center'} alignItems={'center'}>
              <label>Poder/Estatuto/Autorizacion del apoderado</label>
              <Grid container spacing={1}>
                <Grid item md={6}>
                  <FormControl className='w-full'>
                    <Button
                      component='label'
                      variant='contained'
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Subir archivo
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
            <Grid
              className='mt-5'
              container
              md={12}
              direction={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              {showCamera && (
                <Webcam
                  className='w-1/2 rounded-xl'
                  audio={false}
                  height={'auto'}
                  screenshotFormat='image/jpeg'
                  mirrored={true}
                >
                  {({ getScreenshot }) => (
                    <Button
                      className='my-3'
                      variant='contained'
                      color='primary'
                      onClick={(event) => handleTakePhoto(event, getScreenshot)}
                    >
                      <CameraAltTwoToneIcon /> Capturar foto
                    </Button>
                  )}
                </Webcam>
              )}
              {photo && (
                <img src={photo} alt='Foto' className='w-1/2 my-4 rounded-xl' />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </form>
  )
}

export default FormPersonalData
