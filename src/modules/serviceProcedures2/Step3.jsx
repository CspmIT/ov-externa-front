import React from 'react'
import { useForm } from 'react-hook-form'
import { useRegForm } from './providers/RegFormProvider'

const Step3 = () => {
  const { register, handleSubmit } = useForm()

  const [state] = useRegForm()
  const onSubmit = (data) => {
    console.log(data)
    // Aquí puedes hacer la lógica para guardar los datos
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>El formulario uno devuelve {state?.step1.step1}</h1>
      <h1>El formulario 2 devuelve {state?.step2.step2}</h1>
      <input {...register('step3')} />
      <button type='submit'>Guardar</button>
    </form>
  )
}
export default Step3
