import { Button } from '@mui/material'
import { useRegForm } from '../providers/RegFormProvider'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const ElectricPowerForm = () => {
	const [state, dispatch] = useRegForm()
	const currentStep = state?.step - 1
	const navigate = useNavigate()
	const step = state?.step
	const {
		register,
		handleSubmit,
		// watch,
		// setValue,
		formState: { errors, isValid },
	} = useForm()

	const onSubmit = async (values) => {
		dispatch({ type: 'next' })
		navigate(`/multiStepForm/${state?.services[step].nombre}`)
	}
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-12 gap-4'>
				<Button disabled={!state?.person} className='w-1/6' variant='contained' color='success' type='submit'>
					Siguiente
				</Button>
				<Button
					onClick={() => {
						dispatch({ type: 'back' })
						navigate(`/multiStepForm/${state?.services[currentStep - 1].nombre}`)
					}}
				>
					Volver
				</Button>
			</form>
		</>
	)
}

export default ElectricPowerForm
