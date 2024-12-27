import { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import TabService from '../TabService'

const DropdownServices = ({ props }) => {
  const [dropMode, setdropMode] = useState(false)
  const [iconMode, seticonMode] = useState(
    <IoMdArrowDropdown className='float-end text-gray-900 dark:text-gray-200' />
  )
  const dropModehidden = () => {
    setdropMode(!dropMode)
    seticonMode(
      dropMode ? (
        <IoMdArrowDropup className='float-end text-gray-900  dark:text-gray-200' />
      ) : (
        <IoMdArrowDropdown className='float-end text-gray-900  dark:text-gray-200' />
      )
    )
  }

  const navigate = useNavigate()
  const handleDetalleClick = (service, account, medition, address, unidad) => {
    navigate('/myservices/detail', {
      state: { service, account, medition, address, unidad }
    })
  }
  return (
    <div>
      <div
        onClick={dropModehidden}
        className={`relative rounded-[2em] p-8 transition-all ease-in duration-500  m-2 w-1/2 max-sm:w-full ${props?.color ?? 'text-yellow-500 dark:text-yellow-400'}  w-auto cursor-pointer mb-3 p-8 bg-white dark:bg-zinc-700`}
        style={{ boxShadow: `2px 2px 2px` }}
      >
        <h5>
          {props?.icon} {props?.title}
          {iconMode}
        </h5>
      </div>
      <div
        className={`w-auto transition-all duration-300 ease-in-out overflow-hidden rounded-xl pb-3 !px-7 ${
          dropMode ? 'max-h-screen' : 'max-h-0 !p-0'
        }`}
      >
        <TabService
          handleDetailClick={handleDetalleClick}
          detailService={true}
          service={props?.accounts}
          domicilio={props?.address}
        />
      </div>
    </div>
  )
}

export default DropdownServices
