import { FormValidProvider } from '../../../contexts/FormsContext'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import StepperMui from '../components/SelectServices/StepperMui'
import FormPersonalData from './FormPersonalData'

const FormServicesData = () => {
	const location = useLocation()
	const steps = location.state
	// Verifica si 'Datos Personales' ya está en el array antes de agregarlo
	if (!steps.includes('Datos Personales')) {
		steps.unshift('Datos Personales')
	}

	const [formData, setFormData] = useState({})
	const handleFormChange = (newData) => {
		setFormData(newData)
	}
	return (
		<FormValidProvider>
			<div className='w-full p-8'>
				<StepperMui steps={steps} formData={formData}>
					<div>
						<FormPersonalData onFormChange={handleFormChange} />
					</div>
				</StepperMui>
			</div>
		</FormValidProvider>
	)
}

export default FormServicesData
