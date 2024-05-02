import Stepper from '@mui/material/Stepper'
import { Step, StepLabel, Button } from '@mui/material'
import { useState, useContext } from 'react'
import { FormValidContext } from '../../../contexts/FormsContext'
import Swal from 'sweetalert2'

const StepperMui = ({ steps, children, formData }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const { isValid } = useContext(FormValidContext)

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps?.map((label, index) => {
          const stepProps = {}
          const labelProps = {}
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      {activeStep === steps.length && skipped.size === 0 ? (
        <div className='w-full mt-8'>
          <h3 className='text-center'>
            Felicidades, completaste todos los pasos
          </h3>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      ) : (
        <div className='mt-5'>
          <h1 className='text-center'>{steps[activeStep]}</h1>
          <p className='text-center mt-5'>Formulario de {steps[activeStep]}</p>
          {children}
          <div className='flex justify-center mt-5 gap-3'>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Atrás
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => {
                // Guardo el formulario en el localStorage
                localStorage.setItem(
                  steps[activeStep],
                  JSON.stringify(formData)
                )
                // Valido que se haya guardado y muestro el mensaje de confirmacion
                if (localStorage.getItem(steps[activeStep])) {
                  Swal.fire({
                    title: 'Datos guardados',
                    text: 'Los datos se han guardado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
                }
              }}
            >
              Guardar y continuar despues
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant='contained'
                disabled={!isValid}
                color='primary'
                onClick={handleNext}
              >
                Finalizar
              </Button>
            ) : (
              <Button
                variant='contained'
                disabled={!isValid}
                color='primary'
                onClick={handleNext}
              >
                Siguiente
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default StepperMui
