import React from 'react'
{/* ----------------- ICONOS ----------------- */}
import { LuDollarSign } from "react-icons/lu";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
{/* ----------------- ESTILOS ----------------- */}
import styles from '../../components/Card/Card.module.css'
import stylesWater from './Home.module.css'
{/* ----------------- COMPONENTES ----------------- */}
import Card from '../../components/Card';
import ButtonAnimate from '../../components/ButtonAnimate';
import Alert from '../../components/Alert';


const Home = () => {
  const swalHelp = () => {

  }

  return (
    <div className='p-2 pb-10 sm:pl-64 overflow-y-auto h-full bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 mb-10'>
      <div className='flex flex-wrap w-full'>
        <div className='flex w-full flex-wrap lg:w-3/4 md:1/2 w-full'>
          <div className={`${styles.card} ${styles.shadowCards} bg-white dark:bg-zinc-700 w-full flex flex-wrap sm:hidden`}>
            <img src='https://app.coopmorteros.coop/public/images/logos/Iso_OfiVirtual_Texto_Recortada.png' className='w-full' />            
            <div className='pt-4 w-3/4'>
              <p>NIVEL: <b>3</b></p>
              <p>N° de Socio: <b>58500</b></p>
              <p>COSTAMAGNA FABIAN NESTOR</p>
            </div>
            <div className='pt-4 w-1/4'>
              <div className='m-1 justify-center flex'>
                <ButtonAnimate props={{ icon: <FaExchangeAlt className='text-white' />, text: 'Socio', bgIcon: 'bg-emerald-600', color: 'text-white', animation: 'false' }} />
              </div>
              <div className='m-1 justify-center flex'>
                <ButtonAnimate props={{ icon: <FaPlus className='text-white' />, text: 'Seleccionar Socio', bgIcon: 'bg-amber-300', color: 'text-white', animation: 'false' }} />
              </div>
            </div>
          </div>
          <Card props={{ phone: '', title: 'SALDO', subtitle: '$35.000', icon: <LuDollarSign className='w-full' />, color: 'text-red-500', bgIcon: 'bg-red-400', colorIcon: 'text-red-900', bg: 'bg-white', positionBtn: 'absolute' }} />
          <Card props={{ phone: 'hidden', title: 'Mis', subtitle: 'FACTURAS', icon: <FaFileInvoiceDollar className='w-full' />, color: 'text-yellow-500', bgIcon: 'bg-yellow-300', colorIcon: 'text-yellow-900', bg: 'bg-white', positionBtn: 'absolute' }} />
          <Card props={{ phone: 'hidden', title: 'Mis', subtitle: 'PAGOS', icon: <FaReceipt className='w-full' />, color: 'text-blue-500', bgIcon: 'bg-blue-300', colorIcon: 'text-blue-900', bg: 'bg-white', positionBtn: 'absolute' }} />
          <Card props={{ phone: 'hidden', title: 'Mis', subtitle: 'SERVICIOS', icon: <FaChartPie className='w-full' />, color: 'text-sky-500', bgIcon: 'bg-sky-300', colorIcon: 'text-sky-900', bg: 'bg-white', positionBtn: 'absolute' }} />
          <Card props={{ phone: 'hidden', title: 'Mis', subtitle: 'CONSUMOS', icon: <FaChartBar className='w-full' />, color: 'text-pink-500', bgIcon: 'bg-pink-300', colorIcon: 'text-pink-900', bg: 'bg-white', positionBtn: 'absolute' }} />
          <div className={`${styles.card} ${styles.shadowCards} ${styles.cardHover} bg-white dark:bg-zinc-700`}>
            <img src='https://app.coopmorteros.coop/public/images/coopate/iso_Coopate-02.png' className='w-3/4' />
          </div>
        </div>
        <div className={`${styles.card} ${styles.cardHover} lg:w-1/4 md:1/2 w-full bg-white flex justify-center items-center dark:bg-zinc-700 md:m-0`}>
          <div className={`${stylesWater.waterCard} ${stylesWater.playing}`}>
            <div className={stylesWater.image}></div>
            <div className={stylesWater.wave}></div>
            <div className={stylesWater.wave}></div>
            <div className={stylesWater.wave}></div>
            <div className={stylesWater.infotop}><br />
              <FaCheckCircle className={stylesWater.icon} />
              1085m3
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-wrap mt-10 justify-center'>
        <p className='w-full m-2 text-center'>Si seleccionas todas las facturas podras acceder a estos beneficios</p>
        <div id="card_tv" className={`${styles.cardsCoop} ${styles.cardpacksI} lg:w-1/3 md:1/2 w-full text-center p-0 m-1`}>
          {/* <input disabled id="checkbox3" type="checkbox" name="checkbok_benefit_coopate"/> */}
          <h5 className="text-white mt-14"><b>300 MEGAS</b> al precio de 100 Megas</h5>
          <p className="text-white" id="precio_futbol">Promo válida por 3 meses</p>
        </div>
        <div id="card_tv" className={`${styles.cardsCoop} ${styles.cardpacksF}  lg:w-1/3 md:1/2 w-full text-center p-0 m-1`}>
          {/* <input disabled id="checkbox3" type="checkbox" name="checkbok_benefit_coopate"/> */}
          <h4 className="text-white mt-14"><b>GRATIS POR 1 MES</b></h4>
          <p className="text-white text-right p-6" id="precio_futbol">Ahorrás: <b>$3000</b></p>
        </div>
      </div>
      <div className='flex w-full flex-wrap mt-10 justify-center rounded-xl p-10 bg-white dark:bg-zinc-800'>
        <h3 className='w-full text-left mb-5'>Facturas Impagas
          <div onClick={swalHelp} className='float-right'>
            <ButtonAnimate props={{ icon: <FaQuestion className='text-white' />, text: 'Ayuda', bgIcon: 'bg-gray-400', color: 'text-white' }} />
          </div>
        </h3>
        <div className={`relative overflow-x-auto w-full rounded-xl ${styles.shadowCards}`} >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-yellow-300">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Factura
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Período
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Vencimiento
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Importe
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <FaCircleExclamation />
                </th>
                <th scope="col" className="px-6 py-3 text-center"></th>
                <th scope="col" className="px-6 py-3 text-center">
                  Seleccionar... <br />
                  <input type='checkbox' />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  TE
                </th>
                <td className="px-6 py-4 text-center">
                  FB-0008-00757661
                </td>
                <td className="px-6 py-4 text-center">
                  12/2023
                </td>
                <td className="px-6 py-4 text-center">
                  19/01/2024
                </td>
                <td className="px-6 py-4 text-center">
                  $ 16.855,51
                </td>
                <td className="px-6 py-4 text-center">
                  <FaCircle />
                </td>
                <td className="px-6 py-4 text-center">
                  <button className='bg-blue-400 p-2 rounded text-white'><FaFileAlt /></button>
                </td>
                <td className="px-6 py-4 text-center">
                  <input type='checkbox' />
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-zinc-800  border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  TE
                </th>
                <td className="px-6 py-4 text-center">
                  FB-0008-00757661
                </td>
                <td className="px-6 py-4 text-center">
                  12/2023
                </td>
                <td className="px-6 py-4 text-center">
                  19/01/2024
                </td>
                <td className="px-6 py-4 text-center">
                  $ 16.855,51
                </td>
                <td className="px-6 py-4 text-center">
                  <FaCircle />
                </td>
                <td className="px-6 py-4 text-center">
                  <button className='bg-blue-400 p-2 rounded text-white'><FaFileAlt /></button>
                </td>
                <td className="px-6 py-4 text-center">
                  <input type='checkbox' />
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  TE
                </th>
                <td className="px-6 py-4 text-center">
                  FB-0008-00757661
                </td>
                <td className="px-6 py-4 text-center">
                  12/2023
                </td>
                <td className="px-6 py-4 text-center">
                  19/01/2024
                </td>
                <td className="px-6 py-4 text-center">
                  $ 16.855,51
                </td>
                <td className="px-6 py-4 text-center">
                  <FaCircle />
                </td>
                <td className="px-6 py-4 text-center">
                  <button className='bg-blue-400 p-2 rounded text-white'><FaFileAlt /></button>
                </td>
                <td className="px-6 py-4 text-center">
                  <input type='checkbox' />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      <div className='flex w-full flex-wrap mt-10 justify-center rounded-xl mb-10 p-10 bg-white dark:bg-zinc-800'>
        <h3 className='w-full text-left mb-5'>Facturas Acueducto Impagas</h3>
        <p>* El Pago realizado de las Facturas podrá verse reflejado dentro de las próximas 48hs hábiles.</p>
        <div className={`relative overflow-x-auto w-full rounded-xl ${styles.shadowCards}`} >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-yellow-300">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Factura
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Período
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Vencimiento
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Importe
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <FaCircleExclamation />
                </th>
                <th scope="col" className="px-6 py-3 text-center"></th>
                <th scope="col" className="px-6 py-3 text-center">
                  Seleccionar... <br />
                  <input type='checkbox' />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  TE
                </th>
                <td className="px-6 py-4 text-center">
                  FB-0008-00757661
                </td>
                <td className="px-6 py-4 text-center">
                  12/2023
                </td>
                <td className="px-6 py-4 text-center">
                  19/01/2024
                </td>
                <td className="px-6 py-4 text-center">
                  $ 16.855,51
                </td>
                <td className="px-6 py-4 text-center">
                  <FaCircle />
                </td>
                <td className="px-6 py-4 text-center">
                  <button className='bg-blue-400 p-2 rounded text-white'><FaFileAlt /></button>
                </td>
                <td className="px-6 py-4 text-center">
                  <input type='checkbox' />
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-zinc-800  border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  TE
                </th>
                <td className="px-6 py-4 text-center">
                  FB-0008-00757661
                </td>
                <td className="px-6 py-4 text-center">
                  12/2023
                </td>
                <td className="px-6 py-4 text-center">
                  19/01/2024
                </td>
                <td className="px-6 py-4 text-center">
                  $ 16.855,51
                </td>
                <td className="px-6 py-4 text-center">
                  <FaCircle />
                </td>
                <td className="px-6 py-4 text-center">
                  <button className='bg-blue-400 p-2 rounded text-white'><FaFileAlt /></button>
                </td>
                <td className="px-6 py-4 text-center">
                  <input type='checkbox' />
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  TE
                </th>
                <td className="px-6 py-4 text-center">
                  FB-0008-00757661
                </td>
                <td className="px-6 py-4 text-center">
                  12/2023
                </td>
                <td className="px-6 py-4 text-center">
                  19/01/2024
                </td>
                <td className="px-6 py-4 text-center">
                  $ 16.855,51
                </td>
                <td className="px-6 py-4 text-center">
                  <FaCircle />
                </td>
                <td className="px-6 py-4 text-center">
                  <button className='bg-blue-400 p-2 rounded text-white'><FaFileAlt /></button>
                </td>
                <td className="px-6 py-4 text-center">
                  <input type='checkbox' />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>


      {/* ----------------- MODALS ----------------- */}

      <Alert props={{id: 'alertHelp', title:'Ayuda', 
      description: <p><b>Datos de la Tabla</b> <br/>A continuación verás algunas referencias con respecto a los datos que se muestran en la tabla de Facturas Impagas.</p>,
      body: <div>Holaa</div>, icon: false}} />
      
    </div>
  )
}

export default Home