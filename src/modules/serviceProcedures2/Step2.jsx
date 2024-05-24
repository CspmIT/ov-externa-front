import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useRegForm } from './providers/RegFormProvider'

const Step2 = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [state, dispatch] = useRegForm()
  const step = state.step
  const service = state.services[step - 1]
  const onSubmit = (values) => {
    dispatch({ type: 'set_step_2', data: values })
    dispatch({ type: 'next' })
    navigate('/multiStepForm/step3')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Formulario de {service}</h2>
      <input {...register('step2')} />
      <button type='submit'>Siguiente</button>
      <button
        onClick={() => {
          dispatch({ type: 'back' })
          navigate(`/multiStepForm/${service}`)
        }}
      >
        volver
      </button>
    </form>
  )
}

export default Step2
