import { Button } from '@mui/material'
import { useRegForm } from '../providers/RegFormProvider'
import { useNavigate } from 'react-router-dom'

const DrinkingWaterForm = () => {
	const [state, dispatch] = useRegForm()
	const currentStep = state?.step - 1
	const navigate = useNavigate()
	const step = state?.step

	return (
		<>
			<div>Formulario de Agua Potable</div>
			<Button
				onClick={() => {
					dispatch({ type: 'next' })
					navigate(`/multiStepForm/${state?.services[step].nombre}`)
				}}
			>
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
		</>
	)
}

export default DrinkingWaterForm
