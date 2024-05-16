import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
// import { useRegForm } from '../providers/RegFormProvider'

const PersonalForm = ({ person, register, errors }) => {
  console.log(person)

  return (
    <>
      <div className='w-full flex items-center justify-center gap-3'>
        <TextField
          error={errors.fullName}
          label='Apellido y Nombre completo'
          {...register('fullName', {
            required: true,
            defaultValue: person.APELLIDOS
          })}
          className='w-1/4'
          helperText={errors.fullName && 'El campo es requerido'}
          defaultValue={person.APELLIDOS}
        />
        <FormControl className='w-1/4' error={errors.typePerson}>
          <InputLabel id='sexo'>Sexo *</InputLabel>
          <Select
            labelId='sexo'
            label='Sexo *'
            id='sexo'
            defaultValue={person.SEXO}
            {...register('typePerson', { required: true })}
          >
            <MenuItem value='F'>Femenino</MenuItem>
            <MenuItem value='M'>Masculino</MenuItem>
          </Select>
          {/* Uso la validacion de react hook form */}
          {errors.typePerson && (
            <FormHelperText>El campo es requerido </FormHelperText>
          )}
        </FormControl>
      </div>
      <div className='w-full flex items-center justify-center gap-3'>
        <TextField
          error={errors.numDoc}
          label='Numero de Documento'
          {...register('numDoc', { required: true })}
          className='w-9/12'
          helperText={errors.numDoc && 'El campo es requerido'}
          defaultValue={person.NUM_DNI}
        />
        <TextField
          error={errors.fec_nac}
          label='Fecha de Nacimiento'
          {...register('fec_nac', { required: true })}
          className='w-9/12'
          helperText={errors.fec_nac && 'El campo es requerido'}
          defaultValue={person.FEC_NAC}
        />
      </div>
    </>
  )
}

export default PersonalForm
