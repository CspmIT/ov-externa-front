import { useForm } from 'react-hook-form'
import { useRegForm } from '../providers/RegFormProvider'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import Axios from 'axios'
import Swal from 'sweetalert2'
import PersonalForm from './PersonalForm'

const PersonalData = () => {
  // Hooks
  const [state, dispatch] = useRegForm()
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors }
  } = useForm()
  const navigate = useNavigate()

  // Form values
  const watchDNI = watch('DNI')
  const watchCUIT = watch('CUIT')
  const watchTypePerson = watch('typePerson')

  const step = state?.step

  const onSubmit = (values) => {
    dispatch({ type: 'set_step_1', data: values })
    dispatch({ type: 'next' })
    navigate(`/multiStepForm/${state?.services[step]}`)
  }

  // Peticion al back para buscar persona, despues reenderiza el formulario correspondiente
  const searchPerson = async () => {
    const endPoint = watchTypePerson === '1' ? 'searchDni' : 'searchCuit'
    const sendData =
      watchTypePerson === '1' ? { dni: watchDNI } : { cuit: watchCUIT }
    const response = await Axios.post(
      `http://localhost:4000/${endPoint}`,
      sendData
    )

    if (response.data?.error) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: response.data.error
      }).then(() => {
        dispatch({ type: 'set_person', data: null })
      })
    }
    dispatch({ type: 'set_person', data: response.data[0] })
  }

  function renderForm() {
    if (!watchTypePerson || !state?.person) return null
    if (watchTypePerson === '1') {
      return (
        <PersonalForm
          person={state?.person}
          errors={errors}
          register={register}
        />
      )
    } else {
      return <h1>{state?.person?.APELLIDOS}</h1>
    }
  }

  return (
    <div>
      <form
        className='grid grid-cols-12 gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          className='col-span-8 col-start-3 max-sm:col-span-12'
          error={errors.typePerson}
        >
          <InputLabel id='typePerson'>Tipo de Persona *</InputLabel>
          <Select
            labelId='typePerson'
            label='Tipo de Persona *'
            id='typePerson'
            defaultValue={state?.person ? state.person.TIPO_PERSONA : ''}
            {...register('typePerson', { required: true })}
          >
            <MenuItem value='1'>Persona Fisica</MenuItem>
            <MenuItem value='2'>Persona Juridica</MenuItem>
          </Select>
          {/* Uso la validacion de react hook form */}
          {errors.typePerson && (
            <FormHelperText>El campo es requerido </FormHelperText>
          )}
        </FormControl>
        {watchTypePerson &&
          (watchTypePerson === '1' ? (
            <div className='col-span-12 flex items-center justify-center gap-3'>
              <TextField
                error={errors.DNI}
                label='DNI'
                {...register('DNI', { required: true })}
                className='w-4/12'
                helperText={errors.DNI && 'El campo es requerido'}
              />
              <Button
                className='w-1/12 h-full'
                variant='outlined'
                type='button'
                onClick={searchPerson}
              >
                Buscar
              </Button>
            </div>
          ) : (
            <div className='col-span-12 flex items-center justify-center gap-3'>
              <TextField
                label='CUIT'
                {...register('CUIT', { required: true })}
                className='w-4/12'
              />
              <Button
                onClick={searchPerson}
                className='w-1/12 h-full'
                type='button'
                variant='outlined'
              >
                Buscar
              </Button>
            </div>
          ))}
        <div className='col-span-12 flex items-center justify-center gap-3'>
          {renderForm()}
        </div>
        <div className='col-span-12 flex items-center justify-center gap-3'>
          <Button
            className='w-1/6'
            variant='outlined'
            onClick={() => {
              dispatch({ type: 'back' })
              navigate(`/multiStepForm`)
            }}
          >
            Volver
          </Button>
          <Button className='w-1/9' variant='contained' color='secondary'>
            Guardar y continuar despues
          </Button>
          <Button
            disabled={!isValid}
            className='w-1/6'
            variant='contained'
            color='success'
            type='submit'
          >
            Siguiente
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalData
