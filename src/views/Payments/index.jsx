// import { FaCircleExclamation } from 'react-icons/fa6'
// import { FaCircle } from 'react-icons/fa'
// import { useContext, useEffect, useState } from 'react'
// import { request } from '../../utils/request'
// import { UserContext } from '../../contexts/UserContext'
// import { useNavigate } from 'react-router-dom'
// import Swal from 'sweetalert2'

// const Payments = () => {
//   const navigate = useNavigate()
//   const [pays, setPays] = useState([])
//   const { account } = useContext(UserContext)
//   const formattedData = (date) => {
//     const d = new Date(date)
//     // formato local
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
//     return d.toLocaleDateString('es-AR', options)

//   }
//   const getPayments = async () => {
//     const socio = account.num
//     const url = `${import.meta.env.VITE_APP_API_URL}/getBillsCustomer?customer=${socio}`
//     try {
//       const { data } = await request(url, 'get')
//       const safeData = Array.isArray(data) ? data : []
//       setPays(safeData)
//     } catch (e) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'No se han podido cargar los pagos realizados, intente luego nuevamente'
//       })
//       navigate('/')
//     }
//   }
//   useEffect(() => {
//     getPayments()
//   }, [account])
//   return (
//     <>
//       <div className='flex relative flex-wrap w-full mt-5 justify-center items-center'>
//         <h2 className='text-center max-sm:text-start max-sm:w-3/4 max-sm:text-3xl mb-5 m-0'> Mis Pagos</h2>
//       </div>
//       <div className='flex w-full flex-wrap mt-5 justify-center rounded-xl pt-5 p-10 bg-white dark:bg-zinc-800'>
//         <p>
//           <i>*Sólo se muestran los Pagos realizados en nuestra plataforma.</i>
//         </p>
//         <div className={`relative overflow-x-auto w-full rounded-xl shadowCards`}>
//           <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 '>
//             <thead className='text-xs text-black fondoPrincipal'>
//               <tr>
//                 <th scope='col' className='px-6 py-3 text-center text-lg'>
//                   Socio
//                 </th>
//                 <th scope='col' className='px-6 py-3 text-center text-lg'>
//                   Fecha
//                 </th>
//                 <th scope='col' className='px-6 py-3 text-center text-lg'>
//                   Comprobante
//                 </th>
//                 <th scope='col' className='px-6 py-3 text-center text-lg'>
//                   Importe
//                 </th>
//                 <th scope='col' className='px-6 py-3 text-center text-lg'>
//                   <FaCircleExclamation />
//                 </th>
//                 {/* <th scope='col' className='px-6 py-3 text-center'></th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {pays.map((pay, i) =>
//               (
//                 <tr key={i} className='odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
//                   <th scope='row' className='px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
//                     {pay.customer}
//                   </th>
//                   <td className='px-6 py-4 text-center'>{formattedData(pay.createdAt)} </td>
//                   <td className='px-6 py-4 text-center'>{pay.id_external}</td>
//                   <td className='px-6 py-4 text-center font-bold'>$ {pay.total} </td>
//                   <td className='px-6 py-4 text-center'>
//                     <FaCircle />
//                   </td>

//                   {/* <td className='px-6 py-4 text-center'>
//                   <button className='bg-blue-400 p-2 rounded text-white'>
//                     <FaFileAlt />
//                   </button>
//                 </td> */}
//                 </tr>
//               )
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Payments

import { useContext, useEffect, useState } from 'react'
import { Box, Modal } from '@mui/material'
import TableNew from '../../components/TableNew'
import LoaderComponent from '../../components/Loader'
import Swal from 'sweetalert2'
import { UserContext } from '../../contexts/UserContext'
import { columnsPayments, getPaymentsData, columnsPaymentsCell } from './utils/pays'
import Button from '../../components/Button'
import LogoCesopol from '../../assets/img/Logo/LogoCesopol.jpg'
import html2canvas from "html2canvas";

