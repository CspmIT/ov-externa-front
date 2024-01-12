import React from 'react'
{/* ----------------- ICONOS ----------------- */}
import { FaCircleExclamation } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa";
{/* ----------------- ESTILOS ----------------- */}
import styles from '../../components/Card/Card.module.css'
{/* ----------------- COMPONENTES ----------------- */}
import ButtonAnimate from '../../components/ButtonAnimate'

const Payments = () => {
    return (
        <div className='p-2 sm:pl-64 overflow-y-auto h-full bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 pb-16'>
            <div className='flex w-full flex-wrap mt-10 justify-center rounded-xl pt-5 p-10 bg-white dark:bg-zinc-800'>
                <h3 className='w-full text-left mb-5'>Mis Pagos
                    <div className='float-right'>
                        <ButtonAnimate props={{ icon: <FaQuestion className='text-white' />, text: 'Ayuda', bgIcon: 'bg-gray-400', color: 'text-white' }} />
                    </div>
                </h3>
                <p><i>*Sólo se muestran los Pagos realizados en nuestra plataforma.</i></p>
                <div className={`relative overflow-x-auto w-full rounded-xl ${styles.shadowCards}`} >
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                        <thead className="text-xs text-gray-700 uppercase bg-yellow-300">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Cuenta
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Fecha
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Comprobante
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Código
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Importe
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    <FaCircleExclamation />
                                </th>
                                <th scope="col" className="px-6 py-3 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    16758
                                </th>
                                <td className="px-6 py-4 text-center">
                                    07/01/2024
                                </td>
                                <td className="px-6 py-4 text-center">
                                    SPB-0015-01299048
                                </td>
                                <td className="px-6 py-4 text-center">
                                    -
                                </td>
                                <td className="px-6 py-4 text-center">
                                    $2752.36
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <FaCircle />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className='bg-blue-400 p-2 rounded text-white'><FaFileAlt /></button>
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-zinc-800  border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    16758
                                </th>
                                <td className="px-6 py-4 text-center">
                                    07/01/2024
                                </td>
                                <td className="px-6 py-4 text-center">
                                    SPB-0015-01299048
                                </td>
                                <td className="px-6 py-4 text-center">
                                    -
                                </td>
                                <td className="px-6 py-4 text-center">
                                    $2752.36
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <FaCircle />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className='bg-blue-400 p-2 rounded text-white'><FaFileAlt /></button>
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-zinc-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    16758
                                </th>
                                <td className="px-6 py-4 text-center">
                                    07/01/2024
                                </td>
                                <td className="px-6 py-4 text-center">
                                    SPB-0015-01299048
                                </td>
                                <td className="px-6 py-4 text-center">
                                    -
                                </td>
                                <td className="px-6 py-4 text-center">
                                    $2752.36
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <FaCircle />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className='bg-blue-400 p-2 rounded text-white'><FaFileAlt /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Payments