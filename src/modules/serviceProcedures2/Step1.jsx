import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Step1 = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    console.log(data)
    navigate('/step2')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('step1')} />
      <button type='submit'>Siguiente</button>
    </form>
  )
}

export default Step1
