import { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard'
import { useNavigate } from 'react-router-dom'
import ListRequeriments from './ListRequeriments'
import Button from '@mui/material/Button'
import seeRqueriments from '../../serviceProcedures/utils/seeRequirements'
import { useRegForm } from '../providers/RegFormProvider'
import Swal from 'sweetalert2'

const SelectServices = ({ services }) => {
  const [visibleService, setVisibleService] = useState(null)
  const [selectedServices, setSelectedServices] = useState([...services])

  useEffect(() => {
    dispatch({ type: 'reset' })
  }, [])

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
    if (selectedServices.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debes seleccionar al menos un servicio para continuar.'
      })
      return
    }
    // agrego a los servicios seleccionados datos personales como primer servicio
    selectedServices.includes('Datos Personales') ||
      selectedServices.unshift('Datos Personales')
    dispatch({ type: 'select_services', selectedServices })
    dispatch({ type: 'next' })
    navigate(`/multiStepForm/Datos Personales`)
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
