import { Button } from '@mui/material'
import { useRegForm } from '../providers/RegFormProvider'
import { useNavigate } from 'react-router-dom'

const ElectricPowerForm = () => {
	const [state, dispatch] = useRegForm()
	const currentStep = state?.step - 1
	console.log(state.person)
	const navigate = useNavigate()

	return (
		<>
			<div>Formulario de Energia Electrica</div>
			<Button>Siguiente</Button>
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

export default ElectricPowerForm
