import React from 'react'
import { useParams } from 'react-router-dom'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import RegFormProvider from './providers/RegFormProvider'
import SelectServices from './components/SelectServices'

const services = [
  'Energia Electrica',
  'Agua Potable',
  'Telecomunicaciones',
  'Servicios Sociales'
]

const MultiStepForm = () => {
  const { step } = useParams(['step'])
  function renderStep(step) {
    switch (step) {
      case 'select-service':
        return <SelectServices services={services} />
      case 'step1':
        return <Step1 />
      case 'step2':
        return <Step2 />
      case 'step3':
        return <Step3 />
      default:
        return <SelectServices services={services} />
    }
  }

  return (
    <RegFormProvider>
      <div>{renderStep(step)}</div>
    </RegFormProvider>
  )
}

export default MultiStepForm
