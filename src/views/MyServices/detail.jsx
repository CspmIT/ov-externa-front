import React from 'react'
import { Link } from 'react-router-dom';
{/* ----------------- ICONOS ----------------- */}
import { FaCircle } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
{/* ----------------- COMPONENTES ----------------- */}
import Card from '../../components/Card';
import ButtonAnimate from '../../components/ButtonAnimate';

const detail = () => {
    return (
        <div className='p-2 sm:pl-64 overflow-y-auto noScrollbar h-full bg-gray-100 dark:bg-zinc-900 dark:text-gray-300 pb-28'>
            <h2 className='text-center m-5'>Servicio (Nombre del Servicio)</h2>
            <h3 className='w-full text-left mb-5'>Facturas Impagas
                <div className='float-right'>
                    <Link to='/MyServices'>
                        <ButtonAnimate props={{ icon: <FaArrowLeft className='text-white' />, text: 'volver', bgIcon: 'bg-blue-400 mr-5', color: 'text-white' }} />
                    </Link>
                </div>
            </h3>
            <hr />
            <div className={`flex mt-2 mb-5 rounded-xl p-5 bg-gray-200 dark:bg-zinc-800`}>
                <span className='flex mr-3'><FaCircle className='text-green-500 mr-2' /> Servicio Activo</span>
                <span className='flex mr-3'><FaCircle className='text-yellow-500 mr-2' /> Servicio Pendiente de Conexión</span>
                <span className='flex mr-3'><FaCircle className='text-red-500 mr-2' /> Servicio Inactivo</span>
            </div>
            <div className='w-full flex flex-wrap'>
                <div className='w-full md:w-1/4 py-5'>
                    <a><Card props={{ phone: '', title: <p className='text-center'> Dirección del domicilio 123 </p>, subtitle: ` Cuenta N°: 7545`, icon: <FaBolt className='float-start mr-2' />, color: 'text-green-600', bgIcon: 'bg-green-400', colorIcon: 'text-green-900', widht: 'w-auto', bg: 'bg-white', shadow: 'false', statusService: '0' }} /></a>
                </div>
            </div>
        </div>
    )
}

export default detail