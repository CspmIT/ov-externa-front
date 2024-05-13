import { useForm } from 'react-hook-form'
import { useRegForm } from './providers/RegFormProvider'
import { useNavigate } from 'react-router-dom'

const Step1 = () => {
  const [state, dispatch] = useRegForm()
  const {
    register,
    handleSubmit,
    formState: { isValid }
  } = useForm()
  const navigate = useNavigate()

  console.log(state)
  const onSubmit = (values) => {
    if (isValid) {
      dispatch({ type: 'set_step_1', data: values })
      dispatch({ type: 'next' })
      navigate('/multiStepForm/step2')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>paso 1</h1>
      <input {...register('step1')} />
      <button type='submit'>Siguiente</button>
    </form>
  )
}

export default Step1
