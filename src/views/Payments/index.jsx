import { FaCircleExclamation } from 'react-icons/fa6'
import { FaCircle } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import { request } from '../../utils/request'
import { UserContext } from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Payments = () => {
  const navigate = useNavigate()
  const [pays, setPays] = useState([])
  const { account } = useContext(UserContext)
  const formattedData = (date) => {
    const d = new Date(date)
    // formato local
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return d.toLocaleDateString('es-AR', options)

  }
  const getPayments = async () => {
    const socio = account.num
    const url = `${import.meta.env.VITE_APP_API_URL}/getBillsCustomer?customer=${socio}`
    try {
      const { data } = await request(url, 'get')
      const safeData = Array.isArray(data) ? data : []
      setPays(safeData)
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se han podido cargar los pagos realizados, intente luego nuevamente'
      })
      navigate('/')
    }
  }
  useEffect(() => {
    getPayments()
  }, [account])
  return (
    <>
      <div className='flex relative flex-wrap w-full mt-5 justify-center items-center'>
        <h2 className='text-center max-sm:text-start max-sm:w-3/4 max-sm:text-3xl mb-5 m-0'> Mis Pagos</h2>
      </div>
      <div className='flex w-full flex-wrap mt-5 justify-center rounded-xl pt-5 p-10 bg-white dark:bg-zinc-800'>
        <p>
          <i>*Sólo se muestran los Pagos realizados en nuestra plataforma.</i>
        </p>
        <div className={`relative overflow-x-auto w-full rounded-xl shadowCards`}>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
            <thead className='text-xs text-black fondoPrincipal'>
              <tr>
                <th scope='col' className='px-6 py-3 text-center text-lg'>
                  Socio
                </th>
                <th scope='col' className='px-6 py-3 text-center text-lg'>
                  Fecha
                </th>
                <th scope='col' className='px-6 py-3 text-center text-lg'>
                  Comprobante
                </th>
                <th scope='col' className='px-6 py-3 text-center text-lg'>
                  Importe
                </th>
                <th scope='col' className='px-6 py-3 text-center text-lg'>
                  <FaCircleExclamation />
                </th>
                {/* <th scope='col' className='px-6 py-3 text-center'></th> */}
              </tr>
            </thead>
            <tbody>
              {pays.map((pay, i) =>
              (
                <tr key={i} className='odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                  <th scope='row' className='px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                    {pay.customer}
                  </th>
                  <td className='px-6 py-4 text-center'>{formattedData(pay.createdAt)} </td>
                  <td className='px-6 py-4 text-center'>{pay.id_external}</td>
                  <td className='px-6 py-4 text-center font-bold'>$ {pay.total} </td>
                  <td className='px-6 py-4 text-center'>
                    <FaCircle />
                  </td>

                  {/* <td className='px-6 py-4 text-center'>
                  <button className='bg-blue-400 p-2 rounded text-white'>
                    <FaFileAlt />
                  </button>
                </td> */}
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Payments
