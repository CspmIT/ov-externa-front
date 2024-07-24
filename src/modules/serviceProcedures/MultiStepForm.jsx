import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PersonalData from './components/PersonalData'
import RegFormProvider from './providers/RegFormProvider'
import HeaderForm from './components/HeaderForm'
import SelectServices from './views/SelectServices'
import ElectricPowerForm from './views/ElectricPowerForm'
import DrinkingWaterForm from './views/DrinkingWaterForm'
import TelecommunicationsForm from './views/TelecommunicationsForm'
import { Paper } from '@mui/material'
import { MdElectricBolt, MdWaterDrop } from 'react-icons/md'
import { BsFillRouterFill } from 'react-icons/bs'
import { FaHandsHelping } from 'react-icons/fa'
const services = [
	{ nombre: 'Energia Electrica', tipo: 1, color: '#00953e', bgColor: '!bg-[#00953e]/[0.5]', icon: <MdElectricBolt /> },
	{ nombre: 'Agua Potable', tipo: 2, color: '#007dbb', bgColor: '!bg-[#007dbb]/[0.5]', icon: <MdWaterDrop /> },
	{ nombre: 'Telecomunicaciones', tipo: 3, color: '#14407f', bgColor: '!bg-[#14407f]/[0.5]', icon: <BsFillRouterFill /> },
	{ nombre: 'Servicios Sociales', tipo: 4, color: '#ed6c23', bgColor: '!bg-[#ed6c23]/[0.5]', icon: <FaHandsHelping /> },
]

const MultiStepForm = () => {
	// Segun el step pinto un background diferente
	// const bgColor = (step) => {
	// 	switch (step) {
	// 		case 'select-service':
	// 			return '!bg-transparent'
	// 		case 'Datos Personales':
	// 			return '!bg-white'
	// 		case 'Energia Electrica':
	// 			return '!bg-[#00953e]/[0.5]'
	// 		case 'Agua Potable':
	// 			return '!bg-[#007dbb]/[0.3]'
	// 		case 'Telecomunicaciones':
	// 			return '!bg-[#14407f]/[0.5]'
	// 		case 'Servicios Sociales':
	// 			return '!bg-[#ed6c23]/[0.7]'
	// 		default:
	// 			return '!bg-transparent'
	// 	}
	// }
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
			<div className='p-4'>
				<Paper elevation={step !== 'select-service' ? 0 : 3} className={`p-8 mb-4`}>
					<HeaderForm />
					{renderStep}
				</Paper>
			</div>
		</RegFormProvider>
	)
}

export default MultiStepForm
