import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useRegForm } from './providers/RegFormProvider'

const Step2 = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [state, dispatch] = useRegForm()
  const onSubmit = (values) => {
    dispatch({ type: 'set_step_2', data: values })
    navigate('/multiStepForm/step3')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>El dato anterior es {state?.step1.step1} </h2>
      <input {...register('step2')} />
      <button type='submit'>Siguiente</button>
    </form>
  )
}

export default Step2
