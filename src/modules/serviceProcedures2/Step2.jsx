import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Step2 = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log(data)
    navigate('/step3')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('step2')} />
      <button type='submit'>Siguiente</button>
    </form>
  )
}

export default Step2
