import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PersonalData from './components/PersonalData'
import RegFormProvider from './providers/RegFormProvider'
import HeaderForm from './components/HeaderForm'
import SelectServices from './views/SelectServices'
import ElectricPowerForm from './views/ElectricPowerForm'
import DrinkingWaterForm from './views/DrinkingWaterForm'
import TelecommunicationsForm from './views/TelecommunicationsForm'

const services = [
	{ nombre: 'Energia Electrica', tipo: 1 },
	{ nombre: 'Agua Potable', tipo: 2 },
	{ nombre: 'Telecomunicaciones', tipo: 3 },
	{ nombre: 'Servicios Sociales', tipo: 4 },
]

const MultiStepForm = () => {
	const { step } = useParams(['step'])
	const [renderStep, setRenderStep] = useState(renderView(step))
	useEffect(() => {
		setRenderStep(renderView(step))
	}, [step])
	function renderView(step) {
		switch (step) {
			case 'select-service':
				return <SelectServices services={services} />
			case 'Datos Personales':
				return <PersonalData />
			case 'Energia Electrica':
				return <ElectricPowerForm />
			case 'Agua Potable':
				return <DrinkingWaterForm />
			case 'Telecomunicaciones':
				return <TelecommunicationsForm />
			case 'Servicios Sociales':
				return <h1>Servicios Sociales</h1>
			default:
				return <SelectServices services={services} />
		}
	}

	return (
		<RegFormProvider>
			<div className='p-10'>
				<HeaderForm />
				{renderStep}
			</div>
		</RegFormProvider>
	)
}

export default MultiStepForm
