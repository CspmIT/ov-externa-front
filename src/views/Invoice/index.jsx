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

const Invoice = () => {
    return (
        <div className='p-2 sm:pl-64 overflow-y-auto h-full bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 pb-16'>
            <div className='flex w-full flex-wrap mt-10 justify-center rounded-xl pt-5 p-10 bg-white dark:bg-zinc-800'>
                <h3 className='w-full text-left mb-5'>Mis Facturas
                    <div className='float-right'>
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
        </div>
    )
}

export default Invoice