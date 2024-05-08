import React from 'react'
import { useParams } from 'react-router-dom'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import RegFormProvider from './providers/RegFormProvider'

const MultiStepForm = () => {
  const { step } = useParams(['step'])

  function renderStep(step) {
    switch (step) {
      case 'select-service':
        return
      case 'step2':
        return <Step2 />
      case 'step3':
        return <Step3 />
      default:
        return <Step1 />
    }
  }

  return (
    <RegFormProvider>
      <h2 className='text-center m-5'>Selecciona tus Servicios</h2>
      <hr />
      <h5 className='text-center mt-5'>
        Marcá todos los servicios a solicitar
      </h5>
      <div>{renderStep(step)}</div>
    </RegFormProvider>
  )
}

export default MultiStepForm