const Payments = () => {
  const { account } = useContext(UserContext)
  const [payments, setPayments] = useState([])
  const [columnsTable, setColumnsTable] = useState([])
  const [loading, setLoading] = useState(true)
  const [widthPhone, setWidthPhone] = useState(window.innerWidth <= 768)
  const [openModalPago, setOpenModalPago] = useState(false)
  const [pagoSeleccionado, setPagoSeleccionado] = useState(null)

  // Handlers para el Modal
  const openModalPagoHandler = (pago) => {
    setPagoSeleccionado(pago)
    setOpenModalPago(true)
  }

  const closeModalPagoHandler = () => {
    setPagoSeleccionado(null)
    setOpenModalPago(false)
  }

  // Manejo de Responsividad
  const changeScreen = () => setWidthPhone(window.innerWidth <= 768)

  useEffect(() => {
    window.addEventListener('resize', changeScreen)
    return () => window.removeEventListener('resize', changeScreen)
  }, [])

  useEffect(() => {
    if (!account?.num) return;

    const fetchPayments = async () => {
      setLoading(true);
      try {
        // Llamamos a la función que adaptamos abajo
        const data = await getPaymentsData(account.num);

        // Definir columnas según el ancho de pantalla
        const columnsToUse = widthPhone 
          ? columnsPaymentsCell(openModalPagoHandler) 
          : columnsPayments(openModalPagoHandler);

        setColumnsTable(columnsToUse);
        setPayments(data || []);
      } catch (e) {
        console.error(e);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los pagos',
        });
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [account, widthPhone]);

  return (
    <div>
      <h2 className="text-center w-full m-5">Mis Pagos</h2>
      <div className="p-5 mt-5 mr-5 rounded-xl bg-white dark:bg-zinc-800 shadowCards relative overflow-x-auto w-full">
        <p className="mb-4 italic text-sm text-gray-500 dark:text-gray-400">
          *Sólo se muestran los Pagos realizados en nuestra plataforma.
        </p>
        
        {loading ? (
          <LoaderComponent />
        ) : (
          <TableNew data={payments} columns={columnsTable} groupBy="account" />
        )}
      </div>

      {/* MODAL DE COMPROBANTE (Igual al estilo que te gustó) */}
      <Modal open={openModalPago} onClose={closeModalPagoHandler} className="flex justify-center items-center z-50">
        <Box className="bg-white p-6 pb-3 rounded-xl shadow-lg w-[90%] max-w-lg print:w-full print:max-w-none">
          <div id="comprobantePago" className="relative text-gray-900 border border-gray-300 p-3">
            <div className="flex justify-center mb-4">
              <img src={LogoCesopol} alt="Logo" className="h-20" />
            </div>
            <hr className='mb-3'/>
            <h2 className="text-xl font-semibold text-center border-b pb-3 mb-4">Pago Efectuado</h2>

            {pagoSeleccionado ? (
              <div className="text-sm space-y-3">
                <div className="grid grid-cols-3 gap-y-1 py-2 gap-x-4">
                  <div className='text-center'>
                    <span className="font-medium">Fecha:</span><br/>
                    <span>{new Date(pagoSeleccionado.date).toLocaleDateString('es-AR')}</span>
                  </div>
                  <div className='text-center'>
                    <span className="font-medium">Socio:</span><br/>
                    <span>{pagoSeleccionado.account || '-'}</span>
                  </div>
                  <div className='text-center'>
                    <span className="font-medium">Comprobante:</span><br/>
                    <span>{pagoSeleccionado.comprobante}</span>
                  </div>
                </div>
                <hr />
                <div className="flex justify-around items-center">
                  <div className='text-center'>
                    <span className="font-medium">Importe:</span><br/>
                    <span className="text-green-700 font-bold text-lg">
                      {pagoSeleccionado.amount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                    </span>
                  </div>
                  <div className='text-center'>
                    <span className="font-medium">Estado:</span><br/>
                    <span className="text-green-600 font-bold">PAGADO</span>
                  </div>
                </div>
                <hr />
              </div>
            ) : <p className="text-center">Cargando...</p>}

            {/* Sello de Pagado */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
              <span className="text-[60px] font-black border-red-400 border p-5 text-red-400 rotate-[-30deg]">PAGADO</span>
            </div>

            {/* <div className="flex justify-center m-6">
              <img src={pluspago} alt="Plus Pago" className="h-8" />
            </div> */}
          </div>

          <div className='justify-center flex mt-4'>
            <Button
              props={{ class: 'bg-green-600 hover:bg-green-700 rounded text-center py-2 px-4 text-white' }}
              onclick={async () => {
                const element = document.getElementById("comprobantePago");
                const canvas = await html2canvas(element, { scale: 2 });
                const dataUrl = canvas.toDataURL("image/png");
                const printWindow = window.open('', '_blank');
                printWindow.document.write(`<html><body><img src="${dataUrl}" style="width:100%;" /></body></html>`);
                printWindow.document.close();
                printWindow.print();
              }}
            >
              Imprimir Comprobante
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Payments
