import { FaCircleExclamation } from 'react-icons/fa6'
import { FaCircle, FaSearch, FaQuestion } from 'react-icons/fa'
import ButtonAnimate from '../../components/ButtonAnimate'

const Handle = () => {
  return (
    <div className='flex w-full flex-wrap mt-10 justify-center rounded-xl pt-5 p-10 bg-white dark:bg-zinc-800'>
      <h3 className='w-full text-left mb-5'>
        Mis Trámites
        <div className='float-right'>
          <ButtonAnimate props={{ icon: <FaQuestion className='text-white' />, text: 'Ayuda', bgIcon: 'bg-gray-400', color: 'text-white' }} />
        </div>
      </h3>
      <div className={`relative overflow-x-auto w-full rounded-xl shadowCards`}>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
          <thead className='text-xs text-gray-700 uppercase fondoPrincipal'>
            <tr>
              <th scope='col' className='px-6 py-3 text-center'>
                Tipo
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                Cuenta
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                Trámite
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                Alta
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                Cierre
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                <FaCircleExclamation />
              </th>
              <th scope='col' className='px-6 py-3 text-center'></th>
            </tr>
          </thead>
          <tbody>
            <tr className='odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
              <th scope='row' className='px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                CAMBIO CATEGORIA DE SERVICIOS
              </th>
              <td className='px-6 py-4 text-center'>16757</td>
              <td className='px-6 py-4 text-center'>460677</td>
              <td className='px-6 py-4 text-center'>07/01/2024</td>
              <td className='px-6 py-4 text-center'>07/01/2024</td>
              <td className='px-6 py-4 text-center'>
                <FaCircle />
              </td>
              <td className='px-6 py-4 text-center'>
                <button className='bg-blue-400 p-2 rounded text-white'>
                  <FaSearch />
                </button>
              </td>
            </tr>
            <tr className='odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-zinc-800  border-b dark:border-gray-700'>
              <th scope='row' className='px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                INCIDENTE/RECLAMO
              </th>
              <td className='px-6 py-4 text-center'>16757</td>
              <td className='px-6 py-4 text-center'>460677</td>
              <td className='px-6 py-4 text-center'>07/01/2024</td>
              <td className='px-6 py-4 text-center'>07/01/2024</td>
              <td className='px-6 py-4 text-center'>
                <FaCircle />
              </td>
              <td className='px-6 py-4 text-center'>
                <button className='bg-blue-400 p-2 rounded text-white'>
                  <FaSearch />
                </button>
              </td>
            </tr>
            <tr className='odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
              <th scope='row' className='px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                INCIDENTE/RECLAMO
              </th>
              <td className='px-6 py-4 text-center'>16757</td>
              <td className='px-6 py-4 text-center'>460677</td>
              <td className='px-6 py-4 text-center'>07/01/2024</td>
              <td className='px-6 py-4 text-center'>07/01/2024</td>
              <td className='px-6 py-4 text-center'>
                <FaCircle />
              </td>
              <td className='px-6 py-4 text-center'>
                <button className='bg-blue-400 p-2 rounded text-white'>
                  <FaSearch />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Handle
