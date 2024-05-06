import { FaCircleExclamation } from 'react-icons/fa6'
import { FaCircle } from 'react-icons/fa'

const Payments = () => {
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
                  Cuenta
                </th>
                <th scope='col' className='px-6 py-3 text-center text-lg'>
                  Fecha
                </th>
                <th scope='col' className='px-6 py-3 text-center text-lg'>
                  Comprobante
                </th>
                <th scope='col' className='px-6 py-3 text-center text-lg'>
                  Código
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
              <tr className='odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <th scope='row' className='px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  16758
                </th>
                <td className='px-6 py-4 text-center'>07/01/2024</td>
                <td className='px-6 py-4 text-center'>SPB-0015-01299048</td>
                <td className='px-6 py-4 text-center'>-</td>
                <td className='px-6 py-4 text-center'>$2752.36</td>
                <td className='px-6 py-4 text-center'>
                  <FaCircle />
                </td>
                {/* <td className='px-6 py-4 text-center'>
                  <button className='bg-blue-400 p-2 rounded text-white'>
                    <FaFileAlt />
                  </button>
                </td> */}
              </tr>
              <tr className='odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-zinc-800  border-b dark:border-gray-700'>
                <th scope='row' className='px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  16758
                </th>
                <td className='px-6 py-4 text-center'>07/01/2024</td>
                <td className='px-6 py-4 text-center'>SPB-0015-01299048</td>
                <td className='px-6 py-4 text-center'>-</td>
                <td className='px-6 py-4 text-center'>$2752.36</td>
                <td className='px-6 py-4 text-center'>
                  <FaCircle />
                </td>
                {/* <td className='px-6 py-4 text-center'>
                  <button className='bg-blue-400 p-2 rounded text-white'>
                    <FaFileAlt />
                  </button>
                </td> */}
              </tr>
              <tr className='odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                <th scope='row' className='px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                  16758
                </th>
                <td className='px-6 py-4 text-center'>07/01/2024</td>
                <td className='px-6 py-4 text-center'>SPB-0015-01299048</td>
                <td className='px-6 py-4 text-center'>-</td>
                <td className='px-6 py-4 text-center'>$2752.36</td>
                <td className='px-6 py-4 text-center'>
                  <FaCircle />
                </td>
                {/* <td className='px-6 py-4 text-center'>
                  <button className='bg-blue-400 p-2 rounded text-white'>
                    <FaFileAlt />
                  </button>
                </td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Payments
