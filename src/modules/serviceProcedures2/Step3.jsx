import React from 'react'
import { useForm } from 'react-hook-form'

const Step3 = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    // Aquí puedes hacer la lógica para guardar los datos
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('step3')} />
      <button type='submit'>Guardar</button>
    </form>
  )
}
export default Step3
