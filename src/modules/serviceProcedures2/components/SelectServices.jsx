import { useState } from 'react'
import ServiceCard from './ServiceCard'
import { useNavigate } from 'react-router-dom'
import ListRequeriments from './ListRequeriments'
import Button from '@mui/material/Button'
import seeRqueriments from '../../serviceProcedures/utils/seeRequirements'
import { useRegForm } from '../providers/RegFormProvider'

const SelectServices = ({ services }) => {
  const [visibleService, setVisibleService] = useState(null)
  const [selectedServices, setSelectedServices] = useState([...services])

  const handleSelectService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service))
    } else {
      setSelectedServices([...selectedServices, service])
    }
  }
  const navigate = useNavigate()

  const [, dispatch] = useRegForm()
  const onSubmit = () => {
    dispatch({ type: 'select_services', data: selectedServices })
    navigate('/multiStepForm/step1')
  }

  return (
    <div>
      <h2 className='text-center m-5'>Selecciona tus Servicios</h2>
      <hr />
      <h5 className='text-center mt-5'>
        Marcá todos los servicios a solicitar
      </h5>
      <div className='flex w-full flex-wrap'>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            service={service}
            onSelectionChange={handleSelectService}
            seeRqueriments={seeRqueriments}
            visibleService={visibleService}
            setVisibleService={setVisibleService}
          />
        ))}
      </div>
      <div className='mt-5 flex justify-center'>
        <Button
          variant='contained'
          color='success'
          className='!bg-green-400 w-1/2'
          onClick={onSubmit}
        >
          Solicitar Servicios
        </Button>
      </div>

      <div className='m-5'>
        {services.map((service, index) => (
          <div
            key={index}
            id={`${service}-${index}`}
            className='w-full bg-white p-3 rounded-md hidden'
          >
            <h4 className='text-center'>{service}</h4>
            <ListRequeriments servicio={service} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectServices
