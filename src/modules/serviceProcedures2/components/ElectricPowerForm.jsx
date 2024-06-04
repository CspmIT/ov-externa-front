import { Button } from '@mui/material'
import { useRegForm } from '../providers/RegFormProvider'
import { useNavigate } from 'react-router-dom'

const ElectricPowerForm = () => {
  const [state, dispatch] = useRegForm()
  const currentService = state?.services[state.step - 1]
  const currentStep = state?.step - 1
  console.log(currentService)
  console.log(currentStep)
  const navigate = useNavigate()

  return (
    <>
      <div>Formulario de Energia Electrica</div>
      <Button>Siguiente</Button>
      <Button
        onClick={() => {
          dispatch({ type: 'back' })
          navigate(`/multiStepForm/${state?.services[currentStep - 1]}`)
        }}
      >
        Volver
      </Button>
    </>
  )
}

export default ElectricPowerForm
