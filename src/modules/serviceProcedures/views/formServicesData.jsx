import { FormValidProvider } from '../../../contexts/FormsContext'
import { useLocation } from 'react-router-dom'
import StepperMui from '../components/StepperMui'
import FormPersonalData from '../components/FormPersonalData'

const FormServicesData = () => {
  const location = useLocation()
  const steps = location.state
  // Verifica si 'Datos Personales' ya está en el array antes de agregarlo
  if (!steps.includes('Datos Personales')) {
    steps.unshift('Datos Personales')
  }

  return (
    <FormValidProvider>
      <div className='w-full p-8'>
        <StepperMui steps={steps}>
          <div>
            <FormPersonalData />
          </div>
        </StepperMui>
      </div>
    </FormValidProvider>
  )
}

export default FormServicesData
