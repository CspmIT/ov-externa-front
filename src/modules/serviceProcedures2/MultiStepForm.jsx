import React from 'react'
import { useParams } from 'react-router-dom'
import PersonalData from './components/PersonalData'
import RegFormProvider from './providers/RegFormProvider'
import SelectServices from './components/SelectServices'
import HeaderForm from './components/HeaderForm'
import ElectricPowerForm from './components/ElectricPowerForm'
import DrinkingWaterForm from './components/DrinkingWaterForm'
const services = [
	{ nombre: 'Energia Electrica', tipo: 1 },
	{ nombre: 'Agua Potable', tipo: 2 },
	{ nombre: 'Telecomunicaciones', tipo: 3 },
	{ nombre: 'Servicios Sociales', tipo: 4 },
]

const MultiStepForm = () => {
	const { step } = useParams(['step'])
	function renderStep(step) {
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
				return <h1>Telecomunicaciones</h1>
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
				{renderStep(step)}
			</div>
		</RegFormProvider>
	)
}

export default MultiStepForm
